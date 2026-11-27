import { STATUSES } from "@/lib/statuses";

// Статус бүрийн таб. counts = { watching: 2, want: 5, ... }
export default function StatusTabs({ value, onChange, counts }) {
  return (
    <div
      role="tablist"
      aria-label="Статус"
      className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-line bg-panel p-1">
      {STATUSES.map((s) => {
        const active = s.value === value;
        return (
          <button
            key={s.value}
            role="tab"
            id={`tab-${s.value}`}
            aria-selected={active}
            aria-controls="status-panel"
            onClick={() => onChange(s.value)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 font-display text-sm font-medium transition-colors ${
              active ? "bg-raise text-text" : "text-muted hover:text-text"
            }`}>
            <span className={`size-2 rounded-full ${s.dot} ${active ? "" : "opacity-50"}`} />
            {s.label}
            <span className={`tabular-nums ${active ? s.text : "text-muted"}`}>
              {counts[s.value] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
