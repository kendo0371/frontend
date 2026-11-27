"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import * as api from "@/lib/api";

// Нэвтэрсэн хэрэглэгчийн сонгосон profile-ийн цувралууд + нэмэх/засах/устгах.
// movies === null бол ачаалж байна гэсэн үг.
export function useMovies(profileId) {
  const { getToken, userId } = useAuth();
  // Жагсаалтыг аль хэрэглэгч/profile-ийнх болохтой нь хамт хадгална,
  // ингэснээр account эсвэл profile солиход хуучин жагсаалт харагдахгүй.
  const key = `${userId}:${profileId}`;
  const [data, setData] = useState({ key: null, list: null });
  const [error, setError] = useState("");
  const movies = data.key === key ? data.list : null;

  useEffect(() => {
    if (!userId || !profileId) return;
    let cancelled = false;
    getToken()
      .then((t) => api.listMovies(t, profileId))
      .then(
        (list) => !cancelled && setData({ key, list }),
        () => !cancelled && setData({ key, list: [] }),
      );
    return () => {
      cancelled = true;
    };
  }, [key, userId, profileId, getToken]);

  async function refresh() {
    try {
      setData({ key, list: await api.listMovies(await getToken(), profileId) });
      setError("");
    } catch {
      setData((d) => (d.key === key ? d : { key, list: [] }));
    }
  }

  // Token авч үйлдлээ хийгээд жагсаалтаа шинэчилнэ. Амжилттай бол true буцаана.
  async function run(action) {
    try {
      await action(await getToken());
      await refresh();
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  return {
    movies,
    error,
    addMovie: (movie) => run((t) => api.createMovie(t, { ...movie, profileId })),
    updateMovie: (id, changes) => run((t) => api.updateMovie(t, id, changes)),
    deleteMovie: (id) => run((t) => api.deleteMovie(t, id)),
  };
}
