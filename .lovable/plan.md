

# Correções de Segurança — Resultados do Scan

## Problemas encontrados

### Críticos (ERROR)

| # | Problema | Tabela/Recurso | Risco |
|---|----------|---------------|-------|
| 1 | **Leads expostos** | `leads` | Qualquer usuário autenticado pode ler WhatsApp e interesses de clientes |
| 2 | **Emails expostos** | `newsletter_subscribers` | Qualquer usuário autenticado pode ler emails de assinantes |
| 3 | **Escalação de privilégios** | `user_roles` | INSERT policy pode ser explorada — admin management deve ser feito apenas via edge function |
| 4 | **Storage público** | bucket `testimonials` | Anon pode fazer upload e deletar imagens |

### Avisos (WARN)

| # | Problema | Detalhes |
|---|----------|---------|
| 5 | RLS Policy Always True (×2) | Policies de INSERT na `leads` e `newsletter_subscribers` com `WITH CHECK (true)` — esperado para formulários públicos |
| 6 | Leaked password protection disabled | Proteção contra senhas vazadas desativada |

## Plano de correção

### 1. Proteger tabela `leads` — SELECT admin-only

```sql
DROP POLICY "Authenticated users can read leads" ON leads;
CREATE POLICY "Admins can read leads" ON leads
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
```

### 2. Proteger tabela `newsletter_subscribers` — SELECT admin-only

```sql
DROP POLICY "Only authenticated can read subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can read subscribers" ON newsletter_subscribers
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
```

### 3. Remover INSERT policy direta na `user_roles`

O gerenciamento de admins já é feito pela edge function `manage-admins` que usa `service_role`. A policy de INSERT direto é desnecessária e perigosa.

```sql
DROP POLICY "Admins can insert roles" ON user_roles;
```

### 4. Proteger storage `testimonials` — admin-only upload/delete

Migração para restringir as policies de storage:

```sql
DROP POLICY "Anon can upload testimonial images" ON storage.objects;
DROP POLICY "Anon can delete testimonial images" ON storage.objects;

CREATE POLICY "Admins can upload testimonial images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonial images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'::app_role));
```

### 5. INSERT policies com `true` — ignorar

As policies de INSERT com `WITH CHECK (true)` nas tabelas `leads` e `newsletter_subscribers` são intencionais — formulários públicos precisam permitir inserção anônima.

### 6. Leaked password protection

Habilitar via configuração de auth (não requer migração SQL).

## Resumo de alterações

| Arquivo/Recurso | Ação |
|-----------------|------|
| Migração SQL | Corrigir policies de `leads`, `newsletter_subscribers`, `user_roles` e storage |
| Auth config | Habilitar leaked password protection |

Nenhuma alteração frontend necessária.

