

## Plano: Fallback defindexMap + esconder botão quando inválido

### Mudanças

**1. `src/components/catalogo/TryInGameModal.tsx`**
- Exportar o `defindexMap` e criar uma função utilitária `resolveDefindex(skin)` que:
  1. Tenta `defindexMap[skin.weapon_id]` (direto da API)
  2. Fallback: converte `skin.weapon.name` para snake_case (`"AK-47"` → `"weapon_ak47"`) e busca no map
  3. Retorna `number | null`

- Exportar também uma função `canTryInGame(skin)` que retorna `true` somente se:
  - `resolveDefindex(skin)` retorna um número válido
  - `skin.paint_index` é um número > 0

- Atualizar a lógica interna do modal para usar `resolveDefindex` em vez de `skin.weapon_id ?? 0`

**2. `src/components/catalogo/SkinDetailModal.tsx`**
- Importar `canTryInGame` do TryInGameModal
- Envolver o botão "Testar no jogo" em uma condição: só renderizar se `canTryInGame(skin)` for `true`
- Sem mensagem de erro — o botão simplesmente não aparece

### Lógica de conversão snake_case
```
"AK-47" → "weapon_ak47"
"M4A1-S" → "weapon_m4a1_silencer" (precisa de mapeamento especial)
```
Para nomes especiais (M4A1-S, USP-S, etc.) que não convertem limpo, incluir um `nameAliasMap` pequeno como fallback extra.

### Nenhuma outra alteração
Apenas a lógica de resolução do defindex e visibilidade condicional do botão.

