import { getStatus } from "@/lib/statuses";

export default function StatusBadge({ status }) {
  const s = getStatus(status);
  if (!s) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${s.badge}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
