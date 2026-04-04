import { useEffect, useRef } from "react";

const AmbientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string; life: number; maxLife: number }[] = [];

    const colors = [
      "hsla(22, 91%, 47%, ",
      "hsla(38, 92%, 49%, ",
      "hsla(254, 55%, 52%, ",
      "hsla(30, 80%, 60%, ",
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) draw();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const spawn = () => {
      if (particles.length > 35) return;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: canvas.offsetHeight + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.6 + 0.2),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      });
    };

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const fade = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
        const alpha = p.opacity * fade;

        if (p.life >= p.maxLife || alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, p.color + (alpha * 0.3) + ")");
        grad.addColorStop(1, p.color + "0)");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = p.color + alpha + ")";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (Math.random() < 0.08) spawn();
      animId = requestAnimationFrame(draw);
    };

    for (let i = 0; i < 12; i++) spawn();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
    />
  );
};

export default AmbientParticles;
