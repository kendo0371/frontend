"use client";

import { useState } from "react";
import { loadProgress, saveProgress } from "@/lib/storage";

const FIRST_EPISODE = { s: 1, e: 1 };

// Цуврал бүрийн аль улирал (s), ангид (e) явааг localStorage-д хөтөлнө.
export function useProgress() {
  // Server дээр localStorage байхгүй тул loadProgress() нь {} буцаана.
  const [progress, setProgress] = useState(loadProgress);

  function getEpisode(movieId) {
    return progress[movieId] ?? FIRST_EPISODE;
  }

  // next = null бол тухайн цувралын явцыг устгана.
  function setEpisode(movieId, next) {
    setProgress((all) => {
      const updated = { ...all, [movieId]: next };
      if (!next) delete updated[movieId];
      saveProgress(updated);
      return updated;
    });
  }

  return { getEpisode, setEpisode };
}
