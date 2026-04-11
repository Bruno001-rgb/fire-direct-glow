

# Ajustes na foto da equipe no Hero

## Alterações em `src/components/HeroSection.tsx`

1. **Aumentar tamanho da foto**: Mudar de `w-[min(80vw,320px)] sm:w-[400px] lg:w-[440px]` para `w-[min(90vw,380px)] sm:w-[480px] lg:w-[540px]` (e aumentar os glows proporcionalmente)

2. **Remover borda quadrada**: Deletar a div na linha 119 (`border border-primary/15`)

3. **Remover animação de flutuação**: Trocar `animate-hero-float` por nenhuma classe de animação (remover do container da foto)

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Foto maior, sem borda, sem float |

