# Abdulazeez Alagele — portfolio

Personal site for a full-stack engineer in Istanbul. Dark, type-led, with a WebGL
hero: an interactive lattice behind the headline and chrome shapes floating over it.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | TypeScript only, no emit |

## Stack

React 18 · TypeScript · Vite · Three.js via React Three Fiber + drei · GSAP
(ScrollTrigger) · Lenis for smooth scrolling. Plain CSS with custom properties —
no UI framework.

## Structure

```
src/
  components/   sections — nav, hero, metrics, work, about, stack, contact
  three/        HeroField (background lattice), HeroShards (floating chrome)
  lib/
    content.ts  all copy, projects and stack lists live here
    motion.ts   Lenis + ScrollTrigger wiring, reveal hook, scroll helpers
    pointer.ts  normalised pointer position shared by both canvases
  styles.css    tokens and every component style
public/
  shots/        project screenshots
  og.jpg        social preview image
```

**To change the content, edit `src/lib/content.ts` — nothing else hardcodes copy.**

## Notes

- `three` and `drei` are lazy-loaded in their own chunk, so the first paint is
  ~103 KB gzip and WebGL streams in after it.
- Everything respects `prefers-reduced-motion`: smooth scrolling, reveals and the
  3D animation loop all switch off, and the hero still renders a static frame.
- `og:image` is a root-relative path. If a crawler needs an absolute URL, change
  it in `index.html` once the domain is final.

## Deploy

Any static host — the build output is `dist/`.

```bash
npm run build
npx vercel deploy --prod        # or: firebase deploy --only hosting
```
