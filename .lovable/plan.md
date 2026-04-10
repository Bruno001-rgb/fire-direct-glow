

# VideoShowcase — esconder CTAs no mobile e ajustar espaçamento

## Alterações em `src/components/VideoShowcase.tsx`

1. **CTAs (linhas 85-97)**: adicionar `hidden sm:flex` no container dos botões para escondê-los no mobile
2. **Trust line (linhas 100-109)**: reduzir `mt-8` para `mt-4 sm:mt-8` no mobile para compensar o espaço dos botões removidos
3. **Subtitle (linha 80)**: reduzir `mb-8` para `mb-4 sm:mb-8` para menos espaço antes da área onde os botões sumiam

| Arquivo | Ação |
|---------|------|
| `src/components/VideoShowcase.tsx` | Esconder CTAs no mobile, ajustar margins |

