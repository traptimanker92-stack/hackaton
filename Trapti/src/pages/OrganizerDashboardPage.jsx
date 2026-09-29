import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useHackathons } from '../context/HackathonContext';
import { EmptyState } from '../components/EmptyState';
import {
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
  Layers,
  Send,
  Sliders
} from 'lucide-react';

export const OrganizerDashboardPage = () => {
  const location = useLocation();
  const {
    hackathons,
    createHackathon,
    updateHackathon,
    deleteHackathon,
    resetToDefaults
  } = useHackathons();

  // Search & Filters
  const [filterSearch, setFilterSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHackathonId, setEditingHackathonId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [theme, setTheme] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [banner, setBanner] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [eligibility, setEligibility] = useState('College Students & Tech Enthusiasts');
  const [minTeamSize, setMinTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [prizePool, setPrizePool] = useState('₹1,50,000');
  const [firstPrize, setFirstPrize] = useState('₹80,000');
  const [secondPrize, setSecondPrize] = useState('₹45,000');
  const [thirdPrize, setThirdPrize] = useState('₹25,000');
  const [tagsInput, setTagsInput] = useState('React, Node.js, AI, Cloud');
  const [description, setDescription] = useState('');
  const [rulesInput, setRulesInput] = useState(
    'Teams must consist of eligible students.\nOriginal code only created during sprint.\nSubmit GitHub repo and live demo link.'
  );

  // Open creation modal if query param '?create=true' is passed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('create') === 'true') {
      handleOpenCreate();
    }
  }, [location.search]);

  const handleOpenCreate = () => {
    setEditingHackathonId(null);
    setTitle('');
    setTagline('');
    setTheme('');
    setStatus('upcoming');
    setBanner('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80');

    // Default dates
    const now = new Date();
    const deadline = new Date(now.getTime() + 10 * 24 * 3600 * 1000);
    const start = new Date(now.getTime() + 14 * 24 * 3600 * 1000);
    const end = new Date(now.getTime() + 16 * 24 * 3600 * 1000);

    setRegistrationDeadline(deadline.toISOString().slice(0, 16));
    setStartDate(start.toISOString().slice(0, 16));
    setEndDate(end.toISOString().slice(0, 16));

    setEligibility('Open to All Collegiate Students (Batches 2024-2028)');
    setMinTeamSize(2);
    setMaxTeamSize(4);
    setPrizePool('₹1,50,000');
    setFirstPrize('₹80,000');
    setSecondPrize('₹45,000');
    setThirdPrize('₹25,000');
    setTagsInput('React, Python, AI/ML, Cloud');
    setDescription(
      'Join us for a fast-paced 36-hour sprint where passionate engineers build cutting-edge solutions for real-world challenges.'
    );
    setRulesInput(
      '1. Teams must respect collegiate honor codes.\n2. Projects must be built during the hackathon.\n3. Submission requires a working GitHub repo and demonstration.'
    );
    setIsModalOpen(true);
  };

  const handleOpenEdit = (h) => {
    setEditingHackathonId(h.id);
    setTitle(h.title);
    setTagline(h.tagline || '');
    setTheme(h.theme);
    setStatus(h.status || 'upcoming');
    setBanner(h.banner || '');

    // Form inputs expect yyyy-MM-ddThh:mm format
    setRegistrationDeadline(h.registrationDeadline ? h.registrationDeadline.slice(0, 16) : '');
    setStartDate(h.startDate ? h.startDate.slice(0, 16) : '');
    setEndDate(h.endDate ? h.endDate.slice(0, 16) : '');

    setEligibility(h.eligibility || '');
    setMinTeamSize(h.teamSize?.min || 1);
    setMaxTeamSize(h.teamSize?.max || 4);
    setPrizePool(h.prizePool || '₹1,00,000');

    // Extract first 3 prizes
    setFirstPrize(h.prizes?.[0]?.amount || '₹70,000');
    setSecondPrize(h.prizes?.[1]?.amount || '₹40,000');
    setThirdPrize(h.prizes?.[2]?.amount || '₹20,000');

    setTagsInput((h.tags || []).join(', '));
    setDescription(h.description || '');
    setRulesInput((h.rules || []).join('\n'));

    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const rulesArray = rulesInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const prizeList = [
      { rank: '1st Place Champion', amount: firstPrize, perk: 'Trophy + Incubation Support', icon: 'gold' },
      { rank: '2nd Place Runner-Up', amount: secondPrize, perk: 'Cloud Credits + Certifications', icon: 'silver' },
      { rank: '3rd Place', amount: thirdPrize, perk: 'Swag Kit + CSI Membership', icon: 'bronze' }
    ];

    const hackathonPayload = {
      title: title.trim(),
      tagline: tagline.trim(),
      theme: theme.trim(),
      status,
      banner: banner.trim() || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      registrationDeadline: new Date(registrationDeadline).toISOString(),
      eligibility: eligibility.trim(),
      teamSize: { min: Number(minTeamSize), max: Number(maxTeamSize) },
      prizePool: prizePool.trim(),
      prizes: prizeList,
      tags: tagsArray,
      rules: rulesArray,
      description: description.trim(),
      organizer: 'Computer Society of India Chapter'
    };

    if (editingHackathonId) {
      updateHackathon(editingHackathonId, hackathonPayload);
    } else {
      createHackathon(hackathonPayload);
    }

    setIsModalOpen(false);
  };

  // Filter hackathons for organizer list
  const filteredHackathons = hackathons.filter((h) => {
    if (!filterSearch.trim()) return true;
    const q = filterSearch.toLowerCase();
    return (
      h.title?.toLowerCase().includes(q) ||
      h.theme?.toLowerCase().includes(q) ||
      h.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <Sparkles className="w-4 h-4" />
            <span>CSI Chapter Management Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Organizer & Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create new sprint events, monitor team formations, review submissions, and manage hackathon lifecycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all hackathon and team data back to initial seeds?')) {
                resetToDefaults();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host New Hackathon</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Hackathons
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {hackathons.length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Ongoing
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
            {hackathons.filter((h) => h.status === 'ongoing').length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Total Registered Teams
          </span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-300 font-mono">
            {hackathons.reduce((acc, h) => acc + (h.registeredTeams?.length || 0), 0)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Submissions Received
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
            {hackathons.reduce((acc, h) => acc + (h.submissions?.length || 0), 0)}
          </div>
        </div>
      </div>

      {/* Events Management List / Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search hackathons to manage..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <span className="text-xs text-slate-500">
            {filteredHackathons.length} event{filteredHackathons.length === 1 ? '' : 's'} in console
          </span>
        </div>

        {/* Hackathon Items */}
        {filteredHackathons.length > 0 ? (
          <div className="space-y-3">
            {filteredHackathons.map((h) => {
              const teamCount = h.registeredTeams?.length || 0;
              const subCount = h.submissions?.length || 0;

              return (
                <div
                  key={h.id}
                  className="p-5 rounded-2xl bg-white/90 border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {h.status === 'ongoing' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          LIVE ONGOING
                        </span>
                      )}
                      {h.status === 'upcoming' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          UPCOMING
                        </span>
                      )}
                      {h.status === 'past' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-300">
                          COMPLETED
                        </span>
                      )}
                      <span className="text-xs font-semibold text-teal-400 font-mono">
                        {h.prizePool}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white truncate">{h.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{h.theme}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        {teamCount} Teams
                      </span>
                      <span className="flex items-center gap-1">
                        <Send className="w-3.5 h-3.5 text-teal-400" />
                        {subCount} Submissions
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono">
                        Deadline: {new Date(h.registrationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <Link
                      to={`/hackathons/${h.id}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                      title="View public page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(h)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-teal-500/20 hover:text-teal-300 text-slate-600 border border-slate-300 transition-colors"
                      title="Edit hackathon details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(h.id)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-500/20 hover:text-rose-400 text-slate-500 border border-slate-300 transition-colors"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No hackathons found"
            description="Create your first hackathon or adjust your filter query."
            actionText="Create Hackathon"
            onAction={handleOpenCreate}
          />
        )}
      </div>

      {/* ADD / EDIT HACKATHON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingHackathonId ? 'Edit Hackathon' : 'Create New Hackathon'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure event information, dates, rules, and prize matrix.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Title & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CSI HackGenesis 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing (Live)</option>
                    <option value="past">Past (Completed)</option>
                  </select>
                </div>
              </div>

              {/* Tagline & Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Theme / Focus Track *
                  </label>
                  <input
                    type="text"
                    required
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g. AI for Social Good & CleanTech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Short Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Brief one-sentence pitch"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Dates & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Reg. Deadline *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={registrationDeadline}
                    onChange={(e) => setRegistrationDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    End Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              {/* Team Size & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Min Team Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={minTeamSize}
                    onChange={(e) => setMinTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Max Team Size *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={maxTeamSize}
                    onChange={(e) => setMaxTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Total Prize Pool *
                  </label>
                  <input
                    type="text"
                    required
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    placeholder="e.g. ₹2,50,000 or $10,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              {/* Prize Breakdown (1st, 2nd, 3rd) */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Prize Tier Breakdown
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">1st Place Amount</label>
                    <input
                      type="text"
                      value={firstPrize}
                      onChange={(e) => setFirstPrize(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">2nd Place Amount</label>
                    <input
                      type="text"
                      value={secondPrize}
                      onChange={(e) => setSecondPrize(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">3rd Place Amount</label>
                    <input
                      type="text"
                      value={thirdPrize}
                      onChange={(e) => setThirdPrize(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Banner Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              {/* Tech Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Tech Stack Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Python, Solidity, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Overview / Problem Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain event goals, mentorship, challenges..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed"
                />
              </div>

              {/* Rules */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Rules & Eligibility (one per line)
                </label>
                <textarea
                  rows={3}
                  value={rulesInput}
                  onChange={(e) => setRulesInput(e.target.value)}
                  placeholder="Rule 1&#10;Rule 2&#10;Rule 3"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-white focus:outline-none focus:border-teal-500 leading-relaxed font-mono"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingHackathonId ? 'Save Changes' : 'Publish Hackathon'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="p-6 rounded-2xl bg-slate-50 border border-rose-500/30 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-bold text-white">Delete Hackathon?</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete this hackathon event and all associated teams and project submissions?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteHackathon(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
