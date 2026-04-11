

# Remover título e subtítulo da seção "Conheça a FireSkins"

## O que muda

Remover o bloco de título (`h2` + `p`) da `AboutSection` e ajustar o padding/margin para que os cards fiquem com espaçamento correto sem o cabeçalho.

## Alteração em `src/components/AboutSection.tsx`

1. **Remover** o `div` com `text-center mb-10 sm:mb-14` que contém o `h2` "CONHEÇA A FIRESKINS" e o `p` "Transparência e segurança..."
2. **Ajustar** o padding da `section` de `py-16 sm:py-20` para `py-10 sm:py-14` para compensar o espaço vazio deixado pelo título removido

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Remover heading + subtitle, ajustar padding |

