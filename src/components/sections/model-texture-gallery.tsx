"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import Container from "@/src/components/ui/container";
import { getDetailShotsForModel } from "@/src/lib/model-detail-shots";

import { useProductSelection } from "./product-selection-context";

const MAX_PARALLAX = 50;
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

function ParallaxCard({
  src,
  alt,
  offset,
  scrollYProgress,
}: {
  src: string;
  alt: string;
  offset: number;
  scrollYProgress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const clamped =
    offset > 0
      ? Math.min(offset, MAX_PARALLAX)
      : Math.max(offset, -MAX_PARALLAX);

  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : clamped]);

  return (
    <motion.div
      style={{ y }}
      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900 sm:aspect-[3/4]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, 90vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}

export default function ModelTextureGallery() {
  const { selectedModel } = useProductSelection();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shots = getDetailShotsForModel(selectedModel);

  return (
    <section
      ref={ref}
      id="texturas"
      className="border-t border-white/[0.04] bg-black py-28 lg:py-40"
      aria-label="Detalhes visuais do modelo selecionado"
    >
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModel}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
            className="grid gap-5 sm:grid-cols-3 sm:gap-6"
          >
            {shots.map((shot) => (
              <ParallaxCard
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                offset={reduce ? 0 : shot.offset}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
