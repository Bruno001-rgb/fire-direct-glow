

# Alinhar stats com a foto no desktop

## Problema

No desktop, os stats estão mais estreitos que a foto — precisam ter a mesma largura para ficarem visualmente alinhados.

## Alteração em `src/components/HeroSection.tsx`

Adicionar `w-full` ao container dos stats para que ocupe a mesma largura do wrapper da foto (ambos dentro do mesmo flex column).

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Adicionar `w-full justify-center` ao div dos stats |

