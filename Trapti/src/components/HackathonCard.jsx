import React from 'react';
import { Link } from 'react-router-dom';
import { CountdownTimer } from './CountdownTimer';
import {
  Trophy,
  Calendar,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const HackathonCard = ({ hackathon }) => {
  const {
    id,
    title,
    theme,
    status,
    banner,
    gradient,
    startDate,
    endDate,
    registrationDeadline,
    eligibility,
    teamSize,
    prizePool,
    location,
    tags,
    registeredTeams,
    submissions
  } = hackathon;

  // Format dates for display
  const formatDateRange = (start, end) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } catch {
      return 'Dates TBD';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute" />
            LIVE ONGOING
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            UPCOMING
          </span>
        );
      case 'past':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
            COMPLETED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white/90 border border-slate-200 hover:border-teal-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 overflow-hidden">
      {/* Top Banner / Image Header */}
      <div className="relative h-44 w-full overflow-hidden bg-white">
        {banner ? (
          <img
            src={banner}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r ${gradient || 'from-teal-600 to-indigo-700'} opacity-80`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {getStatusBadge()}
          <div className="flex items-center gap-1">
            <CountdownTimer targetDate={registrationDeadline} variant="compact" />
          </div>
        </div>

        {/* Prize Pool Floating Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-500/30 backdrop-blur-md text-amber-300 text-xs font-bold tracking-wide shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Pool: {prizePool}</span>
          </div>
        </div>

        {/* Location pill */}
        {location && (
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1 text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200 backdrop-blur-md">
            <MapPin className="w-3 h-3 text-teal-400" />
            <span className="truncate max-w-[140px]">{location.split('/')[0]}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Theme text */}
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1 line-clamp-1">
            {theme}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
            <Link to={`/hackathons/${id}`}>{title}</Link>
          </h3>

          {/* Key metadata grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{formatDateRange(startDate, endDate)}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 border border-slate-200">
              <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{teamSize ? `${teamSize.min} - ${teamSize.max} Per Team` : '1 - 4 Members'}</span>
            </div>
          </div>

          {/* Eligibility tag */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-white/40 px-3 py-2 rounded-xl border border-slate-200/60">
            <GraduationCap className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="truncate">{eligibility}</span>
          </div>

          {/* Tech tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-300"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-1.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 text-slate-500">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-white">{registeredTeams ? registeredTeams.length : 0}</span> teams registered
          </div>

          <Link
            to={`/hackathons/${id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-100 hover:bg-teal-500 hover:text-slate-950 transition-all duration-200 group-hover:bg-teal-500 group-hover:text-slate-950 shadow-sm"
          >
            <span>{status === 'past' ? 'View Winners' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
