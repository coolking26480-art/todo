"use client";

import { useRef, useEffect, useState } from "react";

interface VideoSynapseProps {
  videoSrc: string; 
}

// Interaction zone (same as old particle system)
const GAP_CENTER = { x: 0.5, y: 0.5 };
const GAP_RADIUS = 0.35; // slightly larger than old 0.12 for better feel

export default function VideoSynapse({ videoSrc }: VideoSynapseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Preload video metadata
    video.load();

    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadedmetadata", handleLoaded);

    // Track mouse position relative to container
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

    // Animation loop for scrubbing
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

      // Normalize distance: 0 = at center, 1 = at edge of radius
      const proximity = Math.max(0, 1 - distToGap / interactRadius);

      if (video.readyState >= 2) {
        if (proximity <= 0.05) {
          // Far away: pause and reset to start (frame 0 = neurons at rest)
          video.pause();
          video.currentTime = 0;
        } else {
          // Close: scrub forward based on proximity
          // Closer = faster playback. Range: 0.1x to 1.5x
          const targetRate = 0.1 + proximity * 1.4;
          video.playbackRate = targetRate;

          // Only call play() if actually paused
          if (video.paused) {
            video.play().catch(() => {
              // Autoplay blocked or error — fallback to Option B behavior
              setUseFallback(true);
            });
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", handleLoaded);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [videoSrc]);

  // Fallback: if video scrubbing fails, use opacity crossfade (Option B)
  if (useFallback) {
    return <VideoCrossfade videoSrc={videoSrc} />;
  }

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
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Loading state */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-biolum-400/30 border-t-biolum-400 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Option B Fallback Component
function VideoCrossfade({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.load();
    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadedmetadata", handleLoaded);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const gapX = rect.width * GAP_CENTER.x;
      const gapY = rect.height * GAP_CENTER.y;
      const interactRadius = Math.min(rect.width, rect.height) * GAP_RADIUS;

      const dist = Math.sqrt(
        (e.clientX - rect.left - gapX) ** 2 +
        (e.clientY - rect.top - gapY) ** 2
      );

      setIsNear(dist < interactRadius);
    };

    const handleMouseLeave = () => setIsNear(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    if (isNear) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isNear, videoLoaded]);

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
        loop
        preload="auto"
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          isNear && videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
