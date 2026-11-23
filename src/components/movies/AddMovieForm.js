"use client";

import { useState } from "react";
import { DEFAULT_STATUS } from "@/lib/statuses";
import StatusSelect from "@/components/ui/StatusSelect";
import { buttonClass, inputClass } from "@/components/ui/styles";

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
    <form onSubmit={submit} className="mb-6 flex flex-col gap-2 sm:flex-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Цувралын нэр..."
        className={`${inputClass} min-w-0 flex-1`}
      />
      <StatusSelect value={status} onChange={setStatus} />
      <button
        disabled={busy || !title.trim()}
        className={`${buttonClass} bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900`}>
        Нэмэх
      </button>
    </form>
  );
}
