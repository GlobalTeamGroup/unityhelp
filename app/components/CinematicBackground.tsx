'use client';

import CinematicCanvas from './CinematicCanvas';

/* 
  Wrapper for the CinematicCanvas that passes the total frame count.
  569 frames = 56.9 seconds × 10 fps from both desktop & mobile videos.
*/
const TOTAL_FRAMES = 569;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CinematicBackground() {
  return (
    <CinematicCanvas
      totalFrames={TOTAL_FRAMES}
      desktopDir={`${BASE}/frames-desktop`}
      mobileDir={`${BASE}/frames-mobile`}
      lerp={0.025}
      concurrency={48}
    />
  );
}
