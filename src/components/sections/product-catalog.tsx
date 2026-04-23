"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Battery, Zap, ArrowUpRight } from "lucide-react";

import Container from "@/src/components/ui/container";
import { publicPath } from "@/src/lib/public-path";
import { getHighlightsForCategory } from "@/src/lib/catalog-highlights";
import { PRODUCT_MODEL_OPTIONS } from "@/src/lib/product-models";

import { useProductSelection } from "./product-selection-context";

export default function ProductCatalog() {
  const { selectedModel, setSelectedModel } = useProductSelection();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const highlights = getHighlightsForCategory(selectedModel);

  useEffect(() => {
    setHoveredId(null);
  }, [selectedModel]);

  return (
    <section id="modelos" className="relative overflow-hidden bg-black py-32 lg:py-40">
      {/* Category Navigation (Showcase Header) */}
      <div className="sticky top-20 z-40 border-b border-zinc-800/80 bg-black/85 backdrop-blur-xl">
        <Container className="py-9 md:py-12">
          <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.35em] text-zinc-500 md:mb-9 md:text-sm">
            Escolha uma opção
          </p>
          <nav
            className="mx-auto flex max-w-5xl flex-wrap items-stretch justify-center gap-3 sm:gap-4 md:gap-5"
            aria-label="Categorias de produtos"
          >
            {PRODUCT_MODEL_OPTIONS.map((cat) => {
              const isActive = selectedModel === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedModel(cat.value)}
                  className={`group relative flex aspect-square w-[calc(50%-0.375rem)] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border p-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 ${
                    isActive
                      ? "border-cyan-500/45 bg-zinc-950/70 text-cyan-400 shadow-[0_0_32px_-10px_rgba(0,229,255,0.35)]"
                      : "border-zinc-800/90 bg-zinc-950/50 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900/40 hover:text-zinc-300"
                  } backdrop-blur-xl`}
                >
                  <div
                    className={`relative size-16 shrink-0 transition-[opacity,transform] sm:size-[4.25rem] md:size-[4.5rem] ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-80 scale-[0.97] group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    <Image
                      src={publicPath(cat.thumb)}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 45vw, 176px"
                      className="object-contain object-bottom drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
                    />
                  </div>

                  <span className="text-center text-[9px] font-bold uppercase leading-tight tracking-[0.2em] sm:text-[10px] sm:tracking-[0.28em]">
                    {cat.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-cyan-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </Container>
      </div>

      <Container className="border-t border-white/[0.03] pt-10 md:pt-14">
        <motion.div
          key={selectedModel}
          role="tabpanel"
          aria-label={`Destaques: ${PRODUCT_MODEL_OPTIONS.find((o) => o.value === selectedModel)?.label ?? ""}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3"
        >
          {highlights.map((product) => {
              const isFeatured = "featured" in product && product.featured === true;
              const cta = product.cta;
              return (
              <motion.div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  opacity: hoveredId && hoveredId !== product.id ? 0.42 : 1,
                  scale: hoveredId === product.id ? 1.02 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-3xl bg-zinc-950/50 p-6 backdrop-blur-xl transition-all duration-500 ${
                  isFeatured
                    ? "border border-cyan-500/35 ring-1 ring-cyan-500/15 hover:border-cyan-400/45"
                    : "border border-zinc-800/50 hover:border-cyan-500/25"
                }`}
              >
                <div
                  className={`pointer-events-none absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px] transition-opacity ${
                    isFeatured ? "opacity-45 group-hover:opacity-70" : "opacity-0 group-hover:opacity-50"
                  }`}
                />

                <div className="relative mb-6 aspect-square">
                  {"badge" in product && product.badge ? (
                    <span className="absolute left-0 top-0 z-20 rounded-full border border-cyan-400/25 bg-cyan-500/15 px-3 py-1 text-[9px] font-black tracking-[0.2em] text-cyan-300">
                      {product.badge}
                    </span>
                  ) : null}
                  <Image
                    src={publicPath(product.image)}
                    alt={product.name}
                    fill
                    className={`object-contain transition-transform duration-700 ${product.transform} group-hover:scale-110`}
                  />

                  {"isComingSoon" in product && product.isComingSoon ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-6 py-2 text-[10px] font-black tracking-[0.4em] text-cyan-400">
                        EM BREVE
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {product.type}
                  </span>
                  <h3 className="text-2xl font-black italic leading-tight tracking-tight text-zinc-100">
                    {product.name}
                  </h3>
                  <p
                    className={`font-black tabular-nums tracking-tight ${
                      isFeatured
                        ? "text-3xl text-white"
                        : "text-[1.65rem] text-zinc-100"
                    }`}
                  >
                    {product.price}
                  </p>

                  <div className="mt-2 flex items-center gap-5 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Battery className="size-3 shrink-0 text-zinc-600" />
                      <span className="text-[9px] font-medium text-zinc-500">{product.autonomy}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="size-3 shrink-0 text-zinc-600" />
                      <span className="text-[9px] font-medium text-zinc-500">{product.speed}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {cta.emphasis === "primary" ? (
                      <Link
                        href={`#${product.id}`}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-cyan-500/40 bg-black/20 text-[10px] font-black tracking-[0.28em] text-cyan-400 backdrop-blur-md transition-all hover:bg-cyan-500/10"
                      >
                        {cta.label}
                      </Link>
                    ) : (
                      <Link
                        href={`#${product.id}`}
                        className="flex items-center gap-2 text-[10px] font-black tracking-[0.28em] text-white transition-colors hover:text-cyan-400"
                      >
                        {cta.label}
                        <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
