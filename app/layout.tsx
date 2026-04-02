import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Gulzar, Manrope } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

const gulzar = Gulzar({
  subsets: ["arabic", "latin"],
  weight: ["400"],
  variable: "--font-nastaliq",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dua Presenter",
  description: "A full-screen dua presentation app for congregational recitation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${amiri.variable} ${cormorant.variable} ${manrope.variable} ${gulzar.variable}`}>
      <body className="font-[family-name:var(--font-sans)]">{children}</body>
    </html>
  );
}
