"use client";

import AppShowcase from "./app-showcase";
import LifestyleHero from "./lifestyle-hero";

export default function LifestyleExperience() {
  return (
    <section
      id="lifestyle-experience"
      className="bg-black text-white"
      aria-label="Lifestyle e experiência AVX"
    >
      <LifestyleHero />
      <AppShowcase />
    </section>
  );
}
