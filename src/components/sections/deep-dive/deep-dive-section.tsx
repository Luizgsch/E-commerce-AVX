"use client";

import { motion } from "framer-motion";

import ParticleBackground from "@/src/components/ui/particle-background";
import Container from "@/src/components/ui/container";
import { getModelDisplayLabel } from "@/src/lib/model-detail-shots";

import EngineeringHotspots from "./engineering-hotspots";
import { useProductSelection } from "../product-selection-context";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: LUXURY_EASE },
  },
};

export default function DeepDiveSection() {
  const { selectedModel } = useProductSelection();

  return (
    <section
      id="engenharia-precisao"
      className="relative overflow-hidden bg-black py-32 lg:py-44"
      aria-labelledby="deep-dive-model-label"
    >
      <ParticleBackground
        variant="section"
        id="particles-deep-dive"
        className="opacity-70"
      />

      <h2 id="deep-dive-model-label" className="sr-only">
        {getModelDisplayLabel(selectedModel)}
      </h2>

      <p
        className="pointer-events-none absolute right-6 top-8 z-20 font-light tracking-[0.45em] text-[10px] text-zinc-600 uppercase md:right-10 md:top-12 lg:text-[11px]"
        aria-hidden
      >
        {getModelDisplayLabel(selectedModel)}
      </p>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.08, staggerChildren: 0.06 },
            },
          }}
        >
          <motion.div variants={blockVariants} className="flex justify-center">
            <EngineeringHotspots />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
