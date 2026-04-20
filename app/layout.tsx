import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVX Motors — Mobilidade eléctrica de luxo",
  description:
    "Scooters e mobilidade eléctrica AVX Motors. Design minimalista, tecnologia de ponta, identidade cósmica.",
};

import ParticleBackground from "@/src/components/ui/particle-background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
