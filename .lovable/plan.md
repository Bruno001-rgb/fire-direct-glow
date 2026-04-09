

## Plan: Inverter colunas do modal — Descrição à esquerda, Imagem à direita

### Mudança
No `SkinDetailModal.tsx`, inverter a ordem das duas colunas do grid:
1. Mover a coluna de informações (nome, preço, float, botões) para **primeiro** no DOM
2. Mover a coluna da imagem para **segundo**

### Arquivo alterado
- `src/components/catalogo/SkinDetailModal.tsx` — trocar a ordem dos dois blocos filhos dentro do grid `md:grid-cols-2`

### Resultado
- Desktop: descrição à esquerda, imagem à direita
- Mobile: descrição em cima, imagem embaixo (ordem natural do flex column)

