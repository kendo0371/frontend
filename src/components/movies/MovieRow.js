"use client";

import { useState } from "react";
import StatusSelect from "@/components/ui/StatusSelect";
import {
  buttonClass,
  ghostButtonClass,
  inputClass,
} from "@/components/ui/styles";
import { EpisodeControls, EpisodeDisplay } from "./EpisodeTracker";

// Нэг цуврал. "Үзэж байгаа" бол том card, бусад нь нам гүм мөр.
export default function MovieRow({
  movie,
  ep,
  onEpChange,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const watching = movie.status === "watching";
  const watched = movie.status === "watched";

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

  const titleArea =
    editing ?
      <form onSubmit={saveTitle} className="flex gap-2">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && cancelEdit()}
          aria-label="Цувралын нэр"
          className={`${inputClass} min-w-0 flex-1 py-1.5`}
        />
        <button className={`${buttonClass} py-1.5 text-glow hover:bg-raise`}>
          Хадгалах
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className={`${ghostButtonClass} py-1.5`}>
          Болих
        </button>
      </form>
    : <p
        className={
          watching ?
            "font-display text-lg font-medium leading-snug wrap-break-words"
          : `truncate ${watched ? "text-muted" : "text-text"}`
        }>
        {movie.title}
      </p>;

  const actions = (
    <div className="flex shrink-0 items-center gap-1">
      <StatusSelect
        value={movie.status}
        onChange={(status) => onUpdate({ title: movie.title, status })}
        className="border-transparent bg-transparent py-1.5 text-muted hover:bg-raise"
      />
      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className={`${ghostButtonClass} py-1.5`}>
          Засах
        </button>
      )}
      <button
        onClick={onDelete}
        className={`${buttonClass} py-1.5 text-muted hover:bg-danger/10 hover:text-danger`}>
        Устгах
      </button>
    </div>
  );

  if (watching) {
    return (
      <li className="rounded-2xl border border-glow/25 bg-panel p-5 shadow-[0_0_48px_-24px_var(--color-glow)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">{titleArea}</div>
          <EpisodeDisplay ep={ep} />
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <EpisodeControls ep={ep} onChange={onEpChange} />
          <div className="-mx-2 sm:mx-0">{actions}</div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-1 rounded-xl border border-line bg-panel px-4 py-3 transition-colors hover:border-muted/40 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">{titleArea}</div>
      <div className="-mx-2 sm:mx-0">{actions}</div>
    </li>
  );
}
