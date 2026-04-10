

# Trocar estruturas entre Vitrine e Catálogo no Admin

## Resumo
Inverter os componentes das abas: a aba **Vitrine** passa a usar o `CatalogManager` (grid simples de adicionar/remover skins) e a aba **Catálogo** passa a usar o `SlotManager` (categorias e slots).

## Alteração

**Arquivo:** `src/pages/Admin.tsx`

Trocar os componentes e descrições entre as duas abas:

| Aba | Antes | Depois |
|-----|-------|--------|
| **Vitrine** | `SlotManager` + "Skins da página inicial..." | `CatalogManager` + "Skins que aparecem na vitrine da página inicial." |
| **Catálogo** | `CatalogManager` + "Skins extras..." | `SlotManager` + "Gerencie categorias e slots do catálogo completo. Skins da vitrine aparecem aqui automaticamente." |

Nenhum outro arquivo será alterado.

