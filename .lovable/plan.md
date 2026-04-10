

# Adicionar busca/filtro no SlotManager (aba Catálogo do admin)

## Resumo
Adicionar um campo de busca no topo da seção "Categorias & Slots" para filtrar categorias por nome ou buscar skins dentro dos slots. Facilita a navegação quando há muitas categorias.

## Alteração

### Arquivo: `src/components/admin/SlotManager.tsx`

1. Adicionar estado `searchFilter` (string)
2. Adicionar campo `<Input>` com ícone de lupa (`Search` do lucide) abaixo do header "Categorias & Slots"
3. Filtrar as categorias exibidas:
   - Se o texto bate com o nome da categoria → mostra a categoria inteira
   - Se bate com nome de alguma skin dentro da categoria → mostra a categoria com destaque nos slots encontrados
   - Se não bate com nada → oculta a categoria
4. Mostrar contagem de resultados quando há filtro ativo

| Arquivo | Ação |
|---------|------|
| `src/components/admin/SlotManager.tsx` | Adicionar input de busca e lógica de filtro |

Nenhuma migração necessária.

