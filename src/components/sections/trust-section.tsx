"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRESS_LABELS = [
  "TechCrunch",
  "Quatro Rodas",
  "Wired",
  "The Verge",
  "Mobility Lab",
] as const;

export default function TrustSection() {
  const reduceMotion = useReducedMotion();
  const sequence = useMemo(() => [...PRESS_LABELS, ...PRESS_LABELS], []);

  return (
    <div
      className="border-y border-white/[0.03] bg-black py-5 opacity-30"
      aria-label="Menções na imprensa"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent" />

        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4">
            {PRESS_LABELS.map((label) => (
              <span
                key={label}
                className="text-[8px] font-medium tracking-[0.42em] text-zinc-500 uppercase"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max gap-16 md:gap-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 56,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {sequence.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="shrink-0 text-[8px] font-medium tracking-[0.42em] text-zinc-500 uppercase"
              >
                {label}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
