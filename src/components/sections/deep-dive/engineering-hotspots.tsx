"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { publicPath } from "@/src/lib/public-path";
import {
  getModelDisplayLabel,
  getModelHeroImagePath,
} from "@/src/lib/model-detail-shots";

import { useProductSelection } from "../product-selection-context";

const HOTSPOTS = [
  {
    id: "motor",
    label: "Motor Hub",
    body: "3000W, torque instantâneo.",
    xPct: 68,
    yPct: 52,
  },
  {
    id: "bateria",
    label: "Bateria",
    body: "Alta densidade energética.",
    xPct: 44,
    yPct: 46,
  },
  {
    id: "freios",
    label: "Freios",
    body: "Regenerativo com ABS.",
    xPct: 26,
    yPct: 50,
  },
] as const;

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

function RadialGlowBehind() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute aspect-[4/3] w-[min(96%,640px)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.1)_0%,rgba(0,229,255,0.03)_38%,transparent_72%)] blur-2xl" />
      <div className="absolute aspect-square w-[min(78%,480px)] rounded-full bg-[radial-gradient(circle_at_50%_55%,rgba(0,229,255,0.07),transparent_62%)]" />
    </div>
  );
}

function HotspotDot({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      className="relative flex size-8 shrink-0 items-center justify-center sm:size-9"
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <span
        className="absolute inline-flex size-6 rounded-full bg-cyan-400/20 opacity-80 animate-ping sm:size-7"
        aria-hidden
      />
      <span
        className={`absolute size-5 rounded-full border border-cyan-400/35 bg-cyan-500/10 sm:size-6 ${
          active ? "ring-2 ring-cyan-400/45" : ""
        }`}
        aria-hidden
      />
      <span className="relative size-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.65)] ring-2 ring-cyan-200/35 sm:size-2.5" />
    </motion.span>
  );
}

export default function EngineeringHotspots() {
  const { selectedModel } = useProductSelection();
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const reduceMotion = useReducedMotion();

  const relPath = getModelHeroImagePath(selectedModel);
  const imageSrc = publicPath(relPath);
  const imageAlt = `${getModelDisplayLabel(selectedModel)} — vista lateral`;

  return (
    <div
      className="relative mx-auto w-full max-w-3xl lg:max-w-4xl"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <RadialGlowBehind />

      <div className="relative z-[2] aspect-[4/3] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain object-center drop-shadow-[0_0_48px_rgba(0,229,255,0.05)]"
              sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-[21]">
          {HOTSPOTS.map((h) => {
            const active = openId === h.id;
            return (
              <div
                key={h.id}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.xPct}%`, top: `${h.yPct}%` }}
              >
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center rounded-full border-0 bg-transparent p-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-expanded={active}
                  aria-controls={`hotspot-card-${h.id}`}
                  onClick={() => setOpenId(active ? null : h.id)}
                >
                  <HotspotDot active={active} reduceMotion={reduceMotion} />
                  <span className="sr-only">{h.label}</span>
                </button>
                <AnimatePresence>
                  {active ? (
                    <motion.div
                      id={`hotspot-card-${h.id}`}
                      role="tooltip"
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: LUXURY_EASE }}
                      className="absolute left-1/2 top-full z-[22] mt-2 w-[min(240px,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-white/[0.08] bg-zinc-950/95 px-3 py-2 text-left shadow-lg backdrop-blur-md"
                    >
                      <p className="text-[9px] font-medium tracking-[0.28em] text-cyan-400/85 uppercase">
                        {h.label}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-zinc-400">
                        {h.body}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
