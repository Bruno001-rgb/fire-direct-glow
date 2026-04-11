

# Melhorar copy dos cards "Conheça a FireSkins"

## Textos atuais vs. propostos

| Card | Título atual | Título novo | Value atual | Value novo | Descrição atual | Descrição nova |
|------|-------------|-------------|-------------|------------|-----------------|----------------|
| CNPJ | CNPJ Ativo | CNPJ Ativo | XX.XXX.XXX/0001-XX | *(manter)* | Empresa registrada e regularizada | Loja regularizada com CNPJ válido e ativo |
| Steam | Perfil Steam | Perfil Steam | Ver perfil oficial | *(manter)* | Reputação verificada na plataforma | +1.000 negociações com reputação impecável |
| No Mercado | No Mercado | No Mercado | +X anos | *(manter)* | Experiência e confiança comprovadas | Anos de experiência entregando skins com segurança |
| WhatsApp | WhatsApp | Atendimento | *(manter)* | *(manter)* | Número ou link de grupo para contato | Suporte rápido e direto pelo WhatsApp |
| Instagram | Instagram | Instagram | @fireskins | *(manter)* | Siga nosso perfil oficial | Novidades, promoções e drops em primeira mão |
| YouTube | YouTube | YouTube | FireSkins | *(manter)* | Assista nosso canal oficial | Reviews, unboxings e conteúdo exclusivo de CS2 |

## Alteração

Uma única migration SQL atualizando `title` e `description` dos 6 registros na tabela `site_credentials`.

| Arquivo | Ação |
|---------|------|
| `supabase/migrations/` | UPDATE title + description dos 6 cards |

