import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ComingSoon = ({ title = 'Coming soon' }) => {
  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-slate-300 text-lg mb-8">This page will be available shortly.</p>
        <Link
          to="/"
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
