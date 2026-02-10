import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import error404Anim from '../components/animations/404/Error 404.json';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-md aspect-square flex items-center justify-center">
        <Lottie
          animationData={error404Anim}
          loop={true}
          className="w-full h-full"
          rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 text-center">
        Page not found
      </h1>
      <p className="text-slate-400 text-center mt-2 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 btn-primary px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center min-w-[160px] sm:min-w-0"
      >
        Back to Home
      </Link>
    </div>
  );
}
