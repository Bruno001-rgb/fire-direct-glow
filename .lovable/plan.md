

# Card Comunidade — usar link do banco, não `/admin`

## Problema
O card "Comunidade" está com `href: "/admin"` fixo no banco. O usuário quer que ele redirecione para o link configurado no painel admin (ex: um grupo Discord, WhatsApp, etc.), não para a página de admin.

## Alteração

1. **Migração SQL** — Atualizar o `href` do registro `comunidade` para um valor placeholder mais adequado (ex: `https://discord.gg/fireskins` ou deixar vazio para o admin preencher). Ou simplesmente limpar para `null` e o admin define o link correto.

2. **Nenhuma mudança no `AboutSection.tsx`** — O componente já lê `item.href` do banco e renderiza corretamente links internos e externos. Basta o admin atualizar o link no painel.

Na verdade, o componente já funciona corretamente — ele usa o `href` que vier do banco. O problema é apenas o valor atual no banco ser `/admin`.

**Ação**: Atualizar o `href` da credencial "comunidade" via migração para `null` (sem link até o admin definir) ou para a URL real da comunidade, se o usuário souber qual é.

| Arquivo | Ação |
|---------|------|
| Migração SQL | `UPDATE site_credentials SET href = NULL WHERE key = 'comunidade'` |

Assim o admin pode definir qualquer link (Discord, WhatsApp, etc.) pelo painel na aba "Sobre".

