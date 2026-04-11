
# Centralizar título e perguntas do FAQ

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/FAQSection.tsx` | Centralizar título, subtítulo e accordion no centro da seção |

## Detalhe

- Adicionar `text-center` e `flex flex-col items-center` ao container interno
- Centralizar o grupo do título (ícone + heading) com `justify-center`
- Centralizar o subtítulo
- O accordion já tem `max-w-3xl`, basta adicionar `mx-auto` se não tiver
