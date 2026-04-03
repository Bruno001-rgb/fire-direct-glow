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
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const drawHex = (cx: number, cy: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI * 2 / 6) * i - Math.PI / 6;
        const px = Math.cos(a) * size;
        const py = Math.sin(a) * size;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawKarambit = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.strokeStyle = "rgba(90, 61, 204, 0.1)";
      ctx.lineWidth = 1.5 / s;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(30, -10); ctx.lineTo(50, -5); ctx.lineTo(55, 5); ctx.lineTo(45, 15);
      ctx.bezierCurveTo(30, 50, -10, 60, -30, 40);
      ctx.bezierCurveTo(-45, 25, -35, 0, -15, -5);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(60, 0, 8, 0, Math.PI * 2); ctx.stroke();
      // Detail lines
      ctx.strokeStyle = "rgba(90, 61, 204, 0.05)";
      ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(35, 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5, 10); ctx.lineTo(20, 35); ctx.stroke();
      ctx.restore();
    };

    const drawAWP = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.rotate(-0.12);
      ctx.strokeStyle = "rgba(233, 90, 12, 0.07)";
      ctx.lineWidth = 1.3 / s;
      ctx.beginPath();
      ctx.moveTo(-80, 0); ctx.lineTo(60, 0); ctx.lineTo(60, -3); ctx.lineTo(-80, -3); ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-20, 0); ctx.lineTo(-20, 12); ctx.lineTo(40, 12); ctx.lineTo(50, 5); ctx.lineTo(50, 0); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -3); ctx.lineTo(0, -16); ctx.lineTo(25, -16); ctx.lineTo(25, -3); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-20, 5); ctx.lineTo(-60, 18); ctx.lineTo(-65, 15); ctx.lineTo(-25, 2); ctx.stroke();
      ctx.restore();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w(), h());

      // Subtle grid
      ctx.strokeStyle = "rgba(90, 61, 204, 0.035)";
      ctx.lineWidth = 0.5;
      const sp = 70;
      for (let x = 0; x < w(); x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h()); ctx.stroke();
      }
      for (let y = 0; y < h(); y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w(), y); ctx.stroke();
      }

      // Weapons
      drawKarambit(w() * 0.1, h() * 0.38, 2.5);
      drawAWP(w() * 0.88, h() * 0.32, 2.2);

      // Hexagons scattered
      const hexes = [
        { x: 0.06, y: 0.18, s: 35, r: 0, c: "rgba(90,61,204,0.045)" },
        { x: 0.94, y: 0.72, s: 30, r: 0.5, c: "rgba(233,90,12,0.04)" },
        { x: 0.12, y: 0.82, s: 45, r: 1.2, c: "rgba(90,61,204,0.035)" },
        { x: 0.88, y: 0.14, s: 40, r: 0.8, c: "rgba(233,90,12,0.035)" },
        { x: 0.5, y: 0.08, s: 25, r: 2.0, c: "rgba(90,61,204,0.025)" },
        { x: 0.28, y: 0.55, s: 20, r: 1.5, c: "rgba(245,160,6,0.03)" },
        { x: 0.72, y: 0.88, s: 22, r: 0.3, c: "rgba(245,160,6,0.025)" },
      ];
      hexes.forEach(h => drawHex(w() * h.x, canvas.offsetHeight * h.y, h.s, h.r + t * 0.00008, h.c));

      // Diagonal accent lines
      ctx.strokeStyle = "rgba(233, 90, 12, 0.025)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(w() * 0.1 + i * 120, 0);
        ctx.lineTo(w() * 0.1 + i * 120 - h() * 0.4, h());
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="como-funciona" className="relative overflow-hidden" style={{ background: "#1A0B2A" }}>
      {/* Top separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background layers */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 15%, rgba(90,61,204,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(233,90,12,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 85%, rgba(233,90,12,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at center, rgba(26,11,42,0.95) 0%, rgba(15,6,25,1) 100%)
        `
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 100% 100% at center, transparent 30%, rgba(8,3,16,0.6) 100%)"
      }} />

      {/* Wireframe canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/[0.06] rounded-full blur-[120px]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-primary/[0.04] rounded-full blur-[100px]" />

      {/* Sparkle decoration */}
      <div className="absolute bottom-20 right-16 sm:right-24 opacity-30">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 0L16 12L28 14L16 16L14 28L12 16L0 14L12 12L14 0Z" fill="url(#sp1)" />
          <defs><linearGradient id="sp1" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#E95A0C" /><stop offset="1" stopColor="#F5A006" /></linearGradient></defs>
        </svg>
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Badge pill */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-primary/40 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(233,90,12,0.1) 0%, rgba(233,90,12,0.03) 100%)",
                boxShadow: "0 0 24px rgba(233,90,12,0.12), inset 0 1px 0 rgba(233,90,12,0.15)"
              }}>
              <Play className="size-3" />
              Veja como funciona
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight uppercase font-heading leading-none"
              style={{ textShadow: "0 4px 40px rgba(233,90,12,0.25)" }}>
              <span className="text-foreground">CONHEÇA A </span>
              <span className="text-gradient-fire">FIRESKINS</span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <p className="text-sm sm:text-[15px] text-[hsl(40,10%,78%)] leading-relaxed"
              style={{ textShadow: "0 0 20px rgba(255,255,255,0.08)" }}>
              Assista ao vídeo e descubra como negociar suas skins de forma
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <Clock className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(233,90,12,0.7))" }} />
              <span className="text-primary font-bold text-sm sm:text-[15px]">rápida</span>
              <span className="text-[hsl(40,10%,78%)] text-sm sm:text-[15px]">e</span>
              <Shield className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(233,90,12,0.7))" }} />
              <span className="text-primary font-bold text-sm sm:text-[15px]">segura.</span>
            </div>
          </div>

          {/* ===== VIDEO FRAME ===== */}
          <div className="relative group cursor-pointer mx-auto max-w-4xl" onClick={!isPlaying ? handlePlay : undefined}>

            {/* Outer glow aura */}
            <div className="absolute -inset-4 rounded-2xl pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(90,61,204,0.15) 0%, transparent 70%)",
              filter: "blur(25px)"
            }} />

            {/* === Main armored container === */}
            <div className="relative rounded-xl overflow-hidden" style={{
              border: "2px solid rgba(90,61,204,0.35)",
              boxShadow: `
                0 0 60px rgba(90,61,204,0.12),
                0 0 120px rgba(90,61,204,0.06),
                inset 0 0 40px rgba(90,61,204,0.05)
              `
            }}>
              {/* Top chrome bar */}
              <div className="relative h-9 sm:h-11 flex items-center px-4 sm:px-5 z-30"
                style={{
                  background: "linear-gradient(90deg, rgba(90,61,204,0.2) 0%, rgba(20,10,35,0.95) 20%, rgba(20,10,35,0.95) 80%, rgba(90,61,204,0.2) 100%)",
                  borderBottom: "1px solid rgba(90,61,204,0.25)"
                }}>
                {/* Top accent line */}
                <div className="absolute top-0 left-[15%] right-[15%] h-[1px]" style={{
                  background: "linear-gradient(90deg, transparent, rgba(233,90,12,0.5), rgba(245,160,6,0.4), rgba(233,90,12,0.5), transparent)"
                }} />
                {/* Brand */}
                <div className="flex items-center gap-2">
                  <Flame className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 8px rgba(233,90,12,0.9))" }} />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 font-heading">FIRESKINS</span>
                </div>
                {/* Status dots */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60" style={{ boxShadow: "0 0 6px rgba(233,90,12,0.5)" }} />
                  <div className="w-2 h-2 rounded-full bg-accent/50" style={{ boxShadow: "0 0 6px rgba(90,61,204,0.4)" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/30" />
                </div>
              </div>

              {/* Video + sidebars row */}
              <div className="flex">
                {/* Left sidebar rail */}
                <div className="hidden sm:flex w-5 md:w-7 flex-col items-center justify-between py-6 flex-shrink-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(90,61,204,0.15) 0%, rgba(15,8,28,0.9) 50%, rgba(90,61,204,0.12) 100%)",
                    borderRight: "1px solid rgba(90,61,204,0.15)"
                  }}>
                  <div className="w-2.5 h-2.5 rotate-45 border border-accent/25" />
                  <div className="w-px flex-1 my-3 bg-gradient-to-b from-accent/20 via-transparent to-primary/15" />
                  <div className="w-2.5 h-2.5 rotate-45 border border-primary/25" />
                </div>

                {/* Video area */}
                <div className="flex-1 relative min-w-0">
                  {/* Inner rim glow */}
                  <div className="absolute inset-0 pointer-events-none z-20" style={{
                    boxShadow: "inset 0 0 80px rgba(90,61,204,0.08), inset 0 0 30px rgba(233,90,12,0.04)"
                  }} />

                  {/* 16:9 container */}
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

                    {/* ---- Play overlay ---- */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center z-10"
                        style={{ background: "radial-gradient(ellipse at center, rgba(20,10,35,0.25) 0%, rgba(20,10,35,0.65) 100%)" }}>

                        {/* Outer HUD ring — slow spin */}
                        <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full animate-spin pointer-events-none"
                          style={{ animationDuration: "15s" }}>
                          <svg className="w-full h-full" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(233,90,12,0.15)" strokeWidth="1" strokeDasharray="8 12" />
                            <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(245,160,6,0.1)" strokeWidth="0.5" strokeDasharray="4 20" />
                            {/* Tick marks at cardinal points */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                              <line key={deg}
                                x1={100 + Math.cos(deg * Math.PI / 180) * 85}
                                y1={100 + Math.sin(deg * Math.PI / 180) * 85}
                                x2={100 + Math.cos(deg * Math.PI / 180) * 92}
                                y2={100 + Math.sin(deg * Math.PI / 180) * 92}
                                stroke="rgba(233,90,12,0.3)" strokeWidth="1.5"
                              />
                            ))}
                          </svg>
                        </div>

                        {/* Middle ring — pulse */}
                        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full animate-pulse" style={{
                          border: "1.5px solid rgba(233,90,12,0.2)",
                          boxShadow: "0 0 40px rgba(233,90,12,0.08)"
                        }} />

                        {/* Central glow */}
                        <div className="absolute w-32 h-32 rounded-full pointer-events-none" style={{
                          background: "radial-gradient(circle, rgba(233,90,12,0.25) 0%, transparent 70%)",
                          filter: "blur(15px)"
                        }} />

                        {/* Power button */}
                        <div className="relative w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(145deg, #E95A0C 0%, #F5A006 45%, #E95A0C 100%)",
                            boxShadow: "0 0 30px rgba(233,90,12,0.5), 0 0 70px rgba(233,90,12,0.2), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)"
                          }}>
                          <div className="absolute inset-[3px] rounded-full border border-white/15" />
                          <div className="absolute inset-[6px] rounded-full" style={{
                            background: "linear-gradient(145deg, rgba(233,90,12,0.95) 0%, rgba(245,160,6,0.85) 100%)"
                          }} />
                          <Power className="size-7 sm:size-9 text-white relative z-10" strokeWidth={2.5}
                            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
                        </div>

                        {/* HUD readouts — top-right */}
                        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 text-right space-y-0.5 opacity-60">
                          <div className="text-[7px] sm:text-[8px] text-primary/70 font-mono tracking-wider">● ONLINE</div>
                          <div className="text-[6px] sm:text-[7px] text-accent/40 font-mono">STREAM: ACTIVE</div>
                          <div className="text-[6px] sm:text-[7px] text-primary/30 font-mono">FPS: 144</div>
                        </div>

                        {/* HUD readouts — top-left */}
                        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 space-y-0.5 opacity-50">
                          <div className="text-[7px] sm:text-[8px] text-accent/50 font-mono tracking-wider">CODEC H.264</div>
                          <div className="text-[6px] sm:text-[7px] text-accent/30 font-mono">1920×1080</div>
                        </div>

                        {/* Wireframe karambit — right side */}
                        <svg className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/3 opacity-15 w-20 h-28 sm:w-28 sm:h-36" viewBox="0 0 100 130" fill="none">
                          <path d="M50 10 L65 25 L70 40 Q75 70 55 95 Q35 110 25 90 Q15 70 25 50 L40 30 Z" stroke="#F5A006" strokeWidth="1.2" />
                          <circle cx="72" cy="22" r="6" stroke="#F5A006" strokeWidth="0.8" />
                          <path d="M30 50 L45 35 M35 55 L48 42" stroke="#F5A006" strokeWidth="0.5" opacity="0.6" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Bottom overlay bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                    <div className="h-11 sm:h-12 flex items-center justify-between px-4 sm:px-5" style={{
                      background: "linear-gradient(to top, rgba(15,8,28,0.95) 0%, rgba(15,8,28,0.5) 70%, transparent 100%)"
                    }}>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm" style={{ filter: "drop-shadow(0 0 4px rgba(233,90,12,0.7))" }}>🔥</span>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/60 font-heading">
                          FIRESKINS — SUA LOJA DE SKINS CS2
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="size-3.5 text-primary/50" />
                        <span className="text-base sm:text-lg font-black text-primary/60 font-heading" style={{ textShadow: "0 0 12px rgba(233,90,12,0.4)" }}>3.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right sidebar rail */}
                <div className="hidden sm:flex w-5 md:w-7 flex-col items-center justify-between py-6 flex-shrink-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(90,61,204,0.12) 0%, rgba(15,8,28,0.9) 50%, rgba(90,61,204,0.15) 100%)",
                    borderLeft: "1px solid rgba(90,61,204,0.15)"
                  }}>
                  <div className="w-2.5 h-2.5 rotate-45 border border-primary/25" />
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-px h-6 bg-gradient-to-b from-primary/25 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
                    <div className="w-px h-6 bg-gradient-to-b from-transparent to-accent/20" />
                  </div>
                  <div className="w-2.5 h-2.5 rotate-45 border border-accent/25" />
                </div>
              </div>

              {/* Bottom chrome bar */}
              <div className="h-5 sm:h-6 relative" style={{
                background: "linear-gradient(90deg, rgba(90,61,204,0.2) 0%, rgba(20,10,35,0.95) 20%, rgba(20,10,35,0.95) 80%, rgba(90,61,204,0.2) 100%)",
                borderTop: "1px solid rgba(90,61,204,0.2)"
              }}>
                <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px]" style={{
                  background: "linear-gradient(90deg, transparent, rgba(233,90,12,0.3), rgba(245,160,6,0.25), rgba(233,90,12,0.3), transparent)"
                }} />
                {/* Small geometric accents */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-3 h-[1.5px] bg-accent/25 rounded-full" />
                  <div className="w-1.5 h-[1.5px] bg-primary/30 rounded-full" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-1.5 h-[1.5px] bg-primary/30 rounded-full" />
                  <div className="w-3 h-[1.5px] bg-accent/25 rounded-full" />
                </div>
              </div>
            </div>

            {/* Corner bracket accents */}
            <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-primary/40 rounded-tl" />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-primary/40 rounded-tr" />
            <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-accent/30 rounded-bl" />
            <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-accent/30 rounded-br" />
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-sm" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default VideoShowcase;
