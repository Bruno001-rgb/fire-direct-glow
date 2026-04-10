import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useLoadout } from "@/contexts/LoadoutContext";
import logoFireskins from "@/assets/logo-fireskins.webp";

import { WHATSAPP_URL } from "@/constants";

const NAV_LINKS = [
  { href: "/#catalogo", label: "Catálogo", type: "anchor" },
  { href: "/catalogo", label: "Catálogo Completo", type: "link" },
  { href: "/loadout", label: "Meu Loadout", type: "link", showBadge: true },
  { href: "/#como-funciona", label: "Como funciona", type: "anchor" },
  { href: "/#contato", label: "Contato", type: "anchor" },
] as const;

const Header = () => {
  const { filledCount } = useLoadout();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const linkClass =
    "text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200";
  const mobileLinkClass =
    "block text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200 py-3 border-b border-border/40";

  const renderNavItem = (item: typeof NAV_LINKS[number], mobile = false) => {
    const cls = mobile ? mobileLinkClass : linkClass;

    if (item.type === "link") {
      return (
        <Link
          key={item.href}
          to={item.href}
          className={`${cls} relative`}
          onClick={() => mobile && setMobileOpen(false)}
        >
          {item.label}
          {"showBadge" in item && item.showBadge && filledCount > 0 && (
            <span className="absolute -top-2 -right-4 size-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
              {filledCount}
            </span>
          )}
        </Link>
      );
    }

    return (
      <a
        key={item.href}
        href={item.href}
        className={cls}
        onClick={() => mobile && setMobileOpen(false)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-primary/8">
      <div className="container flex items-center justify-between h-14 sm:h-16">
        <a href="/" className="flex items-center">
          <img src={logoFireskins} alt="FireSkins" className="h-40 sm:h-44 w-auto -my-16" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((item) => renderNavItem(item))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="fire" size="sm" className="hidden md:inline-flex h-8 sm:h-9 text-[11px] uppercase tracking-wider" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-3.5" />
              Chamar no WhatsApp
            </a>
          </Button>

          {/* Hamburger button */}
          <button
            className="md:hidden flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-14 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="fixed top-14 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-4 animate-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((item) => renderNavItem(item, true))}

            <div className="pt-4">
              <Button variant="fire" className="w-full h-11 text-sm uppercase tracking-wider" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
