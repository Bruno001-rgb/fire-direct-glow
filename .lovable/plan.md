

# Admin: gerenciar credenciais da seção "Conheça a FireSkins"

Criar uma tabela no banco para armazenar as credenciais (CNPJ, Steam, tempo de mercado) e um painel admin para editá-las. A AboutSection passa a ler do banco em vez de dados hardcoded.

## 1. Criar tabela `site_credentials`

Migration SQL:
```sql
CREATE TABLE public.site_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  title text NOT NULL,
  value text NOT NULL,
  description text NOT NULL DEFAULT '',
  href text,
  icon text NOT NULL DEFAULT 'file-text',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site_credentials" ON public.site_credentials
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated can manage site_credentials" ON public.site_credentials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed com dados placeholder
INSERT INTO public.site_credentials (key, title, value, description, icon, href, sort_order) VALUES
  ('cnpj', 'CNPJ Ativo', 'XX.XXX.XXX/0001-XX', 'Empresa registrada e regularizada', 'file-text', NULL, 0),
  ('steam', 'Perfil Steam', 'Ver perfil oficial', 'Reputação verificada na plataforma', 'external-link', 'https://steamcommunity.com/id/PLACEHOLDER', 1),
  ('experience', 'No Mercado', '+X anos', 'Experiência e confiança comprovadas', 'calendar', NULL, 2);
```

## 2. Novo componente `src/components/admin/CredentialsManager.tsx`

- Lista as credenciais da tabela `site_credentials` ordenadas por `sort_order`
- Formulário inline para editar cada campo: título, valor, descrição, link (opcional)
- Botão salvar por item (update via supabase client)
- Toast de sucesso/erro

## 3. Atualizar `src/pages/Admin.tsx`

- Adicionar nova tab "Sobre" no TabsList
- Importar e renderizar `CredentialsManager` no TabsContent

## 4. Atualizar `src/components/AboutSection.tsx`

- Buscar dados de `site_credentials` via supabase em vez de array hardcoded
- Mapear o campo `icon` (string) para o componente Lucide correspondente
- Loading skeleton enquanto carrega

| Arquivo | Ação |
|---------|------|
| Migration SQL | Criar tabela `site_credentials` com RLS e seed |
| `src/components/admin/CredentialsManager.tsx` | Novo — formulário de edição |
| `src/pages/Admin.tsx` | Adicionar tab "Sobre" |
| `src/components/AboutSection.tsx` | Ler do banco em vez de hardcoded |

