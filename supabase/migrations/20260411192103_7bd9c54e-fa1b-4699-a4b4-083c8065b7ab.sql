
-- 1. Leads: SELECT admin-only
DROP POLICY "Authenticated users can read leads" ON leads;
CREATE POLICY "Admins can read leads" ON leads
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Newsletter: SELECT admin-only
DROP POLICY "Only authenticated can read subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can read subscribers" ON newsletter_subscribers
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Remove dangerous INSERT policy on user_roles
DROP POLICY "Admins can insert roles" ON user_roles;

-- 4. Storage: restrict testimonials bucket to admin-only write
DROP POLICY IF EXISTS "Anon can upload testimonial images" ON storage.objects;
DROP POLICY IF EXISTS "Anon can delete testimonial images" ON storage.objects;

CREATE POLICY "Admins can upload testimonial images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonial images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'::app_role));
