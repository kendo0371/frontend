// Backend руу хийх бүх хүсэлт энд.
// /api/* нь next.config.mjs-ийн rewrite-аар localhost:4000 руу очно.

async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Алдаа: ${res.status}`);
  return res.json();
}

// ---- Profiles ----

export async function listProfiles() {
  const { result } = await request("/api/profiles");
  return result;
}

// ---- Movies ----

const MOVIES = "/api/movies";

export async function listMovies(profileId) {
  const url = profileId ? `${MOVIES}?profileId=${profileId}` : MOVIES;
  const { result } = await request(url);
  return [...result].sort((a, b) => b.id - a.id); // шинэ нь дээрээ
}

export function createMovie({ title, status, profileId }) {
  return request(MOVIES, {
    method: "POST",
    body: JSON.stringify({ title, status, profileId }),
  });
}

export function updateMovie(id, { title, status }) {
  return request(`${MOVIES}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, status }),
  });
}

export function deleteMovie(id) {
  return request(`${MOVIES}/${id}`, { method: "DELETE" });
}
