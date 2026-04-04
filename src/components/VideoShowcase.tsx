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

  // Animated wireframe background
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

    const drawKarambit = (cx: number, cy: number, s: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.strokeStyle = `rgba(90, 61, 204, ${alpha})`;
      ctx.lineWidth = 1.2 / s;
      // Blade curve
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(30, -10); ctx.lineTo(50, -5); ctx.lineTo(55, 5); ctx.lineTo(45, 15);
      ctx.bezierCurveTo(30, 50, -10, 60, -30, 40);
      ctx.bezierCurveTo(-45, 25, -35, 0, -15, -5);
      ctx.lineTo(0, 0);
      ctx.stroke();
      // Ring
      ctx.beginPath(); ctx.arc(60, 0, 8, 0, Math.PI * 2); ctx.stroke();
      // Internal lines
      ctx.strokeStyle = `rgba(90, 61, 204, ${alpha * 0.6})`;
      ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(35, 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5, 10); ctx.lineTo(20, 35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-5, 15); ctx.lineTo(10, 40); ctx.stroke();
      ctx.restore();
    };

    const drawAWP = (cx: number, cy: number, s: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.rotate(-0.08);
      ctx.strokeStyle = `rgba(90, 61, 204, ${alpha})`;
      ctx.lineWidth = 1 / s;
      // Barrel
      ctx.beginPath();
      ctx.moveTo(-80, 0); ctx.lineTo(60, 0); ctx.lineTo(60, -3); ctx.lineTo(-80, -3); ctx.closePath(); ctx.stroke();
      // Body
      ctx.beginPath();
      ctx.moveTo(-20, 0); ctx.lineTo(-20, 12); ctx.lineTo(40, 12); ctx.lineTo(50, 5); ctx.lineTo(50, 0); ctx.stroke();
      // Scope
      ctx.beginPath();
      ctx.moveTo(0, -3); ctx.lineTo(0, -18); ctx.lineTo(25, -18); ctx.lineTo(25, -3); ctx.stroke();
      ctx.beginPath();
      ctx.arc(12, -22, 6, 0, Math.PI * 2); ctx.stroke();
      // Stock
      ctx.beginPath();
      ctx.moveTo(-20, 5); ctx.lineTo(-60, 18); ctx.lineTo(-65, 15); ctx.lineTo(-25, 2); ctx.stroke();
      ctx.restore();
    };

    const drawHex = (cx: number, cy: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
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

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w(), h());

      // Subtle grid
      ctx.strokeStyle = "rgba(90, 61, 204, 0.025)";
      ctx.lineWidth = 0.5;
      const sp = 60;
      for (let x = 0; x < w(); x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h()); ctx.stroke();
      }
      for (let y = 0; y < h(); y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w(), y); ctx.stroke();
      }

      // Diagonal lines
      ctx.strokeStyle = "rgba(233, 90, 12, 0.02)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(w() * 0.15 + i * 140, 0);
        ctx.lineTo(w() * 0.15 + i * 140 - h() * 0.4, h());
        ctx.stroke();
      }

      // Large Karambit left
      drawKarambit(w() * 0.1, h() * 0.4, 3.5, 0.12);
      // Large AWP right
      drawAWP(w() * 0.88, h() * 0.35, 3.2, 0.1);

      // Hexagons
      const hexes = [
        { x: 0.05, y: 0.2, s: 40, c: "rgba(90,61,204,0.04)" },
        { x: 0.95, y: 0.75, s: 35, c: "rgba(233,90,12,0.035)" },
        { x: 0.1, y: 0.85, s: 50, c: "rgba(90,61,204,0.03)" },
        { x: 0.9, y: 0.15, s: 45, c: "rgba(233,90,12,0.03)" },
        { x: 0.5, y: 0.06, s: 28, c: "rgba(90,61,204,0.025)" },
        { x: 0.25, y: 0.6, s: 22, c: "rgba(245,160,6,0.025)" },
      ];
      hexes.forEach(hx => drawHex(w() * hx.x, h() * hx.y, hx.s, t * 0.00008, hx.c));

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="como-funciona" className="relative overflow-hidden" style={{ background: "#1A0B2A" }}>
      {/* Top separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background radial layers */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 15%, rgba(90,61,204,0.15) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(233,90,12,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 85%, rgba(233,90,12,0.05) 0%, transparent 60%),
          radial-gradient(ellipse at center, rgba(26,11,42,0.95) 0%, rgba(15,6,25,1) 100%)
        `
      }} />

      {/* Orange rim lighting sides */}
      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(233,90,12,0.04), transparent)"
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none" style={{
        background: "linear-gradient(to left, rgba(233,90,12,0.04), transparent)"
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 100% 100% at center, transparent 30%, rgba(8,3,16,0.6) 100%)"
      }} />

      {/* Wireframe canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Sparkle bottom-right */}
      <div className="absolute bottom-16 right-12 sm:right-20 opacity-40">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z" fill="url(#sparkle-grad)" />
          <defs><linearGradient id="sparkle-grad" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#E95A0C" /><stop offset="1" stopColor="#F5A006" /></linearGradient></defs>
        </svg>
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="container max-w-5xl mx-auto px-4">

          {/* Badge pill */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm"
              style={{
                borderColor: "rgba(233,90,12,0.6)",
                color: "hsl(38,92%,49%)",
                background: "linear-gradient(135deg, rgba(245,160,6,0.1) 0%, rgba(233,90,12,0.04) 100%)",
                boxShadow: "0 0 25px rgba(233,90,12,0.15), 0 0 60px rgba(233,90,12,0.06), inset 0 1px 0 rgba(245,160,6,0.15)"
              }}>
              <Play className="size-3" style={{ filter: "drop-shadow(0 0 4px rgba(233,90,12,0.6))" }} />
              Veja como funciona
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase font-heading leading-none"
              style={{ textShadow: "0 4px 50px rgba(233,90,12,0.3)" }}>
              <span className="text-foreground">CONHEÇA A </span>
              <span className="text-gradient-fire">FIRESKINS</span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "rgba(210,200,190,0.85)" }}>
              Assista ao vídeo e descubra como negociar suas skins de forma
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-sm sm:text-[15px]" style={{ color: "rgba(210,200,190,0.85)" }}>rápida e segura.</span>
              <Shield className="size-4 ml-1" style={{ color: "hsl(38,92%,49%)", filter: "drop-shadow(0 0 6px rgba(245,160,6,0.6))" }} />
            </div>
          </div>

          {/* ===== VIDEO FRAME — Armored/Faceted Style ===== */}
          <div className="relative group cursor-pointer mx-auto max-w-4xl" onClick={!isPlaying ? handlePlay : undefined}>

            {/* Outer glow */}
            <div className="absolute -inset-6 pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(90,61,204,0.15) 0%, rgba(233,90,12,0.08) 40%, transparent 70%)",
              filter: "blur(30px)"
            }} />

            {/* ========== FRAME CONTAINER ========== */}
            <div className="relative">
              {/* Main frame SVG border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 800 500" preserveAspectRatio="none" fill="none">
                {/* Outer frame path with chamfered corners */}
                <path d="M30 0 L770 0 L800 30 L800 470 L770 500 L30 500 L0 470 L0 30 Z"
                  stroke="rgba(90,61,204,0.5)" strokeWidth="2.5" fill="none" />
                {/* Inner frame path */}
                <path d="M32 2 L768 2 L798 32 L798 468 L768 498 L32 498 L2 468 L2 32 Z"
                  stroke="rgba(233,90,12,0.3)" strokeWidth="1" fill="none" />

                {/* Corner decorative elements — top-left */}
                <path d="M0 30 L30 0" stroke="rgba(233,90,12,0.6)" strokeWidth="2" />
                <path d="M2 50 L2 32 L10 32" stroke="rgba(245,160,6,0.5)" strokeWidth="1.5" />
                <path d="M50 2 L32 2 L32 10" stroke="rgba(245,160,6,0.5)" strokeWidth="1.5" />

                {/* Top-right */}
                <path d="M800 30 L770 0" stroke="rgba(233,90,12,0.6)" strokeWidth="2" />
                <path d="M798 50 L798 32 L790 32" stroke="rgba(245,160,6,0.5)" strokeWidth="1.5" />
                <path d="M750 2 L768 2 L768 10" stroke="rgba(245,160,6,0.5)" strokeWidth="1.5" />

                {/* Bottom-left */}
                <path d="M0 470 L30 500" stroke="rgba(90,61,204,0.5)" strokeWidth="2" />
                <path d="M2 450 L2 468 L10 468" stroke="rgba(90,61,204,0.4)" strokeWidth="1.5" />
                <path d="M50 498 L32 498 L32 490" stroke="rgba(90,61,204,0.4)" strokeWidth="1.5" />

                {/* Bottom-right */}
                <path d="M800 470 L770 500" stroke="rgba(233,90,12,0.5)" strokeWidth="2" />
                <path d="M798 450 L798 468 L790 468" stroke="rgba(233,90,12,0.4)" strokeWidth="1.5" />
                <path d="M750 498 L768 498 L768 490" stroke="rgba(233,90,12,0.4)" strokeWidth="1.5" />

                {/* Side accent dashes */}
                <line x1="0" y1="120" x2="0" y2="180" stroke="rgba(90,61,204,0.3)" strokeWidth="2" />
                <line x1="0" y1="320" x2="0" y2="380" stroke="rgba(90,61,204,0.25)" strokeWidth="2" />
                <line x1="800" y1="120" x2="800" y2="180" stroke="rgba(233,90,12,0.3)" strokeWidth="2" />
                <line x1="800" y1="320" x2="800" y2="380" stroke="rgba(233,90,12,0.25)" strokeWidth="2" />

                {/* Top/bottom center accent */}
                <line x1="300" y1="0" x2="500" y2="0" stroke="rgba(233,90,12,0.2)" strokeWidth="2" />
                <line x1="300" y1="500" x2="500" y2="500" stroke="rgba(90,61,204,0.2)" strokeWidth="2" />
              </svg>

              {/* Frame background with clip-path */}
              <div className="relative overflow-hidden" style={{
                clipPath: "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)",
                background: "linear-gradient(145deg, rgba(90,61,204,0.15) 0%, rgba(15,8,28,0.98) 30%, rgba(15,8,28,0.98) 70%, rgba(233,90,12,0.1) 100%)"
              }}>

                {/* Internal header bar */}
                <div className="relative z-20 flex items-center justify-between px-5 sm:px-6 py-2.5" style={{
                  background: "linear-gradient(180deg, rgba(20,12,40,0.95) 0%, rgba(15,8,28,0.8) 100%)",
                  borderBottom: "1px solid rgba(90,61,204,0.25)"
                }}>
                  <div className="flex items-center gap-2">
                    <Flame className="size-4" style={{ color: "#E95A0C", filter: "drop-shadow(0 0 8px rgba(233,90,12,0.9))" }} />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] font-heading" style={{ color: "rgba(255,255,255,0.7)" }}>FIRESKINS</span>
                  </div>
                  <Shield className="size-4" style={{ color: "rgba(245,160,6,0.5)", filter: "drop-shadow(0 0 6px rgba(245,160,6,0.4))" }} />
                </div>

                {/* Video area */}
                <div className="relative">
                  {/* Inner rim glow */}
                  <div className="absolute inset-0 pointer-events-none z-20" style={{
                    boxShadow: "inset 0 0 80px rgba(90,61,204,0.08), inset 0 0 30px rgba(233,90,12,0.04)"
                  }} />

                  {/* Karambit wireframe overlay — right side */}
                  <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-40">
                    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" className="sm:w-[160px] sm:h-[210px]">
                      <path d="M60 8 L82 22 L95 38 L98 55 L90 72 L76 98 L60 125 L40 138 L22 134 L14 118 L18 95 L30 68 L42 45 L52 26 Z"
                        stroke="rgba(245,160,6,0.55)" strokeWidth="1.3" fill="none" />
                      <path d="M60 8 L52 26 L42 45 L48 40 L60 32 L74 28 L82 22"
                        stroke="rgba(245,160,6,0.35)" strokeWidth="0.8" fill="none" />
                      <path d="M30 68 L42 64 L56 72 L60 90 L52 104 L40 98 L30 85 Z"
                        stroke="rgba(245,160,6,0.3)" strokeWidth="0.7" fill="none" />
                      <circle cx="98" cy="18" r="9" stroke="rgba(245,160,6,0.45)" strokeWidth="1" fill="none" />
                      <path d="M76 98 L68 112 L60 125 L52 132 L44 134"
                        stroke="rgba(245,160,6,0.35)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>

                  {/* HUD left */}
                  <div className="absolute left-3 sm:left-5 top-4 z-20 space-y-1.5 pointer-events-none">
                    <div className="text-[6px] sm:text-[7px] font-mono tracking-widest uppercase" style={{ color: "rgba(233,90,12,0.4)" }}>SYSTEM STATUS</div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.18)" }}>SEC: ENABLED</div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.18)" }}>NET: 12ms</div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.14)" }}>FPS: 144</div>
                  </div>

                  {/* HUD right */}
                  <div className="absolute right-3 sm:right-5 top-4 z-20 text-right space-y-1.5 pointer-events-none">
                    <div className="text-[6px] sm:text-[7px] font-mono tracking-widest flex items-center justify-end gap-1" style={{ color: "rgba(233,90,12,0.5)" }}>
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#E95A0C", boxShadow: "0 0 4px #E95A0C" }} />
                      LIVE
                    </div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.18)" }}>CODEC: H.264</div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.18)" }}>RES: 1080p</div>
                    <div className="text-[5px] sm:text-[6px] font-mono" style={{ color: "rgba(255,255,255,0.14)" }}>BITRATE: 8.2Mbps</div>
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

                    {/* Play overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center z-10"
                        style={{ background: "radial-gradient(ellipse at center, rgba(20,10,35,0.1) 0%, rgba(20,10,35,0.6) 100%)" }}>

                        {/* Hexagonal HUD ring */}
                        <div className="absolute w-40 h-40 sm:w-52 sm:h-52 pointer-events-none">
                          <svg className="w-full h-full animate-spin" style={{ animationDuration: "20s" }} viewBox="0 0 200 200">
                            {/* Outer ring */}
                            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(233,90,12,0.2)" strokeWidth="1" />
                            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(245,160,6,0.12)" strokeWidth="0.6" strokeDasharray="8 4" />
                            {/* Inner ring */}
                            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(233,90,12,0.25)" strokeWidth="1.5" />
                            <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(245,160,6,0.1)" strokeWidth="0.5" strokeDasharray="3 6" />
                            {/* Tick marks on outer ring */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                              const rad = (deg * Math.PI) / 180;
                              const x1 = 100 + Math.cos(rad) * 86;
                              const y1 = 100 + Math.sin(rad) * 86;
                              const x2 = 100 + Math.cos(rad) * 94;
                              const y2 = 100 + Math.sin(rad) * 94;
                              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(233,90,12,0.5)" strokeWidth="1.5" />;
                            })}
                            {/* Small dots at mid-ticks */}
                            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, i) => {
                              const rad = (deg * Math.PI) / 180;
                              const cx = 100 + Math.cos(rad) * 90;
                              const cy = 100 + Math.sin(rad) * 90;
                              return <circle key={i} cx={cx} cy={cy} r="1" fill="rgba(245,160,6,0.4)" />;
                            })}
                          </svg>
                        </div>

                        {/* Warm concentrated glow */}
                        <div className="absolute w-36 h-36 rounded-full pointer-events-none" style={{
                          background: "radial-gradient(circle, rgba(233,90,12,0.3) 0%, rgba(233,90,12,0.05) 50%, transparent 70%)",
                          filter: "blur(20px)"
                        }} />

                        {/* Pulse ring */}
                        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full animate-pulse" style={{
                          border: "1px solid rgba(233,90,12,0.2)",
                          boxShadow: "0 0 50px rgba(233,90,12,0.1)"
                        }} />

                        {/* Power button */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(145deg, #E95A0C 0%, #F5A006 45%, #E95A0C 100%)",
                            boxShadow: "0 0 35px rgba(233,90,12,0.6), 0 0 70px rgba(233,90,12,0.2), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)"
                          }}>
                          <div className="absolute inset-[3px] rounded-full border border-white/10" />
                          <Power className="size-7 sm:size-8 text-white relative z-10" strokeWidth={2.5}
                            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* "🔥 3." large — bottom-left */}
                  {!isPlaying && (
                    <div className="absolute bottom-14 sm:bottom-16 left-5 sm:left-7 z-20 flex items-center gap-2 pointer-events-none">
                      <Flame className="size-6 sm:size-7" style={{ color: "rgba(233,90,12,0.5)", filter: "drop-shadow(0 0 8px rgba(233,90,12,0.4))" }} />
                      <span className="text-4xl sm:text-5xl font-black font-heading" style={{
                        color: "rgba(245,160,6,0.45)",
                        textShadow: "0 0 20px rgba(245,160,6,0.25)"
                      }}>3.</span>
                    </div>
                  )}

                  {/* Bottom branding bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                    <div className="h-11 sm:h-12 flex items-center px-5 sm:px-6" style={{
                      background: "linear-gradient(to top, rgba(15,8,28,0.95) 0%, rgba(15,8,28,0.6) 60%, transparent 100%)",
                      borderTop: "1px solid rgba(90,61,204,0.15)"
                    }}>
                      <div className="flex items-center gap-2.5">
                        <Flame className="size-3.5" style={{ color: "#E95A0C", filter: "drop-shadow(0 0 6px rgba(233,90,12,0.8))" }} />
                        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] font-heading" style={{ color: "rgba(255,255,255,0.45)" }}>
                          FIRESKINS — SUA LOJA DE SKINS CS2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
