import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnim from './animations/intro/Loading Screen.json';

const HERO_IMAGES = [
  '/images/hero-main.jpg',
  '/images/hero-secondary.jpg',
  '/images/hero-about.jpg',
];
const MIN_INTRO_MS = 2200;
const PRELOAD_TIMEOUT_MS = 8000;

function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src);
          img.src = src;
        })
    )
  );
}

export default function IntroScreen({ onDone }) {
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    const preloadPromise = preloadImages(HERO_IMAGES);
    const minTimePromise = new Promise((r) => setTimeout(r, MIN_INTRO_MS));
    const timeoutPromise = new Promise((r) => setTimeout(r, PRELOAD_TIMEOUT_MS));

    Promise.race([
      Promise.all([preloadPromise, minTimePromise]),
      timeoutPromise,
    ]).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_INTRO_MS - elapsed);
      setTimeout(() => onDone(), remaining);
    });
  }, [onDone, startTime]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
      aria-hidden="false"
      aria-label="Loading"
    >
      <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center px-4">
        <Lottie
          animationData={loadingAnim}
          loop={true}
          className="w-full h-full"
          rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        />
      </div>
    </div>
  );
}
