import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20negociar%20skins%20CS2!";

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />

      <div className="container relative z-10 text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          Pronto para garantir
          <br />
          <span className="text-gradient-fire">sua próxima skin?</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Fale com a gente agora pelo WhatsApp e feche o melhor negócio.
        </p>
        <Button variant="whatsapp" size="lg" className="text-base px-10 py-6" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            Negociar pelo WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
