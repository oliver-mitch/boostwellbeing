'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollVideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  opacity?: number;
  blur?: boolean;
  parallaxSpeed?: number;
}

export default function ScrollVideoBackground({
  videoSrc,
  posterSrc,
  opacity = 0.3,
  blur = true,
  parallaxSpeed = 0.5
}: ScrollVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Load video metadata
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.addEventListener('loadedmetadata', () => {
        console.log('Video loaded:', videoSrc);
      });
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });
    }

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollTop / maxScroll, 1);

      setScrollProgress(progress);

      // Update video playback based on scroll
      if (videoRef.current && videoRef.current.duration) {
        const targetTime = progress * videoRef.current.duration;

        // Only update if difference is significant (reduces jank)
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.1) {
          videoRef.current.currentTime = targetTime;
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [videoSrc]);

  // Parallax transform
  const parallaxTransform = `translateY(${scrollProgress * 100 * parallaxSpeed}px)`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: parallaxTransform,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${blur ? 'blur-sm' : ''}`}
          style={{
            opacity,
            scale: '1.1', // Slight scale to hide edges when blurred
          }}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>
    </div>
  );
}
