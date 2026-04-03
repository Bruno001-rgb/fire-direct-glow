import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20negociar%20skins%20CS2!";

const FinalCTA = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-cinematic">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-[80px]" />
      <div className="watermark bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-40">FIRESKINS</div>

      <div className="container relative z-10 text-center space-y-6 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase font-heading leading-[1.05]">
          Pronto para dar upgrade{" "}
          <span className="text-gradient-fire">no seu inventário?</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Fale agora com a FireSkins no WhatsApp e escolha sua próxima skin.
        </p>
        <Button variant="whatsapp" size="lg" className="text-sm px-8 h-12 uppercase tracking-wider font-bold" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            Chamar no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
