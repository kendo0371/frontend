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

export async function listMovies(token) {
  const { result } = await request(MOVIES, token);
  return [...result].sort((a, b) => b.id - a.id); // шинэ нь дээрээ
}

export function createMovie(token, { title, status }) {
  return request(MOVIES, token, {
    method: "POST",
    body: JSON.stringify({ title, status }),
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
