

# Redesign do Footer — Estilo Nivis Gear

Recriar o footer seguindo o estilo da referência: layout limpo e escuro, com "Ir ao topo", tagline + descrição à esquerda, colunas de links, copyright, e o nome "FIRESKINS" gigante no fundo.

## Layout proposto

```text
┌─────────────────────────────────────────────────────────────────┐
│  ↑ IR AO TOPO                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Sua skin, seu                                                  │
│  estilo.™           NOSSOS SERVIÇOS    SUPORTE     CONTATO      │
│                     Comprar skins      FAQ         Fale conosco │
│  FireSkins é o      Vender skins       Sobre nós   Instagram   │
│  melhor marketplace  Programa de        Termos      YouTube     │
│  de skins CS2...     fidelidade         Privacidade WhatsApp    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © FIRESKINS 2026 — TODOS OS DIREITOS RESERVADOS.              │
│                                                                 │
│  ███████╗██╗██████╗ ███████╗███████╗██╗  ██╗██╗███╗   ██╗███████╗  │
│  (texto gigante "FIRESKINS" cortado na base)                    │
└─────────────────────────────────────────────────────────────────┘
```

## Alterações

### Reescrever `src/components/Footer.tsx`

- **"Ir ao topo"**: Link com seta ↑ no topo, scroll suave para o topo da página
- **Seção principal**: Grid com 4 áreas
  - **Esquerda (col-span maior)**: Tagline grande ("Sua skin, seu estilo.™"), parágrafo descritivo curto sobre a FireSkins
  - **Col "Nossos Serviços"**: Comprar skins, Vender skins, Programa de fidelidade, Programa de indicação
  - **Col "Suporte"**: FAQ, Sobre nós, Termos e Condições, Políticas de Privacidade
  - **Col "Contato"**: Fale conosco, Instagram, YouTube, WhatsApp
- **Barra de copyright**: Texto em caps "© FIRESKINS 2026 — TODOS OS DIREITOS RESERVADOS."
- **Texto gigante**: "FIRESKINS" em fonte enorme (clamp ~8-15vw), branco, overflow hidden cortando na base — efeito visual de marca
- Fundo escuro sólido (#0A0A0A ou similar), sem gradiente laranja
- Manter `useWhatsAppUrl` para o link dinâmico do WhatsApp
- Remover newsletter, badges de pagamento, ícones sociais como botões — links simples de texto como na referência

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Reescrever completamente com novo layout |

