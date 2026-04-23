"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Container from "@/src/components/ui/container";
import ParticleBackground from "@/src/components/ui/particle-background";

import ProductConfigurator, {
  type ProductColorId,
} from "./ProductConfigurator";
import ReservationForm from "./ReservationForm";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const blockVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

export default function ConversionSection() {
  const [color, setColor] = useState<ProductColorId>("white");

  return (
    <section
      id="reserva"
      className="relative overflow-hidden border-t border-white/[0.04] bg-black py-32 lg:py-40"
      aria-labelledby="conversion-heading"
    >
      <ParticleBackground
        variant="section"
        id="particles-conversion"
        className="opacity-60"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.04 },
            },
          }}
          className="flex flex-col gap-20 lg:gap-24"
        >
          <motion.h2
            variants={blockVariants}
            id="conversion-heading"
            className="text-[10px] font-medium tracking-[0.5em] text-zinc-600 uppercase"
          >
            Reserva
          </motion.h2>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:items-start">
            <motion.div variants={blockVariants}>
              <ProductConfigurator color={color} onColorChange={setColor} />
            </motion.div>

            <motion.div variants={blockVariants}>
              <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/40 p-8 backdrop-blur-xl sm:p-10">
                <ReservationForm />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
