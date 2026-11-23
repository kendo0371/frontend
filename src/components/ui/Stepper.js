// "Улирал − 3 +" маягийн тоо нэмэх/хасах товч.
const stepButton =
  "flex size-7 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800";

export default function Stepper({ label, value, onChange, min = 1 }) {
  return (
    <span className="flex items-center gap-1 text-zinc-500">
      {label}
      <button
        className={stepButton}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label={`${label} хасах`}>
        −
      </button>
      <span className="w-6 text-center tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
      <button
        className={stepButton}
        onClick={() => onChange(value + 1)}
        aria-label={`${label} нэмэх`}>
        +
      </button>
    </span>
  );
}
