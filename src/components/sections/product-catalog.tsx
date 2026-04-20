"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, Zap, Clock, ArrowUpRight } from "lucide-react";

import Container from "@/src/components/ui/container";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const categories = [
  { id: "avx-10", label: "AVX-10" },
  { id: "avx-5", label: "AVX-5" },
  { id: "kids", label: "Kids Scooter" },
  { id: "station", label: "Power Station" },
];

const products = [
  {
    id: "avx-10",
    name: "MODEL AVX-10",
    type: "Electric Scooter",
    price: "R$ 8.990",
    autonomy: "45km",
    speed: "45km/h",
    image: "/images/products/avx-10-white.png",
    transform: "scale-100",
  },
  {
    id: "avx-5",
    name: "MODEL AVX-5",
    type: "Street Mobility",
    price: "R$ 5.490",
    autonomy: "30km",
    speed: "25km/h",
    image: "/images/products/avx-10-white.png",
    transform: "scale-90 rotate-[5deg]",
  },
  {
    id: "kids",
    name: "KIDS SCOOTER",
    type: "Safe & Fun",
    price: "R$ 2.890",
    autonomy: "15km",
    speed: "12km/h",
    image: "/images/products/avx-10-white.png",
    transform: "scale-75 -rotate-3",
  },
  {
    id: "station",
    name: "POWER STATION",
    type: "Energy Center",
    price: "---",
    autonomy: "700Wh",
    speed: "110/220V",
    image: "/images/products/avx-10-white.png",
    transform: "scale-110 grayscale brightness-50 opacity-20",
    isComingSoon: true,
  },
];

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("avx-10");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="modelos" className="relative py-24 lg:py-32 overflow-hidden bg-black">
      {/* Category Navigation (Showcase Header) */}
      <div className="sticky top-20 z-40 mb-20 bg-black/80 backdrop-blur-md border-b border-white/5">
        <Container>
          <nav className="flex items-center justify-center gap-12 overflow-x-auto py-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative flex flex-col items-center gap-3 whitespace-nowrap transition-colors ${
                  activeCategory === cat.id ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {/* Silhouette placeholder */}
                <div className="relative size-12 opacity-40 transition-opacity group-hover:opacity-100">
                   <div className={`relative w-full h-full grayscale invert ${activeCategory === cat.id ? 'brightness-125' : 'brightness-50'}`}>
                      <Image 
                        src="/images/products/avx-10-white.png" 
                        alt="" 
                        fill 
                        className="object-contain scale-75" 
                      />
                   </div>
                </div>
                
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                  {cat.label}
                </span>

                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute -bottom-8 left-0 right-0 h-0.5 bg-cyan-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </Container>
      </div>

      <Container>
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.5em] text-cyan-500 uppercase mb-4 block">
            E-MOBILITY SOLUTIONS
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">
            MODELOS DE ALTA PERFORMANCE
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  opacity: hoveredId && hoveredId !== product.id ? 0.4 : 1,
                  scale: hoveredId === product.id ? 1.02 : 1,
                }}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-zinc-950/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30"
              >
                {/* Radial energy glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

                <div className="relative aspect-square mb-8">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain transition-transform duration-700 ${product.transform} group-hover:scale-110`}
                  />
                  
                  {product.isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="rounded-full bg-cyan-500/10 px-6 py-2 text-[10px] font-black tracking-[0.4em] text-cyan-400 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                         EM BREVE
                       </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    {product.type}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic text-zinc-100">{product.name}</h3>
                    <span className="text-sm font-bold text-cyan-400">{product.price}</span>
                  </div>

                  {/* Technical Specs row */}
                  <div className="mt-4 flex items-center gap-6 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <Battery className="size-3 text-cyan-400" />
                      <span className="text-[10px] font-medium text-zinc-400">{product.autonomy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Zap className="size-3 text-cyan-400" />
                       <span className="text-[10px] font-medium text-zinc-400">{product.speed}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`#${product.id}`}
                      className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-white transition-all hover:text-cyan-400"
                    >
                      SAIBA MAIS
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
