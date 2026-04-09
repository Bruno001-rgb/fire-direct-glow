

## Plano: Trocar busca do SkinSearchModal para usar API ByMykel

### Problema
O `SkinSearchModal` (usado no admin para selecionar skins dos slots) busca da tabela `imported_skins` no banco. O usuário quer que busque direto da API ByMykel via o hook `useByMykelSkins` que já existe com cache infinito. Simples, sem nova seção.

### Alteração

**Arquivo único: `src/components/admin/SkinSearchModal.tsx`**

- Trocar `useImportedSkins(search)` por `useByMykelSkins()`
- Filtrar client-side pelo `search` (já que o hook retorna todas as skins em cache)
- Adaptar o mapeamento dos campos no `onSelect`:
  - `skinId` → `skin.id`
  - `name` → `skin.name`
  - `weapon_name` → `skin.weapon?.name`
  - `pattern_name` → extrair parte após " | " do `skin.name`
  - `image` → `skin.image`
  - `rarity_name` → `skin.rarity?.name`
- Limitar resultados exibidos a 100 (para performance do grid)
- Manter todo o resto igual: layout, skeleton, placeholder text

### O que NÃO muda
- Nenhuma nova aba ou seção no admin
- `SlotManager` continua igual (já consome o `onSelect` com a mesma interface `SkinPreview`)
- O hook `useImportedSkins` pode ficar no código (não quebra nada), ou ser removido como cleanup

