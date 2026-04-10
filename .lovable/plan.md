

# Centralizar WHATSAPP_URL

## O que muda
1. Criar `src/constants.ts` exportando `WHATSAPP_URL`
2. Em 6 arquivos, remover a declaração local e importar de `@/constants`

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/constants.ts` | Criar com `export const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";` |
| `src/components/CategoriesSection.tsx` | Remover linha `const WHATSAPP_URL = ...`, adicionar `import { WHATSAPP_URL } from "@/constants";` |
| `src/components/FinalCTA.tsx` | Idem |
| `src/components/Footer.tsx` | Idem |
| `src/components/Header.tsx` | Idem |
| `src/components/HeroSection.tsx` | Idem |
| `src/components/SkinsSidebar.tsx` | Idem |

Nenhuma mudança de comportamento, estilo ou estrutura.

