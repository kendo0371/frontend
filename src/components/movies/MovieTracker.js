"use client";

import { useMovies } from "@/hooks/useMovies";
import { useProfiles } from "@/hooks/useProfiles";
import { useProgress } from "@/hooks/useProgress";
import ProfilePicker from "@/components/profiles/ProfilePicker";
import AddMovieForm from "./AddMovieForm";
import MovieRow from "./MovieRow";

// Нүүр хуудасны гол хэсэг: hook-уудаас data аваад UI-д дамжуулна.
export default function MovieTracker() {
  const { profiles, profileId, selectProfile, error: profileError } = useProfiles();
  const { movies, error: moviesError, addMovie, updateMovie, deleteMovie } =
    useMovies(profileId);
  const { getEpisode, setEpisode } = useProgress();

  const error = profileError || moviesError;
  const list = profileError ? [] : movies; // backend унтарсан бол хоосон харуулна

  async function handleDelete(movie) {
    if (!confirm(`"${movie.title}"-г устгах уу?`)) return;
    if (await deleteMovie(movie.id)) setEpisode(movie.id, null);
  }

  return (
    <>
      <ProfilePicker profiles={profiles} value={profileId} onChange={selectProfile} />

      <AddMovieForm onAdd={addMovie} />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {list === null ?
        <p className="text-sm text-zinc-500">Ачаалж байна...</p>
      : list.length === 0 ?
        <p className="rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
          Одоогоор цуврал алга. Дээрээс нэмээрэй.
        </p>
      : <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {list.map((m) => (
            <MovieRow
              key={m.id}
              movie={m}
              ep={getEpisode(m.id)}
              onEpChange={(next) => setEpisode(m.id, next)}
              onUpdate={(changes) => updateMovie(m.id, changes)}
              onDelete={() => handleDelete(m)}
            />
          ))}
        </ul>
      }
    </>
  );
}
