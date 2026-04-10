

# Simplificar Admin da Vitrine

## O que muda

Reescrever o `SlotManager` para ser uma lista simples: o admin vê todas as skins em destaque num grid, pode adicionar (via busca) e remover individualmente. Sem categorias, sem slots numerados, sem batch save.

O `SkinSearchModal` perde o filtro por categoria — mostra todas as skins. O `useShowcaseSkins` busca uma lista flat ordenada por posição.

A `CategoriesSection` (homepage) **não muda** — já renderiza uma lista flat.

## Alterações

### 1. `src/components/admin/SlotManager.tsx` — Reescrever
- Remover: categorias, pending changes, batch save, slot positions, add slot form, delete category
- Novo fluxo:
  - Query: buscar `showcase_slots` com join em `imported_skins`, ordenar por `created_at`
  - **Adicionar**: botão abre `SkinSearchModal` (sem categoryKey). Ao selecionar, cria um slot com `category_id` de uma categoria padrão (busca a primeira existente ou cria uma genérica "vitrine"), `slot_position` auto-incrementado
  - **Remover**: botão X em cada card, deleta o `showcase_slot` imediatamente
  - Grid simples de cards com imagem + nome + botão remover

### 2. `src/components/admin/SkinSearchModal.tsx` — Simplificar
- Remover `CATEGORY_WEAPON_MAP` e prop `categoryKey`
- Busca livre em todas as skins, sem filtro por tipo de arma

### 3. `src/hooks/useShowcaseSkins.ts` — Simplificar
- Remover dependência de `showcase_categories` para ordenação
- Ordenar por `slot_position` ou `created_at`

### Arquivos não alterados
- `CategoriesSection.tsx` — já funciona com lista flat
- Catálogo (`/catalogo`) — não é afetado
- Database — mantém tabelas existentes (usa `showcase_slots` + `imported_skins`)

