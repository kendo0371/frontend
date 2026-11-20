export const STATUSES = [
  { value: "watching", label: "Үзэж байгаа" },
  { value: "want", label: "Үзэх" },
  { value: "watched", label: "Үзсэн" },
];

const STATUS_LABEL = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]));

const STATUS_STYLES = {
  watching: {
    dot: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30",
  },
  want: {
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
  },
  watched: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
  },
};

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status];
  if (!s) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${s.badge}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
