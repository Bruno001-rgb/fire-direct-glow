import { useState, useRef, useEffect } from "react";
import { Play, Flame, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFireskins from "@/assets/logo-fireskins.webp";

interface VideoShowcaseProps {
  videoSrc?: string;
}

const VideoShowcase = ({ videoSrc }: VideoShowcaseProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

      {/* ── Content ── */}
      <div className="container relative z-10 py-10 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* ── Left: Text block ── */}
          <div className="text-center lg:text-left">
            {/* Premium label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6" style={{ background: '#E95A0C' }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-sm backdrop-blur-sm"
                style={{
                  background: 'rgba(233, 90, 12, 0.08)',
                  border: '1px solid rgba(233, 90, 12, 0.2)',
                  color: '#F5A006',
                }}
              >
                FireSkins Apresenta
              </span>
              <div className="h-px w-6 hidden lg:block" style={{ background: '#E95A0C' }} />
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight font-heading leading-[0.88] mb-5">
              <span
                className="bg-clip-text text-transparent block"
                style={{ backgroundImage: 'linear-gradient(135deg, #E95A0C 0%, #F5A006 60%, #E95A0C 100%)' }}
              >
                Conheça
              </span>
              <span className="text-foreground block mt-1">
                a FireSkins
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-8">
              Assista ao vídeo e descubra como comprar, vender e negociar suas skins com rapidez e segurança.
            </p>

            {/* CTA Buttons */}
            <div className="hidden sm:flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4">
              <Button variant="fire" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" onClick={openFullscreen}>
                <Play className="size-4 fill-current" />
                Assistir vídeo
              </Button>

              <Button variant="fire-outline" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" asChild>
                <a href="#catalogo">
                  Ver catálogo
                  <ArrowRight className="size-4 ml-1" />
                </a>
              </Button>
            </div>

            {/* Trust line */}
            <div className="mt-4 sm:mt-8 flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex -space-x-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E95A0C' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5A006' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5A3DCC' }} />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
                +2.000 negociações realizadas
              </span>
            </div>
          </div>

          {/* ── Right: Video Preview Card ── */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-lg opacity-60 blur-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(233, 90, 12, 0.08), rgba(90, 61, 204, 0.06))' }}
            />

            {/* Glass card */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 15, 35, 0.8), rgba(10, 8, 20, 0.95))',
                border: '1px solid rgba(233, 90, 12, 0.15)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3" style={{ borderBottom: '1px solid rgba(233, 90, 12, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <Flame className="size-4" style={{ color: '#E95A0C' }} />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] font-heading" style={{ color: '#F5A006' }}>
                    FireSkins
                  </span>
                </div>
              </div>

              {/* Video area */}
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black" />

                  {/* Low-poly triangles */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 225" preserveAspectRatio="none">
                    <polygon points="0,225 100,180 50,120" fill="#E95A0C" />
                    <polygon points="100,180 200,225 150,140" fill="#5A3DCC" />
                    <polygon points="200,225 300,190 250,130" fill="#E95A0C" />
                    <polygon points="300,190 400,225 350,150" fill="#5A3DCC" />
                    <polygon points="50,120 150,80 100,40" fill="#5A3DCC" />
                    <polygon points="150,80 250,130 200,60" fill="#E95A0C" />
                    <polygon points="250,130 350,90 300,30" fill="#5A3DCC" />
                    <polygon points="350,90 400,0 400,150" fill="#E95A0C" />
                    <polygon points="0,120 50,60 100,100" fill="#E95A0C" />
                    <polygon points="0,0 100,40 50,80" fill="#5A3DCC" />
                  </svg>

                  {/* Center logo — FIXED: sane size instead of 66rem */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <img src={logoFireskins} alt="FireSkins" className="w-40 h-40 sm:w-56 sm:h-56 object-contain opacity-30" />
                  </div>

                  {/* Inner vignette */}
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.5)' }} />

                  {/* Orange ambient glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(233, 90, 12, 0.08) 0%, transparent 70%)' }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative group/btn cursor-pointer" onClick={openFullscreen}>
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'rgba(233, 90, 12, 0.3)' }} />
                      <div
                        className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(233, 90, 12, 0.15), rgba(245, 160, 6, 0.1))',
                          border: '2px solid rgba(233, 90, 12, 0.5)',
                          boxShadow: '0 0 30px rgba(233, 90, 12, 0.2), 0 0 60px rgba(233, 90, 12, 0.08), inset 0 0 20px rgba(233, 90, 12, 0.05)',
                        }}
                      >
                        <Play className="size-5 sm:size-8 ml-0.5 sm:ml-1" style={{ color: '#F5A006', fill: '#F5A006' }} />
                      </div>
                    </div>
                  </div>

                  {/* HUD corners */}
                  <div className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.3)', borderLeft: '1px solid rgba(233, 90, 12, 0.3)' }} />
                  <div className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.3)', borderRight: '1px solid rgba(233, 90, 12, 0.3)' }} />
                  <div className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: '1px solid rgba(90, 61, 204, 0.3)', borderLeft: '1px solid rgba(90, 61, 204, 0.3)' }} />
                  <div className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: '1px solid rgba(90, 61, 204, 0.3)', borderRight: '1px solid rgba(90, 61, 204, 0.3)' }} />

                  <span className="absolute top-3 right-8 text-[10px] font-mono tracking-widest" style={{ color: 'rgba(245, 160, 6, 0.2)' }}>REC</span>
                  <span className="absolute bottom-3 left-8 text-[10px] font-mono tracking-widest" style={{ color: 'rgba(90, 61, 204, 0.25)' }}>00:00</span>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.08)' }}>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
                  Sua loja de skins CS2
                </span>
              </div>
            </div>
          </div>
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
