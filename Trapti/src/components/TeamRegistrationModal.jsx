import React, { useState } from 'react';
import { useHackathons } from '../context/HackathonContext';
import {
  X,
  Users,
  UserPlus,
  Copy,
  Check,
  Crown,
  UserCheck,
  Sparkles,
  AlertTriangle,
  LogOut,
  Share2
} from 'lucide-react';

export const TeamRegistrationModal = ({ isOpen, onClose, hackathon }) => {
  const { createTeam, joinTeam, leaveTeam, getUserTeamForHackathon, currentUser } = useHackathons();

  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'join'
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState(currentUser?.name || '');
  const [joinName, setJoinName] = useState(currentUser?.name || '');
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [justCreatedCode, setJustCreatedCode] = useState(null);

  if (!isOpen || !hackathon) return null;

  const userTeam = getUserTeamForHackathon(hackathon.id);
  const maxTeamSize = hackathon.teamSize?.max || 4;
  const minTeamSize = hackathon.teamSize?.min || 1;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!teamName.trim()) {
      setErrorMsg('Please enter a team name.');
      return;
    }

    const res = createTeam(hackathon.id, {
      teamName,
      leaderName: leaderName.trim() || currentUser?.name || 'Dev Leader'
    });

    if (res.success) {
      setJustCreatedCode(res.code);
      setTeamName('');
    } else {
      setErrorMsg(res.error || 'Failed to create team');
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!inviteCode.trim()) {
      setErrorMsg('Please provide a 6-character team invite code.');
      return;
    }

    const res = joinTeam(hackathon.id, {
      inviteCode: inviteCode.trim(),
      memberName: joinName.trim() || currentUser?.name || 'Teammate'
    });

    if (res.success) {
      setInviteCode('');
    } else {
      setErrorMsg(res.error || 'Failed to join team');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-50 border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-200 bg-white/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Team Registration</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{hackathon.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-white/60 px-3 py-2 rounded-xl border border-slate-200">
            <span className="font-semibold text-teal-400">Team Size Rule:</span>
            <span>
              {minTeamSize} to {maxTeamSize} members allowed per team.
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {userTeam ? (
            /* User already has a registered team in this hackathon */
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-teal-500/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      Registered Team
                    </span>
                    <span className="text-xs text-slate-500">({userTeam.role === 'leader' ? 'Leader' : 'Member'})</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {userTeam.members.length} / {maxTeamSize} Members
                  </span>
                </div>

                <h4 className="text-xl font-black text-white tracking-tight">{userTeam.name}</h4>

                {/* Team Invite Code Display with 1-Click Copy */}
                <div className="mt-4 p-4 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                      Team Invite Code
                    </span>
                    <div className="font-mono text-2xl font-bold tracking-widest text-teal-300 mt-0.5">
                      {userTeam.code}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyCode(userTeam.code)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold transition-all active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Slots remaining note */}
                <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>
                    Share this code with up to {maxTeamSize - userTeam.members.length} more developer(s) to join your team.
                  </span>
                </div>

                {/* Member List */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Team Members ({userTeam.members.length})
                  </span>
                  <div className="space-y-1.5">
                    {userTeam.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                            {member.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-700">{member}</span>
                        </div>
                        {idx === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <Crown className="w-3 h-3 text-amber-400" />
                            Leader
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Member</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave / Switch Team Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => leaveTeam(hackathon.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:underline p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Leave / Switch Team
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs text-white bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Tab Switcher & Forms */
            <div>
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-white border border-slate-200 mb-6">
                <button
                  onClick={() => {
                    setActiveTab('create');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'create'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Team
                </button>
                <button
                  onClick={() => {
                    setActiveTab('join');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'join'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Join Existing Team
                </button>
              </div>

              {activeTab === 'create' ? (
                /* Tab 1: Create Team */
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Team Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Quantum Pioneers, CodeCrafters"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Team Leader Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Creating a team registers you as the Leader and generates a unique 6-character invite code that you can share with up to {maxTeamSize - 1} teammates.
                  </p>

                  <div className="pt-3 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Create Team & Get Code
                    </button>
                  </div>
                </form>
              ) : (
                /* Tab 2: Join Team */
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Your Full Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      6-Character Invite Code <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={8}
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="e.g. CSI7A4"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 font-mono text-sm tracking-wider uppercase text-teal-300 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Ask your team leader for the 6-character code generated when they created the team. Teams cannot exceed {maxTeamSize} members.
                  </p>

                  <div className="pt-3 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Join Team
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
