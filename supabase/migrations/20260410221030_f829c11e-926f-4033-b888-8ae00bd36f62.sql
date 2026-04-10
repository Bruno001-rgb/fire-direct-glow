CREATE TABLE public.catalog_skins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skin_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(skin_id)
);

ALTER TABLE public.catalog_skins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read catalog_skins" ON public.catalog_skins FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anon can insert catalog_skins" ON public.catalog_skins FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can delete catalog_skins" ON public.catalog_skins FOR DELETE TO anon USING (true);
CREATE POLICY "Auth can manage catalog_skins" ON public.catalog_skins FOR ALL TO authenticated USING (true) WITH CHECK (true);