"use client";

import { motion, useReducedMotion } from "framer-motion";

const BAR_KEYS = ["t1", "t2", "t3", "t4"] as const;

function TelemetryBar({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const base = 32 + index * 11;

  if (reduce) {
    return (
      <div
        className="h-1.5 overflow-hidden rounded-full bg-zinc-800"
        style={{ width: `${Math.min(100, base + 20)}%` }}
      />
    );
  }

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-600/80 to-cyan-400"
        initial={{ width: `${base}%` }}
        animate={{
          width: [`${base}%`, `${Math.min(100, base + 28)}%`, `${base + 8}%`],
        }}
        transition={{
          duration: 2.4 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default function AppCockpitUI() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[10px] font-semibold tracking-widest text-zinc-500">
          AVX LINK
        </span>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-cyan-500/80" />
          <span className="text-[10px] tabular-nums text-zinc-400">LIVE</span>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            Telemetria
          </p>
          <p className="mt-1 text-2xl font-black tabular-nums tracking-tight text-white">
            42.6
            <span className="ml-0.5 text-sm font-semibold text-cyan-400">km</span>
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {BAR_KEYS.map((k, i) => (
            <TelemetryBar key={k} index={i} />
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          {["ECO", "SPORT"].map((label, i) => (
            <div
              key={label}
              className={`rounded-xl border px-2 py-2 text-center text-[9px] font-bold uppercase tracking-wider ${
                i === 1
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                  : "border-white/[0.06] text-zinc-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/[0.07] to-transparent"
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
