import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import bannerRifas from "@/assets/banner-rifas.png";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20participar%20das%20rifas%20FireSkins!";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />

      {/* Background image area */}
      <div
        className="relative aspect-[16/9] max-h-[500px] sm:max-h-[600px] lg:max-h-[700px]"
        style={{
          backgroundImage: `url(${bannerRifas})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
        }}
      />

      {/* CTA below image */}
      <div className="bg-black text-center pb-10 sm:pb-14 pt-6 sm:pt-8">
        <Button
          variant="fire"
          size="lg"
          className="text-sm sm:text-base px-12 sm:px-16 h-14 uppercase tracking-wider rounded-sm shadow-[0_0_40px_rgba(233,90,12,0.3)] hover:shadow-[0_0_60px_rgba(233,90,12,0.5)] transition-shadow duration-500"
          asChild
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5 sm:size-6" />
            Participar da Rifa
          </a>
        </Button>
      </div>

      {/* Bottom fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />
    </section>
  );
};

export default FinalCTA;
