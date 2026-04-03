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
      ctx.strokeStyle = "rgba(90, 61, 204, 0.18)";
      ctx.lineWidth = 1.5 / s;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(30, -10); ctx.lineTo(50, -5); ctx.lineTo(55, 5); ctx.lineTo(45, 15);
      ctx.bezierCurveTo(30, 50, -10, 60, -30, 40);
      ctx.bezierCurveTo(-45, 25, -35, 0, -15, -5);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(60, 0, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = "rgba(90, 61, 204, 0.1)";
      ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(35, 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5, 10); ctx.lineTo(20, 35); ctx.stroke();
      ctx.restore();
    };

    const drawAWP = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.rotate(-0.12);
      ctx.strokeStyle = "rgba(233, 90, 12, 0.12)";
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

      ctx.strokeStyle = "rgba(90, 61, 204, 0.04)";
      ctx.lineWidth = 0.5;
      const sp = 70;
      for (let x = 0; x < w(); x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h()); ctx.stroke();
      }
      for (let y = 0; y < h(); y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w(), y); ctx.stroke();
      }

      drawKarambit(w() * 0.08, h() * 0.35, 3.0);
      drawAWP(w() * 0.9, h() * 0.3, 2.8);

      const hexes = [
        { x: 0.06, y: 0.18, s: 35, r: 0, c: "rgba(90,61,204,0.05)" },
        { x: 0.94, y: 0.72, s: 30, r: 0.5, c: "rgba(233,90,12,0.045)" },
        { x: 0.12, y: 0.82, s: 45, r: 1.2, c: "rgba(90,61,204,0.04)" },
        { x: 0.88, y: 0.14, s: 40, r: 0.8, c: "rgba(233,90,12,0.04)" },
        { x: 0.5, y: 0.08, s: 25, r: 2.0, c: "rgba(90,61,204,0.03)" },
        { x: 0.28, y: 0.55, s: 20, r: 1.5, c: "rgba(245,160,6,0.035)" },
        { x: 0.72, y: 0.88, s: 22, r: 0.3, c: "rgba(245,160,6,0.03)" },
      ];
      hexes.forEach(hx => drawHex(w() * hx.x, canvas.offsetHeight * hx.y, hx.s, hx.r + t * 0.00008, hx.c));

      ctx.strokeStyle = "rgba(233, 90, 12, 0.03)";
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

  // Clip-path for octagonal chamfered corners (~30px bevel)
  const chamfer = 30;
  const outerClip = `polygon(
    ${chamfer}px 0%, calc(100% - ${chamfer}px) 0%,
    100% ${chamfer}px, 100% calc(100% - ${chamfer}px),
    calc(100% - ${chamfer}px) 100%, ${chamfer}px 100%,
    0% calc(100% - ${chamfer}px), 0% ${chamfer}px
  )`;

  const innerChamfer = chamfer - 4;
  const innerClip = `polygon(
    ${innerChamfer}px 0%, calc(100% - ${innerChamfer}px) 0%,
    100% ${innerChamfer}px, 100% calc(100% - ${innerChamfer}px),
    calc(100% - ${innerChamfer}px) 100%, ${innerChamfer}px 100%,
    0% calc(100% - ${innerChamfer}px), 0% ${innerChamfer}px
  )`;

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

      {/* Rim lighting */}
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(233,90,12,0.05), transparent)"
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none" style={{
        background: "linear-gradient(to left, rgba(233,90,12,0.05), transparent)"
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

      {/* Sparkle */}
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
            <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border-2 border-secondary/50 text-secondary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(245,160,6,0.12) 0%, rgba(233,90,12,0.05) 100%)",
                boxShadow: "0 0 30px rgba(245,160,6,0.15), inset 0 1px 0 rgba(245,160,6,0.2)"
              }}>
              <Play className="size-3" />
              Veja como funciona
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase font-heading leading-none"
              style={{ textShadow: "0 4px 50px rgba(233,90,12,0.3)" }}>
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

          {/* ===== OCTAGONAL VIDEO FRAME ===== */}
          <div className="relative group cursor-pointer mx-auto max-w-4xl" onClick={!isPlaying ? handlePlay : undefined}>

            {/* Outer glow aura */}
            <div className="absolute -inset-8 pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(233,90,12,0.12) 0%, rgba(90,61,204,0.1) 40%, transparent 70%)",
              filter: "blur(40px)"
            }} />

            {/* === OUTER BORDER LAYER (purple/dark) === */}
            <div className="relative" style={{
              clipPath: outerClip,
              padding: "4px",
              background: `linear-gradient(145deg, 
                rgba(90,61,204,0.6) 0%, 
                rgba(60,40,140,0.4) 20%, 
                rgba(30,15,60,0.8) 50%, 
                rgba(60,40,140,0.4) 80%, 
                rgba(233,90,12,0.4) 100%
              )`
            }}>

              {/* === INNER BORDER LAYER (orange accent) === */}
              <div className="relative" style={{
                clipPath: innerClip,
                padding: "2px",
                background: `linear-gradient(145deg, 
                  rgba(233,90,12,0.5) 0%, 
                  rgba(245,160,6,0.3) 25%, 
                  rgba(90,61,204,0.3) 50%, 
                  rgba(245,160,6,0.3) 75%, 
                  rgba(233,90,12,0.5) 100%
                )`
              }}>

                {/* === CONTENT AREA === */}
                <div className="relative" style={{
                  clipPath: innerClip,
                  background: "rgba(15,8,28,0.95)"
                }}>

                  {/* Internal header bar */}
                  <div className="relative z-20 flex items-center justify-between px-4 sm:px-5 py-2.5" style={{
                    background: "linear-gradient(180deg, rgba(20,12,35,0.98) 0%, rgba(20,12,35,0.7) 100%)",
                    borderBottom: "1px solid rgba(90,61,204,0.2)"
                  }}>
                    <div className="flex items-center gap-2">
                      <Flame className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 8px rgba(233,90,12,0.9))" }} />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 font-heading">FIRESKINS</span>
                    </div>
                    <Shield className="size-3.5 text-secondary/60" style={{ filter: "drop-shadow(0 0 4px rgba(245,160,6,0.4))" }} />
                  </div>

                  {/* Video area */}
                  <div className="relative min-w-0">
                    {/* Inner rim glow */}
                    <div className="absolute inset-0 pointer-events-none z-20" style={{
                      boxShadow: "inset 0 0 100px rgba(90,61,204,0.1), inset 0 0 40px rgba(233,90,12,0.05)"
                    }} />

                    {/* Karambit wireframe overlay (right side) */}
                    <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
                      <svg width="140" height="180" viewBox="0 0 140 180" fill="none" className="sm:w-[180px] sm:h-[230px]">
                        {/* Karambit wireframe */}
                        <path d="M70 10 L95 25 L110 40 L115 60 L105 80 L90 110 L70 140 L45 155 L25 150 L15 130 L20 105 L35 75 L50 50 L60 30 Z"
                          stroke="rgba(245,160,6,0.5)" strokeWidth="1.2" fill="none" />
                        <path d="M70 10 L60 30 L50 50 L55 45 L70 35 L85 30 L95 25"
                          stroke="rgba(245,160,6,0.3)" strokeWidth="0.8" fill="none" />
                        <path d="M35 75 L50 70 L65 80 L70 100 L60 115 L45 110 L35 95 Z"
                          stroke="rgba(245,160,6,0.25)" strokeWidth="0.6" fill="none" />
                        <circle cx="115" cy="20" r="10" stroke="rgba(245,160,6,0.4)" strokeWidth="1" fill="none" />
                        <path d="M90 110 L80 125 L70 140 L60 148 L50 150"
                          stroke="rgba(245,160,6,0.35)" strokeWidth="0.8" fill="none" />
                        <path d="M105 80 L95 95 L85 105"
                          stroke="rgba(245,160,6,0.2)" strokeWidth="0.6" fill="none" />
                      </svg>
                    </div>

                    {/* HUD side readouts - left */}
                    <div className="absolute left-3 sm:left-4 top-4 z-20 space-y-1 pointer-events-none opacity-40">
                      <div className="text-[6px] sm:text-[7px] text-primary/50 font-mono tracking-wider">SYSTEM STATUS</div>
                      <div className="text-[5px] sm:text-[6px] text-foreground/20 font-mono">SEC: ENABLED</div>
                      <div className="text-[5px] sm:text-[6px] text-foreground/20 font-mono">NET: 12ms</div>
                    </div>

                    {/* HUD side readouts - right */}
                    <div className="absolute right-3 sm:right-4 top-4 z-20 text-right space-y-1 pointer-events-none opacity-40">
                      <div className="text-[6px] sm:text-[7px] text-primary/50 font-mono tracking-wider">● LIVE</div>
                      <div className="text-[5px] sm:text-[6px] text-foreground/20 font-mono">CODEC: H.264</div>
                      <div className="text-[5px] sm:text-[6px] text-foreground/20 font-mono">RES: 1080p</div>
                    </div>

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
                          style={{ background: "radial-gradient(ellipse at center, rgba(20,10,35,0.15) 0%, rgba(20,10,35,0.65) 100%)" }}>

                          {/* Hexagonal HUD ring */}
                          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 pointer-events-none">
                            <svg className="w-full h-full animate-spin" style={{ animationDuration: "25s" }} viewBox="0 0 200 200">
                              {/* Outer octagon */}
                              <polygon
                                points="100,5 173,30 195,100 173,170 100,195 27,170 5,100 27,30"
                                fill="none" stroke="rgba(233,90,12,0.25)" strokeWidth="1.2"
                              />
                              {/* Inner octagon dashed */}
                              <polygon
                                points="100,22 158,42 175,100 158,158 100,178 42,158 25,100 42,42"
                                fill="none" stroke="rgba(245,160,6,0.15)" strokeWidth="0.8"
                                strokeDasharray="10 6"
                              />
                              {/* Circular track */}
                              <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(233,90,12,0.12)" strokeWidth="0.6" />
                              <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(245,160,6,0.08)" strokeWidth="0.5" strokeDasharray="4 8" />
                              {/* Vertex tick marks */}
                              {[
                                [100, 5, 100, 16], [173, 30, 163, 38], [195, 100, 183, 100],
                                [173, 170, 163, 162], [100, 195, 100, 184], [27, 170, 37, 162],
                                [5, 100, 17, 100], [27, 30, 37, 38]
                              ].map(([x1, y1, x2, y2], i) => (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                  stroke="rgba(233,90,12,0.4)" strokeWidth="1.5" />
                              ))}
                            </svg>
                          </div>

                          {/* Middle pulse ring */}
                          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full animate-pulse" style={{
                            border: "1px solid rgba(233,90,12,0.18)",
                            boxShadow: "0 0 60px rgba(233,90,12,0.12)"
                          }} />

                          {/* Warm glow */}
                          <div className="absolute w-40 h-40 rounded-full pointer-events-none" style={{
                            background: "radial-gradient(circle, rgba(233,90,12,0.35) 0%, rgba(233,90,12,0.06) 50%, transparent 70%)",
                            filter: "blur(25px)"
                          }} />

                          {/* Power button */}
                          <div className="relative w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            style={{
                              background: "linear-gradient(145deg, #E95A0C 0%, #F5A006 45%, #E95A0C 100%)",
                              boxShadow: "0 0 40px rgba(233,90,12,0.6), 0 0 80px rgba(233,90,12,0.25), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)"
                            }}>
                            <div className="absolute inset-[3px] rounded-full border border-white/15" />
                            <div className="absolute inset-[6px] rounded-full" style={{
                              background: "linear-gradient(145deg, rgba(233,90,12,0.95) 0%, rgba(245,160,6,0.85) 100%)"
                            }} />
                            <Power className="size-7 sm:size-9 text-white relative z-10" strokeWidth={2.5}
                              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* "3." large overlay bottom-left */}
                    {!isPlaying && (
                      <div className="absolute bottom-12 sm:bottom-14 left-4 sm:left-6 z-20 flex items-center gap-2 pointer-events-none">
                        <Flame className="size-5 sm:size-6 text-primary/60" style={{ filter: "drop-shadow(0 0 8px rgba(233,90,12,0.5))" }} />
                        <span className="text-3xl sm:text-4xl font-black text-secondary/50 font-heading" style={{ textShadow: "0 0 20px rgba(245,160,6,0.3)" }}>3.</span>
                      </div>
                    )}

                    {/* Bottom branding bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                      <div className="h-10 sm:h-11 flex items-center px-4 sm:px-5" style={{
                        background: "linear-gradient(to top, rgba(15,8,28,0.95) 0%, rgba(15,8,28,0.6) 60%, transparent 100%)"
                      }}>
                        <div className="flex items-center gap-2.5">
                          <Flame className="size-3.5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(233,90,12,0.8))" }} />
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50 font-heading">
                            FIRESKINS — SUA LOJA DE SKINS CS2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accent glows at chamfered edges */}
            <div className="absolute -top-1 left-[20px] w-10 h-[2px] pointer-events-none" style={{ background: "linear-gradient(to right, #E95A0C, transparent)" }} />
            <div className="absolute -top-1 right-[20px] w-10 h-[2px] pointer-events-none" style={{ background: "linear-gradient(to left, #F5A006, transparent)" }} />
            <div className="absolute top-[20px] -left-1 h-10 w-[2px] pointer-events-none" style={{ background: "linear-gradient(to bottom, #E95A0C, transparent)" }} />
            <div className="absolute top-[20px] -right-1 h-10 w-[2px] pointer-events-none" style={{ background: "linear-gradient(to bottom, #F5A006, transparent)" }} />
            <div className="absolute -bottom-1 left-[20px] w-10 h-[2px] pointer-events-none" style={{ background: "linear-gradient(to right, #5A3DCC, transparent)" }} />
            <div className="absolute -bottom-1 right-[20px] w-10 h-[2px] pointer-events-none" style={{ background: "linear-gradient(to left, #E95A0C, transparent)" }} />
            <div className="absolute bottom-[20px] -left-1 h-10 w-[2px] pointer-events-none" style={{ background: "linear-gradient(to top, #5A3DCC, transparent)" }} />
            <div className="absolute bottom-[20px] -right-1 h-10 w-[2px] pointer-events-none" style={{ background: "linear-gradient(to top, #E95A0C, transparent)" }} />
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
