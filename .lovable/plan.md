

# Proteger tabelas admin com RLS baseado em role

## Problema
As tabelas `catalog_skins`, `showcase_slots`, `testimonials` e `site_credentials` permitem que qualquer usuário anônimo faça INSERT/UPDATE/DELETE. Apenas admins autenticados devem poder modificar dados.

## Solução

Uma migração SQL que:

1. **Remove** todas as policies permissivas de escrita para `anon` e as policies genéricas `ALL` para `authenticated`
2. **Cria** novas policies de escrita que usam `has_role(auth.uid(), 'admin')` para INSERT, UPDATE e DELETE
3. **Mantém** as policies de SELECT públicas (anon + authenticated podem ler)

Também aplica o mesmo padrão à tabela `showcase_categories`, que tem o mesmo problema.

### Policies resultantes por tabela

| Tabela | SELECT | INSERT/UPDATE/DELETE |
|--------|--------|---------------------|
| catalog_skins | anon + authenticated | apenas admin (`has_role`) |
| showcase_slots | anon + authenticated | apenas admin |
| showcase_categories | anon + authenticated | apenas admin |
| testimonials | anon + authenticated | apenas admin |
| site_credentials | anon + authenticated | apenas admin |

### SQL resumido

```sql
-- Para cada tabela: drop policies permissivas, criar novas restritas
-- Exemplo para catalog_skins:
DROP POLICY "Anon can delete catalog_skins" ON catalog_skins;
DROP POLICY "Anon can insert catalog_skins" ON catalog_skins;
DROP POLICY "Auth can manage catalog_skins" ON catalog_skins;

CREATE POLICY "Admins can insert catalog_skins" ON catalog_skins
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update catalog_skins" ON catalog_skins
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete catalog_skins" ON catalog_skins
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
-- Repete para as outras 4 tabelas
```

Nenhuma alteração de código frontend é necessária — o admin já está autenticado ao usar o painel.

