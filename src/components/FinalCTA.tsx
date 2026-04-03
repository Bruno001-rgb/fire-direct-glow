import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20negociar%20skins%20CS2!";

const FinalCTA = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-cinematic">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px]" />
      <div className="watermark bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">FIRESKINS</div>

      <div className="container relative z-10 text-center space-y-8 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-heading leading-[0.95]">
          Pronto para dar upgrade
          <br />
          <span className="text-gradient-fire">no seu inventário?</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Fale agora com a FireSkins no WhatsApp e escolha sua próxima skin.
        </p>
        <Button variant="whatsapp" size="lg" className="text-sm px-10 py-6 uppercase tracking-wider font-bold" asChild>
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
