
-- Add is_super column
ALTER TABLE public.user_roles ADD COLUMN is_super boolean NOT NULL DEFAULT false;

-- Trigger: limit 10 admins
CREATE OR REPLACE FUNCTION public.check_admin_limit()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'admin' AND (SELECT count(*) FROM public.user_roles WHERE role = 'admin') >= 10 THEN
    RAISE EXCEPTION 'Limite de 10 administradores atingido';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_limit_admins
BEFORE INSERT ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.check_admin_limit();

-- RLS: admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS: admins can delete roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS: admins can update roles (for is_super transfer)
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function: transfer super admin
CREATE OR REPLACE FUNCTION public.transfer_super_admin(new_super_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin' AND is_super = true) THEN
    RAISE EXCEPTION 'Apenas o Super Admin pode transferir o cargo';
  END IF;
  UPDATE public.user_roles SET is_super = false WHERE user_id = auth.uid() AND role = 'admin';
  UPDATE public.user_roles SET is_super = true WHERE user_id = new_super_id AND role = 'admin';
END;
$$;
