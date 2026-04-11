

# Adicionar seção de FAQ na página inicial

## Resumo
Criar um componente `FAQSection` com perguntas frequentes sobre o marketplace de skins CS2, usando o componente Accordion já existente, e posicioná-lo entre Testimonials e FinalCTA.

## Alterações

| Arquivo | Ação |
|---------|------|
| `src/components/FAQSection.tsx` | **Criar** — seção FAQ com Accordion, tema dark/orange consistente |
| `src/pages/Index.tsx` | Importar e adicionar `<FAQSection />` entre `<TestimonialsSection />` e `<FinalCTA />` |

## Conteúdo sugerido (PT-BR)

Perguntas iniciais cobrindo:
1. Como funciona a compra de skins?
2. Quais métodos de pagamento são aceitos?
3. As skins são seguras e verificadas?
4. Quanto tempo leva para receber a skin?
5. Posso devolver uma skin após a compra?
6. Como entro em contato com o suporte?

## Design

- Fundo com gradiente sutil como as demais seções
- Título "Perguntas Frequentes" com `font-rajdhani`
- Accordion com borda `rgba(233,90,12,0.2)` e fundo `rgba(233,90,12,0.04)` (mesmo padrão da página de Política de Privacidade)
- Ícone de abertura animado (já incluso no componente Accordion)

