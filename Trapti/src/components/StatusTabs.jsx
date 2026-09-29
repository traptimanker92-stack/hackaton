import React from 'react';
import { Sparkles, PlayCircle, CalendarClock, Trophy } from 'lucide-react';

export const StatusTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All Hackathons', icon: Sparkles, count: counts.all },
    { id: 'ongoing', label: 'Ongoing', icon: PlayCircle, count: counts.ongoing, badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'upcoming', label: 'Upcoming', icon: CalendarClock, count: counts.upcoming, badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { id: 'past', label: 'Past / Completed', icon: Trophy, count: counts.past, badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600/50' },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 backdrop-blur-md overflow-x-auto scrollbar-none shadow-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-700 border border-teal-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                isActive
                  ? 'bg-teal-500/20 text-teal-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
