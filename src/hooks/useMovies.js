"use client";

import { useEffect, useState } from "react";
import * as api from "@/lib/api";

// Сонгосон profile-ийн цувралууд + нэмэх/засах/устгах.
// movies === null бол ачаалж байна гэсэн үг.
export function useMovies(profileId) {
  // Жагсаалтыг аль profile-ийнх болохтой нь хамт хадгална,
  // ингэснээр profile солиход хуучин жагсаалт харагдахгүй.
  const [data, setData] = useState({ profileId: null, list: null });
  const [error, setError] = useState("");
  const movies = data.profileId === profileId ? data.list : null;

  useEffect(() => {
    if (!profileId) return;
    let cancelled = false;
    api.listMovies(profileId).then(
      (list) => !cancelled && setData({ profileId, list }),
      () => !cancelled && setData({ profileId, list: [] }),
    );
    return () => {
      cancelled = true;
    };
  }, [profileId]);

  async function refresh() {
    try {
      setData({ profileId, list: await api.listMovies(profileId) });
      setError("");
    } catch {
      setData((d) => (d.profileId === profileId ? d : { profileId, list: [] }));
    }
  }

  // Үйлдэл хийгээд жагсаалтаа шинэчилнэ. Амжилттай бол true буцаана.
  async function run(action) {
    try {
      await action();
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
    addMovie: (movie) => run(() => api.createMovie({ ...movie, profileId })),
    updateMovie: (id, changes) => run(() => api.updateMovie(id, changes)),
    deleteMovie: (id) => run(() => api.deleteMovie(id)),
  };
}
