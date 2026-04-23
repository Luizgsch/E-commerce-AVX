/** Modelos alinhados ao catálogo — fonte única para selects, thumbs e CTAs. */
export const PRODUCT_MODEL_OPTIONS = [
  {
    value: "autopropelidos",
    label: "Autopropelidos",
    thumb: "/images/products/moto.webp",
  },
  {
    value: "triciclos",
    label: "Triciclos",
    thumb: "/images/products/triciclo.png",
  },
  {
    value: "scooter-eletrica",
    label: "Scooter elétrica",
    thumb: "/images/products/scooter.png",
  },
  {
    value: "bicicletas",
    label: "Bicicletas",
    thumb: "/images/products/bicicleta.webp",
  },
] as const;

export type ProductModelValue = (typeof PRODUCT_MODEL_OPTIONS)[number]["value"];

export function getProductModelThumb(model: ProductModelValue): string {
  const opt = PRODUCT_MODEL_OPTIONS.find((o) => o.value === model);
  return opt?.thumb ?? PRODUCT_MODEL_OPTIONS[0].thumb;
}
