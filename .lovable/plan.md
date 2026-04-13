<final-text># Corrigir os códigos de teste para todas as skins, inclusive futuras

## Diagnóstico
- O problema não é só um código errado no modal: hoje o app monta os comandos com dados inferidos.
- `useCatalogSkins.ts` busca `skins.json` externamente e tenta achar `paint_index` / `weapon_id` por nome. Isso é frágil e quebra em skins com nomes repetidos ou variantes (ex.: Doppler).
- `TryInGameModal.tsx` ainda depende de mapa manual (`defindexMap`) e de um formato hardcoded de comando.
- `SkinSearchModal.tsx` adiciona skins usando a API agrupada, sem garantir que a linha escolhida tenha os IDs oficiais necessários para gerar comando correto.
- O backend já consome `skins_not_grouped.json`, mas hoje não salva os metadados essenciais que resolveriam isso de forma definitiva.

## Plano
1. **Tornar o banco a fonte oficial dos comandos**
   - Criar migração para adicionar em `imported_skins` os campos oficiais de geração de comando, como:
     - `skin_base_id`
     - `weapon_id`
     - `weapon_api_id`
     - `paint_index`
     - `min_float`
     - `max_float`
     - `wear_name`
     - `market_hash_name`
     - `team_name`
   - Fazer backfill desses dados nas skins já sincronizadas.

2. **Corrigir a sincronização para futuras skins**
   - Atualizar `supabase/functions/sync-skins/index.ts` para salvar esses campos vindos de `skins_not_grouped.json`.
   - Assim, skins novas sincronizadas no futuro já entram prontas para gerar comando certo.

3. **Parar de adivinhar IDs por nome**
   - Refatorar `src/hooks/useCatalogSkins.ts` para ler `weapon_id`, `paint_index` e floats direto do banco.
   - Remover o fetch externo + `floatLookup` por nome, que hoje é a principal fonte de erro.

4. **Corrigir o fluxo do admin**
   - Trocar `src/components/admin/SkinSearchModal.tsx` para buscar da base canônica já sincronizada (`admin_skin_index` / `imported_skins` Factory New), em vez da API agrupada.
   - Ajustar `src/hooks/useImportedSkins.ts` para retornar a versão correta das skins com os metadados oficiais.
   - Isso evita que catálogo/vitrine recebam skins sem dados confiáveis.

5. **Consertar as skins já adicionadas**
   - Fazer remapeamento dos registros atuais em `catalog_skins` e `showcase_slots` para os IDs canônicos Factory New quando houver correspondência por arma/pattern.
   - Para linhas antigas sem correspondência segura, não gerar comando errado: deixar sem botão até serem corrigidas pelo admin.

6. **Reescrever a geração do comando**
   - Em `src/components/catalogo/TryInGameModal.tsx`, parar de depender do `defindexMap` como fonte principal.
   - Montar o código usando os IDs oficiais persistidos no banco.
   - Centralizar a sintaxe do servidor em um helper único e corrigir o formato atualmente hardcoded.
   - Validar float antes de montar o comando, para não gerar código inválido.

7. **Blindagem futura**
   - Se uma skin não tiver `weapon_id` ou `paint_index` válidos, o botão não deve gerar comando.
   - Isso evita novos erros silenciosos com skins futuras, fases, luvas, facas ou itens recém-adicionados.

## Arquivos principais
- `supabase/migrations/...`
- `supabase/functions/sync-skins/index.ts`
- `src/hooks/useCatalogSkins.ts`
- `src/components/catalogo/TryInGameModal.tsx`
- `src/components/admin/SkinSearchModal.tsx`
- `src/hooks/useImportedSkins.ts`

## Validação
- Testar end-to-end com:
  - FAMAS
  - M4A1-S
  - AK-47
  - AWP
  - uma faca
  - uma luva
  - uma Doppler / Gamma Doppler
  - uma skin recém-sincronizada ainda não adicionada antes
- Confirmar que:
  - o botão só aparece quando houver dados oficiais suficientes
  - o código não depende mais de nome da skin
  - skins futuras sincronizadas entram sem precisar de gambiarra nova

## Detalhe técnico importante
A correção definitiva é esta: o app precisa usar os IDs oficiais persistidos no banco, não inferir IDs a partir do nome da skin. Enquanto isso não for feito, o problema sempre volta em skins novas, variantes e armas fora do mapa manual.</final-text>