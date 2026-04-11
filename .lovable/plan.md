

# Auto-limpeza de Logs de Login (90 dias)

## Abordagem

Usar `pg_cron` + `pg_net` para executar uma limpeza diária dos registros com mais de 90 dias diretamente no banco.

## Alterações

### 1. Migração SQL

Habilitar extensão `pg_cron` (se não ativa) e agendar job diário:

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

SELECT cron.schedule(
  'cleanup-old-login-logs',
  '0 3 * * *',  -- todo dia às 3h UTC
  $$DELETE FROM public.admin_login_attempts WHERE created_at < now() - interval '90 days'$$
);
```

### 2. Nenhuma alteração frontend

O job roda automaticamente no banco. Nenhum código React precisa mudar.

