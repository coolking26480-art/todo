"use client";

import { useRef, useEffect } from "react";

interface Ripple {
  x: number;
  y: number;
  birth: number;
  amplitude: number;
  frequency: number;
  speed: number;
  decay: number;
  isClick: boolean;
}

interface NavRippleCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function NavRippleCanvas({ containerRef }: NavRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 });
  const animFrameRef = useRef<number>(0);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const spawnRipple = (x: number, y: number, isClick: boolean = false) => {
      ripplesRef.current.push({
        x,
        y,
        birth: performance.now(),
        amplitude: isClick ? 0.6 : 0.3,
        frequency: isClick ? 0.08 : 0.12,
        speed: isClick ? 1.5 : 2.5,
        decay: isClick ? 0.985 : 0.96,
        isClick,
      });

      if (ripplesRef.current.length > 20) {
        ripplesRef.current.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      const now = performance.now();
      const dist = Math.sqrt(
        (x - mouseRef.current.prevX) ** 2 + (y - mouseRef.current.prevY) ** 2
      );

      if (dist > 6 && now - lastMoveRef.current > 30) {
        spawnRipple(x, y, false);
        lastMoveRef.current = now;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(x, y, true);
      setTimeout(() => spawnRipple(x, y, true), 120);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    const animate = (now: number) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const ripples = ripplesRef.current;
      if (ripples.length === 0) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = now - r.birth;
        const radius = age * r.speed * 0.12;
        const alive = r.amplitude > 0.008;

        if (!alive) {
          ripples.splice(i, 1);
          continue;
        }

        // Organic wave distortion — multiple sine waves
        const distortion = Math.sin(age * r.frequency * 2) * r.amplitude * 8;
        const distortedRadius = radius + distortion;

        // Main ring with soft glow
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 220, 255, ${r.amplitude * 0.25})`;
        ctx.lineWidth = 1.2;
        ctx.arc(r.x, r.y, distortedRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner soft fill
        const innerGrad = ctx.createRadialGradient(
          r.x, r.y, distortedRadius * 0.7,
          r.x, r.y, distortedRadius * 1.1
        );
        innerGrad.addColorStop(0, `rgba(0, 220, 255, 0)`);
        innerGrad.addColorStop(0.5, `rgba(0, 220, 255, ${r.amplitude * 0.06})`);
        innerGrad.addColorStop(1, `rgba(0, 220, 255, 0)`);
        ctx.beginPath();
        ctx.fillStyle = innerGrad;
        ctx.arc(r.x, r.y, distortedRadius * 1.1, 0, Math.PI * 2);
        ctx.fill();

        // Secondary concentric ring for clicks
        if (r.isClick) {
          const ring2 = distortedRadius * 0.55;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 220, 255, ${r.amplitude * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.arc(r.x, r.y, ring2, 0, Math.PI * 2);
          ctx.stroke();
        }

        r.amplitude *= r.decay;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-full"
    />
  );
}
