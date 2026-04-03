import { Play } from "lucide-react";
import { useState, useRef } from "react";

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

      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/60 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent/4 rounded-full blur-[100px]" />

      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <Play className="size-3" />
              Veja como funciona
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase font-heading leading-tight">
              Conheça a{" "}
              <span className="text-gradient-fire">FireSkins</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-lg mx-auto">
              Assista ao vídeo e descubra como negociar suas skins de forma rápida e segura.
            </p>
          </div>

          {/* Video container — cinematic frame */}
          <div className="relative group cursor-pointer mx-auto" onClick={!isPlaying ? handlePlay : undefined}>
            {/* Outer glow border */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-primary/30 via-primary/10 to-primary/5 blur-[1px]" />

            {/* Video wrapper */}
            <div className="relative rounded-xl overflow-hidden bg-card border border-primary/10">
              {/* Aspect ratio container */}
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

                {/* Play overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px] transition-opacity duration-300 group-hover:bg-background/30">
                    {/* Pulsing ring */}
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary/30 animate-pulse-glow" />

                    {/* Play button */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:bg-primary transition-colors duration-300 group-hover:scale-110 transform">
                      <Play className="size-7 sm:size-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent pointer-events-none flex items-end pb-2 px-4">
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-heading font-bold">
                  🔥 FireSkins — Sua loja de skins CS2
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
