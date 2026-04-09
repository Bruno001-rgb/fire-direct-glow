

## Plan: Premium Float/Wear Selector in Catalog Detail Modal

### What changes

Only **one file** is modified: `src/components/catalogo/SkinDetailModal.tsx`. No other pages or components are touched.

### Implementation

**1. Add interactive float slider state**
- Add `floatValue` state initialized to `skin.min_float` when the modal opens
- Constrain slider to real `[min_float, max_float]` range from the API
- Step size: `0.01`, display with 2 decimal places

**2. Wear label logic**
Helper function mapping float to wear condition:
- 0.00–0.07: Factory New
- 0.07–0.15: Minimal Wear  
- 0.15–0.38: Field-Tested
- 0.38–0.45: Well-Worn
- 0.45–1.00: Battle-Scarred

Only labels within the skin's actual float range are selectable.

**3. Premium UI upgrades**
- Replace the static float range bar with a custom styled Radix slider (already in project) using orange accent colors
- Add a **float badge** showing the current value (e.g. `0.06`) with mono font
- Add a **wear condition badge** with color coding (green for FN, yellow for MW, orange for FT, red for WW/BS)
- Add clickable wear label chips above the slider for quick selection (only enabled chips for wears the skin supports)
- Subtle CSS filter on the skin image based on float (slight brightness/contrast shift to simulate wear)

**4. Updated WhatsApp CTA**
- Button text: "Consultar esta skin no WhatsApp"
- Message includes selected float: `"Olá, quero consultar a skin [name] com float [value]."`

**5. What stays the same**
- 3D tilt effect on image
- Rarity badge, StatTrak badge
- Collection info, category/weapon info
- "Adicionar ao loadout" button
- Escape to close, swipe down to close on mobile

### API note
The ByMykel API does not support dynamic image rendering by float value. The same image is kept, and only the float value, wear label, and a subtle CSS visual effect change. No external API calls are needed for this feature.

### Files changed
- `src/components/catalogo/SkinDetailModal.tsx` — full rewrite of the detail modal

