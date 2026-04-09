

## Plan: Zoom só ativa ao passar sobre a imagem

### Problema
Atualmente os handlers `onMouseMove`/`onMouseLeave` estão no div container grande (toda a coluna esquerda). O zoom ativa em qualquer lugar dessa área, mesmo longe da imagem.

### Solução
Mover `onMouseMove` e `onMouseLeave` do div container para o `<img>` diretamente. Assim o zoom só ativa quando o cursor está sobre a imagem real.

### Mudanças (`src/components/catalogo/SkinDetailModal.tsx`)

1. **Remover** `onMouseMove={handleMouseMove}` e `onMouseLeave={handleMouseLeave}` do div container (linha ~149-150)
2. **Adicionar** esses mesmos handlers no `<img>` (linha ~152)
3. Mover `cursor-zoom-in` do div container para o `<img>`

### Arquivos alterados
- `src/components/catalogo/SkinDetailModal.tsx`

