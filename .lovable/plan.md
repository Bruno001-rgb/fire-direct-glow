

## Diagnóstico

### Estrutura atual
- **Não existe `skin_id`** no banco — as colunas são: `id`, `name`, `weapon_name`, `pattern_name`, `rarity_name`, `rarity_color`, `image`, `description`, `created_at`
- **Chave de deduplicação**: `weapon_name + pattern_name` (confirmado que funciona — 1,919 combinações únicas)
- **Busca atual**: `useImportedSkins` consulta `imported_skins` direto, sem filtro de wear/StatTrak, com `LIMIT 50` — retorna todas as variações misturadas
- **Não existe view `canonical_skins`** — o plano anterior não foi implementado

### Padrão de IDs
- `skin-{hash}_0` = Factory New (sem StatTrak)
- `skin-{hash}_0_st` = Factory New StatTrak
- Sufixo `_0` = FN, `_1` = MW, `_2` = FT, `_3` = WW, `_4` = BS

### Números
- **15,897** skins brutas
- **2,071** skins com ID terminando em `_0`, sem StatTrak, sem Souvenir
- **1,919** skin bases únicas (weapon_name + pattern_name) nesse filtro
- Diferença de 152 = skins sem weapon_name/pattern_name preenchido

### Onde quebra
1. Busca sem filtro → 10 variações por skin polui os 50 resultados
2. `LIMIT 50` com `ORDER BY name` → maioria das skins inalcançável sem busca exata

## Plano

### 1. Criar view `admin_skin_index` (Migration SQL)

```sql
CREATE VIEW admin_skin_index AS
SELECT DISTINCT ON (weapon_name, pattern_name)
  id AS source_skin_id,
  name,
  weapon_name,
  pattern_name,
  rarity_name,
  rarity_color,
  image
FROM imported_skins
WHERE id LIKE '%\_0'
  AND name NOT LIKE 'StatTrak%'
  AND name NOT LIKE 'Souvenir%'
  AND weapon_name IS NOT NULL
  AND pattern_name IS NOT NULL
ORDER BY weapon_name, pattern_name, name;
```

Resultado: ~1,919 linhas. Somente Factory New, sem StatTrak, sem Souvenir, 1 por skin base.

### 2. Atualizar `useImportedSkins.ts`
- Trocar `.from("imported_skins")` por `.from("admin_skin_index")`
- Trocar campo `id` por `source_skin_id`
- Aumentar limit para 100
- Manter busca por `name`, `weapon_name`, `pattern_name`

### 3. Atualizar `SkinSearchModal.tsx`
- Ajustar para usar `source_skin_id` como ID ao selecionar (mantém compatibilidade com `showcase_slots.skin_id` que referencia `imported_skins.id`)

### Arquivos

| Arquivo | Ação |
|---|---|
| Migration SQL | Criar view `admin_skin_index` |
| `src/hooks/useImportedSkins.ts` | Apontar para view, ajustar campos |
| `src/components/admin/SkinSearchModal.tsx` | Usar `source_skin_id` |

### Fora de escopo
- Autenticação do admin
- Fallback para outras wears (rejeitado explicitamente)
- Alterar landing page ou SlotManager

