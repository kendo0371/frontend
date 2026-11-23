// Цувралын статусууд. Шинэ статус нэмэх бол зөвхөн энд нэмнэ.

export const STATUSES = [
  {
    value: "watching",
    label: "Үзэж байгаа",
    dot: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30",
  },
  {
    value: "want",
    label: "Үзэх",
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
  },
  {
    value: "watched",
    label: "Үзсэн",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
  },
];

export const DEFAULT_STATUS = "want";

export function getStatus(value) {
  return STATUSES.find((s) => s.value === value);
}
