

## Plano: Replicar Frame Octagonal da Referência

A imagem mostra um frame de vídeo com **cantos chanfrados octagonais** (não arredondados), com bordas multi-camada em roxo/laranja e elementos específicos. Vou reescrever o componente para replicar esse estilo exato.

### Diferenças-chave vs. código atual

1. **Frame octagonal** — A referência usa `clip-path: polygon()` para criar cantos chanfrados (cortados em 45°), não `border-radius`. O frame tem múltiplas camadas: borda externa roxa, borda interna laranja, e paneling recuado.

2. **Header bar interna** — Dentro do frame, no topo, há uma barra com ícone de fogo + "FIRESKINS" à esquerda e um ícone de escudo à direita, separada do vídeo.

3. **HUD laterais** — Painéis técnicos transparentes nas laterais do vídeo com texto de metadata (como na imagem).

4. **Play button com hexágono** — O botão Power está dentro de um anel hexagonal com glow laranja concentrado.

5. **Bottom bar com "🔥3."** — Flame icon + número "3." grande à esquerda, texto "FIRESKINS — SUA LOJA DE SKINS CS2" embaixo.

6. **Wireframe de Karambit** — Visível sobrepondo o vídeo à direita (wireframe geométrico low-poly da faca).

### Implementação

**Arquivo: `src/components/VideoShowcase.tsx`**

- Substituir o frame `rounded-lg` por um container com `clip-path` octagonal (chanfros de ~30px nos cantos)
- Criar 3 camadas de clip-path aninhadas: borda externa roxa, borda média laranja, conteúdo interno
- Adicionar header bar interna fixa no topo do frame com logo FIRESKINS
- Manter canvas de wireframe com Karambit/AWP mais proeminentes
- Manter play button hexagonal mas com anel mais definido
- Ajustar bottom bar para match exato: flame + "3." grande + texto de branding
- HUD readouts nas laterais dentro do frame

### Estilo do clip-path octagonal
```text
┌──────────────────────────┐
│╲                        ╱│  ← chanfros ~30px
│  ┌────────────────────┐  │
│  │  🔥 FIRESKINS    🛡 │  │  ← header bar
│  ├────────────────────┤  │
│  │                    │  │
│  │     ▶ (Power)      │  │  ← vídeo
│  │                    │  │
│  │ 🔥3.              │  │  ← bottom overlay
│  └────────────────────┘  │
│╱                        ╲│
└──────────────────────────┘
```

### Arquivos modificados
- `src/components/VideoShowcase.tsx` — reescrita completa do frame e layout interno

