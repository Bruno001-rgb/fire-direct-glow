

# Etapa 5 — Fix de layout: logos no Header e Footer

## Mudanças

1. **`src/components/Header.tsx`** — Trocar `className="h-40 sm:h-44 w-auto -my-16"` por `className="h-10 sm:h-12 w-auto object-contain"` na tag `<img>` do logo
2. **`src/components/Footer.tsx`** — Trocar `className="h-48 sm:h-72 lg:h-[26rem] xl:h-[36rem] w-auto object-contain -my-8 sm:-my-16 lg:-my-28 xl:-my-40"` por `className="max-h-48 sm:max-h-64 lg:max-h-80 w-auto object-contain"` na tag `<img>` do logo grande

Remoção total dos hacks de margem negativa. Nenhuma outra mudança.

