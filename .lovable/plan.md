

# HeroSection — simplificar background

## Alterações em `src/components/HeroSection.tsx`

1. **Remover** os 3 divs de gradiente radial (`radial-gradient(ellipse, hsla(...)`)  — linhas ~23-35
2. **Remover** o div do grid sutil (`opacity-[0.02]` com `backgroundImage: linear-gradient`) — linhas ~41-48
3. **Remover** o div das listras diagonais (`repeating-linear-gradient(-55deg...)`) — linhas ~50-57
4. **Reduzir** opacidade do watermark de `opacity-[0.012]` para `opacity-[0.006]`
5. **Manter** intactos: `bg-black`, vignette (`boxShadow inset`), linha de topo, linha de base, todo o conteúdo (texto, botões, trust items, faca)

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Remover 3 gradientes + grid + listras, reduzir opacidade watermark |

