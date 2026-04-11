

# Card Comunidade sempre clicável

## O que será feito

Adicionar um fallback no `AboutSection.tsx`: quando o card "Comunidade" não tiver `href` definido, ele redireciona para uma página padrão (`/comunidade` ou exibe um toast informando "Link em breve").

A melhor abordagem: se `item.key === "comunidade"` e `item.href` estiver vazio, o card ainda será clicável mas mostrará um toast "Link da comunidade será definido em breve pelo admin" — assim não quebra nada e dá feedback ao usuário.

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | No bloco de retorno (linhas 108-129), adicionar lógica: se `!item.href` e `isCommunity`, renderizar o card dentro de um `<div onClick>` com cursor pointer que dispara um `toast.info("Em breve!")`. Cards normais sem href continuam sem link. |

Resultado: o card Comunidade sempre terá aparência clicável. Quando o admin definir o link, ele redireciona normalmente. Sem link, mostra feedback amigável.

