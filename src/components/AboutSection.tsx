import { useEffect, useState } from "react";
import { FileText, Calendar, ExternalLink, Gamepad2, MessageCircle, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  "external-link": ExternalLink,
  calendar: Calendar,
  "gamepad-2": Gamepad2,
  "message-circle": MessageCircle,
  instagram: Instagram,
  youtube: Youtube,
};

interface Credential {
  id: string;
  title: string;
  value: string;
  description: string;
  href: string | null;
  icon: string;
  sort_order: number;
}

const AboutSection = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_credentials")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setCredentials(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-14">
        <h2 className="section-heading font-heading">
          CONHEÇA A{" "}
          <span className="text-gradient-fire">FIRESKINS</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Transparência e segurança em cada negociação
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))
          : credentials.map((item) => {
              const Icon = iconMap[item.icon] || FileText;
              const content = (
                <div
                  key={item.id}
                  className="rounded-xl border border-orange-500/20 bg-card/60 backdrop-blur-sm p-6 sm:p-8 text-center flex flex-col items-center gap-3 transition-colors hover:border-orange-500/40"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-gradient-fire font-bold text-xl">
                    {item.value}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                );
              }

              return content;
            })}
      </div>
    </section>
  );
};

export default AboutSection;
