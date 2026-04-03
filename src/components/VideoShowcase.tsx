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
      {/* Background — full bleed reference image */}
      <div className="absolute inset-0">
        <img src={videoSectionBg} alt="" className="w-full h-full object-cover scale-105" />
        {/* Keep it dark enough for text readability */}
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 py-14 sm:py-20 lg:py-24">
        <div className="container max-w-4xl mx-auto px-4 flex flex-col items-center">

          {/* Badge — golden bordered pill */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border border-primary/40 bg-primary/10 backdrop-blur-sm">
              <Play className="size-3 text-primary" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Veja como funciona
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-heading leading-tight text-center mb-3 drop-shadow-[0_2px_20px_hsla(22,91%,47%,0.3)]">
            <span className="text-foreground">Conheça a </span>
            <span className="text-gradient-fire">FireSkins</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mx-auto mb-10 sm:mb-12">
            Assista ao vídeo e descubra como negociar suas skins de forma rápida e segura. ✅
          </p>

          {/* Video frame — geometric clipped border */}
          <div
            className="relative w-full max-w-3xl group cursor-pointer"
            onClick={!isPlaying ? handlePlay : undefined}
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/15 via-accent/10 to-primary/10 blur-2xl opacity-70" />

            {/* Geometric border frame via clip-path */}
            <div className="relative">
              {/* Decorative border layer */}
              <div
                className="absolute -inset-[3px] bg-gradient-to-br from-primary/50 via-accent/30 to-primary/40"
                style={{
                  clipPath:
                    "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
                }}
              />

              {/* Inner container */}
              <div
                className="relative overflow-hidden bg-card"
                style={{
                  clipPath:
                    "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
                }}
              >
                {/* Inner glow edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(233,90,12,0.12)] pointer-events-none z-20" />

                {/* 16:9 aspect ratio */}
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
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px] transition-all duration-500 group-hover:bg-background/25 z-10">
                      {/* Pulsing rings */}
                      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-primary/20 animate-ping opacity-15" />
                      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-primary/25 animate-pulse" />

                      {/* Orange glow blob */}
                      <div className="absolute w-28 h-28 rounded-full bg-primary/25 blur-2xl" />

                      {/* Play button — hexagonal feel */}
                      <div
                        className="relative flex items-center justify-center shadow-[0_0_50px_hsl(var(--primary)/0.5)] group-hover:shadow-[0_0_70px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-all duration-300"
                        style={{
                          width: "5.5rem",
                          height: "5.5rem",
                          background: "linear-gradient(135deg, hsl(22 91% 47%), hsl(38 92% 49%))",
                          clipPath:
                            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                        }}
                      >
                        <Play
                          className="size-8 text-primary-foreground ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent pointer-events-none flex items-end justify-between pb-2.5 px-5 z-20">
                  {/* Left — branding */}
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.15em] font-heading font-bold flex items-center gap-1.5">
                    🔥 FireSkins — Sua loja de skins CS2
                  </span>
                </div>
              </div>
            </div>

            {/* Corner decorations outside frame */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-accent/50" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-accent/50" />
          </div>

          {/* Bottom indicator row */}
          <div className="flex items-center justify-between w-full max-w-3xl mt-6 px-2">
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl font-black font-heading">🔥 3.</span>
            </div>
            <div className="text-muted-foreground/40 text-2xl">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
