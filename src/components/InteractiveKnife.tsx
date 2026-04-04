import { useRef, useCallback, useState } from "react";

interface InteractiveKnifeProps {
  src: string;
}

const InteractiveKnife = ({ src }: InteractiveKnifeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0–1
    const y = (e.clientY - rect.top) / rect.height;    // 0–1
    setTransform({
      rotateX: (0.5 - y) * 20,   // ±10°
      rotateY: (x - 0.5) * 20,   // ±10°
      glowX: x * 100,
      glowY: y * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[550px] lg:h-[550px] cursor-grab"
      style={{ perspective: "800px" }}
    >
      <div
        className={`w-full h-full will-change-transform ${isHovering ? "transition-transform duration-150 ease-out" : "transition-transform duration-700 ease-in-out animate-float"}`}
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic light reflection */}
        <div
          className="absolute inset-0 rounded-full opacity-40 pointer-events-none z-10 transition-all duration-150"
          style={{
            background: `radial-gradient(circle at ${transform.glowX}% ${transform.glowY}%, hsla(22, 91%, 47%, 0.2) 0%, transparent 60%)`,
          }}
        />

        {/* Knife */}
        <img
          src={src}
          alt="Premium CS2 Knife"
          className="w-full h-full object-contain"
          style={{
            filter: `drop-shadow(0 0 40px rgba(233, 90, 12, 0.25)) drop-shadow(0 0 80px rgba(233, 90, 12, 0.1))`,
          }}
          width={1024}
          height={1024}
        />
      </div>
    </div>
  );
};

export default InteractiveKnife;
