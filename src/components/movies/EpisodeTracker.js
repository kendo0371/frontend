import Stepper from "@/components/ui/Stepper";

const pad = (n) => String(n).padStart(2, "0");

// "S01 · E03" + улирал/анги солих товчнууд. ep = { s, e }
export default function EpisodeTracker({ ep, onChange }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <span className="font-mono tabular-nums text-sky-600 dark:text-sky-400">
        S{pad(ep.s)} · E{pad(ep.e)}
      </span>
      <Stepper
        label="Улирал"
        value={ep.s}
        onChange={(s) => onChange({ s, e: 1 })} // улирал солиход 1-р ангиас
      />
      <Stepper
        label="Анги"
        value={ep.e}
        onChange={(e) => onChange({ ...ep, e })}
      />
    </div>
  );
}
