// Цувралын статусууд. Энэ дарааллаар табууд харагдана.
// Шинэ статус нэмэх бол зөвхөн энд нэмнэ.

export const STATUSES = [
  {
    value: "watching",
    label: "Үзэж байгаа",
    empty: "Одоо үзэж байгаа цуврал алга. Статусыг нь \"Үзэж байгаа\" болговол энд гарч, ангиа хөтөлж болно.",
    text: "text-glow",
    dot: "bg-glow",
  },
  {
    value: "want",
    label: "Үзэх",
    empty: "Дараа үзэх цуврал алга. Дээрх талбараас нэмээрэй.",
    text: "text-want",
    dot: "bg-want",
  },
  {
    value: "watched",
    label: "Үзсэн",
    empty: "Үзэж дуусгасан цуврал одоохондоо алга.",
    text: "text-done",
    dot: "bg-done",
  },
];

export const DEFAULT_STATUS = "want";

export function getStatus(value) {
  return STATUSES.find((s) => s.value === value);
}
