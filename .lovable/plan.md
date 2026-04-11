

# Adicionar credencial Instagram na aba Sobre

Inserir apenas o registro do Instagram na tabela `site_credentials`. Discord e Telegram não serão adicionados.

## Ação única: Insert SQL

```sql
INSERT INTO public.site_credentials (key, title, value, description, icon, href, sort_order)
VALUES ('instagram', 'Instagram', '@fireskins', 'Siga nosso perfil oficial', 'external-link', 'https://instagram.com/PLACEHOLDER', 4);
```

Nenhuma alteração de código — o registro aparece automaticamente na home e no admin.

| Ação | Detalhe |
|------|---------|
| Insert SQL (1 registro) | Instagram com dados placeholder |
| Código | Nenhuma mudança necessária |

