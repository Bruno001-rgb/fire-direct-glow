import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import bannerRifas from "@/assets/banner-rifas.png";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20participar%20das%20rifas%20FireSkins!";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />

      <div className="relative bg-black">
        {/* Banner image */}
        <div className="container relative z-10 py-8 sm:py-12 lg:py-16">
          <img
            src={bannerRifas}
            alt="Participe das nossas rifas e tenha a chance de ganhar skins!"
            className="w-full max-w-4xl mx-auto rounded-lg object-contain"
            loading="lazy"
          />

          {/* CTA Button */}
          <div className="text-center mt-6 sm:mt-8">
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
      </div>

      {/* Bottom fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />
    </section>
  );
};

export default FinalCTA;
