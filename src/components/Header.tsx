import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-wider uppercase font-heading">
            <span className="text-gradient-fire">Fire</span>
            <span className="text-foreground">Skins</span>
          </span>
        </a>

        <Button variant="whatsapp" size="sm" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline uppercase tracking-wide text-xs">Falar no WhatsApp</span>
            <span className="sm:hidden uppercase tracking-wide text-xs">WhatsApp</span>
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
