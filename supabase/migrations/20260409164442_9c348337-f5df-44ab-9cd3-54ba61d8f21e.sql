CREATE POLICY "Anon can update imported_skins"
ON public.imported_skins
FOR UPDATE
TO anon
USING (true);