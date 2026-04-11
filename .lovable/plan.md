

# Redesign do Footer baseado na referência

Recriar o footer seguindo o layout da imagem de referência: estrutura em grid com 4 colunas, ícones sociais, colunas de links, seção de newsletter, barra de copyright com badges de pagamento.

## Layout proposto

```text
┌─────────────────────────────────────────────────────────────────┐
│  orange top bar                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Logo FireSkins    │  Serviços        │ Produto       │ Newsletter     │
│  email             │  Vender skins    │ Perguntas     │ "Receba..."    │
│  Suporte tecnico   │  Pgm fidelidade  │ Sobre nós     │ [email] [btn]  │
│                    │  Pgm indicação   │ Fale conosco  │                │
│  🎮 📱 📷 🎥 📘   │                  │ Confiável?    │                │
│  (social icons)    │                  │ O que é       │                │
│                    │                  │ Proteção      │                │
├─────────────────────────────────────────────────────────────────┤
│  © FireSkins. Todos os direitos    Termos    Políticas          │
│          VISA  MasterCard  PayPal  PIX  Outros                  │
│  "Melhor serviço de compra e venda..."                          │
└─────────────────────────────────────────────────────────────────┘
```

## Alterações

### 1. Reescrever `src/components/Footer.tsx`

- **Seção principal**: Grid de 4 colunas (1fr 1fr 1fr 1fr no desktop, empilhado no mobile)
  - **Col 1**: Logo FireSkins (menor), email `suporte@fireskins.gg`, "Suporte técnico", ícones sociais (Discord, WhatsApp, Instagram, YouTube, Facebook) como círculos/quadrados com ícones
  - **Col 2 "Serviços"**: Links estáticos (Vender skins, Programa de fidelidade, Programa de indicação)
  - **Col 3 "Produto"**: Links estáticos (Perguntas frequentes, Sobre nós, Fale conosco, A FireSkins é confiável?, O que é a FireSkins, Proteção contra golpes)
  - **Col 4 "Newsletter"**: Título "Receba atualizações e ofertas", texto descritivo, input de email com botão "Enviar"

- **Barra inferior**: Fundo mais escuro
  - Linha 1: Copyright + Termos de Serviço + Políticas de Privacidade
  - Linha 2: Badges de pagamento (VISA, MasterCard, PayPal, PIX, Outros) como chips com borda
  - Linha 3: Tagline "Melhor serviço de compra e venda..."

- Manter o `useWhatsAppUrl` hook para o ícone do WhatsApp
- Links são placeholder `#` por enquanto (podem ser tornados dinâmicos depois)
- Remover o layout atual (texto grande "Venda & Upgrade", logo gigante, círculos decorativos)
- Manter referência ao BlackBot no copyright ou removê-la (seguindo a referência que não mostra)

### 2. Ícones sociais

Usar Lucide icons onde disponíveis + SVGs customizados para Discord e Facebook (Lucide não tem esses). WhatsApp usa o componente `WhatsAppIcon` existente.

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Reescrever completamente com novo layout |

