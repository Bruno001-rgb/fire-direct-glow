

## Plano: Refinar VideoShowcase para Match com Referência

A imagem de referência mostra um layout mais limpo e polido, com elementos-chave bem definidos. Vou ajustar o componente atual para se aproximar mais desse estilo.

### Mudanças Principais

**1. Frame do vídeo — mais polido e limpo**
- Substituir as sidebars (rails laterais) por um border frame mais elegante com cantos decorativos estilo "armored" usando gradientes laranja/roxo
- Manter a borda arredondada mas com um estilo mais facetado/angular nos cantos (tipo moldura de visor tático)
- Reduzir a complexidade visual — menos noise, mais impacto

**2. Play button — mais fiel à referência**
- Manter o ícone Power com o gradiente laranja
- Adicionar anel hexagonal/geométrico ao redor (como na imagem) em vez dos múltiplos rings genéricos
- Glow mais concentrado e quente (laranja dominante)

**3. Background — mais profundo e coeso**
- Manter o deep purple base (#1A0B2A)
- Aumentar a opacidade dos wireframes de armas (Karambit à esquerda, AWP à direita) para ficarem mais visíveis como na referência
- Adicionar rim lighting laranja nas bordas laterais da seção

**4. Layout e tipografia**
- Título "CONHEÇA A FIRESKINS" — aumentar tamanho e peso do gradiente
- Manter o badge "VEJA COMO FUNCIONA" com borda dourada mais visível
- Manter o texto descritivo com ícones de escudo/relógio
- Bottom bar do vídeo — simplificar com flame icon + "FIRESKINS — SUA LOJA DE SKINS CS2" + "3." mais limpo

**5. Detalhes de polimento**
- Remover as chrome bars (top/bottom) muito técnicas e substituir por um frame integral mais elegante
- Cantos do frame com L-brackets mais visíveis (laranja/dourado)
- HUD readouts mais sutis e integrados
- Sparkle/estrela no canto inferior direito da seção (como na referência)

### Arquivos Modificados
- `src/components/VideoShowcase.tsx` — reescrita do layout e estilos

