

## Plan: Zoom na Imagem do Modal (cs.money style)

### O que muda

O zoom interativo deve acontecer **dentro do modal fullscreen** quando o usuário passa o mouse sobre a imagem da skin — igual ao cs.money. Atualmente o modal já tem um efeito de tilt 3D com `perspective/rotateX/rotateY`, mas falta o zoom tipo lupa.

### Comportamento desejado (baseado no cs.money)

- Ao passar o mouse sobre a imagem no modal, a skin faz **zoom ~1.5x** na direção do cursor (transform-origin segue o mouse)
- Ao sair o mouse, volta ao tamanho normal suavemente
- O container da imagem tem `overflow-hidden` para clipar o zoom
- O tilt 3D existente é mantido junto com o zoom

### Implementação

**Arquivo**: `src/components/catalogo/SkinDetailModal.tsx`

1. **Adicionar estado `isHovering`** — boolean para controlar o zoom
2. **Adicionar estado `origin`** — `{ x: string, y: string }` para `transform-origin` dinâmico baseado na posição do mouse
3. **Atualizar `handleMouseMove`** — além do tilt, calcular o `transform-origin` em porcentagem (ex: `"30% 60%"`) e setar `isHovering = true`
4. **Atualizar `handleMouseLeave`** — setar `isHovering = false` e resetar tilt
5. **Aplicar na `<img>`**:
   - Adicionar `scale(1.5)` ao transform quando `isHovering` é true
   - Setar `transformOrigin` dinamicamente para seguir o cursor
   - Manter o tilt 3D existente
6. **Adicionar `overflow-hidden`** ao div container da imagem para clipar o zoom
7. **Cursor `zoom-in`** no container da imagem

### Resultado
O usuário passa o mouse sobre a skin no modal e ela amplia como uma lupa, seguindo o cursor — idêntico ao cs.money.

### Arquivos alterados
- `src/components/catalogo/SkinDetailModal.tsx` — zoom interativo na imagem do modal

