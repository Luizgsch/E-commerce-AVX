# Lifestyle & Experience

Seção da landing após **Deep Dive**: hero cinematográfico, showcase do app (moldura CSS pura + UI viva) e faixa parallax com imagens macro.

## Componentes

| Arquivo | Função |
|--------|--------|
| `lifestyle-experience.tsx` | Orquestra a seção (`bg-black`) e export default para a home. |
| `lifestyle-hero.tsx` | Full-bleed, poster + vídeo opcional (`NEXT_PUBLIC_LIFESTYLE_HERO_VIDEO`), `preload="none"`, carga quando `useInView`, overlay em gradiente, **ruído SVG** (`opacity-[0.03]`), headline **SILÊNCIO QUE IMPULSIONA.**, botão de som (hover no desktop; visível no mobile). |
| `app-showcase.tsx` | Copy + destaques; **mockup só com Tailwind** (`rounded-[3rem]`, `border-4 border-zinc-800`), perspectiva com Framer Motion. |
| `app-cockpit-ui.tsx` | Interface React dentro da moldura: barras de telemetria com micro-animações. |
| `lifestyle-parallax-strip.tsx` | Grid de close-ups (Unsplash); `useScroll` + `useTransform` com deslocamento máximo **50px**; `useReducedMotion` desliga parallax. |

## Vídeo e LCP

- Não usar `priority` no vídeo (API é do `next/image`); manter `priority` apenas no LCP real (hero principal).
- `preload="none"` + montagem de `src` após `useInView` reduz competição com LCP.
- `poster` + `next/image` de fundo até o vídeo existir.

## Áudio

- Som sintético (“hum”) via Web Audio ao ativar o ícone; requer gesto do utilizador.
- Com `prefers-reduced-motion`, autoplay de vídeo e áudio ambiente ficam desativados.

## Assets locais (opcional)

Defina `NEXT_PUBLIC_LIFESTYLE_HERO_VIDEO` com URL ou caminho público do MP4 em loop. Sem variável, mantém-se poster + som opcional.
