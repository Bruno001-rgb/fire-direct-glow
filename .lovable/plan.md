

## Análise da Stack Atual

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Roteamento**: React Router DOM
- **Backend/DB**: Nenhum Supabase configurado ainda
- **Landing page**: `CategoriesSection.tsx` exibe skins hardcoded em um array `allSkins[]` com 4 categorias: Facas (16), Luvas (11), Rifles (4), Snipers (1)
- **Card visual**: Componente `SkinCard` já pronto — recebe `{ name, skin, category, rarity, image }`
- **Tabs**: "Todas", "Facas", "Luvas", "Rifles", "Snipers"

## Plano de Implementação

### Pré-requisito: Configurar Supabase

Será necessário conectar o Lovable Cloud (Supabase integrado) para persistir dados.

### 1. Criar tabelas no Supabase

Três tabelas:

- **`showcase_categories`** — categorias fixas da LP
  - `id` (uuid, PK), `key` (text, unique — "facas", "luvas", "rifles", "snipers"), `label` (text), `slot_count` (int), `sort_order` (int)

- **`imported_skins`** — cache local das skins da API ByMykel
  - `id` (text, PK — o ID da API), `name` (text), `description` (text), `weapon_name` (text), `pattern_name` (text), `rarity_name` (text), `rarity_color` (text), `image` (text — URL da imagem)

- **`showcase_slots`** — vínculo admin: qual skin vai em qual slot
  - `id` (uuid, PK), `category_id` (uuid, FK → showcase_categories), `slot_position` (int), `skin_id` (text, FK → imported_skins, nullable), unique(category_id, slot_position)

RLS: leitura pública em todas as tabelas. Escrita restrita a admin (via `has_role` ou por enquanto sem RLS de escrita, dado que é um projeto pessoal).

### 2. Edge Function: Importar skins da API

- Edge function `sync-skins` que faz fetch de `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json`
- Faz upsert na tabela `imported_skins`
- Pode ser chamada manualmente pelo admin

### 3. Seed de dados iniciais

- Inserir as 4 categorias com `slot_count: 8` cada
- Criar 8 slots vazios (skin_id = null) para cada categoria

### 4. Página Admin (`/admin`)

Uma página simples com:
- Lista de categorias, cada uma mostrando seus 8 slots
- Cada slot: mostra imagem + nome da skin selecionada, ou "Vazio"
- Botão "Trocar" em cada slot → abre um modal/drawer de busca
- No modal: campo de busca que filtra `imported_skins` por nome/weapon_name
- Grid de resultados com imagem e nome — clicar seleciona e salva no slot
- Botão "Remover" para limpar um slot
- Botão "Sincronizar Skins" no topo para chamar a edge function

### 5. Integrar Landing Page

- Modificar `CategoriesSection.tsx`:
  - Remover o array hardcoded `allSkins[]` e todos os imports de imagens locais
  - Criar hook `useShowcaseSkins()` que faz query no Supabase: join `showcase_slots` + `imported_skins` + `showcase_categories`
  - Mapear os dados retornados para o formato `SkinItem` esperado pelo `SkinCard`
  - Slots vazios são filtrados (não renderizados)
  - As tabs continuam funcionando por categoria

### 6. Arquivos a criar/alterar

**Criar:**
- `src/integrations/supabase/` — client e types (gerado pelo Lovable Cloud)
- `supabase/functions/sync-skins/index.ts` — edge function de importação
- `src/hooks/useShowcaseSkins.ts` — hook para landing page
- `src/hooks/useImportedSkins.ts` — hook de busca para admin
- `src/pages/Admin.tsx` — página do painel admin
- `src/components/admin/SlotManager.tsx` — componente de gerenciamento de slots
- `src/components/admin/SkinSearchModal.tsx` — modal de busca/seleção
- Migration SQL para criar as 3 tabelas + seed

**Alterar:**
- `src/App.tsx` — adicionar rota `/admin`
- `src/components/CategoriesSection.tsx` — trocar dados hardcoded pelo hook

### Segurança

Nesta fase inicial (projeto pessoal), a rota `/admin` ficará aberta. Futuramente pode-se adicionar autenticação + role admin.

### Fluxo resumido

```text
API ByMykel ──sync──▶ imported_skins (Supabase)
                              │
Admin ──seleciona──▶ showcase_slots ──lê──▶ Landing Page cards
                              │
                     showcase_categories
```

