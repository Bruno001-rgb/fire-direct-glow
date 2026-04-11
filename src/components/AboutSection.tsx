import { useEffect, useState } from "react";
import { FileText, Calendar, ExternalLink, MessageCircle, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const SteamIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 259" className={className} fill="currentColor">
    <path d="M127.779 0C57.916 0 .76 55.035.76 123.898l68.977 28.477c5.862-4.003 12.93-6.343 20.558-6.343.679 0 1.35.024 2.017.06l30.768-44.56v-.625c0-28.397 23.112-51.509 51.507-51.509 28.398 0 51.508 23.112 51.508 51.51 0 28.397-23.11 51.508-51.508 51.508h-1.193l-43.86 31.292c0 .544.025 1.09.025 1.636 0 21.31-17.327 38.636-38.635 38.636-18.636 0-34.199-13.25-37.804-30.842L1.635 162.5C16.77 217.38 67.135 258.5 127.78 258.5c70.794 0 128.2-57.405 128.2-128.2C255.979 59.507 198.573 0 127.779 0" />
    <path d="M80.232 208.75l-15.697-6.487c2.787 5.803 7.387 10.737 13.397 13.897 12.983 6.828 28.948 1.73 35.678-11.377 3.26-6.347 3.598-13.35.956-19.721-2.636-6.359-7.676-11.326-14.2-14.563-6.467-3.206-13.393-3.577-19.695-1.452l16.227 6.71c9.559 3.951 14.088 14.852 10.126 24.34-3.952 9.488-14.853 14.088-24.792 10.653m94.358-107.349c0-18.93-15.403-34.332-34.335-34.332-18.933 0-34.336 15.402-34.336 34.332 0 18.933 15.403 34.336 34.336 34.336 18.932 0 34.335-15.403 34.335-34.336m-51.413-.06c0-9.482 7.654-17.168 17.137-17.168 9.482 0 17.137 7.686 17.137 17.169 0 9.483-7.655 17.169-17.137 17.169-9.483 0-17.137-7.686-17.137-17.17" />
  </svg>
);

const iconMap: Record<string, any> = {
  "file-text": FileText,
  "external-link": ExternalLink,
  calendar: Calendar,
  steam: SteamIcon,
  "gamepad-2": SteamIcon,
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
