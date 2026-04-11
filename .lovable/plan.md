

# Redesign Footer — Estilo CSGO-Skins.com

Recriar o footer inspirado no csgo-skins.com: banner com a imagem enviada no topo, barra de estatísticas com números grandes, logo e copyright embaixo. Tudo em fundo escuro.

## Layout proposto

```text
┌─────────────────────────────────────────────────────────────────┐
│  [IMAGEM BANNER FULL-WIDTH — imagem .avif enviada]             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1.200+          24h           100%          desde 2024         │
│  Negociações     Atendimento   Seguro        no mercado CS2     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [LOGO FIRESKINS]                                               │
│                                                                 │
│  Termos de Serviço  |  Política de Privacidade                 │
│  © FIRESKINS 2026 — TODOS OS DIREITOS RESERVADOS.              │
└─────────────────────────────────────────────────────────────────┘
```

## Alterações

### 1. Copiar imagem para `src/assets/footer-banner.avif`
Copiar `user-uploads://8681e1b9-0f35-46f6-bfd8-c756ffa5447d.avif` para o projeto.

### 2. Reescrever `src/components/Footer.tsx`

- **Banner**: Imagem full-width no topo com `object-cover`, altura limitada (~300px)
- **Barra de stats**: 4 colunas com números grandes (bold, ~2xl-3xl) e labels menores embaixo, fundo `bg-card` ou similar escuro, separada por bordas sutis. Dados FireSkins:
  - "1.200+" / "Negociações"
  - "24h" / "Atendimento"
  - "100%" / "Seguro"
  - "desde 2024" / "no mercado CS2"
- **Seção inferior**: Logo FireSkins centralizada, links para Termos e Privacidade, copyright
- Remover: tagline lateral, colunas de links, "Ir ao topo", texto gigante decorativo
- Manter `useWhatsAppUrl` se necessário para algum link

| Arquivo | Ação |
|---------|------|
| `src/assets/footer-banner.avif` | Copiar imagem enviada |
| `src/components/Footer.tsx` | Reescrever completamente |

