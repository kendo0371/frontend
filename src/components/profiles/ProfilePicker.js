import { buttonClass } from "@/components/ui/styles";

export default function ProfilePicker({ profiles, value, onChange }) {
  if (!profiles.length) return null;
  return (
    <nav aria-label="Profile" className="mb-6 flex flex-wrap gap-2">
      {profiles.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            aria-pressed={active}
            className={`${buttonClass} flex items-center gap-2 rounded-full border py-1.5 pl-1.5 ${
              active ?
                "border-glow/60 bg-glow/10 text-text"
              : "border-line text-muted hover:bg-panel hover:text-text"
            }`}>
            <span
              className={`flex size-6 items-center justify-center rounded-full font-display text-[11px] ${
                active ? "bg-glow text-ink" : "bg-raise text-muted"
              }`}>
              {p.displayname?.[0]?.toUpperCase()}
            </span>
            {p.displayname}
          </button>
        );
      })}
    </nav>
  );
}
