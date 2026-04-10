import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5562996632201";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main content */}
      <div
        className="relative py-16 sm:py-24 px-4"
        style={{
          background: "radial-gradient(ellipse at center, rgba(233,90,12,0.05) 0%, rgba(0,0,0,0.95) 70%, #000 100%)",
        }}
      >
        {/* Title */}
        <h2
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold font-heading uppercase tracking-wider mb-12 sm:mb-16 text-primary"
        >
          Participe das nossas rifas e tenha a chance de ganhar skins!
        </h2>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 mb-10 sm:mb-14 max-w-md mx-auto">
          {/* 2nd place */}
          <div className="flex flex-col items-center flex-1">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 mb-2 animate-pulse" />
            <div
              className="w-full rounded-t-md flex items-center justify-center text-lg sm:text-xl font-bold text-white/90"
              style={{
                height: "100px",
                background: "linear-gradient(180deg, rgba(180,180,180,0.2) 0%, rgba(120,120,120,0.1) 100%)",
                border: "1px solid rgba(180,180,180,0.15)",
                borderBottom: "none",
              }}
            >
              2º
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center flex-1">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-primary" />
            <div
              className="w-full rounded-t-md flex items-center justify-center text-xl sm:text-2xl font-bold text-primary"
              style={{
                height: "140px",
                background: "linear-gradient(180deg, rgba(233,90,12,0.25) 0%, rgba(233,90,12,0.1) 100%)",
                border: "1px solid rgba(233,90,12,0.3)",
                borderBottom: "none",
              }}
            >
              1º
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center flex-1">
            <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-amber-800 mb-2 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div
              className="w-full rounded-t-md flex items-center justify-center text-base sm:text-lg font-bold text-white/70"
              style={{
                height: "70px",
                background: "linear-gradient(180deg, rgba(120,80,40,0.2) 0%, rgba(80,50,20,0.1) 100%)",
                border: "1px solid rgba(120,80,40,0.15)",
                borderBottom: "none",
              }}
            >
              3º
            </div>
          </div>
        </div>

        {/* Base line */}
        <div className="max-w-md mx-auto h-px mb-10 sm:mb-14 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Impact phrase */}
        <p className="text-center text-lg sm:text-xl lg:text-2xl font-bold text-white mb-8 sm:mb-10 tracking-wide">
          Sua vaga está reservada, entre agora!
        </p>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="fire"
            size="lg"
            className="text-sm sm:text-base px-12 sm:px-16 h-14 uppercase tracking-wider text-black"
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5 sm:size-6" />
              Participar da Rifa
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default FinalCTA;
