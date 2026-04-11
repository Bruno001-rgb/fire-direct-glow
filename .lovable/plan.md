

# Log de Tentativas de Login para Auditoria

## Resumo
Criar tabela `admin_login_attempts` para registrar todas as tentativas de login (falhas e sucessos) e logar via INSERT direto do frontend.

## Alterações

### 1. Migração SQL — criar tabela e policies

```sql
CREATE TABLE public.admin_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  failure_reason text,
  ip_hint text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode inserir (necessário para logar tentativas antes de autenticar)
CREATE POLICY "Anyone can insert login attempts" ON admin_login_attempts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Apenas admins podem ler os logs
CREATE POLICY "Admins can read login attempts" ON admin_login_attempts
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
```

### 2. Frontend — `src/pages/AdminLogin.tsx`

Adicionar função helper para logar tentativas:

```typescript
async function logAttempt(email: string, success: boolean, reason?: string) {
  await supabase.from("admin_login_attempts").insert({
    email,
    success,
    failure_reason: reason || null,
    user_agent: navigator.userAgent,
  });
}
```

Chamar nos 3 pontos de falha e no sucesso:
- `authError` → `logAttempt(email, false, "invalid_credentials")`
- `!user` → `logAttempt(email, false, "user_not_found")`
- `!roleData` → `logAttempt(email, false, "not_admin")`
- Sucesso → `logAttempt(email, true)`

### 3. Painel Admin — nova aba "Logs" (opcional mas recomendado)

Componente `src/components/admin/LoginLogsViewer.tsx` que lista os últimos 100 registros com email, resultado, motivo, user_agent e data. Integrar como aba no `/admin`.

## Segurança
- INSERT aberto (necessário para logar antes de autenticar)
- SELECT restrito a admins
- Sem UPDATE/DELETE (logs são imutáveis)
- Não armazena senhas, apenas email e metadados

