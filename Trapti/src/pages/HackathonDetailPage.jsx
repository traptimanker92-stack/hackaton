import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHackathons } from '../context/HackathonContext';
import { CountdownTimer } from '../components/CountdownTimer';
import { TeamRegistrationModal } from '../components/TeamRegistrationModal';
import { EmptyState } from '../components/EmptyState';
import {
  Trophy,
  Calendar,
  Users,
  GraduationCap,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  ExternalLink,
  Github,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  PlusCircle,
  Copy,
  Check,
  Send,
  UserPlus
} from 'lucide-react';

export const HackathonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHackathon, getUserTeamForHackathon } = useHackathons();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'prizes' | 'teams' | 'submissions' | 'rules'
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const hackathon = getHackathon(id);
  const userTeam = hackathon ? getUserTeamForHackathon(hackathon.id) : null;

  if (!hackathon) {
    return (
      <div className="py-16">
        <EmptyState
          icon={AlertCircle}
          title="Hackathon Not Found"
          description="The requested event might have been removed or the URL is invalid."
          actionText="Back to Explore"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const {
    title,
    tagline,
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
    organizer,
    tags,
    description,
    rules,
    schedule,
    prizes,
    registeredTeams,
    submissions
  } = hackathon;

  const isPast = status === 'past';
  const isOngoing = status === 'ongoing';
  const isUpcoming = status === 'upcoming';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyTeamCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatDate = (isoString) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'TBD';
    }
  };

  const formatDateTime = (isoString) => {
    try {
      return new Date(isoString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
      });
    } catch {
      return 'TBD';
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Hackathons</span>
        </Link>
      </div>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-white">
          {banner ? (
            <img
              src={banner}
              alt={title}
              className="w-full h-full object-cover object-center opacity-40 filter blur-[1px]"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${gradient || 'from-teal-800 to-indigo-900'} opacity-50`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

          {/* Banner Floating Metadata */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {status === 'ongoing' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE ONGOING SPRINT
                </span>
              )}
              {status === 'upcoming' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  UPCOMING SPRINT
                </span>
              )}
              {status === 'past' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  COMPLETED / WINNERS ANNOUNCED
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-teal-300 border border-slate-300 backdrop-blur-md">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Prize Pool: {prizePool}
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-slate-100 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 backdrop-blur-md transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
            </button>
          </div>

          {/* Hero Bottom Content */}
          <div className="absolute bottom-6 left-6 right-6 max-w-4xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {theme}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 line-clamp-2 max-w-3xl">
              {tagline || description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                {organizer || 'Computer Society of India'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                {location || 'Hybrid / Virtual'}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                {registeredTeams?.length || 0} Teams Registered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Navigation Tabs & Tab Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 border border-slate-200 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Overview & Schedule
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'prizes'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Prizes ({prizes ? prizes.length : 0})
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'teams'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Teams ({registeredTeams ? registeredTeams.length : 0})
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'submissions'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isPast ? `🏆 Winners (${submissions?.length || 0})` : `Submissions (${submissions?.length || 0})`}
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'rules'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Rules & Guidelines
            </button>
          </div>

          {/* TAB 1: OVERVIEW & SCHEDULE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About */}
              <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  About the Hackathon
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>

                {/* Tech Tags */}
                {tags && tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                      Target Technologies & Themes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 text-teal-300 border border-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Eligibility & Team Size Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/80 border border-slate-200">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>Eligibility Criteria</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{eligibility}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 border border-slate-200">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-2">
                    <Users className="w-5 h-5" />
                    <span>Allowed Team Size</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Min <strong>{teamSize?.min || 1}</strong> to Max <strong>{teamSize?.max || 4}</strong> members per team.
                    Cross-chapter and inter-college collaborations are welcome.
                  </p>
                </div>
              </div>

              {/* Schedule Timeline */}
              {schedule && schedule.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-400" />
                    Event Timeline & Milestones
                  </h3>

                  <div className="space-y-4 pt-2">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 relative">
                        {index < schedule.length - 1 && (
                          <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-slate-100" />
                        )}
                        <div className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-mono font-semibold text-teal-400">
                            {item.time}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRIZES */}
          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <Trophy className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Total Prize Pool for this event is <strong>{prizePool}</strong>, distributed across champions and category tracks.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prizes?.map((prize, idx) => {
                  let badgeColor = 'from-amber-500 to-yellow-600';
                  let medalIcon = '🥇';

                  if (prize.icon === 'silver' || idx === 1) {
                    badgeColor = 'from-slate-300 to-slate-500';
                    medalIcon = '🥈';
                  } else if (prize.icon === 'bronze' || idx === 2) {
                    badgeColor = 'from-amber-700 to-amber-900';
                    medalIcon = '🥉';
                  } else if (prize.icon === 'special') {
                    badgeColor = 'from-purple-500 to-pink-600';
                    medalIcon = '⭐';
                  }

                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/90 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{medalIcon}</span>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                            Award Track
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white leading-tight">{prize.rank}</h4>
                        <div className="text-2xl font-black text-amber-300 mt-2 font-mono">
                          {prize.amount}
                        </div>
                      </div>

                      {prize.perk && (
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 bg-white/40 p-3 rounded-xl">
                          <span className="font-semibold text-teal-400 block mb-1">Included Perks:</span>
                          {prize.perk}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: REGISTERED TEAMS */}
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Registered Teams</h3>
                  <p className="text-xs text-slate-500">
                    {registeredTeams?.length || 0} teams registered for this hackathon
                  </p>
                </div>

                {!isPast && (
                  <button
                    onClick={() => setIsTeamModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{userTeam ? 'View / Manage Team' : 'Register / Join Team'}</span>
                  </button>
                )}
              </div>

              {registeredTeams && registeredTeams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {registeredTeams.map((team) => (
                    <div
                      key={team.id}
                      className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2 hover:border-teal-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm truncate">{team.name}</h4>
                        <span className="font-mono text-[11px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                          {team.members.length} / {teamSize?.max || 4} members
                        </span>
                      </div>

                      <div className="text-xs text-slate-500">
                        Leader: <strong className="text-slate-700">{team.leader}</strong>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-slate-500">
                          Code: {team.code}
                        </span>
                        {!isPast && team.members.length < (teamSize?.max || 4) && (
                          <button
                            onClick={() => {
                              setIsTeamModalOpen(true);
                            }}
                            className="text-teal-400 hover:text-teal-300 font-semibold"
                          >
                            Join Team →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Users}
                  title="No teams registered yet"
                  description="Be the first to register a team for this hackathon!"
                  actionText="Create Team"
                  onAction={() => setIsTeamModalOpen(true)}
                />
              )}
            </div>
          )}

          {/* TAB 4: SUBMISSIONS & WINNERS */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isPast ? 'Winner Showcase & Hall of Fame' : 'Project Submissions'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {submissions?.length || 0} projects submitted
                  </p>
                </div>

                {!isPast && (
                  <Link
                    to={`/hackathons/${id}/submit`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Project</span>
                  </Link>
                )}
              </div>

              {submissions && submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className={`p-6 rounded-2xl bg-white/90 border transition-all ${
                        sub.isWinner
                          ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/5 to-slate-900/90 shadow-xl shadow-amber-500/5'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {sub.isWinner && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <Trophy className="w-3.5 h-3.5 text-amber-400" />
                              {sub.winnerTier || 'Winner'}
                            </span>
                          )}
                          <span className="text-xs text-slate-500">
                            By Team <strong className="text-white">{sub.teamName}</strong>
                          </span>
                        </div>

                        {sub.score && (
                          <span className="text-xs font-mono font-bold text-teal-400 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300">
                            Score: {sub.score} / 100
                          </span>
                        )}
                      </div>

                      <h4 className="text-xl font-black text-white">{sub.projectName}</h4>
                      <p className="text-xs text-teal-300 font-medium mt-1">{sub.tagline}</p>
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">{sub.description}</p>

                      {/* Tech stack pills */}
                      {sub.techStack && sub.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {sub.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="pt-4 mt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                        {sub.repoUrl && (
                          <a
                            href={sub.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub Repository</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        )}

                        {sub.demoUrl && (
                          <a
                            href={sub.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Project Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Award}
                  title="No project submissions yet"
                  description="Submissions will appear here once registered teams submit their code repositories and live demos."
                  actionText={!isPast ? 'Submit Your Project' : undefined}
                  onAction={() => navigate(`/hackathons/${id}/submit`)}
                />
              )}
            </div>
          )}

          {/* TAB 5: RULES */}
          {activeTab === 'rules' && (
            <div className="p-6 rounded-2xl bg-white/80 border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                Hackathon Rules & Code of Conduct
              </h3>

              <div className="space-y-3 pt-2">
                {rules?.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Action & Countdown Sidebar */}
        <div className="space-y-6">
          {/* Dynamic Countdown Timer */}
          <CountdownTimer
            targetDate={registrationDeadline}
            label={isPast ? 'Hackathon Concluded' : 'Registration Closes In'}
          />

          {/* User's Team Status Card */}
          <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Participation Status
            </h4>

            {userTeam ? (
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-400">Registered Team:</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {userTeam.members.length} / {teamSize?.max || 4} members
                  </span>
                </div>
                <h5 className="text-base font-bold text-white">{userTeam.name}</h5>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-teal-500/20">
                  <span className="text-xs font-mono font-bold text-teal-300">
                    Code: {userTeam.code}
                  </span>
                  <button
                    onClick={() => handleCopyTeamCode(userTeam.code)}
                    className="flex items-center gap-1 text-[11px] text-teal-300 hover:text-slate-900"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsTeamModalOpen(true)}
                  className="w-full mt-2 py-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold transition-colors"
                >
                  Manage Team & Invites
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  You have not registered or joined a team for this hackathon yet. Form a team with friends or join an existing squad using their 6-character code.
                </p>
                {!isPast && (
                  <button
                    onClick={() => setIsTeamModalOpen(true)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md shadow-teal-500/20 transition-all"
                  >
                    Register / Form Team
                  </button>
                )}
              </div>
            )}

            {/* Submit Project CTA */}
            {!isPast && (
              <Link
                to={`/hackathons/${id}/submit`}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-slate-100 hover:bg-indigo-600 hover:border-indigo-500 border border-slate-300 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Final Project</span>
              </Link>
            )}
          </div>

          {/* Key Dates & Specifications Card */}
          <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-500">
              Event Details
            </h4>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Registration Deadline:</span>
              <span className="font-medium text-slate-700">{formatDate(registrationDeadline)}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Hackathon Starts:</span>
              <span className="font-medium text-slate-700">{formatDate(startDate)}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Hackathon Ends:</span>
              <span className="font-medium text-slate-700">{formatDate(endDate)}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Team Size:</span>
              <span className="font-medium text-slate-700">
                {teamSize?.min} to {teamSize?.max} developers
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-500">Organizer:</span>
              <span className="font-medium text-teal-400">{organizer || 'CSI Chapter'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Registration Modal */}
      <TeamRegistrationModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        hackathon={hackathon}
      />
    </div>
  );
};
