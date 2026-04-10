

## Etapa 19 — Dois canais de WhatsApp

### What changes

1. **Create `src/constants.ts`** — Central WhatsApp constants and helper functions:
   - `WHATSAPP_DIRECT` (wa.me link with placeholder number)
   - `WHATSAPP_COMMUNITY` (existing group link)
   - `whatsappDirectLink(context?)` — generates wa.me link with pre-filled message
   - `whatsappSkinLink(skinName)` — generates skin inquiry link with float info
   - `whatsappLoadoutLink(items)` — generates loadout list link

2. **Update 6 files** to remove local `WHATSAPP_URL` and use centralized constants:

| File | Current | New | Channel |
|------|---------|-----|---------|
| `HeroSection.tsx` | Local `WHATSAPP_URL` → group | `whatsappDirectLink()` | DIRECT |
| `FinalCTA.tsx` | Local `WHATSAPP_URL` → group | `whatsappDirectLink("Oi, vim pelo site...")` | DIRECT |
| `Header.tsx` | Local `WHATSAPP_URL` (unused in JSX currently) | Remove constant | — |
| `SkinDetailModal.tsx` | Inline `wa.me/?text=` (no number) | `whatsappSkinLink(skin.name)` with float | DIRECT |
| `TryInGameModal.tsx` | Inline `wa.me/?text=` (no number) | `whatsappDirectLink(...)` | DIRECT |
| `LoadoutSummary.tsx` | Inline `wa.me/?text=` (no number) | `whatsappLoadoutLink(items)` | DIRECT |

3. **Footer community link** — Add WhatsApp community link next to Instagram in the social area (line ~129), using `WHATSAPP_COMMUNITY` with same gradient icon box styling as Instagram

### Key details

- All purchase-intent CTAs → `WHATSAPP_DIRECT` (wa.me/55XXXXXXXXXXX with pre-filled message)
- Footer social link → `WHATSAPP_COMMUNITY` (group invite)
- `Header.tsx` had `WHATSAPP_URL` declared but never used in JSX — just remove it
- `SkinDetailModal` currently builds `whatsappMsg` inline with `encodeURIComponent` — replace with `whatsappSkinLink()` but keep the float info in the message
- `LoadoutSummary` builds message inline — replace with `whatsappLoadoutLink()` using LOADOUT_SLOTS data
- No layout, structure, or behavioral changes

### Files touched

| File | Action |
|------|--------|
| `src/constants.ts` | Create |
| `src/components/HeroSection.tsx` | Edit — swap import/URL |
| `src/components/FinalCTA.tsx` | Edit — swap import/URL |
| `src/components/Header.tsx` | Edit — remove unused constant |
| `src/components/Footer.tsx` | Edit — remove constant, add community link |
| `src/components/catalogo/SkinDetailModal.tsx` | Edit — use whatsappSkinLink |
| `src/components/catalogo/TryInGameModal.tsx` | Edit — use whatsappDirectLink |
| `src/components/loadout/LoadoutSummary.tsx` | Edit — use whatsappLoadoutLink |

