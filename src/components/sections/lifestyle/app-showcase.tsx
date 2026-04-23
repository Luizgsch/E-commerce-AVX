"use client";

import { motion, useReducedMotion } from "framer-motion";

import Container from "@/src/components/ui/container";

import AppCockpitUI from "./app-cockpit-ui";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

function CssDeviceFrame() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative w-full max-w-[200px] sm:max-w-[220px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative origin-center"
        initial={false}
        whileInView={
          reduce ? undefined : { rotateY: -12, rotateX: 5, z: 0 }
        }
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 95, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
          transform: reduce ? "rotateY(-6deg) rotateX(3deg)" : undefined,
        }}
      >
        <div className="rounded-[2.5rem] border-[3px] border-zinc-800/90 bg-zinc-900 p-1.5 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-black ring-1 ring-white/[0.04]">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10" />
            <div className="relative aspect-[9/19.5] min-h-[320px]">
              <div className="absolute inset-0 pt-8">
                <AppCockpitUI />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute -bottom-4 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-[100%] bg-cyan-500/[0.06] blur-lg"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}

export default function AppShowcase() {
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-white/[0.04] py-12 lg:py-16">
      <Container>
        <div className="flex flex-col items-end gap-6 md:flex-row md:items-center md:justify-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="max-w-[14rem] text-right text-[9px] font-medium tracking-[0.38em] text-zinc-600 uppercase"
          >
            App AVX
          </motion.p>
          <CssDeviceFrame />
        </div>
      </Container>
    </div>
  );
}
