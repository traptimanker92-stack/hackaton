import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, AlertCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-rose-400">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md">
        The route you are looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
      >
        <Compass className="w-4 h-4" />
        <span>Return to Explore Hackathons</span>
      </Link>
    </div>
  );
};
