import { Play, Shield, Clock, Power, Flame } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Animated wireframe mesh background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w(), h());

      // Grid lines
      ctx.strokeStyle = "rgba(90, 61, 204, 0.06)";
      ctx.lineWidth = 0.5;
      const spacing = 60;
      for (let x = 0; x < w(); x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h());
        ctx.stroke();
      }
      for (let y = 0; y < h(); y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w(), y);
        ctx.stroke();
      }

      // Geometric triangles / wireframe shapes
      const drawWireShape = (cx: number, cy: number, size: number, rot: number, color: string) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot + t * 0.0001);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        // inner
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i + Math.PI / 6;
          const px = Math.cos(angle) * size * 0.5;
          const py = Math.sin(angle) * size * 0.5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      };

      // Karambit outline (left side) - simplified blade curve
      const drawKarambit = (cx: number, cy: number, scale: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.strokeStyle = "rgba(90, 61, 204, 0.12)";
        ctx.lineWidth = 1.2 / scale;
        ctx.beginPath();
        // Handle
        ctx.moveTo(0, 0);
        ctx.lineTo(30, -10);
        ctx.lineTo(50, -5);
        ctx.lineTo(55, 5);
        ctx.lineTo(45, 15);
        // Blade curve
        ctx.bezierCurveTo(30, 50, -10, 60, -30, 40);
        ctx.bezierCurveTo(-45, 25, -35, 0, -15, -5);
        ctx.lineTo(0, 0);
        ctx.stroke();
        // Ring
        ctx.beginPath();
        ctx.arc(60, 0, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };

      // AWP outline (right side) - simplified rifle
      const drawAWP = (cx: number, cy: number, scale: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.rotate(-0.15);
        ctx.strokeStyle = "rgba(233, 90, 12, 0.08)";
        ctx.lineWidth = 1.2 / scale;
        ctx.beginPath();
        // Barrel
        ctx.moveTo(-80, 0);
        ctx.lineTo(60, 0);
        ctx.lineTo(60, -3);
        ctx.lineTo(-80, -3);
        ctx.closePath();
        ctx.stroke();
        // Body
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(-20, 12);
        ctx.lineTo(40, 12);
        ctx.lineTo(50, 5);
        ctx.lineTo(50, 0);
        ctx.stroke();
        // Scope
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.lineTo(0, -15);
        ctx.lineTo(25, -15);
        ctx.lineTo(25, -3);
        ctx.stroke();
        // Stock
        ctx.beginPath();
        ctx.moveTo(-20, 5);
        ctx.lineTo(-60, 18);
        ctx.lineTo(-65, 15);
        ctx.lineTo(-25, 2);
        ctx.stroke();
        // Trigger guard
        ctx.beginPath();
        ctx.moveTo(5, 12);
        ctx.lineTo(5, 20);
        ctx.lineTo(15, 20);
        ctx.lineTo(15, 12);
        ctx.stroke();
        ctx.restore();
      };

      // Place weapon outlines
      drawKarambit(w() * 0.12, h() * 0.4, 2.2);
      drawAWP(w() * 0.85, h() * 0.35, 2.0);

      // Scattered hexagons
      drawWireShape(w() * 0.08, h() * 0.2, 40, 0, "rgba(90, 61, 204, 0.05)");
      drawWireShape(w() * 0.92, h() * 0.7, 35, 0.5, "rgba(233, 90, 12, 0.05)");
      drawWireShape(w() * 0.15, h() * 0.8, 50, 1.2, "rgba(90, 61, 204, 0.04)");
      drawWireShape(w() * 0.85, h() * 0.15, 45, 0.8, "rgba(233, 90, 12, 0.04)");
      drawWireShape(w() * 0.5, h() * 0.1, 30, 2.0, "rgba(90, 61, 204, 0.03)");
      drawWireShape(w() * 0.3, h() * 0.6, 25, 1.5, "rgba(245, 160, 6, 0.04)");
      drawWireShape(w() * 0.7, h() * 0.85, 28, 0.3, "rgba(245, 160, 6, 0.03)");

      // Diagonal accent lines
      ctx.strokeStyle = "rgba(233, 90, 12, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(w() * 0.05 + i * 90, 0);
        ctx.lineTo(w() * 0.05 + i * 90 - h() * 0.3, h());
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="como-funciona" className="relative overflow-hidden" style={{ background: "#1A0B2A" }}>
      {/* Top luminous separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm" />

      {/* Deep background layers */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(90, 61, 204, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, rgba(233, 90, 12, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(233, 90, 12, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(26, 11, 42, 1) 0%, rgba(26, 11, 42, 0.95) 100%)
        `
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(10, 5, 20, 0.7) 100%)"
      }} />

      {/* Animated wireframe canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/[0.08] rounded-full blur-[100px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/[0.06] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/[0.05] rounded-full blur-[120px]" />

      {/* Decorative sparkle — bottom right */}
      <div className="absolute bottom-16 right-12 sm:right-20">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-40">
          <path d="M16 0L18 14L32 16L18 18L16 32L14 18L0 16L14 14L16 0Z" fill="url(#sparkle-grad)" />
          <defs>
            <linearGradient id="sparkle-grad" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#E95A0C" />
              <stop offset="1" stopColor="#F5A006" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Pill badge */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-primary/50 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
              style={{
                background: "linear-gradient(135deg, rgba(233,90,12,0.12) 0%, rgba(233,90,12,0.04) 100%)",
                boxShadow: "0 0 20px rgba(233,90,12,0.15), inset 0 0 12px rgba(233,90,12,0.06)"
              }}>
              <Play className="size-3" />
              Veja como funciona
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-heading leading-none"
              style={{ textShadow: "0 0 40px rgba(233,90,12,0.3)" }}>
              <span className="text-foreground">CONHEÇA A </span>
              <span className="text-gradient-fire">FIRESKINS</span>
            </h2>
          </div>

          {/* Subtitle with icons */}
          <div className="flex items-center justify-center gap-1 text-sm sm:text-base text-center max-w-lg mx-auto mb-12 sm:mb-16 flex-wrap">
            <span className="text-[hsl(40,10%,85%)]" style={{ textShadow: "0 0 12px rgba(255,255,255,0.15)" }}>
              Assista ao vídeo e descubra como negociar suas skins de forma
            </span>
            <span className="inline-flex items-center gap-1 text-primary font-semibold">
              <Clock className="size-3.5" style={{ filter: "drop-shadow(0 0 4px rgba(233,90,12,0.6))" }} />
              rápida
            </span>
            <span className="text-[hsl(40,10%,85%)]">e</span>
            <span className="inline-flex items-center gap-1 text-primary font-semibold">
              <Shield className="size-3.5" style={{ filter: "drop-shadow(0 0 4px rgba(233,90,12,0.6))" }} />
              segura.
            </span>
          </div>

          {/* === ARMORED VIDEO FRAME === */}
          <div className="relative group cursor-pointer mx-auto max-w-4xl" onClick={!isPlaying ? handlePlay : undefined}>

            {/* Outer massive glow */}
            <div className="absolute -inset-6 opacity-50" style={{
              background: "radial-gradient(ellipse at center, rgba(90,61,204,0.2) 0%, transparent 70%)",
              filter: "blur(30px)"
            }} />

            {/* Armored frame outer shell */}
            <div className="relative">
              {/* Top frame bar */}
              <div className="relative h-8 sm:h-10 flex items-center px-4 sm:px-6 rounded-t-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(90,61,204,0.3) 0%, rgba(26,11,42,0.9) 30%, rgba(26,11,42,0.9) 70%, rgba(90,61,204,0.3) 100%)",
                  borderTop: "1px solid rgba(90,61,204,0.4)",
                  borderLeft: "1px solid rgba(90,61,204,0.3)",
                  borderRight: "1px solid rgba(90,61,204,0.3)"
                }}>
                {/* Orange accent line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                {/* Brand label */}
                <div className="flex items-center gap-2">
                  <Flame className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(233,90,12,0.8))" }} />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 font-heading">FIRESKINS</span>
                </div>
                {/* Right side tech dots */}
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                </div>
              </div>

              {/* Side bars + video container */}
              <div className="flex">
                {/* Left armored sidebar */}
                <div className="hidden sm:flex w-6 md:w-8 flex-col items-center justify-between py-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(90,61,204,0.25) 0%, rgba(26,11,42,0.8) 50%, rgba(90,61,204,0.2) 100%)",
                    borderLeft: "1px solid rgba(90,61,204,0.3)"
                  }}>
                  {/* Geometric details */}
                  <div className="w-3 h-3 rotate-45 border border-primary/30" />
                  <div className="w-full h-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" style={{ writingMode: "vertical-lr" }} />
                  <div className="w-3 h-3 rotate-45 border border-accent/30" />
                </div>

                {/* Video area */}
                <div className="flex-1 relative overflow-hidden"
                  style={{
                    borderLeft: "1px solid rgba(233,90,12,0.15)",
                    borderRight: "1px solid rgba(233,90,12,0.15)"
                  }}>
                  {/* Inner glow edges */}
                  <div className="absolute inset-0 pointer-events-none z-20"
                    style={{ boxShadow: "inset 0 0 60px rgba(90,61,204,0.1), inset 0 0 20px rgba(233,90,12,0.05)" }} />

                  {/* Aspect ratio */}
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
                      <div className="absolute inset-0 flex items-center justify-center z-10"
                        style={{ background: "radial-gradient(ellipse at center, rgba(26,11,42,0.3) 0%, rgba(26,11,42,0.7) 100%)" }}>

                        {/* HUD ring outer */}
                        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full opacity-30 animate-spin"
                          style={{ animationDuration: "12s", border: "1px solid rgba(233,90,12,0.3)" }}>
                          {/* Tick marks */}
                          {[0, 90, 180, 270].map(deg => (
                            <div key={deg} className="absolute w-2 h-0.5 bg-primary/60" style={{
                              top: "50%", left: "50%",
                              transform: `rotate(${deg}deg) translateX(${70}px) translateY(-50%)`
                            }} />
                          ))}
                        </div>

                        {/* HUD ring middle — pulsing */}
                        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full animate-pulse"
                          style={{
                            border: "2px solid rgba(233,90,12,0.25)",
                            boxShadow: "0 0 30px rgba(233,90,12,0.1), inset 0 0 20px rgba(233,90,12,0.05)"
                          }} />

                        {/* Glow */}
                        <div className="absolute w-28 h-28 rounded-full"
                          style={{ background: "radial-gradient(circle, rgba(233,90,12,0.3) 0%, transparent 70%)", filter: "blur(20px)" }} />

                        {/* Power button */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #E95A0C 0%, #F5A006 50%, #E95A0C 100%)",
                            boxShadow: "0 0 40px rgba(233,90,12,0.5), 0 0 80px rgba(233,90,12,0.2), inset 0 2px 4px rgba(255,255,255,0.2)"
                          }}>
                          {/* Inner ring */}
                          <div className="absolute inset-2 rounded-full border border-white/20" />
                          <div className="absolute inset-3 rounded-full"
                            style={{ background: "linear-gradient(135deg, rgba(233,90,12,0.9) 0%, rgba(245,160,6,0.8) 100%)" }} />
                          <Power className="size-8 sm:size-10 text-white relative z-10"
                            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }} />
                        </div>

                        {/* HUD text readouts */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right">
                          <div className="text-[8px] sm:text-[9px] text-accent/50 font-mono uppercase tracking-wider">ONLINE</div>
                          <div className="text-[7px] sm:text-[8px] text-accent/30 font-mono">192.168.0.1</div>
                          <div className="text-[7px] sm:text-[8px] text-primary/40 font-mono">FPS: 144</div>
                        </div>

                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                          <div className="text-[8px] sm:text-[9px] text-accent/50 font-mono uppercase tracking-wider">CODEC: H.264</div>
                          <div className="text-[7px] sm:text-[8px] text-accent/30 font-mono">RES: 1920×1080</div>
                        </div>

                        {/* Wireframe overlay on right — karambit silhouette */}
                        <svg className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 opacity-20 w-24 h-32 sm:w-32 sm:h-40" viewBox="0 0 100 130" fill="none">
                          <path d="M50 10 L65 25 L70 40 Q75 70 55 95 Q35 110 25 90 Q15 70 25 50 L40 30 Z" stroke="#F5A006" strokeWidth="1" />
                          <circle cx="72" cy="22" r="6" stroke="#F5A006" strokeWidth="0.8" />
                          <path d="M30 50 L45 35 M35 55 L48 42" stroke="#F5A006" strokeWidth="0.5" opacity="0.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Bottom overlay bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                    <div className="h-12 sm:h-14 flex items-center justify-between px-4 sm:px-6"
                      style={{
                        background: "linear-gradient(to top, rgba(26,11,42,0.95) 0%, rgba(26,11,42,0.6) 60%, transparent 100%)"
                      }}>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-lg" style={{ filter: "drop-shadow(0 0 4px rgba(233,90,12,0.6))" }}>🔥</span>
                        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/70 font-heading">
                          FIRESKINS — SUA LOJA DE SKINS CS2
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="size-4 text-primary/60" />
                        <span className="text-lg sm:text-xl font-black text-primary/70 font-heading"
                          style={{ textShadow: "0 0 10px rgba(233,90,12,0.4)" }}>3.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right armored sidebar */}
                <div className="hidden sm:flex w-6 md:w-8 flex-col items-center justify-between py-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(90,61,204,0.2) 0%, rgba(26,11,42,0.8) 50%, rgba(90,61,204,0.25) 100%)",
                    borderRight: "1px solid rgba(90,61,204,0.3)"
                  }}>
                  <div className="w-3 h-3 rotate-45 border border-accent/30" />
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                    <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-accent/20" />
                  </div>
                  <div className="w-3 h-3 rotate-45 border border-primary/30" />
                </div>
              </div>

              {/* Bottom frame bar */}
              <div className="h-6 sm:h-8 rounded-b-lg overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, rgba(90,61,204,0.3) 0%, rgba(26,11,42,0.9) 30%, rgba(26,11,42,0.9) 70%, rgba(90,61,204,0.3) 100%)",
                  borderBottom: "1px solid rgba(90,61,204,0.4)",
                  borderLeft: "1px solid rgba(90,61,204,0.3)",
                  borderRight: "1px solid rgba(90,61,204,0.3)"
                }}>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                {/* Corner geometric accent — left */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-4 h-[2px] bg-accent/30 rounded-full" />
                  <div className="w-2 h-[2px] bg-primary/40 rounded-full" />
                </div>
                {/* Corner geometric accent — right */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-2 h-[2px] bg-primary/40 rounded-full" />
                  <div className="w-4 h-[2px] bg-accent/30 rounded-full" />
                </div>
              </div>

              {/* Corner accent triangles */}
              <div className="absolute -top-1 -left-1 w-4 h-4">
                <div className="absolute inset-0 border-t-2 border-l-2 border-primary/50" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4">
                <div className="absolute inset-0 border-t-2 border-r-2 border-primary/50" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4">
                <div className="absolute inset-0 border-b-2 border-l-2 border-accent/40" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4">
                <div className="absolute inset-0 border-b-2 border-r-2 border-accent/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom luminous separator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/25 to-transparent blur-sm" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default VideoShowcase;
