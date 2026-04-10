

# CategoriesSection — simplificar background e hover

## Alterações em `src/components/CategoriesSection.tsx`

1. **Remover** os 3 divs de gradiente radial (linhas ~100-105 com `radial-gradient(ellipse, hsla(...)`)
2. **Remover** o div de vignette radial (`radial-gradient(ellipse at center, transparent 50%...)`) — linha ~106
3. **Manter** apenas `bg-black` no fundo da section
4. **Hover dos cards**: trocar `hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.15)]` por `hover:shadow-md`
5. **Não mexer** em: grid, conteúdo dos cards, botão CTA, preços

| Arquivo | Ação |
|---------|------|
| `src/components/CategoriesSection.tsx` | Remover gradientes de fundo, simplificar hover shadow |

