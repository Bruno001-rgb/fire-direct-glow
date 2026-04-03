import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-primary/8">
      <div className="container flex items-center justify-between h-14 sm:h-16">
        <a href="/" className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-wider uppercase font-heading">
            <span className="text-gradient-fire">Fire</span>
            <span className="text-foreground">Skins</span>
          </span>
        </a>

        <Button variant="whatsapp" size="sm" className="h-8 sm:h-9 text-[11px] uppercase tracking-wider font-bold" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-3.5" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
