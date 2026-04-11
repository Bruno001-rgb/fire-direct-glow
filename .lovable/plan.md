

# Substituir logo do rodapé pela nova imagem (grande, sem aumentar rodapé)

## O que será feito

1. **Copiar a imagem enviada** para `src/assets/logo-fireskins-full.png`
2. **Atualizar `src/components/Footer.tsx`** — importar a nova logo e usá-la no lugar da atual, com tamanho grande (`h-20` com `max-w-[400px]`) mas sem aumentar o padding/espaçamento do rodapé. A coluna 1 (Identity) terá `gap` reduzido para compensar o tamanho da logo.

| Arquivo | Ação |
|---------|------|
| `src/assets/logo-fireskins-full.png` | Nova logo (cópia do upload) |
| `src/components/Footer.tsx` | Trocar import da logo e ajustar tamanho sem alterar rodapé |

