// Backend руу хийх бүх хүсэлт энд.
// /api/* нь next.config.mjs-ийн rewrite-аар BACKEND_URL руу очно.

async function request(url, token, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
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
// token нь Clerk-ийн getToken()-оос ирнэ. Backend үүгээр хэрэглэгчийг танина.

const MOVIES = "/api/movies";

export async function listMovies(token, profileId) {
  const { result } = await request(`${MOVIES}?profileId=${profileId}`, token);
  return [...result].sort((a, b) => b.id - a.id); // шинэ нь дээрээ
}

export function createMovie(token, { title, status, profileId }) {
  return request(MOVIES, token, {
    method: "POST",
    body: JSON.stringify({ title, status, profileId }),
  });
}

export function updateMovie(token, id, { title, status }) {
  return request(`${MOVIES}/${id}`, token, {
    method: "PUT",
    body: JSON.stringify({ title, status }),
  });
}

export function deleteMovie(token, id) {
  return request(`${MOVIES}/${id}`, token, { method: "DELETE" });
}
