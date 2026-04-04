import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  image_url: string;
  title: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function useTestimonials(activeOnly = true) {
  return useQuery({
    queryKey: ["testimonials", activeOnly],
    queryFn: async (): Promise<Testimonial[]> => {
      let q = supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (activeOnly) {
        q = q.eq("is_active", true);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}
