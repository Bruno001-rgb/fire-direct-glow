

## Etapa 18 — Placeholders marcados em todo o site

### What changes

1. **`src/components/Placeholder.tsx`** — Add master list comment at the top documenting all placeholders across the site

2. **`src/components/Footer.tsx`** — Import `Placeholder`, add CNPJ placeholder after the copyright span (line ~163)

3. **Create `src/constants.ts`** — New file with the pending-data comment block at the top (the file doesn't exist yet)

4. **`src/components/HeroSection.tsx`** — The trust items use general marketing copy ("Entrega imediata", "Pagamento seguro", "Skins pra todo bolso") with no specific numbers, so no placeholders needed here

### Files

| File | Action |
|------|--------|
| `src/components/Placeholder.tsx` | Edit — add master list comment |
| `src/components/Footer.tsx` | Edit — import Placeholder + add CNPJ span |
| `src/constants.ts` | Create — comment block with pending data notes |

