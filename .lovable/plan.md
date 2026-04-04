

## Diagnóstico Completo

### Stack detectada
React 18 + Vite + TypeScript + Tailwind + shadcn/ui + TanStack Query + Supabase (Lovable Cloud)

### Fluxo atual (ponta a ponta)

1. Admin abre `/admin` → `SlotManager` carrega categorias e slots via Supabase (SELECT — funciona, anon pode ler)
2. Admin clica num slot → abre `SkinSearchModal` → busca em `imported_skins` (funciona)
3. Admin seleciona uma skin → `updateSlot.mutate()` faz UPDATE imediato no banco
4. Landing page usa `useShowcaseSkins()` que faz SELECT com join nos slots preenchidos

### Onde o fluxo quebra — duas causas raiz

**Causa 1: RLS bloqueia escrita anônima.**
O admin não está autenticado. O Supabase client usa a `anon` key. A tabela `showcase_slots` só permite escrita para `authenticated`. Resultado: o UPDATE falha silenciosamente (ou com erro ignorado) — a skin nunca é salva no banco.

Confirmação: as políticas RLS são `"Authenticated users can manage showcase_slots" FOR ALL TO authenticated`. Anon só tem SELECT.

**Causa 2: Não existe padrão de prévia + salvar.**
O código atual tenta salvar imediatamente ao clicar na skin (sem botão "Salvar"). Mesmo que o RLS fosse aberto, não existe distinção entre "prévia local" e "publicado". O usuário não tem feedback de alterações pendentes.

### Respostas explícitas aos 8 pontos

1. **Estado local de edição?** Não. Salva direto (ou tenta).
2. **Estado persistido?** Não funciona — RLS bloqueia anon.
3. **Distinção prévia vs publicado?** Não existe.
4. **Slot recebe a skin?** Não — UPDATE falha por RLS.
5. **Ação de salvar?** Ausente — tenta salvar por slot individualmente.
6. **Frontend lê fonte certa?** Sim — `useShowcaseSkins` lê `showcase_slots` com join.
7. **Dados fixos, mock ou persistidos?** Persistidos, mas todos os 32 slots estão vazios (skin_id = null).
8. **Dados sobrevivem refresh?** Nada foi salvo, então não há o que sobreviver.

### Plano de correção

#### 1. Abrir RLS para escrita anônima (temporário)
Adicionar políticas permitindo anon fazer UPDATE na `showcase_slots`. Sem auth implementada, é a única forma de funcionar. Será substituída por auth no futuro.

Migration SQL:
```sql
CREATE POLICY "Anon can update showcase_slots"
  ON public.showcase_slots FOR UPDATE TO anon
  USING (true);
```

#### 2. Refatorar SlotManager para padrão prévia + salvar

O componente passará a ter:
- **Estado local `pendingChanges`**: um `Map<slotId, skinId | null>` com as alterações não salvas
- Ao selecionar uma skin, ela entra no `pendingChanges` (prévia local), sem tocar o banco
- Os slots com alterações pendentes mostram a skin selecionada com uma borda visual diferente (indicador de "não salvo")
- **Botão "Salvar alterações"** visível quando há mudanças pendentes
- Ao clicar salvar: faz UPDATE em batch para todos os slots alterados → feedback de loading → toast de sucesso/erro
- Ao remover uma skin, também entra como pendente
- Counter de "X alterações pendentes"

#### 3. Feedback visual

- Slot com alteração pendente: borda amarela/amber
- Barra fixa no topo com "X alterações não salvas" + botão "Salvar" + botão "Descartar"
- Loading spinner durante o salvamento
- Toast de sucesso/erro
- Invalidação do cache `showcase-skins` após salvar (para a landing page atualizar)

#### 4. Arquivos alterados

| Arquivo | Ação |
|---|---|
| Migration SQL (nova) | Adicionar política anon UPDATE em showcase_slots |
| `src/components/admin/SlotManager.tsx` | Refatorar para draft state + batch save |
| `src/components/admin/SkinSearchModal.tsx` | Adicionar `aria-describedby` (fix console warning) |

Nenhum outro arquivo precisa ser alterado. A landing page (`CategoriesSection.tsx`) e o hook `useShowcaseSkins` já estão corretos — o problema é que nada era salvo.

#### Fora de escopo
- Autenticação/login do admin
- Permissões e roles
- Refazer visual da landing page

