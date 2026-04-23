"use client";

import { motion } from "framer-motion";
import { CalendarPlus, ExternalLink, MapPin } from "lucide-react";

import Container from "@/src/components/ui/container";
import { getShowroomBookingHref } from "@/src/lib/showroom-booking";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const SHOWROOM_CITY = "Curitiba";
const SHOWROOM_NAME = "Showroom AVX";
const SHOWROOM_ADDRESS_LINES = [
  "Rua Antonio Pastre, 247",
  "Curitiba, PR",
] as const;
const MAPS_QUERY = encodeURIComponent(
  "Rua Antonio Pastre, 247, Curitiba, PR",
);
const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: LUXURY_EASE } 
  }
};

export default function StoresSection() {
  return (
    <section id="lojas" className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 size-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: Showroom Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.35em] text-zinc-500 uppercase">
                  {SHOWROOM_CITY}
                </span>
                <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white">
                  {SHOWROOM_NAME}
                </h2>
              </div>
              <p className="max-w-md text-base font-medium leading-relaxed text-zinc-400">
                Modelos no showroom. Visita com hora marcada.
              </p>
              <p className="max-w-md text-xs tracking-wide text-zinc-600">
                Seg–Sex · 9h–18h
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6 border-l border-cyan-500/20 pl-8">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr flex max-w-md flex-col gap-2 rounded-xl py-1 -my-1 outline-offset-4 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400/60"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase transition-colors group-hover/addr:text-zinc-400">
                  Endereço · abre rotas no mapa
                </span>
                <span className="flex items-start gap-2 text-lg font-semibold tracking-tight text-white underline decoration-cyan-500/40 underline-offset-4 transition-colors group-hover/addr:decoration-cyan-400/80">
                  <span className="text-left">
                    {SHOWROOM_ADDRESS_LINES[0]}
                    <br />
                    {SHOWROOM_ADDRESS_LINES[1]}
                  </span>
                  <ExternalLink
                    className="size-4 shrink-0 text-cyan-400/80 opacity-80 transition-transform group-hover/addr:translate-x-0.5 group-hover/addr:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </a>

              <div>
                <a
                  href={getShowroomBookingHref("visit")}
                  className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-cyan-500/35 bg-cyan-500/10 px-10 text-[10px] font-black tracking-[0.3em] text-cyan-300 backdrop-blur-md transition-all hover:bg-cyan-500/15 sm:w-fit"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    AGENDAR VISITA
                    <CalendarPlus className="size-4 text-cyan-400 transition-transform group-hover:scale-110" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Card de Localização Bento Style */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[3rem] border border-zinc-800/50 bg-zinc-900/40 p-1 backdrop-blur-xl transition-all duration-500"
            >
              {/* Inner content area */}
              <div className="relative overflow-hidden rounded-[2.8rem] bg-zinc-950 aspect-[4/3] lg:aspect-square flex flex-col justify-end p-10">
                
                {/* Tactical SVG Map Background */}
                <div className="absolute inset-0 opacity-15 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                    <path d="M0,45 L100,55 M30,0 L70,100 M0,20 Q50,50 100,20" stroke="rgba(0,229,255,0.4)" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="rgba(0,229,255,0.1)" strokeWidth="0.2" fill="none" />
                  </svg>
                </div>

                {/* Location PIN with Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 size-12 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/30 blur-[40px] rounded-full animate-pulse" />
                    <div className="absolute inset-0 size-8 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/20 blur-[20px] rounded-full" />
                    <MapPin className="size-12 text-cyan-400 relative z-10 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />
                  </div>
                </div>

                {/* Card — endereço clicável (mesmo destino que na coluna esquerda) */}
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map relative z-10 flex flex-col gap-2 rounded-2xl text-left outline-offset-4 transition-colors hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400/60"
                >
                  <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400/90 uppercase">
                    Ver no mapa
                  </span>
                  <span className="text-3xl font-black tracking-tight leading-tight italic text-white underline decoration-cyan-500/30 underline-offset-4 transition-colors group-hover/map:decoration-cyan-400/60">
                    Rua Antonio Pastre, 247
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
                    Rotas externas
                    <ExternalLink className="size-3 text-cyan-400/70" aria-hidden />
                  </span>
                </a>

                {/* Corner Accents */}
                <div className="absolute top-8 right-8 size-4 border-t border-r border-white/20 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 size-4 border-b border-l border-white/20 rounded-bl-lg" />
              </div>

              {/* Exterior Glow Border Effect */}
              <div className="absolute inset-0 -z-10 rounded-[3rem] border border-cyan-400/0 transition-all duration-500 group-hover:border-cyan-400/20 shadow-[0_0_50px_rgba(0,229,255,0)] group-hover:shadow-[0_0_50px_rgba(0,229,255,0.05)]" />
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
