import MovieTracker from "@/components/movies/MovieTracker";

export const instant = false;

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-14 pb-24 sm:pt-20">
      <header className="mb-10">
        <h1 className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
          Цуврал хөтлөгч
        </h1>
        <p className="mt-3 max-w-md text-muted">
          Юу үзэж байгаа, хаана хүрснээ, дараа нь юу үзэхээ нэг дор.
        </p>
      </header>

      <MovieTracker />
    </main>
  );
}
