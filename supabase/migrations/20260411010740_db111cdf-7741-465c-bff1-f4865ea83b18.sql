
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

INSERT INTO public.site_credentials (key, title, value, description, icon, href, sort_order) VALUES
  ('cnpj', 'CNPJ Ativo', 'XX.XXX.XXX/0001-XX', 'Empresa registrada e regularizada', 'file-text', NULL, 0),
  ('steam', 'Perfil Steam', 'Ver perfil oficial', 'Reputação verificada na plataforma', 'external-link', 'https://steamcommunity.com/id/PLACEHOLDER', 1),
  ('experience', 'No Mercado', '+X anos', 'Experiência e confiança comprovadas', 'calendar', NULL, 2);
