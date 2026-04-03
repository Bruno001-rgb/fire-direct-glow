import { Play } from "lucide-react";
import { useState, useRef } from "react";
import videoSectionBg from "@/assets/video-section-bg.png";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="como-funciona" className="relative overflow-hidden">
      {/* Top edge glow separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />

      {/* Background image */}
      <div className="absolute inset-0">
        <img src={videoSectionBg} alt="" className="w-full h-full object-cover" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(225 30% 4% / 0.85) 100%)" }} />
      </div>

      {/* Ambient glows on top of bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.06] rounded-full blur-[160px]" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/[0.05] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-primary/[0.04] rounded-full blur-[120px]" />

      <div className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Badge */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              <Play className="size-3" />
              Veja como funciona
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-heading leading-tight drop-shadow-[0_2px_12px_hsla(22,91%,47%,0.3)]">
              <span className="text-foreground">Conheça a </span>
              <span className="text-gradient-fire">FireSkins</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-lg mx-auto mb-10 sm:mb-14">
            Assista ao vídeo e descubra como negociar suas skins de forma rápida e segura. ✅
          </p>

          {/* Video frame */}
          <div className="relative group cursor-pointer mx-auto max-w-4xl" onClick={!isPlaying ? handlePlay : undefined}>

            {/* Outer glow */}
            <div className="absolute -inset-3 rounded-xl opacity-60">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/20 via-accent/15 to-primary/10 blur-xl" />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-accent/40 rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />

            {/* Main frame */}
            <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 bg-card shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]">

              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(233,90,12,0.1)] pointer-events-none z-20" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-20" />

              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/explicativo.mp4"
                  controls={isPlaying}
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-background/30 z-10">
                    <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-primary/20 animate-ping opacity-20" />
                    <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-primary/30 animate-pulse" />
                    <div className="absolute w-24 h-24 rounded-full bg-primary/30 blur-xl" />
                    <div className="relative rounded-full bg-gradient-to-br from-primary via-primary to-secondary/80 flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)] group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-all duration-300"
                      style={{ width: '5rem', height: '5rem' }}>
                      <div className="absolute inset-1 rounded-full border border-primary-foreground/20" />
                      <Play className="size-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-background/95 via-background/60 to-transparent pointer-events-none flex items-end pb-3 px-5 z-20">
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] font-heading font-bold flex items-center gap-2">
                  <span className="text-primary">🔥</span> FireSkins — Sua loja de skins CS2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge glow separator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default VideoShowcase;
