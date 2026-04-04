import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import AmbientParticles from "@/components/AmbientParticles";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20negociar%20skins%20CS2!";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top glow separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />

      <div className="relative py-20 sm:py-28">
        {/* Background layers */}
        <div className="absolute inset-0 bg-cinematic" />

        {/* Orange radial from center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.1) 0%, transparent 70%)" }} />

        {/* Purple accent top-right */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.06) 0%, transparent 70%)" }} />

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 0% / 0.5) 100%)" }} />

        {/* Particles */}
        <AmbientParticles />

        {/* Watermark */}
        <div className="watermark bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-40">FIRESKINS</div>

        {/* Content */}
        <div className="container relative z-10 text-center space-y-6 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase font-heading leading-[1.05] drop-shadow-[0_2px_12px_hsla(22,91%,47%,0.2)]">
            Pronto para dar upgrade{" "}
            <span className="text-gradient-fire">no seu inventário?</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fale agora com a FireSkins no WhatsApp e escolha sua próxima skin.
          </p>
          <Button variant="whatsapp" size="lg" className="text-sm px-8 h-12 uppercase tracking-wider font-bold shadow-[0_0_30px_hsla(142,70%,45%,0.25)]" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom glow separator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default FinalCTA;
