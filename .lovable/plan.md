

# Admin protegido + gestão de admins com limite de 10 + Super Admin

## Resumo

O primeiro usuário a se registrar como admin se torna o **Super Admin**. Ele pode adicionar/remover outros admins (até 10) e transferir o cargo de Super Admin para outro admin. A rota `/admin` será protegida pelo `AdminGuard`.

## Alterações

| Recurso | Ação |
|---------|------|
| **Migração SQL** | Adicionar coluna `is_super` (boolean, default false) na `user_roles` para marcar o Super Admin |
| **Migração SQL** | Criar trigger `BEFORE INSERT` que bloqueia se já existem 10 admins com `role = 'admin'` |
| **Migração SQL** | Criar políticas RLS: INSERT/DELETE na `user_roles` apenas para quem tem `role = 'admin'` (via `has_role`) |
| **Migração SQL** | Criar função `transfer_super_admin(new_super_id uuid)` — SECURITY DEFINER, só executável pelo Super Admin atual |
| `src/App.tsx` | Envolver rota `/admin` com `<AdminGuard>` |
| `src/pages/Admin.tsx` | Ativar import do AdminGuard, adicionar tab "Admins" |
| **Novo** `src/components/admin/AdminsManager.tsx` | Lista admins (X/10), mostra quem é Super Admin. Super Admin pode: adicionar admin por email, remover admins, transferir cargo de Super Admin |
| **Nova edge function** `manage-admins` | Recebe email → busca `user_id` em `auth.users` (service role) → insere/remove na `user_roles`. Endpoint para transferir Super Admin |

## Fluxo

1. Primeiro admin inserido via SQL seed com `is_super = true`
2. Admin faz login em `/admin/login` → `AdminGuard` valida → acessa painel
3. Na tab "Admins":
   - **Qualquer admin** vê a lista de admins
   - **Super Admin** pode adicionar novos admins (por email), remover admins, e transferir o cargo de Super Admin para outro admin existente
   - Ao transferir, o Super Admin atual perde `is_super` e o novo ganha
4. Trigger no banco impede ultrapassar 10 admins
5. RLS impede não-admins de mexer na tabela `user_roles`

## Detalhes técnicos

**Coluna Super Admin:**
```sql
ALTER TABLE user_roles ADD COLUMN is_super boolean NOT NULL DEFAULT false;
```

**Trigger de limite (10 admins):**
```sql
CREATE FUNCTION check_admin_limit() RETURNS trigger AS $$
BEGIN
  IF NEW.role = 'admin' AND (SELECT count(*) FROM user_roles WHERE role = 'admin') >= 10 THEN
    RAISE EXCEPTION 'Limite de 10 administradores atingido';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_limit_admins BEFORE INSERT ON user_roles
FOR EACH ROW EXECUTE FUNCTION check_admin_limit();
```

**RLS para INSERT/DELETE (somente admins):**
```sql
CREATE POLICY "Admins can insert roles" ON user_roles
FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON user_roles
FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
```

**Transferência de Super Admin (função SQL):**
```sql
CREATE FUNCTION transfer_super_admin(new_super_id uuid) RETURNS void AS $$
BEGIN
  -- Verifica se quem chama é o Super Admin atual
  IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND is_super = true) THEN
    RAISE EXCEPTION 'Apenas o Super Admin pode transferir o cargo';
  END IF;
  -- Remove super do atual, dá para o novo
  UPDATE user_roles SET is_super = false WHERE user_id = auth.uid() AND role = 'admin';
  UPDATE user_roles SET is_super = true WHERE user_id = new_super_id AND role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

**Edge function `manage-admins`:** Necessária porque o client não pode consultar `auth.users`. A edge function usa service role key para buscar user por email e fazer INSERT/DELETE na `user_roles`.

**Tab Admins no painel:** Mostra lista de admins com badge "Super" no Super Admin. Botões de remover e transferir aparecem apenas para o Super Admin. Contador "3/10 admins" visível para todos.

