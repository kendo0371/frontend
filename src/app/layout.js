import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, Show, UserButton, SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Цуврал хөтлөгч",
  description: "Үзсэн, үзэж байгаа, үзэх цувралаа хөтлөх",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="mn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Suspense>
            <Show when="signed-out">
              <div className="w-full h-screen flex justify-center items-center">
                <SignIn routing="hash" />
              </div>
            </Show>

            <Show when="signed-in">
              <header className="flex justify-end items-center p-4 gap-4 h-16">
                <UserButton />
              </header>

              {children}
            </Show>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
