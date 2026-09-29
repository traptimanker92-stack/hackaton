import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CountdownTimer = ({ targetDate, variant = 'default', label = 'Registration Closes In' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    if (variant === 'compact') {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Deadline Passed</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-slate-500 text-sm">
        <CheckCircle2 className="w-4 h-4 text-slate-500" />
        <span>Registration closed for this event</span>
      </div>
    );
  }

  // Compact variant for Hackathon cards
  if (variant === 'compact') {
    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md border ${
          isUrgent
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
            : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
        }`}
      >
        <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-amber-400' : 'text-teal-400'}`} />
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {String(timeLeft.hours).padStart(2, '0')}h :{' '}
          {String(timeLeft.minutes).padStart(2, '0')}m :{' '}
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  // Expanded variant for Hackathon detail view
  return (
    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-teal-400 animate-spin-slow" />
          {label}
        </span>
        {timeLeft.days === 0 && timeLeft.hours < 24 && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            <AlertCircle className="w-3 h-3" /> Ends Soon!
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300">
          <span className="block font-mono text-2xl font-bold text-white tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Days</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300">
          <span className="block font-mono text-2xl font-bold text-teal-300 tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Hours</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300">
          <span className="block font-mono text-2xl font-bold text-teal-300 tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Mins</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300">
          <span className="block font-mono text-2xl font-bold text-teal-400 tracking-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Secs</span>
        </div>
      </div>
    </div>
  );
};
