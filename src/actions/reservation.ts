"use server";

export type ReservationActionState = {
  ok: boolean;
  message: string;
};

const initial: ReservationActionState = { ok: false, message: "" };

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export async function submitReservation(
  _prev: ReservationActionState,
  formData: FormData,
): Promise<ReservationActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "Informe um nome válido." };
  }

  const phoneDigits = digitsOnly(whatsapp);
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    return {
      ok: false,
      message: "Informe um WhatsApp válido com DDD.",
    };
  }

  if (!model) {
    return { ok: false, message: "Selecione um modelo de interesse." };
  }

  const webhook = process.env.RESERVATION_WEBHOOK_URL;
  if (typeof webhook === "string" && webhook.trim().length > 0) {
    try {
      await fetch(webhook.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp: phoneDigits,
          model,
          source: "landing-reservation",
        }),
      });
    } catch {
      return {
        ok: false,
        message: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[reservation]", { name, whatsapp: phoneDigits, model });
  }

  return {
    ok: true,
    message:
      "SOLICITAÇÃO RECEBIDA. NOSSO CONCESSIONÁRIO ENTRARÁ EM CONTATO EM BREVE.",
  };
}

export const reservationInitialState: ReservationActionState = initial;
