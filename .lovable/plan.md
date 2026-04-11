

# Stats abaixo da foto no desktop, escondidos no mobile

## Alteração em `src/components/HeroSection.tsx`

Mover os stats de `absolute` (sobreposto na foto) para fora do container da imagem, posicionados logo abaixo. No mobile, esconder completamente.

- Remover o `absolute bottom-3` dos stats
- Colocar os stats como uma div separada abaixo da foto, com `hidden sm:flex` (esconde no mobile, mostra no sm+)
- Manter o estilo visual: `bg-black/40 backdrop-blur-sm rounded-xl border border-white/5`
- Centralizar abaixo da foto com `justify-center mt-3`

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Mover stats para fora da foto, esconder no mobile |

