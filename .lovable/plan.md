

## Plano: Redesign de conversão — FireSkins Landing Page

Quatro mudanças principais para ampliar o apelo da página sem perder a estética premium gamer. Todas as seções novas seguem o tom visual existente (fundo escuro, laranja como accent, púrpura como glow secundário, fontes Rajdhani/Inter).

---

### CHANGE 1 — Hero Section (copy + CTAs)
**Arquivo:** `src/components/HeroSection.tsx`

- Manter headline existente ("Compre, Venda e Faça Upgrade das Suas Skins")
- Substituir subtítulo por: *"De skins acessíveis a upgrades premium, a FireSkins encontra opções para diferentes estilos e budgets."*
- Substituir os dois botões CTA:
  - **Primary (fire):** "Montar meu inventário" → abre `https://wa.me/5511999999999?text=Olá! Quero montar meu inventário na FireSkins.`
  - **Secondary (fire-outline):** "Ver opções no WhatsApp" → abre `https://wa.me/5511999999999?text=Olá! Quero ver opções disponíveis na FireSkins.`
- Ambos usam o link do WhatsApp group existente (`https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK`)

---

### CHANGE 2 — Nova seção Budget (após hero)
**Novo arquivo:** `src/components/BudgetSection.tsx`

- Título: "Encontre skins no seu estilo e no seu budget"
- Subtítulo: "Atendemos desde o primeiro upgrade até o inventário dos sonhos."
- 4 cards em grid (2x2 mobile, 4 colunas desktop):
  - Cada card: fundo escuro (`bg-card/60`), borda `border-primary/15`, hover com glow laranja/púrpura, ícone `ArrowRight`
  - Card 1: "Até R$300" — "Entrada no jogo com estilo"
  - Card 2: "R$300 a R$800" — "Upgrades que fazem diferença"
  - Card 3: "R$800 a R$2.000" — "Inventário de alto nível"
  - Card 4: "Acima de R$2.000" — "O inventário que todos notam"
- Cada card abre WhatsApp com mensagem pré-preenchida específica
- Todos os cards com mesmo tamanho e peso visual

---

### CHANGE 3 — Nova seção Montador de Inventário (após budget)
**Novo arquivo:** `src/components/InventoryBuilderSection.tsx`

- Título: "Montador de Inventário"
- Subtítulo: "Responda 3 perguntas e receba sugestões personalizadas no WhatsApp."
- Indicador de progresso (Step 1/2/3) no topo
- Step 1 — "Qual seu budget?" — pill buttons: Até R$300 · R$300–R$800 · R$800–R$2.000 · Acima de R$2.000
- Step 2 — "Quais armas você usa?" (aparece após step 1) — pill buttons multi-select: AK-47 · M4A4 · AWP · Facas · Luvas · Pistolas · Outros
- Step 3 — "Qual seu estilo?" (aparece após step 2) — pill buttons: Minimalista · Colorido · Dark · Raro · Qualquer um
- Após as 3 seleções: botão CTA "Receber sugestões no WhatsApp →" abre WhatsApp com mensagem: `Olá! Quero montar meu inventário na FireSkins. Budget: [X]. Armas: [X]. Estilo: [X].`
- Uso de `useState` para controlar seleções e visibilidade progressiva dos steps
- Pills com estado selecionado em laranja (`bg-primary text-primary-foreground`)

---

### CHANGE 4 — Nova seção Trust/Levels (após inventory builder)
**Novo arquivo:** `src/components/TrustLevelsSection.tsx`

- Título: "Do primeiro upgrade ao inventário dos sonhos."
- Subtítulo: "A FireSkins atende jogadores em todos os níveis."
- 3 cards horizontais (1 coluna mobile, 3 colunas desktop):
  - **Entrada** — ícone `Gamepad2` — "Seu primeiro upgrade com curadoria e segurança. Skins que valorizam sem pesar no bolso."
  - **Intermediário** — ícone `Flame` — "Inventário equilibrado, com peças que combinam estilo e valor de revenda."
  - **Premium** — ícone `Crown` — "Itens raros, knifes e gloves para quem quer o inventário que todos notam."
- Cada card com mesmo tamanho/peso visual, borda sutil, hover com glow
- Link "Falar com especialista →" em cada card, abre WhatsApp com mensagem referenciando o nível

---

### CHANGE 5 — Index.tsx (ordem das seções)
**Arquivo:** `src/pages/Index.tsx`

Inserir as 3 novas seções na ordem correta:
```text
HeroSection
BudgetSection          ← novo
InventoryBuilderSection ← novo
TrustLevelsSection      ← novo
CategoriesSection
VideoShowcase
TestimonialsSection
FinalCTA
Footer
```

---

### Regras de design aplicadas
- Fundo escuro (`bg-black` / `bg-card`) em todas as seções novas
- Accent laranja apenas para CTAs e estados ativos
- Púrpura apenas como glow/borda secundária no hover
- Fontes: Rajdhani para títulos, Inter para corpo
- Tamanhos: títulos 32–40px, subtítulos 16–18px, texto de card 14–15px
- Border radius: `rounded-xl` (consistente com cards existentes)
- Responsivo mobile-first
- Sem animações novas além de hover states sutis

