"use client";

import { useEffect, useState } from "react";
import {
  createMovie,
  deleteMovie,
  listMovies,
  listProfiles,
  loadProfileId,
  loadProgress,
  saveProfileId,
  saveProgress,
  updateMovie,
} from "@/lib/movies";
import StatusBadge, { STATUSES } from "./StatusBadge";

const input =
  "rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:focus:border-zinc-500";
const btn =
  "rounded-lg px-3 py-2 text-sm font-medium transition active:scale-95 disabled:opacity-50";

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [profileId, setProfileId] = useState(null);

  async function refresh() {
    try {
      setMovies(await listMovies(profileId));
      setError("");
    } catch {
      setMovies((m) => m ?? []);
    }
  }

  // profile endees ehelj baina
  useEffect(() => {
    listProfiles()
      .then(
        (list) => {
          setProfiles(list);
          const saved = loadProfileId();
          setProfileId(list.some((p) => p.id === saved) ? saved : list[0]?.id);
        },
        () => {
          setMovies([]);
          setError(
            "Backend-тэй холбогдож чадсангүй (localhost:4000 асаалттай юу?)",
          );
        },
      )
      .finally(() => setProgress(loadProgress()));
  }, []);

  useEffect(() => {
    if (!profileId) return;
    listMovies(profileId).then(setMovies, () => setMovies([]));
  }, [profileId]);

  function pickProfile(id) {
    if (id === profileId) return;
    setMovies(null);
    setProfileId(id);
    saveProfileId(id);
  }

  function setEp(id, next) {
    setProgress((all) => {
      const updated = { ...all, [id]: next };
      if (!next) delete updated[id];
      saveProgress(updated);
      return updated;
    });
  }

  async function run(fn) {
    try {
      await fn();
      await refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <ProfilePicker
        profiles={profiles}
        value={profileId}
        onChange={pickProfile}
      />

      <AddForm
        onAdd={(data) => run(() => createMovie({ ...data, profileId }))}
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {movies === null ?
        <p className="text-sm text-zinc-500">Ачаалж байна...</p>
      : movies.length === 0 ?
        <p className="rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
          Одоогоор цуврал алга. Дээрээс нэмээрэй.
        </p>
      : <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {movies.map((m) => (
            <Row
              key={m.id}
              movie={m}
              ep={progress[m.id] ?? { s: 1, e: 1 }}
              onEp={(next) => setEp(m.id, next)}
              onUpdate={(data) => run(() => updateMovie(m.id, data))}
              onDelete={() =>
                confirm(`"${m.title}"-г устгах уу?`)
                && run(async () => {
                  await deleteMovie(m.id);
                  setEp(m.id, null);
                })
              }
            />
          ))}
        </ul>
      }
    </>
  );
}

function ProfilePicker({ profiles, value, onChange }) {
  if (!profiles.length) return null;
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`${btn} rounded-full border ${
            p.id === value ?
              "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
            : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}>
          {p.displayname}
        </button>
      ))}
    </div>
  );
}

function AddForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("want");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await onAdd({ title: title.trim(), status });
    setTitle("");
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mb-6 flex flex-col gap-2 sm:flex-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Цувралын нэр..."
        className={`${input} min-w-0 flex-1`}
      />
      <StatusSelect value={status} onChange={setStatus} />
      <button
        disabled={busy || !title.trim()}
        className={`${btn} bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900`}>
        Нэмэх
      </button>
    </form>
  );
}

function Row({ movie, ep, onEp, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);

  function saveTitle(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onUpdate({ title: title.trim(), status: movie.status });
    setEditing(false);
  }

  return (
    <li className="flex flex-col gap-3 bg-white px-4 py-3 sm:flex-row sm:items-center dark:bg-zinc-900/40">
      <div className="min-w-0 flex-1">
        {editing ?
          <form onSubmit={saveTitle} className="flex gap-2">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${input} min-w-0 flex-1 py-1`}
            />
            <button className={`${btn} py-1 text-sky-600`}>Хадгалах</button>
            <button
              type="button"
              onClick={() => {
                setTitle(movie.title);
                setEditing(false);
              }}
              className={`${btn} py-1 text-zinc-500`}>
              Болих
            </button>
          </form>
        : <div className="flex items-center gap-2">
            <p className="truncate font-medium">{movie.title}</p>
            <StatusBadge status={movie.status} />
          </div>
        }

        {movie.status === "watching" && <Episode ep={ep} onChange={onEp} />}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <StatusSelect
          value={movie.status}
          onChange={(status) => onUpdate({ title: movie.title, status })}
        />
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className={`${btn} text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800`}>
            Засах
          </button>
        )}
        <button
          onClick={onDelete}
          className={`${btn} text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10`}>
          Устгах
        </button>
      </div>
    </li>
  );
}

function Episode({ ep, onChange }) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <span className="font-mono tabular-nums text-sky-600 dark:text-sky-400">
        S{pad(ep.s)} · E{pad(ep.e)}
      </span>
      <Stepper
        label="Улирал"
        value={ep.s}
        onChange={(s) => onChange({ s, e: 1 })}
      />
      <Stepper
        label="Анги"
        value={ep.e}
        onChange={(e) => onChange({ ...ep, e })}
      />
    </div>
  );
}

function Stepper({ label, value, onChange }) {
  const cls =
    "flex size-7 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800";
  return (
    <span className="flex items-center gap-1 text-zinc-500">
      {label}
      <button
        className={cls}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        aria-label={`${label} хасах`}>
        −
      </button>
      <span className="w-6 text-center tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
      <button
        className={cls}
        onClick={() => onChange(value + 1)}
        aria-label={`${label} нэмэх`}>
        +
      </button>
    </span>
  );
}

function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${input} dark:bg-zinc-900`}>
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
