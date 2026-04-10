

# Home exibir skins da Vitrine (catalog_skins)

## Problema
A seção "Skins pra Todo Estilo" na home ainda busca dados da tabela `showcase_slots` (gerenciada pelo SlotManager, agora na aba Catálogo do admin). Mas a aba Vitrine do admin agora usa o `CatalogManager`, que salva na tabela `catalog_skins`. Precisa alinhar: home deve mostrar skins da `catalog_skins`.

## Alteração

**Arquivo:** `src/hooks/useShowcaseSkins.ts`

Trocar a query de `showcase_slots` para `catalog_skins`:

1. Buscar todos os registros de `catalog_skins` com join em `imported_skins` (via `skin_id`)
2. Mapear os campos para o formato `ShowcaseSkin` existente (name, skin, rarity, image)
3. Como `catalog_skins` não tem categoria, definir `category: "vitrine"` para todos
4. Remover dependência de `showcase_categories`

A interface `ShowcaseSkin` e o componente `CategoriesSection` não precisam de alteração — já consomem o array sem depender de categorias.

**Nenhum outro arquivo será alterado.**

