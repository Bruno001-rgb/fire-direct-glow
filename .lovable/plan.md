
# Adicionar credencial YouTube na aba Sobre

Inserir um registro `youtube` na tabela `site_credentials`. Nenhuma alteração de código necessária.

## Ação única: Insert SQL

```sql
INSERT INTO public.site_credentials (key, title, value, description, icon, href, sort_order)
VALUES ('youtube', 'YouTube', 'FireSkins', 'Assista nosso canal oficial', 'external-link', 'https://youtube.com/@PLACEHOLDER', 5);
```

| Ação | Detalhe |
|------|---------|
| Insert SQL (1 registro) | YouTube com dados placeholder |
| Código | Nenhuma mudança necessária |
