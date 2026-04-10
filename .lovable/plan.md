

## Etapa 22 — Copy do catálogo como wishlist

### What changes

1. **`src/pages/Catalogo.tsx`** — Add info banner after Header in both mobile and desktop branches:
   - Import `Info` from lucide-react
   - Mobile: insert banner div after `<CatalogoFilters>`, before `<main>` (around line 79-80)
   - Desktop: insert banner inside the desktop block, before `<CatalogoDesktopLayout>` (around line 87)
   - Banner: `<Info>` icon + "Explore todas as skins do CS2 e escolha as que você quer. A gente encontra pra você pelo melhor preço."

2. **`src/components/catalogo/CatalogoSkinCard.tsx`** — No changes needed. Card has no CTA label text, it just opens the modal on click. Already correct.

3. **`src/components/catalogo/SkinDetailModal.tsx`** — Update copy:
   - Line 405: "Consultar esta skin no WhatsApp" → "Quero essa skin"
   - After the WhatsApp button (line 407), add: `<p className="text-xs text-center text-muted-foreground -mt-1">Consulte disponibilidade e valor direto com a gente</p>`
   - Line 433: "Adicionar ao loadout" → "Adicionar à minha lista"
   - Line 241: toast message "adicionada ao loadout" → "adicionada à sua lista"

### Files touched

| File | Action |
|------|--------|
| `src/pages/Catalogo.tsx` | Edit — add info banner in both layouts |
| `src/components/catalogo/SkinDetailModal.tsx` | Edit — update 3 text strings, add subtitle |

