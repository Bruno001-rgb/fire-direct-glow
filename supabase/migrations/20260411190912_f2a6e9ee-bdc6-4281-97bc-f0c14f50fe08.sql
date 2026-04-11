
-- catalog_skins: drop permissive, add admin-only
DROP POLICY "Anon can delete catalog_skins" ON catalog_skins;
DROP POLICY "Anon can insert catalog_skins" ON catalog_skins;
DROP POLICY "Auth can manage catalog_skins" ON catalog_skins;

CREATE POLICY "Admins can insert catalog_skins" ON catalog_skins
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update catalog_skins" ON catalog_skins
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete catalog_skins" ON catalog_skins
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- showcase_slots: drop permissive, add admin-only
DROP POLICY "Anon can delete showcase_slots" ON showcase_slots;
DROP POLICY "Anon can insert showcase_slots" ON showcase_slots;
DROP POLICY "Anon can update showcase_slots" ON showcase_slots;
DROP POLICY "Authenticated users can manage showcase_slots" ON showcase_slots;

CREATE POLICY "Admins can insert showcase_slots" ON showcase_slots
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update showcase_slots" ON showcase_slots
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete showcase_slots" ON showcase_slots
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- showcase_categories: drop permissive, add admin-only
DROP POLICY "Anon can delete showcase_categories" ON showcase_categories;
DROP POLICY "Anon can insert showcase_categories" ON showcase_categories;
DROP POLICY "Anon can update showcase_categories" ON showcase_categories;
DROP POLICY "Authenticated users can manage showcase_categories" ON showcase_categories;

CREATE POLICY "Admins can insert showcase_categories" ON showcase_categories
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update showcase_categories" ON showcase_categories
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete showcase_categories" ON showcase_categories
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- testimonials: drop permissive, add admin-only
DROP POLICY "Anon can delete testimonials" ON testimonials;
DROP POLICY "Anon can insert testimonials" ON testimonials;
DROP POLICY "Anon can update testimonials" ON testimonials;

CREATE POLICY "Admins can insert testimonials" ON testimonials
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials" ON testimonials
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials" ON testimonials
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- site_credentials: drop permissive, add admin-only
DROP POLICY "Authenticated can manage site_credentials" ON site_credentials;

CREATE POLICY "Admins can insert site_credentials" ON site_credentials
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site_credentials" ON site_credentials
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site_credentials" ON site_credentials
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
