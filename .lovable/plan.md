

# Aumentar número de skins relacionadas

Mudança simples no `SkinDetailModal.tsx`:

1. Na função `RelatedSkins`, aumentar o limite de `.slice(0, 6)` para `.slice(0, 12)`
2. Ajustar o grid de `grid-cols-3` para `grid-cols-3 sm:grid-cols-4` para acomodar mais itens
3. Aumentar o pool de fallback de `< 6` para `< 12`

**Arquivo:** `src/components/catalogo/SkinDetailModal.tsx`

