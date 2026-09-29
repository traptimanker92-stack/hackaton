import React, { useState, useMemo } from 'react';
import { useHackathons } from '../context/HackathonContext';
import { StatusTabs } from '../components/StatusTabs';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { HackathonCard } from '../components/HackathonCard';
import { EmptyState } from '../components/EmptyState';
import {
  Sparkles,
  Trophy,
  Users,
  Flame,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { hackathons } = useHackathons();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ongoing' | 'upcoming' | 'past'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  // Compute all available unique tags from current hackathons
  const availableTags = useMemo(() => {
    const set = new Set();
    hackathons.forEach((h) => {
      (h.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 10);
  }, [hackathons]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: hackathons.length,
      ongoing: hackathons.filter((h) => h.status === 'ongoing').length,
      upcoming: hackathons.filter((h) => h.status === 'upcoming').length,
      past: hackathons.filter((h) => h.status === 'past').length,
    };
  }, [hackathons]);

  // Total stats for hero banner
  const platformStats = useMemo(() => {
    const totalTeams = hackathons.reduce((acc, h) => acc + (h.registeredTeams?.length || 0), 0);
    const totalSubmissions = hackathons.reduce((acc, h) => acc + (h.submissions?.length || 0), 0);
    return {
      totalEvents: hackathons.length,
      totalTeams,
      totalSubmissions,
      prizePool: '₹6.3 Lakhs + $10k'
    };
  }, [hackathons]);

  // Filtered and Sorted Hackathons
  const filteredHackathons = useMemo(() => {
    return hackathons
      .filter((h) => {
        // Status tab filter
        if (activeTab !== 'all' && h.status !== activeTab) {
          return false;
        }

        // Tag filter
        if (selectedTag && !(h.tags || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
          return false;
        }

        // Search query filter (title, theme, tags)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = h.title?.toLowerCase().includes(q);
          const matchTheme = h.theme?.toLowerCase().includes(q);
          const matchTags = (h.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchTheme && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
        }
        if (sortBy === 'newest') {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }
        if (sortBy === 'teams') {
          return (b.registeredTeams?.length || 0) - (a.registeredTeams?.length || 0);
        }
        if (sortBy === 'prizes') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [hackathons, activeTab, selectedTag, searchQuery, sortBy]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Glow backdrop decorative orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200 text-teal-700 text-xs font-semibold backdrop-blur-md shadow-lg shadow-teal-500/10">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Computer Society of India • Innovation Arena</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Build The Future at{' '}
            <span className="gradient-text-teal">CSI Hackathons</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover top-tier collegiate and open developer sprints. Form multidisciplinary teams, race against ticking deadlines, and showcase production-grade projects.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-teal-600 mb-1">
                <Flame className="w-4 h-4" />
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {platformStats.totalEvents}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Curated Hackathons</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {platformStats.prizePool}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Combined Prize Pool</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-indigo-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {platformStats.totalTeams}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Registered Teams</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-1">
                <Award className="w-4 h-4" />
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {platformStats.totalSubmissions}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Projects Submitted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery & Browsing Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore Hackathons</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Filter by ongoing hackathons, upcoming registrations, or past winners
            </p>
          </div>

          <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
        </div>

        {/* Search, Filter, and Sort Toolbar */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          availableTags={availableTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredHackathons.length}</strong> event
            {filteredHackathons.length === 1 ? '' : 's'}
            {selectedTag && ` tagged with #${selectedTag}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(searchQuery || selectedTag || activeTab !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
                setActiveTab('all');
              }}
              className="text-teal-400 hover:text-teal-300 font-semibold underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Hackathon Cards Grid */}
        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No hackathons match your search"
            description="We couldn't find any hackathons matching your search query and active filters. Try searching with different keywords or clearing tag selections."
            actionText="Clear All Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedTag('');
              setActiveTab('all');
            }}
          />
        )}
      </section>

      {/* CSI Chapter Banner */}
      <section className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/20 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            CSI Student & Faculty Chapter Network
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Are you organizing a collegiate hackathon?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            The CSI Hackathon Builder gives your organizing team instant infrastructure: customizable prize matrices, real-time invite code team registrations, automated submission showcases, and real-time ticking deadline timers.
          </p>
          <div className="pt-2">
            <Link
              to="/organizer?create=true"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              <span>Launch Your Event on CSI Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
