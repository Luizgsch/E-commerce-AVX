"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import Container from "@/src/components/ui/container";
import { publicPath } from "@/src/lib/public-path";

/** Easing luxo — valor fixo solicitado */
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroMotion() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  const easeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.85, ease: LUXURY_EASE };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
          staggerChildren: 0.14,
          delayChildren: 0.1,
        },
    },
  };

  const itemVariants = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: easeTransition,
    },
  };

  const imageVariants = {
    hidden: reduceMotion
      ? { opacity: 1, scale: 0.95, x: 20 }
      : { opacity: 0, scale: 0.95, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { ...easeTransition, duration: 1.2 },
    },
  };

  return (
    <motion.section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden pt-32 pb-12 lg:pt-48"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Space Effect */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,20,40,0.4)_0%,rgba(0,0,0,0)_100%)]" />
        {/* Diagonal Stripe (Cinematic) */}
        <div
          className="absolute -right-[10%] top-[-20%] h-[140%] w-[55%] rotate-[22deg] bg-gradient-to-b from-cyan-500/15 via-cyan-500/5 to-transparent"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
        />
      </div>

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-[0.5em] text-zinc-500/80">
              MODEL AVX-10
            </span>
            <h1 className="flex flex-col text-[3.25rem] font-black leading-[1.05] tracking-[0.02em] text-white sm:text-[4.5rem] lg:text-[4.6rem]">
              <span>REDEFININDO</span>
              <span>A MOBILIDADE</span>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>URBANA.</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <button className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-cyan-500/40 bg-black/20 px-12 text-[10px] font-black tracking-[0.3em] text-cyan-400 backdrop-blur-md transition-all hover:bg-cyan-500/10 sm:w-fit">
              <span className="relative z-10">ORDER NOW</span>
              <div className="absolute inset-0 -z-10 bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 -z-10 rounded-full border border-cyan-400/20 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all" />
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={imageVariants}
          className="relative flex justify-center lg:col-span-6 lg:justify-end"
        >
          {/* Cosmic Glow behind scooter */}
          <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/15 blur-[120px] pointer-events-none" />

          <div className="relative aspect-square w-full max-w-2xl scale-125 lg:translate-x-16 lg:-translate-y-8">
            {/* Contact Shadow under wheels */}
            <div className="absolute bottom-[10%] left-[20%] right-[10%] h-8 bg-black/60 blur-2xl rounded-[100%] rotate-[-4deg] pointer-events-none" />

            <Image
              src={publicPath("/images/products/avx-10-white.png")}
              alt="Scooter AVX-10 Branca"
              fill
              priority
              className="object-contain relative z-10"
            />
            {/* Focal Highlight on Headlight */}
            <div className="absolute top-[18.2%] left-[23.6%] z-20 size-6 rounded-full bg-cyan-400/40 blur-md shadow-[0_0_30px_#00e5ff]" />
            <div className="absolute top-[19%] left-[24.5%] z-20 size-2.5 rounded-full bg-white shadow-[0_0_15px_#fff]" />
          </div>
        </motion.div>
      </Container>
    </motion.section>
  );
}
