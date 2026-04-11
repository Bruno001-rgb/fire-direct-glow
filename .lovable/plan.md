

# Foto da equipe como background da Hero

Transformar a foto da equipe em uma imagem de fundo integrada à seção hero, removendo a moldura quadrada e aumentando o tamanho para dar a sensação de que faz parte do site.

## Alterações em `src/components/HeroSection.tsx`

**Remover**: O bloco inteiro da coluna direita (div com a foto, glows, borda `border-primary/15`)

**Adicionar**: A foto como background absoluto da seção hero:
- Posicionada no lado direito (ou cobrindo toda a seção com opacity reduzida)
- Sem `rounded-2xl` e sem a borda (`border border-primary/15` — a "linha quadrada")
- Tamanho maior: `w-full` ou pelo menos `w-[60%]` do lado direito, cobrindo a altura toda
- `object-cover` para preencher sem distorção
- Overlay escuro com gradiente da esquerda para a direita para o texto continuar legível
- Manter o glow laranja pulsante por trás como efeito atmosférico sutil

**Layout**: Mudar de grid 2 colunas para layout single-column com texto sobre a foto de fundo. O texto fica à esquerda com o gradiente escuro protegendo a leitura, e a foto aparece mais no lado direito.

```text
┌──────────────────────────────────────────────────┐
│  gradient overlay  │        FOTO (background)    │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  TEXTO AQUI  ░░░░░░░░░░ equipe visível ░░░░░░░░ │
│  CTA buttons ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  trust items ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────────────────────┘
```

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Reestruturar: foto como bg, remover borda, remover grid 2col |

