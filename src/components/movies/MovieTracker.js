"use client";

import { useState } from "react";
import { useMovies } from "@/hooks/useMovies";
import { useProgress } from "@/hooks/useProgress";
import { getStatus } from "@/lib/statuses";
import AddMovieForm from "./AddMovieForm";
import MovieRow from "./MovieRow";
import StatusTabs from "./StatusTabs";

// Нүүр хуудасны гол хэсэг: hook-уудаас data аваад UI-д дамжуулна.
export default function MovieTracker() {
  const { movies, error, addMovie, updateMovie, deleteMovie } = useMovies();
  const { getEpisode, setEpisode } = useProgress();
  const [tab, setTab] = useState("watching");

  const list = movies;

  const counts = {};
  for (const m of list ?? []) counts[m.status] = (counts[m.status] ?? 0) + 1;
  const visible = list?.filter((m) => m.status === tab) ?? [];
  const status = getStatus(tab);

  // Нэмсэн цувралаа шууд харахын тулд тухайн таб руу шилжинэ.
  async function handleAdd(movie) {
    if (await addMovie(movie)) setTab(movie.status);
  }

  async function handleDelete(movie) {
    if (!confirm(`"${movie.title}"-г устгах уу?`)) return;
    if (await deleteMovie(movie.id)) setEpisode(movie.id, null);
  }

  return (
    <>
      <AddMovieForm onAdd={handleAdd} />

      {error && (
        <p
          role="alert"
          className="mb-8 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <StatusTabs value={tab} onChange={setTab} counts={counts} />

      <div role="tabpanel" id="status-panel" aria-labelledby={`tab-${tab}`}>
        {list === null ?
          <p className="text-muted">Ачаалж байна...</p>
        : visible.length === 0 ?
          <p className="rounded-2xl border border-dashed border-line px-6 py-12 text-center text-sm text-muted">
            {status.empty}
          </p>
        : <ul
            className={`flex flex-col ${tab === "watching" ? "gap-3" : "gap-2"}`}>
            {visible.map((m) => (
              <MovieRow
                key={m.id}
                movie={m}
                ep={getEpisode(m.id)}
                onEpChange={(next) => setEpisode(m.id, next)}
                onUpdate={(changes) => updateMovie(m.id, changes)}
                onDelete={() => handleDelete(m)}
              />
            ))}
          </ul>
        }
      </div>
    </>
  );
}
