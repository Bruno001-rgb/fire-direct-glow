
-- Remove permissive policies
DROP POLICY "Authenticated users can insert imported_skins" ON imported_skins;
DROP POLICY "Authenticated users can update imported_skins" ON imported_skins;
DROP POLICY "Anon can insert imported_skins" ON imported_skins;
DROP POLICY "Anon can update imported_skins" ON imported_skins;
DROP POLICY "Anon can delete imported_skins" ON imported_skins;

-- Admin-only write policies
CREATE POLICY "Admins can insert imported_skins" ON imported_skins
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update imported_skins" ON imported_skins
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete imported_skins" ON imported_skins
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
