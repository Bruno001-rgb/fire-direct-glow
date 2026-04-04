import { Play, Flame } from "lucide-react";

interface VideoShowcaseProps {
  videoSrc?: string;
}

const VideoShowcase = ({ videoSrc }: VideoShowcaseProps) => {
  return (
    <section
      id="como-funciona"
      className="relative bg-background"
    >
      {/* Top separator — orange gradient */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #E95A0C, #F5A006, transparent)' }} />

      <div className="container py-16 sm:py-24">
        {/* Video container — CS2-style cinematic block */}
        <div className="relative w-full max-w-5xl mx-auto group cursor-pointer">
          {/* Aspect ratio container */}
          <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '16/9' }}>
            {/* Dark placeholder background with purple tint */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0D0A1A, #1A0B2A, #15102A)' }} />

            {/* Geometric grid pattern (subtle) */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Diagonal accent lines — orange */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.05]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 20px,
                  #E95A0C 20px,
                  #E95A0C 21px
                )`,
              }}
            />

            {/* Purple glow — bottom left */}
            <div className="absolute bottom-0 left-0 w-2/3 h-1/2 opacity-[0.08]"
              style={{ background: 'radial-gradient(ellipse at 20% 100%, #5A3DCC, transparent 70%)' }}
            />

            {/* Orange glow — top right */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-[0.06]"
              style={{ background: 'radial-gradient(ellipse at 80% 0%, #E95A0C, transparent 70%)' }}
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />

            {/* Left side content overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 z-10">
              {/* Top label */}
              <div>
                <span
                  className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] px-3 py-1.5 backdrop-blur-sm"
                  style={{
                    background: 'rgba(10, 8, 20, 0.6)',
                    border: '1px solid rgba(233, 90, 12, 0.2)',
                    color: '#F5A006',
                  }}
                >
                  FireSkins Apresenta
                </span>
              </div>

              {/* Center play button */}
              <div className="flex items-center justify-center absolute inset-0">
                <div className="flex items-center gap-4 sm:gap-5 group/play">
                  <div
                    className="w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                    style={{
                      border: '2px solid rgba(233, 90, 12, 0.6)',
                      background: 'rgba(233, 90, 12, 0.1)',
                      boxShadow: '0 0 30px rgba(233, 90, 12, 0.15)',
                    }}
                  >
                    <Play className="size-6 sm:size-7 ml-0.5" style={{ color: '#E95A0C', fill: '#E95A0C' }} />
                  </div>
                  <span
                    className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight font-heading transition-colors duration-300"
                    style={{ color: '#F5A006' }}
                  >
                    Play Video
                  </span>
                </div>
              </div>

              {/* Bottom content */}
              <div className="flex items-end justify-between gap-4">
                {/* Title block */}
                <div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-heading leading-[0.9] mb-2">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(135deg, #E95A0C, #F5A006)' }}
                    >
                      Conheça
                    </span>
                    <br />
                    <span className="text-foreground">a FireSkins</span>
                  </h2>
                  <p className="text-[11px] sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                    Assista ao vídeo e descubra como negociar suas skins de forma rápida e segura.
                  </p>
                </div>

                {/* Carousel dots */}
                <div className="hidden sm:flex items-center gap-2 pb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E95A0C' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(90, 61, 204, 0.4)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(90, 61, 204, 0.3)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(90, 61, 204, 0.2)' }} />
                </div>
              </div>
            </div>

            {/* FireSkins logo watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
              <Flame className="size-48 sm:size-72" style={{ color: '#E95A0C' }} />
            </div>

            {/* Top-right corner accent — orange */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full" style={{ borderTop: '2px solid rgba(233, 90, 12, 0.25)', borderRight: '2px solid rgba(233, 90, 12, 0.25)' }} />
            </div>

            {/* Bottom-left corner accent — purple */}
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-full" style={{ borderBottom: '2px solid rgba(90, 61, 204, 0.25)', borderLeft: '2px solid rgba(90, 61, 204, 0.25)' }} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2">
              <Flame className="size-3.5" style={{ color: '#E95A0C' }} />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
                FireSkins — Sua loja de skins CS2
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider hidden sm:block" style={{ color: 'rgba(90, 61, 204, 0.4)' }}>
              v3.0
            </span>
          </div>
        </div>
      </div>

      {/* Bottom separator — purple to orange */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #5A3DCC, #E95A0C, transparent)' }} />
    </section>
  );
};

export default VideoShowcase;
