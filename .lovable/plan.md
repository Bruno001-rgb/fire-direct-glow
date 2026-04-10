

# Admin: Separar Vitrine e Catálogo

## Resumo
Hoje o SlotManager gerencia skins que aparecem na home E no catálogo (mesma fonte). O objetivo é:
- **Vitrine** = skins na home (e automaticamente no catálogo)
- **Catálogo** = skins extras que aparecem só no catálogo

## Alterações

### 1. Nova tabela `catalog_skins`
Migração SQL:
```sql
CREATE TABLE public.catalog_skins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skin_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(skin_id)
);
ALTER TABLE public.catalog_skins ENABLE ROW LEVEL SECURITY;
-- Mesmas políticas abertas das outras tabelas admin
CREATE POLICY "Anyone can read catalog_skins" ON public.catalog_skins FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anon can insert catalog_skins" ON public.catalog_skins FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can delete catalog_skins" ON public.catalog_skins FOR DELETE TO anon USING (true);
CREATE POLICY "Auth can manage catalog_skins" ON public.catalog_skins FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

### 2. Novo componente `CatalogManager.tsx`
- Botão "Adicionar skin" abre o `SkinSearchModal` existente (sem filtro de categoria)
- Grid mostra skins adicionadas ao catálogo (imagem, nome, botão remover)
- Ao adicionar: upsert em `imported_skins` + insert em `catalog_skins`
- Impede duplicatas (verifica se já existe no catálogo ou na vitrine)

### 3. Atualizar `Admin.tsx`
Três abas:
- **Vitrine** → SlotManager (sem mudanças) — descrição: "Skins da página inicial. Aparecem automaticamente no catálogo."
- **Catálogo** → CatalogManager (novo) — descrição: "Skins extras que aparecem apenas no catálogo."
- **Depoimentos** → TestimonialsManager (sem mudanças)

### 4. Atualizar `useCatalogSkins.ts`
Buscar skins de **ambas** as fontes em paralelo:
1. `showcase_slots` → skins da vitrine (já existe)
2. `catalog_skins` → skins extras do catálogo (novo)

Merge + deduplicar por `skin_id`. Toda a lógica de categorização e float matching permanece igual.

### Arquivos
| Arquivo | Ação |
|---------|------|
| Migração SQL | Criar tabela `catalog_skins` |
| `src/components/admin/CatalogManager.tsx` | Novo componente |
| `src/pages/Admin.tsx` | Adicionar aba Catálogo, renomear aba Skins → Vitrine |
| `src/hooks/useCatalogSkins.ts` | Merge showcase_slots + catalog_skins |

Nenhum componente existente será modificado além dos listados.

