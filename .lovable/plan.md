

# Aplicar elementos visuais do Skin.Club no FireSkins

## Elementos identificados no Skin.Club para adaptar

1. **Barra de stats no topo** — números de usuários online, trades, skins (prova social em tempo real)
2. **Live Drop ticker horizontal** — faixa com skins rolando horizontalmente logo abaixo do header, mostrando "drops" recentes com imagens e nomes
3. **Hero banner mais cinematográfico** — full-width com imagem de fundo grande e CTAs sobrepostos
4. **Sub-tabs com estilo mais refinado** — tabs com underline ativo ao invés de background sólido, estilo mais clean
5. **Layout contínuo e escuro** — sem separações bruscas entre seções

## O que será implementado

### 1. Stats Bar (nova faixa acima do header)
- Faixa fina no topo com dados como: "🔥 247 skins disponíveis • 1.2K+ negociações • Resposta em < 5 min"
- Estilo: fundo escuro com texto pequeno, animação sutil de scroll horizontal no mobile
- Arquivo: novo componente `StatsBar.tsx`

### 2. Live Drop Ticker (horizontal)
- Faixa horizontal abaixo do hero com skins rolando automaticamente (como o "LIVE DROP" do Skin.Club)
- Cards compactos horizontais: imagem quadrada pequena + nome + raridade
- Scroll infinito com CSS animation (translateX)
- Substitui visualmente parte do trust strip
- Arquivo: novo componente `LiveDropTicker.tsx`

### 3. Cards do catálogo refinados
- Adicionar preço indicativo ou badge "DISPONÍVEL" no card
- Hover mais pronunciado com borda brilhante
- Imagem com fundo gradiente sutil (não flat)
- Botão "Negociar" visível sempre (não só no hover)

### 4. Header com navegação inline
- Adicionar links âncora no header: "Catálogo", "Como funciona", "Contato"
- Visíveis apenas no desktop
- Estilo minimalista com hover laranja

### 5. Ajustes gerais de visual
- Tabs do catálogo com estilo underline (não pill sólida)
- Remover trust strip separado (dados migram para stats bar + live ticker)
- Footer mais compacto

## Arquivos editados

| Arquivo | Mudança |
|---------|---------|
| `src/components/StatsBar.tsx` | **Novo** — barra de stats no topo |
| `src/components/LiveDropTicker.tsx` | **Novo** — ticker horizontal de skins |
| `src/components/Header.tsx` | Navegação inline desktop |
| `src/components/CategoriesSection.tsx` | Cards e tabs refinados |
| `src/components/TrustStrip.tsx` | Removido (dados migram) |
| `src/pages/Index.tsx` | Layout atualizado com novos componentes |
| `src/index.css` | Keyframes para ticker horizontal |

## Detalhes técnicos

- Live Drop Ticker usa CSS `@keyframes` com `translateX(-50%)` e conteúdo duplicado para loop infinito
- Stats bar é estática com dados hardcoded (não há backend)
- Header nav links usam `scroll-behavior: smooth` via âncoras
- Cards mantêm WhatsApp deep-links

