
-- Add metadata columns to imported_skins
ALTER TABLE public.imported_skins
  ADD COLUMN IF NOT EXISTS paint_index text,
  ADD COLUMN IF NOT EXISTS weapon_defindex integer,
  ADD COLUMN IF NOT EXISTS min_float real,
  ADD COLUMN IF NOT EXISTS max_float real,
  ADD COLUMN IF NOT EXISTS wear_name text,
  ADD COLUMN IF NOT EXISTS stattrak boolean DEFAULT false;

-- Update the admin_skin_index view to include new fields
CREATE OR REPLACE VIEW public.admin_skin_index AS
SELECT
  id AS source_skin_id,
  name,
  weapon_name,
  pattern_name,
  rarity_name,
  rarity_color,
  image,
  paint_index,
  weapon_defindex,
  min_float,
  max_float
FROM public.imported_skins
WHERE wear_name = 'Factory New' OR wear_name IS NULL
ORDER BY weapon_name, pattern_name;
