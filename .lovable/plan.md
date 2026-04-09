

## Plano: Adicionar categorias faltantes + UI de gerenciamento

### Estado atual
4 categorias (Facas, Luvas, Rifles, Snipers) com 8 slots cada. Faltam Pistolas, SMGs, Shotguns e Metralhadoras. Todas as skins dessas armas já existem na API ByMykel e são acessíveis no modal de busca.

### Alterações

**1. Inserir novas categorias + slots no banco (migration)**

```sql
INSERT INTO showcase_categories (key, label, sort_order) VALUES
  ('pistolas', 'Pistolas', 5),
  ('smgs', 'SMGs', 6),
  ('shotguns', 'Shotguns', 7),
  ('metralhadoras', 'Metralhadoras', 8);

-- 8 slots vazios para cada nova categoria
INSERT INTO showcase_slots (category_id, slot_position)
SELECT id, generate_series(1, 8)
FROM showcase_categories
WHERE key IN ('pistolas', 'smgs', 'shotguns', 'metralhadoras');
```

**2. UI para criar/remover categorias no admin**

Arquivo: `src/components/admin/SlotManager.tsx`

Adicionar no topo da aba Skins:
- Botão **"+ Nova Categoria"** → mini-form inline com nome, key e quantidade de slots
- Ao criar, insere categoria + N slots vazios via Supabase
- Botão de lixeira em cada categoria (com confirmação) → deleta categoria + seus slots
- Refetch automático após criar/remover

### O que NÃO muda
- SkinSearchModal continua buscando da API ByMykel completa (~2,600 skins)
- Catálogo público e Loadout continuam usando `useCatalogSkins` (só mostra skins dos slots preenchidos)
- Nenhuma nova aba ou página

### Arquivos alterados
- Migration SQL (novas categorias + slots)
- `src/components/admin/SlotManager.tsx` — UI de gerenciamento de categorias

