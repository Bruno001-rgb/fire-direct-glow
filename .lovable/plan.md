

## Diagnóstico Completo

### Stack e estrutura
React 18 + Vite + TypeScript + Tailwind + shadcn/ui + TanStack Query + Supabase (Lovable Cloud)

### Respostas às 10 validações

1. **Estado local de edição no admin?** SIM — `pendingChanges` Map no SlotManager
2. **Estado persistido?** SIM — 4 skins estão salvas no banco (facas slots 1-4)
3. **Distinção prévia vs publicado?** SIM — borda amber + badge "Não salvo" para pendentes
4. **Slot recebe a skin?** SIM — UPDATE funciona (RLS anon foi aberto na última correção)
5. **Ação de salvar existe?** SIM — botão "Salvar e publicar" com batch update
6. **Frontend lê a fonte certa?** SIM — `useShowcaseSkins` faz join correto nos slots
7. **Dados mockados ou persistidos?** Persistidos — mas só 4 slots preenchidos de 32
8. **Dados sobrevivem ao refresh?** SIM — confirmado via query direta no banco
9. **Esteira esquerda sincronizada?** NAO — `SkinsSidebar.tsx` usa array hardcoded de imagens locais (assets .jpg)
10. **Problema visual da imagem?** SIM — `object-cover` em container `aspect-square` corta imagens da API que têm fundo transparente e são renderizadas em formato paisagem

### Onde o fluxo quebra

| Problema | Causa raiz |
|---|---|
| Imagem cortada/zoom nos cards | `object-cover` força preenchimento do container quadrado. Imagens da API são paisagem com fundo transparente → deveria usar `object-contain` |
| Esteira esquerda com skins erradas | `SkinsSidebar.tsx` tem array hardcoded de assets locais, sem conexão com banco |
| Admin "não funciona" | Na verdade funciona — 4 skins estão salvas. O usuário pode não ter percebido o fluxo completo |

### Plano de correção

#### 1. Corrigir imagem nos cards da landing page
Em `CategoriesSection.tsx`, trocar `object-cover` por `object-contain` no `<img>` do SkinCard. Adicionar padding interno para enquadramento premium. Ajustar o aspect ratio do container de `aspect-square` para algo mais favorável (ex: `aspect-[4/3]`).

#### 2. Conectar esteira esquerda ao banco
Refatorar `SkinsSidebar.tsx`:
- Remover o array hardcoded e imports de assets locais
- Usar o hook `useShowcaseSkins()` para ler as skins configuradas no admin
- Mapear os dados para o formato que o componente espera
- Manter a animação de scroll e a duplicação de itens para loop infinito
- Se não houver skins configuradas, não renderizar a sidebar

#### 3. Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `src/components/CategoriesSection.tsx` | `object-cover` → `object-contain`, ajuste de aspect ratio e padding |
| `src/components/SkinsSidebar.tsx` | Remover hardcoded, usar `useShowcaseSkins()` |

#### Fora de escopo
- Autenticação do admin
- Permissões e roles
- Refazer layout geral da landing page
- Problemas no fluxo de save do admin (já está funcionando)

