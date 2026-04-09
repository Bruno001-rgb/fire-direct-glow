

## Plano: Redesign do botão "Testar no jogo" como banner com imagem de fundo

### Objetivo
Transformar o botão simples "Testar no jogo" em um banner/card estilizado como na referência: fundo com imagem do CS2 escurecida, ícone de soldado à esquerda, texto descritivo, e botão "Entrar" à direita.

### Design (baseado na imagem de referência)
```text
┌─────────────────────────────────────────────────────────┐
│ [bg: imagem CS2 escurecida com overlay]                 │
│  🔫  Jogue com a skin antes de comprá-la!    [Entrar]  │
│      Inicie o servidor, entre nele, e faça um           │
│      test drive com a skin no jogo                      │
└─────────────────────────────────────────────────────────┘
```

### Mudanças

**1. Adicionar imagem de fundo CS2**
- Usar uma imagem pública de CS2 (ex: de Unsplash ou similar) como background do banner
- Salvar em `public/images/cs2-banner.jpg`

**2. `src/components/catalogo/SkinDetailModal.tsx`** (linhas 269-274)
- Substituir o `<Button>` simples por um componente de banner/card:
  - Container com `relative overflow-hidden rounded-lg`
  - Imagem de fundo com overlay escuro (`bg-black/60`)
  - Lado esquerdo: ícone Crosshair/Gamepad2 + textos ("Jogue com a skin antes de comprá-la!" + subtítulo)
  - Lado direito: botão "Entrar" com estilo sólido
  - `onClick` continua abrindo o `TryInGameModal`
  - Responsivo: texto menor no mobile

### Nenhuma outra alteração
Apenas o visual do botão muda. A lógica de `canTryInGame`, o modal de instruções e tudo mais permanece igual.

