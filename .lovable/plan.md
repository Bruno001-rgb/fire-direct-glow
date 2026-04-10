

# HeroSection mobile — subir conteúdo, layout empilhado

Comparando o screenshot com o código atual, o conteúdo precisa ficar mais alto (menos padding top) e a faca precisa ficar abaixo dos trust items no mobile, não ao lado.

## Alterações em `src/components/HeroSection.tsx`

1. **Section**: no mobile, trocar `items-center` por `items-start` e reduzir `min-h-[75vh]` para `min-h-[auto]` — o conteúdo define a altura naturalmente
2. **Container padding**: reduzir `py-12` para `py-6` no mobile para subir tudo
3. **Grid**: no mobile, forçar coluna única com `gap-4` em vez de `gap-8` — a faca fica embaixo do texto
4. **Trust items**: mudar de `flex-wrap` horizontal para `flex-col items-center` no mobile (empilhados como no screenshot)
5. **Margins internos**: reduzir `mb-5` do label para `mb-3`, `mb-4` do headline para `mb-3`, `mb-6` do subtitle e CTAs para `mb-4` — tudo mais compacto no mobile

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Reduzir paddings mobile, empilhar trust items, subir conteúdo |

