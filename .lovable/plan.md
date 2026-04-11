

# Corrigir tamanho do card Comunidade

## Problema
A logo de 200x200px está expandindo o card Comunidade, deixando-o maior que os outros cards. O card precisa voltar ao tamanho original, com a logo grande mas contida via `overflow-hidden`.

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Limitar altura do container da logo e manter `overflow-hidden` no card |

## Detalhe

- O card já tem `overflow-hidden` (linha 83), então basta limitar a área da logo
- Envolver a logo em um `div` com altura fixa (ex: `h-12`) e `overflow-visible` para que a logo "vaze" visualmente mas não empurre o layout do card
- Alternativa mais limpa: usar `absolute` positioning na logo dentro do card para que ela não afete o flow do card, mantendo o tamanho dos outros cards

**Abordagem escolhida**: Posicionar a logo com margins negativas (`-mt-8 -mb-8`) para que ela ocupe visualmente 200px mas só "consuma" ~48px de espaço no layout, igualando ao ícone circular dos outros cards.

