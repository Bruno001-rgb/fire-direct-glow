ALTER TABLE public.catalog_skins
  ADD COLUMN sort_order integer NOT NULL DEFAULT 0;

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.catalog_skins
)
UPDATE public.catalog_skins SET sort_order = ranked.rn
FROM ranked WHERE catalog_skins.id = ranked.id;