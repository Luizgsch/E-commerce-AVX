# Project Architecture

## Directory Structure
- `src/components/ui`: Atomic components (buttons, inputs, cards).
- `src/components/sections`: Home page sections (Hero, SpecsGrid, Footer).
- `src/hooks`: Custom React hooks.
- `public/images`: All product photos and logos.

## Coding Standards
- **Component Pattern:** Export default, functional components.
- **Client/Server:** Default to Server Components. Use `'use client'` strictly for interactivity.
- **Animations:** Use `framer-motion` for page transitions and hover effects.
