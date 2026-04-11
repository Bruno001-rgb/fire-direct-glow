

# Remover seção de Desgaste/Float do modal de skin

## Resumo
Remover toda a seção de float/wear do `SkinDetailModal`, incluindo os botões de tier (FN, MW, etc.), a barra visual de float, e os badges de float/wear no topo.

## Alterações

| Arquivo | Ação |
|---------|------|
| `src/components/catalogo/SkinDetailModal.tsx` | Remover: componente `FloatBar`, constantes `WEAR_TIERS`, funções `getWearTier`/`getWearFilter`, estado `floatValue`, badges de float/tier, seção "Desgaste / Float", filtro de wear na imagem, e referência ao float na mensagem do WhatsApp |

## Detalhes
- Remover `WEAR_TIERS`, `getWearTier`, `getWearFilter`, `FloatBar` (código morto)
- Remover estados `floatValue`, `availableTiers`, `currentTier`
- Remover os badges de float value e wear label dos tags no topo
- Remover toda a seção "Desgaste / Float" com botões e barra
- Remover o `filter` CSS da imagem (que simulava desgaste)
- Simplificar mensagem WhatsApp para não mencionar float
- Manter `floatValue` no `TryInGameModal` com valor padrão `min_float` se necessário, ou remover se não for usado

