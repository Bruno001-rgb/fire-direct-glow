

# Mover stats de credibilidade para baixo da foto

## O que muda

Tirar os stats de dentro do container `relative` da foto (onde estão posicionados com `absolute`) e colocá-los logo abaixo, como um elemento normal no fluxo do layout.

## Alteração em `src/components/HeroSection.tsx`

1. Remover o bloco de stats overlay (absolute) de dentro do wrapper da foto
2. Adicionar o mesmo bloco logo após o fechamento do wrapper da foto, como elemento separado com `mt-4`, centralizado, sem posicionamento absoluto

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Mover stats de absolute para abaixo da foto |

