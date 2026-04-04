
-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Read access for everyone
CREATE POLICY "Anyone can read testimonials"
ON public.testimonials FOR SELECT
TO anon, authenticated
USING (true);

-- Anon can insert (no auth yet)
CREATE POLICY "Anon can insert testimonials"
ON public.testimonials FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anon can update
CREATE POLICY "Anon can update testimonials"
ON public.testimonials FOR UPDATE
TO anon, authenticated
USING (true);

-- Anon can delete
CREATE POLICY "Anon can delete testimonials"
ON public.testimonials FOR DELETE
TO anon, authenticated
USING (true);

-- Timestamp trigger
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true);

-- Storage policies
CREATE POLICY "Anyone can view testimonial images"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonials');

CREATE POLICY "Anon can upload testimonial images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'testimonials');

CREATE POLICY "Anon can delete testimonial images"
ON storage.objects FOR DELETE
USING (bucket_id = 'testimonials');
