// Browser-ийн localStorage-д хадгалдаг зүйлс (зөвхөн энэ төхөөрөмж дээр).

const PROFILE_KEY = "tv-profile:v1";
const PROGRESS_KEY = "tv-progress:v1";

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

// Сүүлд сонгосон profile
export function loadProfileId() {
  return Number(read(PROFILE_KEY)) || null;
}

export function saveProfileId(id) {
  write(PROFILE_KEY, String(id));
}

// Цуврал бүрийн аль улирал/ангид явааг: { [movieId]: { s, e } }
export function loadProgress() {
  try {
    return JSON.parse(read(PROGRESS_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function saveProgress(all) {
  write(PROGRESS_KEY, JSON.stringify(all));
}
