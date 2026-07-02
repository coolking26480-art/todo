"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  brightness: number;
}

interface NeuronCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Define the synaptic gap region constants (stable reference)
const GAP_CENTER = { x: 0.5, y: 0.5 };
const GAP_RADIUS = 0.12;

export default function NeuronCanvas({ containerRef }: NeuronCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  const createParticle = useCallback((startX: number, startY: number): Particle => {
    const angle = (Math.random() - 0.5) * 0.8; // Slight spread
    const speed = 1.5 + Math.random() * 2;
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 60 + Math.random() * 40,
      size: 1.5 + Math.random() * 2.5,
      hue: 190 + Math.random() * 40, // Cyan to blue range
      brightness: 0.6 + Math.random() * 0.4,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Define synaptic gap interaction zone
      const gapX = width * GAP_CENTER.x;
      const gapY = height * GAP_CENTER.y;
      const interactRadius = Math.min(width, height) * GAP_RADIUS;

      const mouse = mouseRef.current;
      const distToGap = Math.sqrt(
        (mouse.x - gapX) ** 2 + (mouse.y - gapY) ** 2
      );

      // Spawn particles when mouse is near the gap
      if (distToGap < interactRadius * 1.5) {
        const spawnRate = Math.max(1, Math.floor((1 - distToGap / (interactRadius * 1.5)) * 3));
        if (timestamp - lastSpawnRef.current > 30) {
          for (let i = 0; i < spawnRate; i++) {
            // Spawn from left side (axon terminal area)
            const startX = width * 0.35 + (Math.random() - 0.5) * 40;
            const startY = height * 0.5 + (Math.random() - 0.5) * 30;
            particlesRef.current.push(createParticle(startX, startY));
          }
          lastSpawnRef.current = timestamp;
        }
      }

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Move towards right side (dendrite area)
        const targetX = width * 0.65;
        const targetY = height * 0.5;
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
          p.vx += (dx / dist) * 0.15;
          p.vy += (dy / dist) * 0.15;
        }

        // Add some organic wobble
        p.vx += (Math.random() - 0.5) * 0.3;
        p.vy += (Math.random() - 0.5) * 0.3;

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
          ? (1 - lifeRatio) / 0.2
          : 1;

        const glowSize = p.size * (2 + alpha * 2);

        // Outer glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha * p.brightness})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 50%, ${alpha * p.brightness * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${alpha})`;
        ctx.fill();

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Draw connection lines between nearby particles
      ctx.strokeStyle = "rgba(0, 200, 255, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle glow at gap center when mouse is near
      if (distToGap < interactRadius * 2) {
        const glowIntensity = 1 - distToGap / (interactRadius * 2);
        const centerGlow = ctx.createRadialGradient(gapX, gapY, 0, gapX, gapY, interactRadius * 1.5);
        centerGlow.addColorStop(0, `rgba(0, 168, 255, ${glowIntensity * 0.08})`);
        centerGlow.addColorStop(1, "rgba(0, 168, 255, 0)");
        ctx.beginPath();
        ctx.arc(gapX, gapY, interactRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = centerGlow;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ cursor: "crosshair" }}
    />
  );
}
