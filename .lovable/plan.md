

## Etapa 16 — Analytics básico (Plausible + track utility)

### What changes

1. **`index.html`** — Add Plausible script tag before `</head>` with `data-domain="fire-direct-glow.lovable.app"`

2. **New file `src/lib/track.ts`** — Lightweight wrapper that calls `window.plausible()` in production and `console.log` in dev, with silent error handling

3. **Add `track()` calls to 6 existing components** (import + onClick additions only, no UI changes):

| File | Element | Event |
|------|---------|-------|
| `HeroSection.tsx` | Primary CTA (`<a href="/catalogo">`) | `track("cta_click", { location: "hero", target: "catalogo" })` |
| `HeroSection.tsx` | Secondary CTA (WhatsApp `<a>`) | `track("cta_click", { location: "hero", target: "whatsapp" })` |
| `Header.tsx` | "Ver skins" button (`<Link to="/catalogo">`) | `track("cta_click", { location: "header", target: "catalogo" })` |
| `FinalCTA.tsx` | WhatsApp CTA button | `track("cta_click", { location: "final_cta", target: "whatsapp" })` |
| `CategoriesSection.tsx` | SkinCard wrapper `<a>` | `track("skin_click", { location: "showcase", skin: item.name })` |
| `SkinDetailModal.tsx` | "Consultar esta skin" WhatsApp button | `track("cta_click", { location: "skin_detail", target: "whatsapp", skin: skin.name })` |
| `CatalogoSkinCard.tsx` | Card `<button>` click | `track("skin_click", { location: "catalogo", skin: skin.name })` |

### Technical notes

- For `<a>` and `<Link>` elements rendered via `asChild`, we add `onClick` directly on the inner element — navigation still works normally
- For `CatalogoSkinCard`, the existing `onClick` prop calls `onClick(skin)` — we add `track()` before it in the handler
- For `CategoriesSection`'s `SkinCard`, it's an `<a>` tag — we add an `onClick` handler that only tracks (doesn't prevent default)
- No UI, layout, or behavioral changes whatsoever

