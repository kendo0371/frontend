import { buttonClass } from "@/components/ui/styles";

export default function ProfilePicker({ profiles, value, onChange }) {
  if (!profiles.length) return null;
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`${buttonClass} rounded-full border ${
            p.id === value ?
              "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
            : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}>
          {p.displayname}
        </button>
      ))}
    </div>
  );
}
