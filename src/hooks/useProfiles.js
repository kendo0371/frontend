"use client";

import { useEffect, useState } from "react";
import { listProfiles } from "@/lib/api";
import { loadProfileId, saveProfileId } from "@/lib/storage";

// Profile-уудын жагсаалт + аль нь сонгогдсоныг хариуцна.
export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listProfiles().then(
      (list) => {
        setProfiles(list);
        const saved = loadProfileId();
        setProfileId(list.some((p) => p.id === saved) ? saved : list[0]?.id);
      },
      () => setError("Backend-тэй холбогдож чадсангүй"),
    );
  }, []);

  function selectProfile(id) {
    if (id === profileId) return;
    setProfileId(id);
    saveProfileId(id);
  }

  return { profiles, profileId, selectProfile, error };
}
