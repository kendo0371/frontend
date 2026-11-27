import Stepper from "@/components/ui/Stepper";

const pad = (n) => String(n).padStart(2, "0");

// Том "S02 E07" дэлгэц + улирал/анги солих товчнууд. ep = { s, e }
export function EpisodeDisplay({ ep }) {
  return (
    <div
      className="flex items-baseline gap-3 font-display leading-none text-glow tabular-nums"
      aria-label={`${ep.s}-р улирал, ${ep.e}-р анги`}>
      <span className="text-sm text-glow/60">
        S<span key={`s${ep.s}`} className="inline-block animate-tick text-2xl text-glow">{pad(ep.s)}</span>
      </span>
      <span className="text-sm text-glow/60">
        E<span key={`e${ep.e}`} className="inline-block animate-tick text-4xl text-glow">{pad(ep.e)}</span>
      </span>
    </div>
  );
}

export function EpisodeControls({ ep, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Stepper
        label="Анги"
        value={ep.e}
        accent
        onChange={(e) => onChange({ ...ep, e })}
      />
      <Stepper
        label="Улирал"
        value={ep.s}
        onChange={(s) => onChange({ s, e: 1 })} // улирал солиход 1-р ангиас
      />
    </div>
  );
}
