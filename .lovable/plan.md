

# Adicionar indicadores de credibilidade abaixo da foto

## O que muda

Adicionar uma faixa de stats sobrepostos na base da foto (dentro da névoa), mostrando números de credibilidade como skins vendidas, clientes atendidos, etc. Os números ficam posicionados absolutamente na parte inferior da foto, integrados ao efeito de smoke.

## Alteração em `src/components/HeroSection.tsx`

Após as camadas de névoa (linha 109), adicionar uma div `absolute bottom-4` com 3 indicadores lado a lado:

| Indicador | Valor | Ícone |
|-----------|-------|-------|
| Skins vendidas | 5.000+ | Flame |
| Clientes satisfeitos | 1.200+ | Users |
| Anos no mercado | 3+ | ShieldCheck |

- Layout: `flex justify-center gap-6` com cada item tendo número grande em `text-primary font-bold` e label pequeno em `text-muted-foreground`
- Fundo semi-transparente (`bg-black/40 backdrop-blur-sm rounded-xl`) para legibilidade sobre a névoa
- Responsivo: gap e font-size menores no mobile

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Adicionar stats overlay na base da foto |

