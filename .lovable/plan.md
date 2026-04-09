

## Plan: Hover Zoom Effect on Skin Image (cs.money style)

### What changes

**One file**: `src/components/catalogo/CatalogoSkinCard.tsx`

On cs.money, hovering a skin card scales the skin image up smoothly (like a magnifying effect on the image only, not the whole card). Currently the card does `hover:scale-[1.03]` on the entire button — we want to replace/complement that with a smooth zoom on just the skin image.

### Implementation

1. **Remove the card-level scale** — replace `hover:scale-[1.03]` with no card scale (or keep a very subtle one like `hover:scale-[1.01]`)

2. **Add image zoom on hover** — on the `<img>` element, add:
   - `transition-transform duration-300`
   - `group-hover:scale-[1.15]` (image scales up 15% on card hover)
   - The parent div with `aspect-square` already has `overflow` implicit from the card's `overflow-hidden`, so the zoomed image stays clipped within bounds

3. **Add overflow-hidden to the image container** — ensure the `aspect-square` wrapper div has `overflow-hidden` so the scaled image doesn't bleed outside

This gives the same smooth zoom-on-hover feel as cs.money where the skin image "pops" toward you on hover while the card itself stays mostly in place.

### Files changed
- `src/components/catalogo/CatalogoSkinCard.tsx` — image hover zoom effect

