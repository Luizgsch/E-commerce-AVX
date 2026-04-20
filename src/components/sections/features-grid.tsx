"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Zap, Gauge, Weight, Clock, Battery } from "lucide-react";

import Container from "@/src/components/ui/container";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function FeaturesGrid() {
  return (
    <section id="specs" className="relative py-24 overflow-hidden bg-black">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-full">
          

          {/* Card 1: Feature Highlight (Motorcycle) */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.3)", boxShadow: "0 0 30px rgba(0, 229, 255, 0.05)" }}
            viewport={{ once: true }}
            className="lg:col-span-5 group relative overflow-hidden rounded-[2.5rem] border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md transition-colors duration-500"
          >
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="relative w-full h-full scale-110 grayscale transition-all group-hover:grayscale-0 group-hover:scale-105 duration-700">
                <Image 
                  src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=1000&auto=format&fit=crop" 
                  alt="Moto Negra"
                  fill
                  className="object-cover opacity-60"
                />
              </div>
            </div>
            
            <div className="relative z-20 h-full p-10 flex flex-col justify-end">
              <p className="text-xl font-bold leading-snug text-white tracking-[0.2em] uppercase">
                BAIXA MANUTENÇÃO.<br />
                ZERO COMBUSTÍVEL.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Fast Charge */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.3)", boxShadow: "0 0 30px rgba(0, 229, 255, 0.05)" }}
            viewport={{ once: true }}
            className="lg:col-span-7 group relative overflow-hidden rounded-[2.5rem] border border-zinc-800/50 bg-zinc-900/40 p-10 backdrop-blur-md transition-colors duration-500 flex flex-col justify-between"
          >
            <div className="flex justify-center items-center h-full relative py-12">
               <div className="absolute inset-0 flex justify-center items-center">
                  <div className="size-48 bg-cyan-300/5 rounded-full blur-3xl animate-pulse" />
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <Zap className="size-16 text-white mb-4" fill="white" />
                  <Image 
                    src="/images/products/avx-10-white.png" 
                    alt="Carga Rápida" 
                    width={150} 
                    height={150} 
                    className="opacity-20 invert grayscale"
                  />
               </div>
               
               <div className="absolute top-0 right-0">
                  <Clock className="size-10 text-zinc-800" />
               </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-6 border-t border-white/5 relative z-20">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Tecnologia de Carga</span>
                <p className="text-lg font-bold text-white tracking-widest uppercase">Carga Rápida (3h)</p>
              </div>
              <Battery className="size-8 text-cyan-400" />
            </div>
          </motion.div>

          {/* Card 3: Technical Specs Dashboard */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ borderColor: "rgba(0, 229, 255, 0.2)" }}
            viewport={{ once: true }}
            className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-12 rounded-[2.5rem] border border-zinc-800/50 bg-zinc-900/40 p-12 backdrop-blur-md transition-colors duration-500"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black text-white italic">45</span>
                <span className="text-2xl font-bold text-zinc-500 uppercase">km</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Zap className="size-4 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">Autonomia</span>
                  <span className="text-[9px] text-zinc-500 font-medium">Bateria de Lítio High-Density</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l border-white/5 pl-12">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black text-white italic">45</span>
                <span className="text-2xl font-bold text-zinc-500 uppercase">km/h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Gauge className="size-4 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">Velocidade Máxima</span>
                  <span className="text-[9px] text-zinc-500 font-medium">Motor Brushless de Alta Performance</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l border-white/5 pl-12">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black text-white italic">16.5</span>
                <span className="text-2xl font-bold text-zinc-500 uppercase">kg</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Weight className="size-4 text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">Peso Total</span>
                  <span className="text-[9px] text-zinc-500 font-medium">Liga de Alumínio Aeroespacial</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
