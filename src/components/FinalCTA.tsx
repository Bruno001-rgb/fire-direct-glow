import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import bannerRifas from "@/assets/banner-rifas.png";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20participar%20das%20rifas%20FireSkins!";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />

      <div
        className="relative min-h-[450px] sm:min-h-[550px] lg:min-h-[650px] flex flex-col items-center justify-end py-10 sm:py-14"
        style={{
          backgroundImage: `url(${bannerRifas})`,
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
        }}
      >
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #000 20%, transparent)" }} />

        {/* CTA content at bottom */}
        <div className="relative z-10 text-center space-y-4">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
            Sua vaga está reservada, entre agora!
          </p>
          <Button
            variant="fire"
            size="lg"
            className="text-sm sm:text-base px-10 sm:px-14 h-13 sm:h-14 uppercase tracking-wider rounded-sm shadow-[0_0_40px_rgba(233,90,12,0.3)] hover:shadow-[0_0_60px_rgba(233,90,12,0.5)] transition-shadow duration-500"
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5 sm:size-6" />
              Participar da Rifa
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />
    </section>
  );
};

export default FinalCTA;
