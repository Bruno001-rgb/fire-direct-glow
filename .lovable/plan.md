

# Proteger tabela imported_skins com RLS admin-only

## Problema
A tabela `imported_skins` permite que qualquer usuário (anon e authenticated) faça INSERT, UPDATE e DELETE sem restrição.

## Solução

Uma migração SQL que:

1. **Remove** as policies permissivas de escrita para `anon` e `authenticated`
2. **Cria** novas policies de escrita restritas a admins via `has_role(auth.uid(), 'admin')`
3. **Mantém** a policy de SELECT pública e o acesso total do `service_role`

### Policies a remover

| Policy | Tabela |
|--------|--------|
| Authenticated users can insert imported_skins | imported_skins |
| Authenticated users can update imported_skins | imported_skins |
| Anon can insert imported_skins | imported_skins |
| Anon can update imported_skins | imported_skins |
| Anon can delete imported_skins | imported_skins |

### Policies a criar

| Policy | Comando | Condição |
|--------|---------|----------|
| Admins can insert imported_skins | INSERT | `has_role(auth.uid(), 'admin')` |
| Admins can update imported_skins | UPDATE | `has_role(auth.uid(), 'admin')` |
| Admins can delete imported_skins | DELETE | `has_role(auth.uid(), 'admin')` |

Nenhuma alteração frontend necessária — o `SkinSearchModal` já faz upsert como admin autenticado.

