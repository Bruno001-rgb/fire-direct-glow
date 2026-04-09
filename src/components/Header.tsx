import { Link } from "react-router-dom";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useLoadout } from "@/contexts/LoadoutContext";
import logoFireskins from "@/assets/logo-fireskins.webp";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const Header = () => {
  const { filledCount } = useLoadout();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-primary/8">
      <div className="container flex items-center justify-between h-14 sm:h-16">
        <a href="/" className="flex items-center">
          <img src={logoFireskins} alt="FireSkins" className="h-40 sm:h-44 w-auto -my-16" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/#catalogo"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Catálogo
          </a>
          <Link
            to="/catalogo"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Catálogo Completo
          </Link>
          <Link
            to="/loadout"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200 relative"
          >
            Meu Loadout
            {filledCount > 0 && (
              <span className="absolute -top-2 -right-4 size-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                {filledCount}
              </span>
            )}
          </Link>
          <a
            href="/#como-funciona"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Como funciona
          </a>
          <a
            href="/#contato"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Contato
          </a>
        </nav>

        <Button variant="fire" size="sm" className="h-8 sm:h-9 text-[11px] uppercase tracking-wider rounded-sm" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-3.5" />
            <span className="hidden sm:inline">Chamar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
