import { useEffect, useRef } from "react";

export default function AnimatedParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 900;
    if (reduceMotion || isSmallScreen) {
      return;
    }

    const particleCount = 18;
    let width = 0;
    let height = 0;
    let rafId;
    let lastTime = 0;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      r: Math.random() * 1.8 + 0.7
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = (timeStamp) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      if (timeStamp - lastTime < 33) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timeStamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        const px = p.x * width;
        const py = p.y * height;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.38)";
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const qx = q.x * width;
          const qy = q.y * height;
          const dx = px - qx;
          const dy = py - qy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.11;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(95, 165, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-layer" aria-hidden="true" />;
}
