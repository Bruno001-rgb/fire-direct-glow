

# Drag-and-drop para reordenar skins da Vitrine

## Resumo
Adicionar coluna `sort_order` na tabela `catalog_skins` e implementar drag-and-drop no `CatalogManager` para reordenar as skins da vitrine. A ordem será refletida na home e na sidebar.

## Alterações

### 1. Migração SQL — adicionar coluna `sort_order`
```sql
ALTER TABLE public.catalog_skins
  ADD COLUMN sort_order integer NOT NULL DEFAULT 0;

-- Preencher ordem inicial baseada em created_at
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.catalog_skins
)
UPDATE public.catalog_skins SET sort_order = ranked.rn
FROM ranked WHERE catalog_skins.id = ranked.id;
```

### 2. Instalar `@dnd-kit` (biblioteca leve de drag-and-drop para React)

### 3. Refatorar `CatalogManager.tsx`
- Ordenar query por `sort_order ASC`
- Envolver o grid com `DndContext` + `SortableContext` do dnd-kit
- Cada card vira um `useSortable` item com handle de arrastar (ícone GripVertical)
- No `onDragEnd`, calcular nova ordem e fazer batch update no Supabase
- Invalidar queries após salvar

### 4. Atualizar hooks de leitura
- `useShowcaseSkins.ts` — adicionar `.order("sort_order")` na query
- `useCatalogSkins.ts` — se busca de `catalog_skins`, ordenar por `sort_order`

| Arquivo | Ação |
|---------|------|
| Migração SQL | Adicionar coluna `sort_order` |
| `package.json` | Instalar `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` |
| `src/components/admin/CatalogManager.tsx` | Implementar drag-and-drop com dnd-kit |
| `src/hooks/useShowcaseSkins.ts` | Ordenar por `sort_order` |
| `src/hooks/useCatalogSkins.ts` | Ordenar por `sort_order` (se aplicável) |

