"use client";

import { useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
import StatusSelect from "@/components/ui/StatusSelect";
import { buttonClass, inputClass } from "@/components/ui/styles";
import EpisodeTracker from "./EpisodeTracker";

// Жагсаалтын нэг мөр: нэр (засаж болно), статус, анги, устгах.
export default function MovieRow({
  movie,
  ep,
  onEpChange,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);

  function saveTitle(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onUpdate({ title: title.trim(), status: movie.status });
    setEditing(false);
  }

  function cancelEdit() {
    setTitle(movie.title);
    setEditing(false);
  }

  return (
    <li className="flex flex-col bg-white px-4 py-3 sm:flex-row sm:items-center dark:bg-zinc-900/40">
      <div className="min-w-0 flex-1">
        {editing ?
          <form onSubmit={saveTitle} className="flex gap-2">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${inputClass} min-w-0 flex-1 py-1`}
            />
            <button className={`${buttonClass} py-1 text-sky-600`}>
              Хадгалах
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className={`${buttonClass} py-1 text-zinc-500`}>
              Болих
            </button>
          </form>
        : <div className="flex items-center gap-2">
            <p className="truncate font-medium">{movie.title}</p>
            <StatusBadge status={movie.status} />
          </div>
        }

        {movie.status === "watching" && (
          <EpisodeTracker ep={ep} onChange={onEpChange} />
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <StatusSelect
          value={movie.status}
          onChange={(status) => onUpdate({ title: movie.title, status })}
        />
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className={`${buttonClass} text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800`}>
            Засах
          </button>
        )}
        <button
          onClick={onDelete}
          className={`${buttonClass} text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10`}>
          Устгах
        </button>
      </div>
    </li>
  );
}
