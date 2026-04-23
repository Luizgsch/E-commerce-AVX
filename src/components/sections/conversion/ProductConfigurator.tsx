"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { publicPath } from "@/src/lib/public-path";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export type ProductColorId = "white" | "black" | "gray";

const SWATCHES: { id: ProductColorId; label: string; className: string }[] = [
  { id: "white", label: "Cor branca", className: "bg-white" },
  { id: "black", label: "Cor preta", className: "bg-zinc-900 ring-1 ring-zinc-600" },
  { id: "gray", label: "Cinza metalizado", className: "bg-zinc-500" },
];

/** Filtros para simular materiais; branco ganha reflexo premium via drop-shadow ciano. */
function filterFor(color: ProductColorId): string {
  switch (color) {
    case "white":
      return "drop-shadow(0 0 20px rgba(0, 229, 255, 0.1))";
    case "black":
      return "grayscale(1) contrast(1.1) brightness(0.7)";
    case "gray":
      return "saturate(0.5) brightness(0.9) contrast(1.08)";
  }
}

type ProductConfiguratorProps = {
  color: ProductColorId;
  onColorChange: (id: ProductColorId) => void;
};

export default function ProductConfigurator({
  color,
  onColorChange,
}: ProductConfiguratorProps) {
  const reduce = useReducedMotion();
  const duration = reduce ? 0 : 0.55;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/40">
        <motion.div
          className="relative h-full w-full"
          animate={{ filter: filterFor(color) }}
          transition={{ duration, ease: LUXURY_EASE }}
        >
          <Image
            src={publicPath("/images/products/avx-10-white.png")}
            alt="Scooter elétrica AVX-10 em vista de produto"
            fill
            className="object-contain p-4"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
          />
        </motion.div>
      </div>

      <div
        className="flex items-center justify-center gap-4"
        role="radiogroup"
        aria-label="Acabamento da pintura"
      >
        {SWATCHES.map(({ id, label, className }) => {
          const selected = color === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={label}
              onClick={() => onColorChange(id)}
              className={`relative flex size-11 items-center justify-center rounded-full transition-[box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${className} ${
                selected
                  ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black scale-105"
                  : "ring-1 ring-zinc-700 hover:ring-zinc-500"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
