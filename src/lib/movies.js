// Backend (/movies) руу хандана. /api нь next.config-ийн rewrite-аар localhost:4000 руу очно.
const BASE = "/api/movies";

async function req(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Алдаа: ${res.status}`);
  return res.json();
}

export async function listProfiles() {
  const { result } = await req("/api/profiles");
  return result;
}

export async function listMovies(profileId) {
  const url = profileId ? `${BASE}?profileId=${profileId}` : BASE;
  const { result } = await req(url);
  return [...result].sort((a, b) => b.id - a.id);
}

export const createMovie = ({ title, status, profileId }) =>
  req(BASE, {
    method: "POST",
    body: JSON.stringify({ title, status, profileId }),
  });

export const updateMovie = (id, { title, status }) =>
  req(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, status }),
  });

export const deleteMovie = (id) => req(`${BASE}/${id}`, { method: "DELETE" });

const PROFILE_KEY = "tv-profile:v1";

export function loadProfileId() {
  try {
    return Number(localStorage.getItem(PROFILE_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveProfileId(id) {
  try {
    localStorage.setItem(PROFILE_KEY, String(id));
  } catch {}
}

const PROGRESS_KEY = "tv-progress:v1";

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function saveProgress(all) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}
