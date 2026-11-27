// "Анги − +" маягийн тоо нэмэх/хасах товч.
const stepButton =
  "flex size-8 items-center justify-center rounded-md border border-line text-text transition hover:bg-raise active:scale-90 disabled:opacity-30 disabled:active:scale-100";

export default function Stepper({ label, value, onChange, min = 1, accent = false }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-muted">
      <span className="mr-0.5">{label}</span>
      <button
        className={stepButton}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label={`${label} хасах`}>
        −
      </button>
      <button
        className={
          accent ?
            `${stepButton} border-glow bg-glow font-semibold text-ink hover:bg-glow hover:brightness-105`
          : stepButton
        }
        onClick={() => onChange(value + 1)}
        aria-label={`${label} нэмэх`}>
        +
      </button>
    </span>
  );
}
