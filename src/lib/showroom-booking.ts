export type ShowroomBookingIntent = "visit" | "test-drive";

const MAILTO_COPY: Record<
  ShowroomBookingIntent,
  { subject: string; body: string }
> = {
  visit: {
    subject: "Agendar visita — Showroom AVX Curitiba",
    body: "Olá,\n\nGostaria de agendar uma visita ao showroom.\n\n",
  },
  "test-drive": {
    subject: "Agendar teste na loja — Showroom AVX Curitiba",
    body: "Olá,\n\nGostaria de agendar um teste na loja.\n\n",
  },
};

/** `NEXT_PUBLIC_SHOWROOM_BOOKING_URL` ou fallback `mailto:` por intenção. */
export function getShowroomBookingHref(
  intent: ShowroomBookingIntent = "visit",
): string {
  const fromEnv = process.env.NEXT_PUBLIC_SHOWROOM_BOOKING_URL;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  const { subject, body } = MAILTO_COPY[intent];
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
