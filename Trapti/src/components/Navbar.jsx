import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHackathons } from '../context/HackathonContext';
import {
  Terminal,
  Compass,
  LayoutDashboard,
  PlusCircle,
  RotateCcw,
  Menu,
  X,
  Code2,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const { resetToDefaults, hackathons } = useHackathons();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const ongoingCount = hackathons.filter((h) => h.status === 'ongoing').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-teal-500 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                  CSI Hackathon
                </span>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Builder
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 block -mt-0.5">
                Computer Society of India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-slate-100 text-teal-700 border border-slate-200 shadow-inner'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Events</span>
              {ongoingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </Link>

            <Link
              to="/organizer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/organizer')
                  ? 'bg-slate-100 text-teal-700 border border-slate-200 shadow-inner'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Organizer Dashboard</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => {
                if (window.confirm('Reset all hackathon and team data back to initial seeds?')) {
                  resetToDefaults();
                }
              }}
              title="Reset sample seeds"
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <Link
              to="/organizer?create=true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 shadow-md shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host Hackathon</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/80 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-slate-100 text-teal-700' : 'text-slate-700'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Explore Events</span>
            </Link>
            <Link
              to="/organizer"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive('/organizer') ? 'bg-slate-100 text-teal-700' : 'text-slate-700'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Organizer Dashboard</span>
            </Link>
            <Link
              to="/organizer?create=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-slate-950 bg-teal-400"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host Hackathon</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
