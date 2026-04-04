
## Plano: Substituir Instagram por slogan no footer

### O que muda
No lado esquerdo do footer, o link do Instagram ("fireskinscs2" com ícone) será substituído por uma frase de impacto estilizada com as cores da marca.

### Sugestões de frase
- "A #1 em skins CS2 do Brasil"
- "Sua loja de confiança em skins CS2"
- "O melhor deal em skins CS2"

### Alteração técnica
**Arquivo:** `src/components/Footer.tsx`
- Remover o bloco `<a href="https://instagram.com/fireskinscs2">` (lado esquerdo, ~linhas 53-67) que contém o ícone Instagram + texto "fireskinscs2"
- Substituir por um `<p>` com a frase escolhida, estilizado com gradiente laranja/dourado (#E95A0C → #F5A006), texto uppercase, font-bold, tracking-wider
- Manter o mesmo espaçamento (`mb-3`) para não afetar o layout abaixo
