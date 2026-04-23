import {
  getProductModelThumb,
  type ProductModelValue,
} from "@/src/lib/product-models";

export type DetailShot = {
  src: string;
  alt: string;
  offset: number;
};

/** Macro genérico — luz, material, noite (fallback). */
export const GENERIC_DETAIL_SHOTS: readonly DetailShot[] = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
    alt: "Superfície escura com luz concentrada",
    offset: 48,
  },
  {
    src: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80&auto=format&fit=crop",
    alt: "Reflexo metálico e carbono",
    offset: -42,
  },
  {
    src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80&auto=format&fit=crop",
    alt: "Detalhe urbano noturno com contraste",
    offset: 36,
  },
] as const;

/** Por modelo: menos de 3 entradas = completar com genéricos. */
const MODEL_DETAIL_SHOTS: Record<ProductModelValue, readonly DetailShot[]> = {
  autopropelidos: [
    {
      src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80&auto=format&fit=crop",
      alt: "Autopropelidos — luz sobre silhueta escura",
      offset: 40,
    },
    {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&auto=format&fit=crop",
      alt: "Autopropelidos — reflexo e linha de luz",
      offset: -38,
    },
    {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format&fit=crop",
      alt: "Autopropelidos — detalhe premium em ambiente noturno",
      offset: 32,
    },
  ],
  triciclos: [
    {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80&auto=format&fit=crop",
      alt: "Triciclos — contraste e luz",
      offset: 44,
    },
    {
      src: "https://images.unsplash.com/photo-1489827908717-a0c89d31d847?w=900&q=80&auto=format&fit=crop",
      alt: "Triciclos — linha limpa na cidade",
      offset: -36,
    },
    {
      src: "https://images.unsplash.com/photo-1511910849309-0dffbabc57e0?w=900&q=80&auto=format&fit=crop",
      alt: "Triciclos — textura e profundidade",
      offset: 28,
    },
  ],
  "scooter-eletrica": [
    {
      src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80&auto=format&fit=crop",
      alt: "Scooter elétrica — luz e silhueta",
      offset: 36,
    },
    {
      src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80&auto=format&fit=crop",
      alt: "Scooter elétrica — mobilidade urbana",
      offset: -32,
    },
    {
      src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80&auto=format&fit=crop",
      alt: "Scooter elétrica — detalhe noturno",
      offset: 30,
    },
  ],
  bicicletas: [],
};

function mergeShots(
  specific: readonly DetailShot[],
): readonly DetailShot[] {
  if (specific.length >= 3) return specific;
  const merged = [...specific];
  let i = 0;
  while (merged.length < 3 && i < GENERIC_DETAIL_SHOTS.length) {
    merged.push(GENERIC_DETAIL_SHOTS[i]);
    i += 1;
  }
  return merged;
}

export function getDetailShotsForModel(
  model: ProductModelValue,
): readonly DetailShot[] {
  return mergeShots(MODEL_DETAIL_SHOTS[model]);
}

const MODEL_LABELS: Record<ProductModelValue, string> = {
  autopropelidos: "Autopropelidos",
  triciclos: "Triciclos",
  "scooter-eletrica": "Scooter elétrica",
  bicicletas: "Bicicletas",
};

export function getModelDisplayLabel(model: ProductModelValue): string {
  return MODEL_LABELS[model];
}

/** Imagem lateral para hotspots — alinhada ao catálogo. */
export function getModelHeroImagePath(model: ProductModelValue): string {
  return getProductModelThumb(model);
}
