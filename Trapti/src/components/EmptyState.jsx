import React from 'react';
import { SearchX, Trophy, Users, FolderGit2 } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No items found',
  description = 'Try adjusting your search query or switching filters to see more results.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white/70 border border-slate-200 my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-teal-400 mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
