

# Adicionar link do FAQ no Header

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/Header.tsx` | Adicionar item `/#faq` ao array `NAV_LINKS` |
| `src/components/FAQSection.tsx` | Garantir que a seção tenha `id="faq"` |

## Detalhe

- Adicionar `{ href: "/#faq", label: "FAQ", type: "anchor" }` ao `NAV_LINKS`, posicionado após "Como funciona" e antes de "Contato"
- Verificar se o `<section>` do FAQ já tem `id="faq"` (provavelmente sim, mas confirmar)

