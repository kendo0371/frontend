# Цуврал хөтлөгч — Frontend

`npm run dev` → http://localhost:3000 (backend `localhost:4000` дээр асаалттай байх ёстой)

## Хаана юу байгаа вэ

```
src/
├── app/                     Next.js хуудсууд
│   ├── layout.js            HTML shell, font
│   ├── page.js              Нүүр хуудас (<MovieTracker /> харуулна)
│   └── loading.js
│
├── lib/                     React-гүй цэвэр JS
│   ├── api.js               Backend руу хийх бүх fetch (profiles, movies)
│   ├── storage.js           localStorage (сонгосон profile, анги явц)
│   └── statuses.js          Статусын жагсаалт + өнгө  ← шинэ статус энд нэмнэ
│
├── hooks/                   State + логик (UI-гүй)
│   ├── useProfiles.js       Profile жагсаалт, сонгох
│   ├── useMovies.js         Цуврал татах / нэмэх / засах / устгах
│   └── useProgress.js       Аль улирал, ангид явааг хөтлөх
│
└── components/
    ├── ui/                  Дахин ашиглагдах жижиг хэсгүүд
    │   ├── styles.js        input/button-ий нийтлэг class
    │   ├── StatusBadge.js
    │   ├── StatusSelect.js
    │   └── Stepper.js       − 3 + товч
    ├── profiles/
    │   └── ProfilePicker.js
    └── movies/
        ├── MovieTracker.js  Гол хэсэг: hook-уудыг холбоод UI угсарна
        ├── AddMovieForm.js
        ├── MovieRow.js      Жагсаалтын нэг мөр
        └── EpisodeTracker.js  S01 · E03 харуулалт
```

**Data урсгал:** `lib/api.js` → `hooks/*` → `MovieTracker` → жижиг component-ууд (props-оор).

**Хаана засах вэ:**
- Backend endpoint өөрчлөгдвөл → `lib/api.js`
- Шинэ статус / өнгө → `lib/statuses.js`
- Нэг мөрний харагдах байдал → `components/movies/MovieRow.js`
- Товч, input-ийн загвар → `components/ui/styles.js`

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
