import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  availableTags,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, theme, or tech stack (e.g., AI, Solidity, Rust)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-9 pr-8 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 cursor-pointer transition-all"
            >
              <option value="deadline">Registration Deadline (Urgent First)</option>
              <option value="newest">Newest First</option>
              <option value="prizes">Highest Prize Pool</option>
              <option value="teams">Most Teams Registered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tech Tag Pills */}
      {availableTags && availableTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Tags:
          </span>
          <button
            onClick={() => onTagChange('')}
            className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
              !selectedTag
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Tech
          </button>
          {availableTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onTagChange(isSelected ? '' : tag)}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
