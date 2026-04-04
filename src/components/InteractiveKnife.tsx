import { useRef, useCallback, useState, useEffect } from "react";

interface InteractiveKnifeProps {
  src: string;
}

const InteractiveKnife = ({ src }: InteractiveKnifeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [idle, setIdle] = useState({ y: 0, rotate: 0, scale: 1 });
  const rafRef = useRef<number>(0);

  // Physics-based idle animation with gravity bounce
  useEffect(() => {
    if (isHovering) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let t = 0;
    const animate = () => {
      t += 0.012;

      // Primary slow bob (gravity pull + float back up)
      const gravityBob = Math.sin(t * 1.2) * 12;
      // Secondary micro-oscillation for realism
      const microBob = Math.sin(t * 3.1) * 3;
      // Gentle rotation sway
      const sway = Math.sin(t * 0.8) * 2.5;
      // Subtle scale pulse (breathing)
      const breathe = 1 + Math.sin(t * 1.5) * 0.015;

      setIdle({
        y: gravityBob + microBob,
        rotate: sway,
        scale: breathe,
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
          className="absolute inset-0 rounded-full opacity-40 pointer-events-none z-10 transition-all duration-150"
          style={{
            background: `radial-gradient(circle at ${transform.glowX}% ${transform.glowY}%, hsla(22, 91%, 47%, 0.2) 0%, transparent 60%)`,
          }}
        />

        {/* Shadow beneath knife that scales with position */}
        <div
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: "60%",
            height: "8px",
            background: "radial-gradient(ellipse, rgba(233, 90, 12, 0.2) 0%, transparent 70%)",
            filter: `blur(${4 + idle.y * 0.2}px)`,
            opacity: isHovering ? 0.3 : 0.15 + (idle.y + 15) * 0.01,
            transform: `scaleX(${1 - idle.y * 0.005})`,
            transition: isHovering ? "opacity 300ms" : "none",
          }}
        />

        {/* Knife */}
        <img
          src={src}
          alt="Premium CS2 Knife"
          className="w-full h-full object-contain"
          style={{
            filter: `drop-shadow(0 ${8 + idle.y * 0.3}px 40px rgba(233, 90, 12, 0.25)) drop-shadow(0 0 80px rgba(233, 90, 12, 0.1))`,
          }}
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default InteractiveKnife;
