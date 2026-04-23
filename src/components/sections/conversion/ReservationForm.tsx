"use client";

import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import {
  submitReservation,
  reservationInitialState,
} from "@/src/actions/reservation";
import {
  PRODUCT_MODEL_OPTIONS,
  type ProductModelValue,
} from "@/src/lib/product-models";

import { useProductSelection } from "../product-selection-context";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const floatingInputClassName =
  "peer w-full rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 pt-6 pb-2 text-sm text-white outline-none transition-[border-color,box-shadow] duration-[400ms] ease-out placeholder:text-transparent " +
  "focus:border-cyan-500/40 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.25)] " +
  "hover:border-zinc-700";

const floatingLabelClassName =
  "pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 transition-all duration-[400ms] ease-out " +
  "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-cyan-400/90 " +
  "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]";

const selectClassName =
  "w-full rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3.5 text-sm text-white outline-none transition-[border-color,box-shadow] duration-[400ms] ease-out " +
  "focus:border-cyan-500/40 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.25)] hover:border-zinc-700 " +
  "[&>option]:bg-zinc-950";

export default function ReservationForm() {
  const { selectedModel } = useProductSelection();
  const [formModel, setFormModel] = useState<ProductModelValue>(selectedModel);
  const [state, formAction, isPending] = useActionState(
    submitReservation,
    reservationInitialState,
  );

  useEffect(() => {
    setFormModel(selectedModel);
  }, [selectedModel]);

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
        className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-10 text-center backdrop-blur-xl"
      >
        <div className="flex size-14 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
          <Check className="size-7 text-cyan-400" strokeWidth={1.5} aria-hidden />
        </div>
        <p className="max-w-sm text-sm font-bold leading-relaxed tracking-[0.12em] text-white">
          {state.message}
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="relative">
        <input
          id="reservation-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder=" "
          className={floatingInputClassName}
        />
        <label htmlFor="reservation-name" className={floatingLabelClassName}>
          Nome
        </label>
      </div>

      <div className="relative">
        <input
          id="reservation-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder=" "
          className={floatingInputClassName}
        />
        <label htmlFor="reservation-whatsapp" className={floatingLabelClassName}>
          WhatsApp
        </label>
      </div>

      <div>
        <label
          htmlFor="reservation-model"
          className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500"
        >
          Modelo de interesse
        </label>
        <select
          id="reservation-model"
          name="model"
          required
          value={formModel}
          onChange={(e) =>
            setFormModel(e.target.value as ProductModelValue)
          }
          className={`${selectClassName} appearance-none`}
        >
          {PRODUCT_MODEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {state.message && !state.ok ? (
        <p className="text-center text-xs font-medium text-red-400/90" role="alert">
          {state.message}
        </p>
      ) : null}

      <motion.button
        type="submit"
        disabled={isPending}
        whileTap={isPending ? undefined : { scale: 0.99 }}
        transition={{ duration: 0.2, ease: LUXURY_EASE }}
        className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-[11px] font-black tracking-[0.25em] text-cyan-300 uppercase transition-opacity disabled:opacity-80"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 shadow-[0_0_24px_rgba(0,229,255,0.35)] animate-pulse"
          aria-hidden
        />
        <span className="relative flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <Loader2
                className="size-5 animate-spin text-cyan-400"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="sr-only">Enviando solicitação</span>
            </>
          ) : (
            "SOLICITAR RESERVA"
          )}
        </span>
      </motion.button>
    </form>
  );
}
