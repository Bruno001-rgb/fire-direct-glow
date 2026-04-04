

## Diagnóstico

### Stack
React 18 + Vite + TypeScript + Tailwind + shadcn/ui + TanStack Query + Supabase (Lovable Cloud)

### CTAs atuais e inconsistencias encontradas

| Local | Estilo | Problema |
|---|---|---|
| **Header** | `<Button variant="whatsapp">` via shadcn | Usa `animate-pulse-glow`, tamanho `h-8/h-9` |
| **Hero (primario)** | `<a>` com inline `style={{ background: linear-gradient }}` | Estilo manual, nao usa componente Button |
| **Hero (secundario)** | `<a>` com inline `style={{ border, color }}` | Estilo manual, nao usa componente Button |
| **CategoriesSection** | `<Button variant="whatsapp">` | Usa shadcn, OK |
| **SkinCard "Negociar"** | `<span>` estilizado inline | Nao e botao real, visual custom |
| **VideoShowcase (primario)** | `<button>` com inline gradient style | Estilo manual |
| **VideoShowcase (secundario)** | `<button>` com inline border/color style | Estilo manual |
| **FinalCTA** | `<Button variant="whatsapp" size="lg">` | Usa shadcn, mas `bg-whatsapp` que e `--whatsapp: 22 91% 47%` (laranja, nao verde) |
| **Footer** | Nenhum CTA real, so links de nav | OK |

**Inconsistencias:** Os CTAs primarios do Hero e VideoShowcase sao `<a>`/`<button>` com estilos inline, sem usar o componente `Button`. Os secundarios tambem sao inline. A variante `whatsapp` do Button usa `animate-pulse-glow` (pode ser excessivo). Ha 3 padroes visuais diferentes para o mesmo tipo de CTA.

### Plano de correcao

**1. Padronizar CTAs**
- Criar duas variantes novas no `button.tsx`: `fire` (primario — gradient laranja) e `fire-outline` (secundario — borda laranja)
- Substituir todos os CTAs inline do Hero e VideoShowcase por `<Button variant="fire">` e `<Button variant="fire-outline">`
- Remover `animate-pulse-glow` da variante `whatsapp` (ou renomear para `fire`)
- Manter consistencia de `size`, `tracking`, `font` em todos os CTAs

**2. Seção de Depoimentos**
- Nova tabela `testimonials` no Supabase: `id`, `image_url`, `title`, `is_active`, `sort_order`, `created_at`, `updated_at`
- RLS: leitura publica (anon+authenticated), escrita anon (temporario, igual showcase_slots)
- Storage bucket `testimonials` (publico) para upload de imagens
- Componente `TestimonialsSection.tsx` com carrossel horizontal auto-scroll (CSS animation, sem lib externa)
- Visual: cards com borda sutil, sombra, padding, `rounded-xl`, fundo escuro, imagens com `object-contain` em aspect `9/16` ou `3/4`
- Posicionar entre `VideoShowcase` e `Footer` no Index

**3. Admin de Depoimentos**
- Adicionar tabs no `/admin`: "Skins" e "Depoimentos"
- Nova tab com:
  - Upload de imagem (via Supabase Storage)
  - Grid de depoimentos com preview, toggle ativo/inativo, botao remover
  - Drag-free ordering via botoes seta (up/down) ou input de `sort_order`
  - Botao "Salvar" com feedback (mesmo padrao do SlotManager)
- Hook `useTestimonials.ts` para LP e admin

### Arquivos a criar
- `src/components/TestimonialsSection.tsx`
- `src/components/admin/TestimonialsManager.tsx`
- `src/hooks/useTestimonials.ts`
- Migration SQL (tabela + storage bucket + RLS)

### Arquivos a alterar
- `src/components/ui/button.tsx` — adicionar variantes `fire` e `fire-outline`
- `src/components/HeroSection.tsx` — substituir CTAs inline por `<Button>`
- `src/components/VideoShowcase.tsx` — substituir CTAs inline por `<Button>`
- `src/components/FinalCTA.tsx` — ajustar variante do botao
- `src/pages/Index.tsx` — adicionar `TestimonialsSection`
- `src/pages/Admin.tsx` — adicionar sistema de tabs com "Skins" e "Depoimentos"

### Fora de escopo
- Autenticacao do admin
- Permissoes e roles
- Refazer layout geral da LP
- Alterar SkinCard ou sidebar

