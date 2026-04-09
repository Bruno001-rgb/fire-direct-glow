

## Plano: 3 Funcionalidades com API ByMykel

### Resumo
Adicionar catálogo dinâmico, modal de detalhes e montador de loadout usando a API pública ByMykel. Nenhuma seção existente será alterada.

---

### Arquitetura de dados

**Hook central:** `src/hooks/useByMykelSkins.ts`
- Único fetch da API `skins.json` via react-query com `staleTime: Infinity`
- Tipagem completa: name, image, rarity (name/color), weapon, category, min_float, max_float, stattrak, collections
- Estado de erro com retry
- Exporta dados e helpers de filtragem

---

### Funcionalidade 1 — Catálogo Dinâmico

**Nova página:** `src/pages/Catalogo.tsx`
- Rota `/catalogo` adicionada ao `App.tsx`
- Link "Catálogo Completo" adicionado ao nav do `Header.tsx` (sem alterar links existentes)

**Componentes novos:**
- `src/components/catalogo/CatalogoPage.tsx` — layout principal
- `src/components/catalogo/CatalogoFilters.tsx` — barra de filtros fixa no topo
  - Input de busca por texto (filtra `name`)
  - Filtro por arma: AK-47, M4A4, AWP, Faca, Luvas, Todos
  - Filtro por raridade: Consumer → Contraband, Todos
  - Ordenação: A-Z, Float crescente, Float decrescente
  - Mobile: colapsa em botão "Filtrar" que abre sheet
- `src/components/catalogo/CatalogoGrid.tsx` — grid com paginação (50 por página, botão "Carregar mais")
- `src/components/catalogo/CatalogoSkinCard.tsx` — card individual
  - Fundo `#111`, barra colorida no topo com `rarity.color` (inline style)
  - Imagem centralizada, nome bold branco, badge raridade com cor da API
  - Badge "ST" laranja se `stattrak === true`
  - Hover: `scale(1.03)` + border com `rarity.color`
- `src/components/catalogo/CatalogoSkeleton.tsx` — grid de skeleton cards durante loading

---

### Funcionalidade 2 — Modal de Detalhes

**Componente novo:** `src/components/catalogo/SkinDetailModal.tsx`
- Overlay preto 95% opacidade, animação fade+scale 250ms
- Botão X (48x48px), fecha com Escape e swipe down (touch events no mobile)
- Mobile: 100vw × 100vh
- Desktop: 2 colunas

**Coluna esquerda — Imagem:**
- Imagem grande centralizada
- Parallax/tilt 3D no hover: `onMouseMove` calcula rotateX/rotateY (max 15deg) via `transform`
- Container com gradiente sutil usando `rarity.color` a 15% opacidade

**Coluna direita — Dados:**
- Nome grande (24px bold)
- Badge raridade + badge StatTrak
- Barra visual de float range (min_float → max_float)
- Coleção, categoria, arma
- Botão primário laranja: "Tenho interesse — falar no WhatsApp" → abre WhatsApp com mensagem pré-preenchida
- Botão secundário outline: "Adicionar ao loadout" → adiciona ao contexto do loadout

---

### Funcionalidade 3 — Montador de Loadout

**Nova página:** `src/pages/Loadout.tsx` — rota `/loadout`

**Estado global:** `src/contexts/LoadoutContext.tsx`
- Context + Provider com `useState` para 6 slots: AK-47, M4A4, AWP, Desert Eagle, Faca, Luvas
- Funções: `addToSlot(slot, skin)`, `removeFromSlot(slot)`, `clearAll()`
- Persistência em `localStorage`

**Componentes novos:**
- `src/components/loadout/LoadoutGrid.tsx` — grid de 6 slots (2x3 mobile, 3x2 desktop)
  - Slot vazio: ícone da arma + "Selecionar skin"
  - Slot preenchido: imagem + nome + raridade + botão X
  - Click no slot: abre mini-catálogo filtrado
- `src/components/loadout/LoadoutSlotSelector.tsx` — sheet/modal com catálogo filtrado para a arma do slot (reutiliza dados do hook, sem novo fetch)
- `src/components/loadout/LoadoutSummary.tsx` — barra fixa inferior
  - Lista skins selecionadas
  - "Consultar preço" por item (API não tem preços)
  - Botão "Enviar loadout no WhatsApp" com mensagem formatada
- Estado vazio: mensagem + botão "Ver catálogo" → navega para `/catalogo`

**Integração com Header:** adicionar link "Meu Loadout" no nav com badge do número de skins selecionadas

---

### Alterações em arquivos existentes

| Arquivo | Mudança |
|---------|---------|
| `src/App.tsx` | Adicionar rotas `/catalogo` e `/loadout`, wrapping com `LoadoutProvider` |
| `src/components/Header.tsx` | Adicionar 2 links ao nav: "Catálogo Completo" e "Meu Loadout" (com badge) |

Nenhuma outra seção existente será alterada.

---

### Novos arquivos (10)

1. `src/hooks/useByMykelSkins.ts`
2. `src/contexts/LoadoutContext.tsx`
3. `src/pages/Catalogo.tsx`
4. `src/pages/Loadout.tsx`
5. `src/components/catalogo/CatalogoFilters.tsx`
6. `src/components/catalogo/CatalogoGrid.tsx`
7. `src/components/catalogo/CatalogoSkinCard.tsx`
8. `src/components/catalogo/CatalogoSkeleton.tsx`
9. `src/components/catalogo/SkinDetailModal.tsx`
10. `src/components/loadout/LoadoutGrid.tsx`
11. `src/components/loadout/LoadoutSlotSelector.tsx`
12. `src/components/loadout/LoadoutSummary.tsx`

