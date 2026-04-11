

# Melhorar rodapé: acessibilidade, links e logo

## Alterações em `src/components/Footer.tsx`

### 1. Aumentar visibilidade do texto (acessibilidade)
- Links de Serviços e Produto: de `text-sm text-muted-foreground` para `text-base text-white/80 hover:text-white`
- Email e suporte: de `text-sm text-muted-foreground` para `text-base text-white/70`
- "Suporte técnico": de `text-xs` para `text-sm`
- Títulos das colunas (h4): de `text-sm` para `text-base`
- Newsletter descrição: de `text-sm` para `text-base text-white/70`
- Bottom bar copyright: de `text-xs` para `text-sm`
- Bottom bar links legais: de `text-xs` para `text-sm`
- Tagline: de `text-[11px]` para `text-sm`

### 2. Logo 100% maior
- De `h-12 max-w-[180px]` para `h-24 max-w-[360px]`

### 3. Links direcionados para seções reais da página

| Link | Destino |
|------|---------|
| **Serviços** | |
| Vender skins | WhatsApp (já tem `whatsAppUrl`) |
| Catálogo de skins | `/catalogo` |
| Monte seu loadout | `/loadout` |
| **Produto** | |
| Perguntas frequentes | `/#contato` (seção contato) |
| Sobre nós | `/#sobre` (AboutSection) |
| Fale conosco | WhatsApp |
| A FireSkins é confiável? | `/#depoimentos` (TestimonialsSection) |
| Proteção contra golpes | `/#sobre` |

- Remover "Programa de fidelidade", "Programa de indicação", "O que é a FireSkins" (não existem no site)
- Substituir por links que fazem sentido: Catálogo e Loadout

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Texto maior, logo 2x, links reais |

