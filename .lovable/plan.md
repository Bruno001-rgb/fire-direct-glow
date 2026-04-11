

# Smoke/névoa na base da foto da equipe

## O que muda

Adicionar um efeito de fumaça/névoa na parte inferior da foto da equipe, fazendo o corte sumir organicamente no fundo escuro. Usando gradientes sobrepostos na base da imagem para simular névoa.

## Alteração em `src/components/HeroSection.tsx`

Envolver a `<img>` num container `relative` e adicionar uma div com gradiente sobreposto na parte inferior (~40% da altura), criando camadas de fade:

- Gradiente principal: `transparent → black` cobrindo o terço inferior
- Camada de névoa: gradiente radial com leve tom laranja/cinza para dar textura de smoke (não apenas um corte reto)
- Leve blur via `backdrop-blur-sm` numa faixa estreita para suavizar ainda mais

```
┌─────────────┐
│   Foto      │
│             │
│  ░░░névoa░░ │  ← gradiente + blur suave
│▓▓▓▓▓▓▓▓▓▓▓▓│  ← fade total para preto
└─────────────┘
```

| Arquivo | Ação |
|---------|------|
| `src/components/HeroSection.tsx` | Wrapper com overlay de névoa na base da foto |

