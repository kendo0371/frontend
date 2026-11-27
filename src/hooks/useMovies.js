"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import * as api from "@/lib/api";

// Нэвтэрсэн хэрэглэгчийн цувралууд + нэмэх/засах/устгах.
// movies === null бол ачаалж байна гэсэн үг.
export function useMovies() {
  const { getToken, userId } = useAuth();
  // Жагсаалтыг аль хэрэглэгчийнх болохтой нь хамт хадгална,
  // ингэснээр account солиход хуучин жагсаалт харагдахгүй.
  const [data, setData] = useState({ userId: null, list: null });
  const [error, setError] = useState("");
  const movies = data.userId === userId ? data.list : null;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    getToken()
      .then(api.listMovies)
      .then(
        (list) => !cancelled && setData({ userId, list }),
        () => !cancelled && setData({ userId, list: [] }),
      );
    return () => {
      cancelled = true;
    };
  }, [userId, getToken]);

  async function refresh() {
    try {
      setData({ userId, list: await api.listMovies(await getToken()) });
      setError("");
    } catch {
      setData((d) => (d.userId === userId ? d : { userId, list: [] }));
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
    addMovie: (movie) => run((t) => api.createMovie(t, movie)),
    updateMovie: (id, changes) => run((t) => api.updateMovie(t, id, changes)),
    deleteMovie: (id) => run((t) => api.deleteMovie(t, id)),
  };
}
