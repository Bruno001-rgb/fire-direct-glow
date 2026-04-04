import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20participar%20das%20rifas%20FireSkins!";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />

      {/* Main content */}
      <div
        className="relative py-16 sm:py-24 px-4"
        style={{
          background: "radial-gradient(ellipse at center, rgba(233,90,12,0.08) 0%, rgba(0,0,0,0.95) 70%, #000 100%)",
        }}
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 50% 60%, rgba(245,160,6,0.06) 0%, transparent 60%)",
        }} />

        {/* Title */}
        <h2
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold font-heading uppercase tracking-wider mb-12 sm:mb-16"
          style={{
            background: "linear-gradient(135deg, #E95A0C, #F5A006, #E95A0C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
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
                background: "linear-gradient(180deg, rgba(180,180,180,0.3) 0%, rgba(120,120,120,0.15) 100%)",
                border: "1px solid rgba(180,180,180,0.2)",
                borderBottom: "none",
              }}
            >
              2º
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center flex-1">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 mb-2" style={{ color: "#F5A006", filter: "drop-shadow(0 0 8px rgba(245,160,6,0.5))" }} />
            <div
              className="w-full rounded-t-md flex items-center justify-center text-xl sm:text-2xl font-bold"
              style={{
                height: "140px",
                background: "linear-gradient(180deg, rgba(233,90,12,0.4) 0%, rgba(245,160,6,0.2) 100%)",
                border: "1px solid rgba(233,90,12,0.4)",
                borderBottom: "none",
                color: "#F5A006",
                boxShadow: "0 0 30px rgba(233,90,12,0.2), inset 0 0 20px rgba(245,160,6,0.05)",
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
                background: "linear-gradient(180deg, rgba(120,80,40,0.3) 0%, rgba(80,50,20,0.15) 100%)",
                border: "1px solid rgba(120,80,40,0.2)",
                borderBottom: "none",
              }}
            >
              3º
            </div>
          </div>
        </div>

        {/* Base line */}
        <div className="max-w-md mx-auto h-[2px] mb-10 sm:mb-14" style={{
          background: "linear-gradient(90deg, transparent, #E95A0C, #F5A006, #E95A0C, transparent)",
        }} />

        {/* Impact phrase */}
        <p className="text-center text-lg sm:text-xl lg:text-2xl font-bold text-white mb-8 sm:mb-10 tracking-wide">
          Sua vaga está reservada, entre agora!
        </p>

        {/* CTA Button */}
        <div className="text-center">
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
      </div>

      {/* Bottom fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />
    </section>
  );
};

export default FinalCTA;
