

# VideoShowcase — simplificar background, partículas e shadow

## Alterações em `src/components/VideoShowcase.tsx`

1. **Remover** os 5 divs de partículas flutuantes (`animate-pulse` com `boxShadow` colorido) — linhas ~56-60
2. **Remover** os 2 divs de `radial-gradient` extras (linhas ~44-49) — manter apenas `bg-black`
3. **Remover** o div de `boxShadow: inset` (vignette interna da seção) — linha ~50
4. **Remover** as listras diagonais (`repeating-linear-gradient(-55deg...)`) — linhas ~52-55
5. **No glass card do vídeo**: substituir o `boxShadow` complexo (`0 0 1px..., 0 0 40px..., 0 20px 60px...`) por `boxShadow: '0 2px 20px rgba(0,0,0,0.4)'`
6. **Não mexer** em: texto, botões, player de vídeo, modal fullscreen, separadores de topo/base

| Arquivo | Ação |
|---------|------|
| `src/components/VideoShowcase.tsx` | Remover partículas, gradientes extras, simplificar shadow do card |

