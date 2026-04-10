import { useState, useRef, useEffect } from "react";
import { Play, Crosshair, CreditCard, Zap, X } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Crosshair,
    title: "Escolhe a skin",
    description: "Navegue pelo catálogo e encontre a skin que combina com seu estilo.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Paga como quiser",
    description: "Pix, cartão ou crypto. Você escolhe o que for melhor.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Recebe na hora",
    description: "Skin enviada direto pro seu inventário Steam. Sem espera.",
  },
];

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openFullscreen = () => {
    setIsPlaying(true);
    setTimeout(() => {
      modalVideoRef.current?.play();
    }, 100);
  };

  const closeFullscreen = () => {
    setIsPlaying(false);
    modalVideoRef.current?.pause();
    if (modalVideoRef.current) modalVideoRef.current.currentTime = 0;
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPlaying) closeFullscreen();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background">
      {/* Top separator */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #E95A0C, #F5A006, transparent)' }} />

      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[500px]"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(233, 90, 12, 0.12) 0%, rgba(233, 90, 12, 0.04) 40%, transparent 70%)' }}
      />
      <div className="absolute -top-20 -right-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px]"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(90, 61, 204, 0.08) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.6)' }} />

      {/* Diagonal pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 30px, rgba(233, 90, 12, 0.5) 30px, rgba(233, 90, 12, 0.5) 31px)`,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)',
        }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10 py-10 sm:py-14 lg:py-16">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="h-px w-6" style={{ background: '#E95A0C' }} />
            <span
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-sm"
              style={{
                background: 'rgba(233, 90, 12, 0.08)',
                border: '1px solid rgba(233, 90, 12, 0.2)',
                color: '#F5A006',
              }}
            >
              Simples e rápido
            </span>
            <div className="h-px w-6" style={{ background: '#E95A0C' }} />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-heading leading-[0.9] mb-3">
            <span className="text-foreground">Como </span>
            <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">3 passos e a skin é sua</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-xl p-6 sm:p-8 overflow-hidden border border-primary/10 bg-card/60"
            >
              {/* Large number background */}
              <span className="absolute top-3 right-4 text-5xl sm:text-6xl font-black font-heading text-primary/[0.07] select-none leading-none">
                {step.number}
              </span>

              <div className="relative z-10 flex flex-col gap-3">
                <step.icon className="size-6 text-primary" />
                <h3 className="text-base sm:text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">Quer ver na prática?</p>
          <button
            onClick={openFullscreen}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(233, 90, 12, 0.1)',
              border: '1px solid rgba(233, 90, 12, 0.3)',
            }}
          >
            <Play className="size-4 fill-current text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Assistir vídeo</span>
          </button>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #5A3DCC, #E95A0C, transparent)' }} />

      {/* ── Fullscreen Video Modal ── */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: 'rgba(233, 90, 12, 0.2)',
              border: '1px solid rgba(233, 90, 12, 0.4)',
            }}
          >
            <X className="size-5 sm:size-6" style={{ color: '#F5A006' }} />
          </button>

          <video
            ref={modalVideoRef}
            src="/videos/fireskins-showcase.mp4"
            className="w-full max-w-6xl max-h-[90vh] rounded-lg"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            onEnded={closeFullscreen}
          />
        </div>
      )}
    </section>
  );
};

export default VideoShowcase;
