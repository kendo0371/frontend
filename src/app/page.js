import MovieTracker from "@/components/movies/MovieTracker";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Цуврал хөтлөгч</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Цувралаа нэмж, статус болон аль ангид явааг тэмдэглээрэй.
        </p>
      </header>

      <MovieTracker />
    </main>
  );
}
