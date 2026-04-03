

# Reestruturação da LP FireSkins inspirada na HellCS2

## Referência analisada

A HellCS2 usa uma estrutura imersiva de plataforma gamer:
- **Sidebar esquerda** com skins rolando verticalmente (live feed visual)
- **Banner hero full-width** com imagem cinematográfica grande
- **Navegação por abas horizontais** para categorias (Cases, Facas, Collections, etc.)
- **Grid denso de cards** com imagens grandes e botões de ação
- **Layout escuro contínuo** sem separações óbvias entre seções
- **Sensação de catálogo vivo**, não de landing page tradicional

## O que muda

A FireSkins continua sendo uma LP de conversão via WhatsApp (sem login, sem marketplace real), mas a estrutura visual e o ritmo da página vão se aproximar da HellCS2.

### 1. Sidebar de skins (desktop only)
- Coluna fixa à esquerda (~120px) com cards de skins pequenos rolando automaticamente
- Cada card: imagem da arma, nome curto, rarity badge
- Clicáveis para WhatsApp
- Escondida no mobile (não há espaço)
- Efeito de scroll infinito com CSS animation

### 2. Hero reestruturado como banner
- Full-width, mais largo e cinematográfico (estilo banner de evento)
- Imagem de fundo grande com overlay gradiente
- Headline e CTA centralizados sobre o banner
- Countdown ou badge de destaque ("NOVAS SKINS DISPONÍVEIS")
- Botões de WhatsApp + Ver Catálogo sobre a imagem

### 3. Navegação por abas horizontais
- Substituir seções empilhadas (Facas, Luvas, Skins em destaque) por uma barra de abas
- Abas: "Todas", "Facas", "Luvas", "Rifles", "Snipers"
- Conteúdo muda ao clicar na aba, mostrando grid de skins filtrado
- Layout em grid 3-4 colunas (desktop), 2 colunas (mobile)

### 4. Grid de skins unificado
- Cards maiores com imagem dominante
- Badge de raridade no canto
- Nome da skin + tipo
- Botão "Negociar" (WhatsApp) em cada card
- Hover glow com borda laranja

### 5. Seções inferiores compactadas
- Trust strip permanece como está
- "Como funciona" e "Benefícios" podem ser mergeados em uma seção compacta
- Final CTA permanece

## Arquivos que serão editados

| Arquivo | Mudança |
|---------|---------|
| `src/pages/Index.tsx` | Nova estrutura com sidebar + main content layout |
| `src/components/HeroSection.tsx` | Reescrito como banner full-width |
| `src/components/CategoriesSection.tsx` | Substituído por sistema de abas + grid unificado |
| `src/components/FeaturedSkins.tsx` | Mergeado no grid unificado de abas |
| `src/components/SkinsSidebar.tsx` | **Novo** — sidebar com skins rolando |
| `src/index.css` | Novas utilities para sidebar scroll e tab styles |
| `src/components/HowItWorks.tsx` | Compactado |
| `src/components/BenefitsSection.tsx` | Compactado |

## Detalhes técnicos

- Sidebar usa `position: sticky` no desktop com `overflow-y: auto` e auto-scroll CSS animation
- Abas implementadas com estado React local (`useState`) sem biblioteca extra
- Grid responsivo com `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
- Hero usa `background-image` com overlay gradiente ao invés de `<img>` ao lado do texto
- Todas as skins existentes (facas, luvas, rifles) unificadas em um array único com campo `category` para filtrar

