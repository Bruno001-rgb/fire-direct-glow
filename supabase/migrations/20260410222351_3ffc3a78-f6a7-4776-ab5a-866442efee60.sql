ALTER TABLE public.catalog_skins
  ADD CONSTRAINT catalog_skins_skin_id_fkey
  FOREIGN KEY (skin_id) REFERENCES public.imported_skins(id)
  ON DELETE CASCADE;