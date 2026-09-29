import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, Shield, Cpu, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Overview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                CSI Hackathon Builder
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              The standardized collegiate and enterprise hackathon management ecosystem built for the Computer Society of India. Facilitating seamless discovery, dynamic countdowns, team formations, and live project submissions.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-400" /> CSI Official Framework
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Offline LocalStorage Persistence
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Explore Hackathons
                </Link>
              </li>
              <li>
                <Link to="/organizer" className="hover:text-teal-400 transition-colors">
                  Organizer Console
                </Link>
              </li>
              <li>
                <Link to="/organizer?create=true" className="hover:text-teal-400 transition-colors">
                  Host New Hackathon
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Stack Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li>⚡ React 18 + Vite</li>
              <li>🎨 Tailwind CSS v3</li>
              <li>🧭 React Router v6</li>
              <li>💎 Lucide Icons</li>
              <li>💾 Persistent localStorage</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Computer Society of India (CSI). All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for student innovators & engineering chapters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
