CREATE POLICY "Anon can update showcase_slots"
  ON public.showcase_slots FOR UPDATE TO anon
  USING (true);