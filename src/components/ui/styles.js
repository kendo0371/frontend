// Олон газар давтагддаг Tailwind class-ууд.

export const inputClass =
  "rounded-lg border border-line bg-panel px-3 py-2 text-sm text-text placeholder:text-muted/70 outline-none transition-colors focus:border-glow/70";

export const buttonClass =
  "rounded-lg px-3 py-2 text-sm font-medium transition active:scale-95 disabled:opacity-40 disabled:active:scale-100";

// Жижиг, хүрээгүй товч (Засах, Устгах гэх мэт)
export const ghostButtonClass = `${buttonClass} text-muted hover:bg-raise hover:text-text`;

// Гол үйлдлийн товч (Нэмэх)
export const primaryButtonClass = `${buttonClass} bg-glow text-ink hover:brightness-105 disabled:bg-raise disabled:text-muted disabled:opacity-100`;
