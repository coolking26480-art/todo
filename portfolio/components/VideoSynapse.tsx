"use client";

import { useRef, useEffect } from "react";

interface VideoSynapseProps {
  videoSrc: string;
}

const GAP_CENTER = { x: 0.5, y: 0.5 };
const GAP_RADIUS = 0.18;

export default function VideoSynapse({ videoSrc }: VideoSynapseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.load();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const gapX = width * GAP_CENTER.x;
      const gapY = height * GAP_CENTER.y;
      const interactRadius = Math.min(width, height) * GAP_RADIUS;

      const mouse = mouseRef.current;
      const distToGap = Math.sqrt(
        (mouse.x - gapX) ** 2 + (mouse.y - gapY) ** 2
      );

      const proximity = Math.max(0, 1 - distToGap / interactRadius);

      if (video.readyState >= 2) {
        if (proximity <= 0.05) {
          video.pause();
          video.currentTime = 0;
        } else {
          const targetRate = 0.1 + proximity * 1.4;
          video.playbackRate = targetRate;
          if (video.paused) {
            video.play().catch(() => {});
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 cursor-crosshair"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
