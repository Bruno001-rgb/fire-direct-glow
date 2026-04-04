import { useRef, useCallback, useState, useEffect } from "react";

interface InteractiveKnifeProps {
  src: string;
}

const InteractiveKnife = ({ src }: InteractiveKnifeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [idle, setIdle] = useState({ y: 0, rotate: 0, scale: 1, glow: 0 });
  const rafRef = useRef<number>(0);

  // Physics-based idle animation with gravity bounce
  useEffect(() => {
    if (isHovering) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let t = 0;
    const animate = () => {
      t += 0.014;

      // Stronger gravity bob
      const gravityBob = Math.sin(t * 1.2) * 22;
      // Secondary oscillation
      const microBob = Math.sin(t * 3.1) * 6;
      // Rotation sway
      const sway = Math.sin(t * 0.8) * 4;
      // Scale breathing
      const breathe = 1 + Math.sin(t * 1.5) * 0.02;
      // Pulsating glow intensity (0 to 1)
      const glow = (Math.sin(t * 2.0) + 1) * 0.5;

      setIdle({
        y: gravityBob + microBob,
        rotate: sway,
        scale: breathe,
        glow,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * 20,
      rotateY: (x - 0.5) * 20,
      glowX: x * 100,
      glowY: y * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  }, []);

  const currentTransform = isHovering
    ? `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    : `translateY(${idle.y}px) rotate(${idle.rotate}deg) scale(${idle.scale})`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[min(80vw,340px)] h-[min(80vw,340px)] sm:w-[420px] sm:h-[420px] lg:w-[550px] lg:h-[550px] cursor-grab"
      style={{ perspective: "800px" }}
    >
      <div
        className="w-full h-full will-change-transform"
        style={{
          transform: currentTransform,
          transformStyle: "preserve-3d",
          transition: isHovering ? "transform 150ms ease-out" : "none",
        }}
      >
        {/* Dynamic light reflection */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-10 transition-all duration-150"
          style={{
            background: `radial-gradient(circle at ${transform.glowX}% ${transform.glowY}%, hsla(22, 91%, 47%, 0.2) 0%, transparent 60%)`,
            opacity: isHovering ? 0.4 : 0.3,
          }}
        />

        {/* Pulsating glow aura */}
        <div
          className="absolute inset-[-15%] rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(233, 90, 12, 0.15) 0%, rgba(245, 160, 6, 0.05) 40%, transparent 70%)",
            opacity: isHovering ? 0.6 : 0.2 + idle.glow * 0.5,
            filter: `blur(${20 + idle.glow * 15}px)`,
            transition: isHovering ? "opacity 300ms" : "none",
          }}
        />

        {/* Shadow beneath knife */}
        <div
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: "60%",
            height: "10px",
            background: "radial-gradient(ellipse, rgba(233, 90, 12, 0.25) 0%, transparent 70%)",
            filter: `blur(${5 + idle.y * 0.3}px)`,
            opacity: isHovering ? 0.3 : 0.15 + (idle.y + 28) * 0.008,
            transform: `scaleX(${1 - idle.y * 0.008})`,
            transition: isHovering ? "opacity 300ms" : "none",
          }}
        />

        {/* Knife */}
        <img
          src={src}
          alt="Premium CS2 Knife"
          className="w-full h-full object-contain relative z-[1]"
          style={{
            filter: `drop-shadow(0 ${10 + idle.y * 0.4}px 40px rgba(233, 90, 12, ${0.2 + idle.glow * 0.2})) drop-shadow(0 0 ${60 + idle.glow * 40}px rgba(233, 90, 12, ${0.08 + idle.glow * 0.12}))`,
          }}
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default InteractiveKnife;
