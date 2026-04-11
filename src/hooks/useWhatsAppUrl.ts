import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK = "https://wa.me/5562996632201";

let cached: string | null = null;

export function useWhatsAppUrl() {
  const [url, setUrl] = useState(cached || FALLBACK);

  useEffect(() => {
    if (cached) return;
    supabase
      .from("site_credentials")
      .select("value, href")
      .eq("key", "whatsapp")
      .single()
      .then(({ data }) => {
        if (data) {
          const resolved = data.href || `https://wa.me/${data.value}`;
          cached = resolved;
          setUrl(resolved);
        }
      });
  }, []);

  return url;
}
