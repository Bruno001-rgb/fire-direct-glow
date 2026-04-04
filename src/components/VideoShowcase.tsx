import { useState, useRef, useEffect } from "react";
import { Play, Flame, ArrowRight, X } from "lucide-react";
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
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-background"
    >
      {/* Top separator */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #E95A0C, #F5A006, transparent)' }} />

      {/* ── Background layers ── */}
      {/* Base dark */}
      <div className="absolute inset-0 bg-black" />

      {/* Orange glow — bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(233, 90, 12, 0.12) 0%, rgba(233, 90, 12, 0.04) 40%, transparent 70%)' }}
      />

      {/* Purple haze — upper right */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px]"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(90, 61, 204, 0.08) 0%, transparent 60%)' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.6)' }}
      />

      {/* Diagonal pattern — right side */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 30px,
            rgba(233, 90, 12, 0.5) 30px,
            rgba(233, 90, 12, 0.5) 31px
          )`,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-pulse" style={{ background: '#E95A0C', boxShadow: '0 0 8px #E95A0C' }} />
      <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: '#F5A006', boxShadow: '0 0 6px #F5A006', animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: '#5A3DCC', boxShadow: '0 0 6px #5A3DCC', animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full animate-pulse" style={{ background: '#E95A0C', boxShadow: '0 0 10px #E95A0C', animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-1/2 w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: '#F5A006', boxShadow: '0 0 4px #F5A006', animationDelay: '1.5s' }} />

      {/* ── Content ── */}
      <div className="container relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* ── Left: Text block ── */}
          <div className="text-center lg:text-left">
            {/* Premium label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6" style={{ background: '#E95A0C' }} />
              <span
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-sm backdrop-blur-sm"
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight font-heading leading-[0.88] mb-5">
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
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
              Assista ao vídeo e descubra como comprar, vender e negociar suas skins com rapidez e segurança.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4">
              {/* Primary */}
              <button
                className="group flex items-center gap-2.5 px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider font-heading transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #E95A0C, #F5A006)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(233, 90, 12, 0.3), 0 0 40px rgba(233, 90, 12, 0.1)',
                }}
              >
                <Play className="size-4 fill-white" />
                Assistir vídeo
              </button>

              {/* Secondary */}
              <button
                className="group flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider font-heading transition-all duration-300 hover:bg-white/5"
                style={{
                  border: '1px solid rgba(233, 90, 12, 0.3)',
                  color: '#F5A006',
                }}
              >
                Ver catálogo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex -space-x-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E95A0C' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5A006' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5A3DCC' }} />
              </div>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest">
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
                boxShadow: '0 0 1px rgba(233, 90, 12, 0.4), 0 0 40px rgba(233, 90, 12, 0.06), 0 20px 60px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3" style={{ borderBottom: '1px solid rgba(233, 90, 12, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <Flame className="size-4" style={{ color: '#E95A0C' }} />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-heading" style={{ color: '#F5A006' }}>
                    FireSkins
                  </span>
                </div>
              </div>

              {/* Video area */}
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                {/* Cover */}
                <div className="absolute inset-0">
                  {/* Inner background */}
                  <div className="absolute inset-0 bg-black" />

                  {/* Low-poly triangles pattern */}
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

                  {/* Center logo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <img src={logoFireskins} alt="FireSkins" className="w-[66rem] h-[66rem] sm:w-[90rem] sm:h-[90rem] object-contain opacity-30" />
                  </div>

                  {/* Inner vignette */}
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.5)' }} />

                  {/* Orange ambient glow center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(233, 90, 12, 0.08) 0%, transparent 70%)' }}
                  />

                  {/* ── Play button ── */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div
                      className="relative group/btn cursor-pointer"
                      onClick={openFullscreen}
                    >
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'rgba(233, 90, 12, 0.3)' }} />
                      {/* Outer ring */}
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(233, 90, 12, 0.15), rgba(245, 160, 6, 0.1))',
                          border: '2px solid rgba(233, 90, 12, 0.5)',
                          boxShadow: '0 0 30px rgba(233, 90, 12, 0.2), 0 0 60px rgba(233, 90, 12, 0.08), inset 0 0 20px rgba(233, 90, 12, 0.05)',
                        }}
                      >
                        <Play className="size-6 sm:size-8 ml-1" style={{ color: '#F5A006', fill: '#F5A006' }} />
                      </div>
                    </div>
                  </div>

                  {/* HUD corners */}
                  <div className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.3)', borderLeft: '1px solid rgba(233, 90, 12, 0.3)' }} />
                  <div className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.3)', borderRight: '1px solid rgba(233, 90, 12, 0.3)' }} />
                  <div className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: '1px solid rgba(90, 61, 204, 0.3)', borderLeft: '1px solid rgba(90, 61, 204, 0.3)' }} />
                  <div className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: '1px solid rgba(90, 61, 204, 0.3)', borderRight: '1px solid rgba(90, 61, 204, 0.3)' }} />

                  {/* HUD data labels */}
                  <span className="absolute top-3 right-8 text-[8px] font-mono tracking-widest" style={{ color: 'rgba(245, 160, 6, 0.2)' }}>REC</span>
                  <span className="absolute bottom-3 left-8 text-[8px] font-mono tracking-widest" style={{ color: 'rgba(90, 61, 204, 0.25)' }}>00:00</span>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3" style={{ borderTop: '1px solid rgba(233, 90, 12, 0.08)' }}>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
                  Sua loja de skins CS2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #5A3DCC, #E95A0C, transparent)' }} />
    </section>
  );
};

export default VideoShowcase;
