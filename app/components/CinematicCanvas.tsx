'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   CINEMATIC SCROLL ENGINE for Next.js
   Adapted from GlobalPlus/UnitySPirit pipeline.
   Loads WebP frames, draws them on a fixed canvas,
   scroll position → frame index with LERP interpolation.
   ═══════════════════════════════════════════════════════ */

interface CinematicCanvasProps {
  totalFrames: number;
  desktopDir?: string;
  mobileDir?: string;
  lerp?: number;
  concurrency?: number;
  onProgress?: (pct: number) => void;
  onReady?: () => void;
}

export default function CinematicCanvas({
  totalFrames,
  desktopDir = '/frames-desktop',
  mobileDir = '/frames-mobile',
  lerp = 0.025,
  concurrency = 48,
  onProgress,
  onReady,
}: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const isReadyRef = useRef(false);
  const animIdRef = useRef(0);
  const dprRef = useRef(1);
  const [loadPct, setLoadPct] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Detect mobile
  const isMobile = typeof window !== 'undefined' &&
    (/Mobi|Android|iPhone/i.test(navigator.userAgent) || window.innerWidth < 768);

  const frameDir = isMobile ? mobileDir : desktopDir;

  // Frame filename
  const frameName = useCallback((i: number) => {
    return `${frameDir}/frame_${String(i + 1).padStart(6, '0')}.webp`;
  }, [frameDir]);

  // Resize canvas
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    dprRef.current = Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2);
    canvas.width = innerWidth * dprRef.current;
    canvas.height = innerHeight * dprRef.current;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
  }, [isMobile]);

  // Draw single frame with cover-fit + vignette
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = framesRef.current[Math.max(0, Math.min(idx, totalFrames - 1))];
    if (!img || !img.complete) return;

    const W = innerWidth;
    const H = innerHeight;

    // Cover-fit
    const r = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const iw = img.naturalWidth * r;
    const ih = img.naturalHeight * r;
    const x = (W - iw) / 2;
    const y = (H - ih) / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, x, y, iw, ih);

    // Radial vignette
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.18, W / 2, H / 2, H * 0.85);
    vig.addColorStop(0, 'rgba(6,4,10,0)');
    vig.addColorStop(1, 'rgba(6,4,10,0.72)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    // Bottom gradient
    const bot = ctx.createLinearGradient(0, H * 0.6, 0, H);
    bot.addColorStop(0, 'rgba(6,4,10,0)');
    bot.addColorStop(1, 'rgba(6,4,10,0.85)');
    ctx.fillStyle = bot;
    ctx.fillRect(0, H * 0.6, W, H * 0.4);
  }, [totalFrames]);

  // Animation loop
  const loop = useCallback(() => {
    currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * lerp;
    if (isReadyRef.current) {
      drawFrame(Math.round(currentFrameRef.current));
    }
    animIdRef.current = requestAnimationFrame(loop);
  }, [drawFrame, lerp]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!isReadyRef.current) return;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalFrames]);

  // Load all frames
  useEffect(() => {
    framesRef.current = new Array(totalFrames).fill(null);
    let loadedCount = 0;

    const queue = Array.from({ length: totalFrames }, (_, i) => i);

    async function worker() {
      while (queue.length) {
        const i = queue.shift()!;
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            framesRef.current[i] = img;
            loadedCount++;
            const pct = Math.round((loadedCount / totalFrames) * 100);
            setLoadPct(pct);
            onProgress?.(pct);

            // First frame → start animation
            if (loadedCount === 1 && !isReadyRef.current) {
              isReadyRef.current = true;
              animIdRef.current = requestAnimationFrame(loop);
            }

            // All loaded → hide loader
            if (loadedCount === totalFrames) {
              setLoaded(true);
              onReady?.();
            }
            resolve();
          };
          img.src = frameName(i);
        });
      }
    }

    Promise.all(Array.from({ length: concurrency }, worker));

    return () => {
      cancelAnimationFrame(animIdRef.current);
    };
  }, [totalFrames, concurrency, frameName, loop, onProgress, onReady]);

  // Resize listener
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return (
    <>
      {/* Fixed canvas — behind everything */}
      <canvas
        ref={canvasRef}
        id="gl-canvas"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.3,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Loading indicator */}
      {!loaded && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.8s',
            opacity: loaded ? 0 : 1,
          }}
        >
          <div
            style={{
              width: '180px',
              height: '3px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${loadPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10B981, #34D399)',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.1em',
            }}
          >
            ЗАГРУЗКА ВИДЕО {loadPct}%
          </span>
        </div>
      )}
    </>
  );
}
