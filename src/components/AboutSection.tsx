import { useEffect, useState } from "react";
import { FileText, Calendar, ExternalLink, MessageCircle, Instagram, Youtube, Shield, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const SteamIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 259" className={className} fill="currentColor">
    <path d="M127.779 0C57.916 0 .76 55.035.76 123.898l68.977 28.477c5.862-4.003 12.93-6.343 20.558-6.343.679 0 1.35.024 2.017.06l30.768-44.56v-.625c0-28.397 23.112-51.509 51.507-51.509 28.398 0 51.508 23.112 51.508 51.51 0 28.397-23.11 51.508-51.508 51.508h-1.193l-43.86 31.292c0 .544.025 1.09.025 1.636 0 21.31-17.327 38.636-38.635 38.636-18.636 0-34.199-13.25-37.804-30.842L1.635 162.5C16.77 217.38 67.135 258.5 127.78 258.5c70.794 0 128.2-57.405 128.2-128.2C255.979 59.507 198.573 0 127.779 0" />
    <path d="M80.232 208.75l-15.697-6.487c2.787 5.803 7.387 10.737 13.397 13.897 12.983 6.828 28.948 1.73 35.678-11.377 3.26-6.347 3.598-13.35.956-19.721-2.636-6.359-7.676-11.326-14.2-14.563-6.467-3.206-13.393-3.577-19.695-1.452l16.227 6.71c9.559 3.951 14.088 14.852 10.126 24.34-3.952 9.488-14.853 14.088-24.792 10.653m94.358-107.349c0-18.93-15.403-34.332-34.335-34.332-18.933 0-34.336 15.402-34.336 34.332 0 18.933 15.403 34.336 34.336 34.336 18.932 0 34.335-15.403 34.335-34.336m-51.413-.06c0-9.482 7.654-17.168 17.137-17.168 9.482 0 17.137 7.686 17.137 17.169 0 9.483-7.655 17.169-17.137 17.169-9.483 0-17.137-7.686-17.137-17.17" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
  discord: DiscordIcon,
  facebook: FacebookIcon,
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
    <section id="sobre" className="py-10 sm:py-14 px-4 sm:px-6">

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))
          : credentials.map((item) => {
              const Icon = iconMap[item.icon] || FileText;
              const isCommunity = item.key === "comunidade";
              const content = (
                <div
                  key={item.id}
                  className={`rounded-xl border backdrop-blur-sm p-6 sm:p-8 text-center flex flex-col items-center gap-3 transition-all duration-300 ${
                    isCommunity
                      ? "border-purple-500/40 bg-gradient-to-b from-purple-500/10 to-card/60 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
                      : "border-orange-500/20 bg-card/60 hover:border-orange-500/40"
                  }`}
                >
                  {isCommunity && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCommunity ? "bg-purple-500/20" : "bg-orange-500/10"
                  }`}>
                    <Icon className={`w-5 h-5 ${isCommunity ? "text-purple-400" : "text-orange-400"}`} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <span className={`font-bold text-xl ${isCommunity ? "text-purple-400" : "text-gradient-fire"}`}>
                    {item.icon === "message-circle" ? "Fale conosco" : item.value}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              );

              if (item.href) {
                const isExternal = item.href.startsWith("http");
                if (isExternal) {
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
                return (
                  <Link key={item.id} to={item.href}>
                    {content}
                  </Link>
                );
              }

              return content;
            })}
      </div>
    </section>
  );
};

export default AboutSection;
