"use client";

import { useState } from "react";
import { DEFAULT_STATUS } from "@/lib/statuses";
import StatusSelect from "@/components/ui/StatusSelect";
import { primaryButtonClass } from "@/components/ui/styles";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);
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
    <form
      onSubmit={submit}
      className="mb-8 flex flex-col gap-2 rounded-2xl border border-line bg-panel p-2 transition-colors focus-within:border-glow/50 sm:flex-row sm:items-center">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ямар цуврал нэмэх вэ?"
        aria-label="Цувралын нэр"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted/70"
      />
      <div className="flex gap-2">
        <StatusSelect
          value={status}
          onChange={setStatus}
          className="flex-1 border-transparent bg-raise sm:flex-none"
        />
        <button disabled={busy || !title.trim()} className={primaryButtonClass}>
          Нэмэх
        </button>
      </div>
    </form>
  );
}
