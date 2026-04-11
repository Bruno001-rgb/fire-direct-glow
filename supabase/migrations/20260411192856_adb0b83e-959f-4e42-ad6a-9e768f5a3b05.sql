CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

SELECT cron.schedule(
  'cleanup-old-login-logs',
  '0 3 * * *',
  $$DELETE FROM public.admin_login_attempts WHERE created_at < now() - interval '90 days'$$
);