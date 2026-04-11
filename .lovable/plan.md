

# Adicionar Discord e Facebook na seção Admin (Sobre)

## O que será feito

Inserir dois novos registros na tabela `site_credentials` para **Discord** e **Facebook**, permitindo que os links sejam editados pelo admin na aba "Sobre". Depois, atualizar o `Footer.tsx` para consumir esses links do banco em vez de `"#"` hardcoded.

## Alterações

### 1. Migration — inserir Discord e Facebook em `site_credentials`

```sql
INSERT INTO site_credentials (key, title, value, description, href, icon, sort_order)
VALUES
  ('discord', 'Discord', 'FireSkins', 'Servidor oficial da comunidade FireSkins', 'https://discord.gg/PLACEHOLDER', 'discord', 6),
  ('facebook', 'Facebook', 'FireSkins', 'Página oficial no Facebook', 'https://facebook.com/PLACEHOLDER', 'facebook', 7);
```

### 2. `src/components/Footer.tsx` — buscar links do banco

- Adicionar um `useEffect` que carrega os credentials com keys `discord`, `facebook`, `youtube`, `instagram` da tabela `site_credentials`
- Substituir os `href: "#"` hardcoded do Discord, Facebook e YouTube pelos valores `href` do banco
- Instagram já está hardcoded para `fireskinscs2` — também puxar do banco para consistência

### 3. `src/components/AboutSection.tsx` — adicionar Discord e Facebook ao iconMap

- Adicionar `"discord"` e `"facebook"` ao `iconMap` para que os novos cards apareçam corretamente na seção Conheça a FireSkins (se já não estiverem mapeados)

| Arquivo | Ação |
|---------|------|
| `supabase/migrations/` | INSERT Discord + Facebook |
| `src/components/Footer.tsx` | Buscar hrefs do banco para redes sociais |
| `src/components/AboutSection.tsx` | Garantir iconMap cobre discord/facebook |

