

# Fixar tamanho dos cards na seção Sobre

## Problema
Quando o texto dos cards é alterado no admin (título, valor, descrição), o conteúdo pode fazer o card crescer ou encolher, quebrando o alinhamento visual do grid.

## Solução
Aplicar altura fixa nos cards e limitar o overflow do texto, garantindo tamanho uniforme independente do conteúdo.

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Adicionar altura fixa e overflow controlado nos cards |

## Detalhe técnico

- Adicionar `h-[200px]` (ou valor similar) no `div` do card para fixar a altura
- Adicionar `overflow-hidden` em todos os cards (não só no Comunidade)
- Aplicar `line-clamp-1` no título e valor, `line-clamp-2` na descrição para truncar textos longos
- Manter `justify-center` no flex para centralizar conteúdo verticalmente dentro da altura fixa

