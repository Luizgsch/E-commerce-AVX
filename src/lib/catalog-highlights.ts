import type { ProductModelValue } from "@/src/lib/product-models";

export type CatalogHighlightProduct = {
  id: string;
  name: string;
  type: string;
  price: string;
  autonomy: string;
  speed: string;
  image: string;
  transform: string;
  badge?: string;
  featured?: boolean;
  cta: { label: string; emphasis: "primary" | "secondary" };
  isComingSoon?: boolean;
};

/** Destaques exibidos conforme a categoria ativa no menu superior. */
export const HIGHLIGHTS_BY_CATEGORY: Record<
  ProductModelValue,
  readonly CatalogHighlightProduct[]
> = {
  autopropelidos: [
    {
      id: "ap-pilot-pro",
      name: "AVX PILOT PRO",
      type: "Autopropelido performance",
      price: "Sob consulta",
      autonomy: "Até 70km",
      speed: "45km/h",
      image: "/images/products/moto.webp",
      transform: "scale-100",
      featured: true,
      badge: "Destaque",
      cta: { label: "Reservar", emphasis: "primary" },
    },
    {
      id: "ap-urban-max",
      name: "AVX URBAN MAX",
      type: "Uso diário intenso",
      price: "Sob consulta",
      autonomy: "Até 55km",
      speed: "40km/h",
      image: "/images/products/moto.webp",
      transform: "scale-95 -rotate-1",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
    {
      id: "ap-cargo-line",
      name: "AVX CARGO LINE",
      type: "Carga e estabilidade",
      price: "Sob consulta",
      autonomy: "Até 50km",
      speed: "35km/h",
      image: "/images/products/moto.webp",
      transform: "scale-90 rotate-[2deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
  ],
  triciclos: [
    {
      id: "tri-comfort-plus",
      name: "AVX TRI COMFORT+",
      type: "Assento amplo e apoios",
      price: "Sob consulta",
      autonomy: "Até 55km",
      speed: "25km/h",
      image: "/images/products/triciclo.webp",
      transform: "scale-100",
      featured: true,
      badge: "Destaque",
      cta: { label: "Reservar", emphasis: "primary" },
    },
    {
      id: "tri-urban",
      name: "AVX TRI URBAN",
      type: "Mobilidade em calçadas",
      price: "Sob consulta",
      autonomy: "Até 45km",
      speed: "25km/h",
      image: "/images/products/triciclo.webp",
      transform: "scale-95 rotate-[1deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
    {
      id: "tri-cargo",
      name: "AVX TRI CARGO",
      type: "Bagageiro reforçado",
      price: "Sob consulta",
      autonomy: "Até 40km",
      speed: "20km/h",
      image: "/images/products/triciclo.webp",
      transform: "scale-92 -rotate-[1deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
  ],
  "scooter-eletrica": [
    {
      id: "sc-s1-pro",
      name: "AVX S1 PRO",
      type: "Scooter flagship",
      price: "R$ 8.990",
      autonomy: "45km",
      speed: "45km/h",
      image: "/images/products/scooter.png",
      transform: "scale-100",
      featured: true,
      badge: "Mais vendido",
      cta: { label: "Reservar", emphasis: "primary" },
    },
    {
      id: "sc-urban-air",
      name: "AVX URBAN AIR",
      type: "Leve e ágil",
      price: "R$ 6.490",
      autonomy: "35km",
      speed: "25km/h",
      image: "/images/products/avx-10-white.png",
      transform: "scale-95 rotate-[3deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
    {
      id: "sc-fat-night",
      name: "AVX FAT NIGHT",
      type: "Pneus largos",
      price: "R$ 7.290",
      autonomy: "38km",
      speed: "32km/h",
      image: "/images/products/scooter.png",
      transform: "scale-90 -rotate-2",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
  ],
  bicicletas: [
    {
      id: "eb-city-flow",
      name: "AVX eCITY FLOW",
      type: "Step-through urbano",
      price: "Sob consulta",
      autonomy: "Até 85km",
      speed: "25km/h",
      image: "/images/products/bicicleta.webp",
      transform: "scale-100",
      featured: true,
      badge: "Destaque",
      cta: { label: "Reservar", emphasis: "primary" },
    },
    {
      id: "eb-touring",
      name: "AVX eTOURING",
      type: "Longas distâncias",
      price: "Sob consulta",
      autonomy: "Até 110km",
      speed: "25km/h",
      image: "/images/products/bicicleta.webp",
      transform: "scale-95 rotate-[2deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
    {
      id: "eb-cargo-flex",
      name: "AVX eCARGO FLEX",
      type: "Cestas e bagageiro",
      price: "Sob consulta",
      autonomy: "Até 65km",
      speed: "25km/h",
      image: "/images/products/bicicleta.webp",
      transform: "scale-93 -rotate-[1deg]",
      cta: { label: "Ver detalhes", emphasis: "secondary" },
    },
  ],
};

export function getHighlightsForCategory(
  model: ProductModelValue,
): readonly CatalogHighlightProduct[] {
  return HIGHLIGHTS_BY_CATEGORY[model];
}
