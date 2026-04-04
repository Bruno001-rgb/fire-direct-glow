
-- Table: imported_skins (cache of ByMykel API skins)
CREATE TABLE public.imported_skins (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  weapon_name TEXT,
  pattern_name TEXT,
  rarity_name TEXT,
  rarity_color TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.imported_skins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read imported_skins"
  ON public.imported_skins FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert imported_skins"
  ON public.imported_skins FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update imported_skins"
  ON public.imported_skins FOR UPDATE
  TO authenticated
  USING (true);

-- Also allow service_role full access (for edge functions)
CREATE POLICY "Service role full access imported_skins"
  ON public.imported_skins FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Table: showcase_categories (fixed LP categories)
CREATE TABLE public.showcase_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  slot_count INTEGER NOT NULL DEFAULT 8,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.showcase_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read showcase_categories"
  ON public.showcase_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage showcase_categories"
  ON public.showcase_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table: showcase_slots (admin-chosen skin per slot)
CREATE TABLE public.showcase_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.showcase_categories(id) ON DELETE CASCADE,
  slot_position INTEGER NOT NULL,
  skin_id TEXT REFERENCES public.imported_skins(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category_id, slot_position)
);

ALTER TABLE public.showcase_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read showcase_slots"
  ON public.showcase_slots FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage showcase_slots"
  ON public.showcase_slots FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_showcase_slots_updated_at
  BEFORE UPDATE ON public.showcase_slots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed: categories
INSERT INTO public.showcase_categories (key, label, slot_count, sort_order) VALUES
  ('facas', 'Facas', 8, 1),
  ('luvas', 'Luvas', 8, 2),
  ('rifles', 'Rifles', 8, 3),
  ('snipers', 'Snipers', 8, 4);

-- Seed: empty slots (8 per category)
INSERT INTO public.showcase_slots (category_id, slot_position)
SELECT c.id, s.pos
FROM public.showcase_categories c
CROSS JOIN generate_series(1, 8) AS s(pos);
