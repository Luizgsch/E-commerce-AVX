"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Volume2 } from "lucide-react";

import Container from "@/src/components/ui/container";

const VIDEO_SRC = process.env.NEXT_PUBLIC_LIFESTYLE_HERO_VIDEO ?? "";

/** Poster cinematográfico escuro (substituível por asset em /public). */
const POSTER_SRC =
  "https://images.unsplash.com/photo-1558981806-ec527fa8429d?w=1920&q=80&auto=format&fit=crop";

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function useFuturisticHum(active: boolean) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || reduce) return;

    const AC =
      window.AudioContext ||
      (
        window as unknown as {
          webkitAudioContext: typeof AudioContext;
        }
      ).webkitAudioContext;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = 58;
    osc2.type = "sine";
    osc2.frequency.value = 118;
    filter.type = "lowpass";
    filter.frequency.value = 240;
    gain.gain.value = 0.011;

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    void ctx.resume();
    osc.start();
    osc2.start();

    return () => {
      osc.stop();
      osc2.stop();
      void ctx.close();
    };
  }, [active, reduce]);
}

export default function LifestyleHero() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, margin: "0px 0px -10% 0px" });
  const showVideo = inView && Boolean(VIDEO_SRC);
  const [soundOn, setSoundOn] = useState(false);

  useFuturisticHum(soundOn && !reduce);

  const syncVideoMute = useCallback(
    (next: boolean) => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = !next;
      if (next) void el.play().catch(() => {});
    },
    [],
  );

  useEffect(() => {
    syncVideoMute(soundOn);
  }, [soundOn, syncVideoMute, showVideo]);

  const toggleSound = () => {
    setSoundOn((v) => !v);
  };

  return (
    <section
      ref={rootRef}
      className="group/video relative bg-black"
      aria-labelledby="lifestyle-hero-heading"
    >
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
        <div className="relative min-h-[min(88vh,820px)] w-full">
          <div className="absolute inset-0">
            <Image
              src={POSTER_SRC}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>

          {showVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              preload="none"
              loop
              muted={!soundOn}
              playsInline
              autoPlay={!reduce && showVideo}
              aria-hidden
            />
          ) : null}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{ backgroundImage: NOISE_SVG }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"
            aria-hidden
          />

          <Container className="relative z-10 flex min-h-[min(88vh,820px)] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-20 md:pt-40">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="text-[9px] font-medium tracking-[0.42em] text-zinc-600 uppercase">
                Lifestyle
              </span>
              <h2
                id="lifestyle-hero-heading"
                className="mt-6 text-4xl font-black tracking-widest text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                SILÊNCIO QUE IMPULSIONA
              </h2>
            </motion.div>
          </Container>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="absolute right-4 bottom-20 z-20 flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-opacity duration-300 hover:bg-black/70 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-500/50 max-md:opacity-90 md:bottom-8 md:opacity-0 md:group-hover/video:opacity-100"
            aria-pressed={soundOn}
            aria-label={soundOn ? "Desativar som ambiente" : "Ativar som ambiente"}
          >
            <Volume2
              className={`size-4 ${soundOn ? "text-cyan-400" : "text-zinc-200"} ${soundOn ? "" : "animate-pulse"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
