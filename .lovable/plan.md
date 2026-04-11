

# Alinhar logo com o ícone do email, mantendo altura atual

## O que será feito

No `src/components/Footer.tsx`, a logo atualmente usa `self-start` mas está acima do email. O usuário quer que a borda esquerda da logo fique alinhada com o ícone do email (que tem `pl-0`, começa no início da coluna), mas mantendo a posição vertical atual (com o `lg:-mt-6`).

O problema é que a logo é muito larga e pode estar deslocada visualmente. A solução é garantir que a logo tenha `ml-0` e `self-start` (já tem), e possivelmente adicionar um pequeno `ml` ou ajustar o `object-position` para alinhar visualmente a parte do ícone da logo com o ícone do Mail.

Como a logo já usa `self-start` e a coluna é flex-col, ambos já começam no mesmo ponto esquerdo. O desalinhamento visual provavelmente vem do padding interno da imagem da logo. Vou adicionar `object-position: left` e usar margem negativa esquerda pequena se necessário para compensar qualquer whitespace interno da imagem.

## Alteração

**`src/components/Footer.tsx` linha 71:**
- Manter `lg:-mt-6` (altura atual)
- Adicionar `-ml-2` para compensar padding interno da imagem e alinhar visualmente com o ícone do email
- Manter todas as outras classes

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Adicionar `-ml-2` na img da logo para alinhar com ícone do email |

