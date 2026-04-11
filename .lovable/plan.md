

# Adicionar ícones reais de pagamento no rodapé

## Alteração em `src/components/Footer.tsx`

Substituir os badges de texto (`"VISA", "MasterCard", "PayPal", "PIX", "Outros"`) por ícones SVG inline para cada bandeira:

- **Visa** — SVG com o logo azul/amarelo clássico
- **Mastercard** — SVG com os dois círculos vermelho/laranja
- **PIX** — SVG com o losango verde-água do PIX
- **PayPal** — SVG com o "PP" azul

Remover "Outros" (não tem ícone representativo). Cada ícone será um `<svg>` inline dentro de um container com fundo sutil `rgba(233,90,12,0.06)` e borda `rgba(233,90,12,0.3)`, mantendo o estilo atual mas com os logos reais em vez de texto.

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Substituir badges de texto por SVGs das bandeiras |

