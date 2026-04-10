

## Etapa 21 — Loadout envia pro WhatsApp direto

### What changes

1. **`src/components/loadout/LoadoutSummary.tsx`** — Add copy-to-clipboard action, tracking, rename button text:
   - Add imports: `Copy` from lucide, `toast` from sonner, `track` from lib/track
   - Add `handleCopy` function using `navigator.clipboard.writeText`
   - Rename WhatsApp button: "Enviar loadout no WhatsApp" → "Enviar lista no WhatsApp"
   - Add `onClick` tracking to WhatsApp link
   - Add "Copiar lista" text button below the action buttons

2. **`src/pages/Loadout.tsx`** — Update copy:
   - Heading: "Meu Loadout" → "Minha Lista"
   - Subtitle: "Monte seu inventário ideal e envie pelo WhatsApp." → "Escolha suas skins favoritas e envie pra gente encontrar."
   - Empty state: "Nenhuma skin selecionada ainda." → "Sua lista está vazia."
   - Empty state sub: "Explore o catálogo e adicione ao loadout." → "Explore o catálogo e adicione as skins que você quer."
   - CTA button: "Ver catálogo" → "Explorar skins"

3. **`src/components/Header.tsx`** — Rename nav link label: "Meu Loadout" → "Minha Lista" (line 12)

### Files touched

| File | Action |
|------|--------|
| `src/components/loadout/LoadoutSummary.tsx` | Edit — add copy action, tracking, rename |
| `src/pages/Loadout.tsx` | Edit — update 5 text strings |
| `src/components/Header.tsx` | Edit — rename nav label |

