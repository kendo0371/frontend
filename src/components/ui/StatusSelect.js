import { STATUSES } from "@/lib/statuses";
import { inputClass } from "./styles";

export default function StatusSelect({ value, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Статус"
      className={`${inputClass} cursor-pointer ${className}`}>
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
