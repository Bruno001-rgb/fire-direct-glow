

## Prompt 1 — Restaurar SkinsSidebar

### What changes

1. **Create `src/components/SkinsSidebar.tsx`** — Vertical scrolling sidebar with showcase skins:
   - Uses `useShowcaseSkins` hook to fetch skins
   - Duplicates array (`[...skins, ...skins]`) for continuous scroll effect
   - Each card: image + weapon name, links to `/catalogo`
   - Small "Catálogo" header label at top
   - No rarity labels, no rarity colors, no WhatsApp links
   - CSS animation for auto-scrolling marquee effect
   - Returns null if no skins available

2. **Edit `src/pages/Index.tsx`** — Wrap main content with sidebar layout:
   - Import `SkinsSidebar`
   - Change `<main>` to a flex container with sidebar on the right
   - Sidebar hidden on mobile, visible on larger screens

### Files touched

| File | Action |
|------|--------|
| `src/components/SkinsSidebar.tsx` | Create |
| `src/pages/Index.tsx` | Edit — add sidebar wrapper |

