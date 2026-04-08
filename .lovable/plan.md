

## Plano: Substituir o buraco preto do FinalCTA por conteúdo rico

### Problema
A seção FinalCTA usa uma imagem de fundo (`banner-rifas.png`) com `background-size: contain`, o que cria um grande espaço preto vazio ao redor. O resultado é um "buracão" sem conteúdo visual.

### Solução
Substituir a abordagem de imagem de fundo por conteúdo construído em código, inspirado na imagem de referência:

1. **Texto de destaque** no topo: "Participe das nossas rifas e tenha a chance de ganhar skins!" com gradiente laranja/dourado
2. **Pódio visual** no centro: três barras (1º, 2º, 3º lugar) feitas com divs estilizados, com cores da marca (laranja, branco, cinza)
3. **Frase de impacto**: "Sua vaga está reservada, entre agora!" em bold branco
4. **Botão CTA**: manter o botão "Participar da Rifa" existente
5. **Background**: gradiente sutil de preto para tons escuros com vinheta, eliminando o espaço vazio

### Alteração técnica
**Arquivo:** `src/components/FinalCTA.tsx`
- Remover a div com `backgroundImage` e `aspect-[16/9]`
- Construir o layout com elementos HTML/Tailwind: título, pódio animado, subtítulo, botão
- Manter o banner-rifas.png como imagem decorativa (posição absoluta, opacidade reduzida) ou removê-lo se desnecessário
- Adicionar animações sutis (fade-in, glow) consistentes com o resto do site

