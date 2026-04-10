

# Fix: Catálogo não carrega skins — foreign key ausente

## Problema
A tabela `catalog_skins` não tem foreign key para `imported_skins`. O Supabase precisa dessa relação para fazer o join `imported_skins:skin_id (...)`. Sem ela, a query falha e o catálogo mostra erro.

Além disso, a tabela `catalog_skins` está vazia — nenhuma skin foi adicionada pela aba Catálogo do admin ainda. As skins existentes estão na `showcase_slots` (aba Catálogo do admin, que usa o SlotManager).

## Alteração

### 1. Migração SQL — adicionar foreign key
```sql
ALTER TABLE public.catalog_skins
  ADD CONSTRAINT catalog_skins_skin_id_fkey
  FOREIGN KEY (skin_id) REFERENCES public.imported_skins(id)
  ON DELETE CASCADE;
```

Isso permite que o Supabase resolva o join automaticamente.

### 2. Nenhuma alteração de código
O `useCatalogSkins.ts` já busca de ambas as fontes (`showcase_slots` + `catalog_skins`). Com a FK corrigida, a query vai funcionar. As skins da `showcase_slots` (já populadas) continuarão aparecendo no catálogo normalmente.

| Arquivo | Ação |
|---------|------|
| Migração SQL | Adicionar FK `catalog_skins.skin_id → imported_skins.id` |

