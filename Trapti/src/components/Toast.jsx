import React from 'react';
import { useHackathons } from '../context/HackathonContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, dismissToast } = useHackathons();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />;
        let borderStyle = 'border-teal-500/30';
        let bgGlow = 'rgba(20, 184, 166, 0.15)';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
          borderStyle = 'border-rose-500/30';
          bgGlow = 'rgba(244, 63, 94, 0.15)';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />;
          borderStyle = 'border-sky-500/30';
          bgGlow = 'rgba(56, 189, 248, 0.15)';
        }

        return (
          <div
            key={toast.id}
            style={{ boxShadow: `0 8px 24px -4px ${bgGlow}` }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border ${borderStyle} text-slate-100 shadow-2xl transition-all duration-300 transform translate-y-0`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
