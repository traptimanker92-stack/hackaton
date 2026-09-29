import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHackathons } from '../context/HackathonContext';
import {
  ArrowLeft,
  Send,
  Github,
  Globe,
  Code2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Eye,
  Layers,
  Plus,
  X
} from 'lucide-react';

export const ProjectSubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHackathon, getUserTeamForHackathon, submitProject } = useHackathons();

  const hackathon = getHackathon(id);
  const userTeam = hackathon ? getUserTeamForHackathon(hackathon.id) : null;

  // Form State
  const [projectName, setProjectName] = useState('');
  const [tagline, setTagline] = useState('');
  const [teamName, setTeamName] = useState(userTeam?.name || '');
  const [tagInput, setTagInput] = useState('');
  const [techStack, setTechStack] = useState(['React', 'Node.js', 'Tailwind CSS']);
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [description, setDescription] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!hackathon) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-white">Hackathon Not Found</h2>
        <Link to="/" className="text-teal-400 underline mt-4 inline-block">
          Return to Explore
        </Link>
      </div>
    );
  }

  // URL Validator helper
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddTag = (tagToAdd) => {
    const clean = tagToAdd.trim().replace(/^#/, '');
    if (clean && !techStack.includes(clean)) {
      setTechStack([...techStack, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTechStack(techStack.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const validateForm = () => {
    const errs = {};

    if (!projectName.trim()) {
      errs.projectName = 'Project title is required.';
    }

    if (!tagline.trim()) {
      errs.tagline = 'A short elevator pitch / tagline is required.';
    }

    if (!teamName.trim()) {
      errs.teamName = 'Team name is required.';
    }

    if (techStack.length === 0) {
      errs.techStack = 'Please specify at least one technology used.';
    }

    if (!repoUrl.trim()) {
      errs.repoUrl = 'GitHub repository URL is required.';
    } else if (!isValidUrl(repoUrl.trim())) {
      errs.repoUrl = 'Please provide a valid repository URL (e.g., https://github.com/org/repo).';
    }

    if (demoUrl.trim() && !isValidUrl(demoUrl.trim())) {
      errs.demoUrl = 'Please provide a valid demo URL (e.g., https://demo.app).';
    }

    if (!description.trim() || description.trim().length < 30) {
      errs.description = 'Please provide a descriptive overview (at least 30 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const submissionData = {
      teamId: userTeam?.id || `team-custom-${Date.now()}`,
      teamName: teamName.trim(),
      projectName: projectName.trim(),
      tagline: tagline.trim(),
      techStack,
      repoUrl: repoUrl.trim(),
      demoUrl: demoUrl.trim(),
      description: description.trim()
    };

    const res = submitProject(hackathon.id, submissionData);

    if (res.success) {
      // Redirect to hackathon detail submissions tab
      navigate(`/hackathons/${hackathon.id}`);
    } else {
      setIsSubmitting(false);
    }
  };

  const suggestedTags = ['Next.js', 'Python', 'FastAPI', 'Solidity', 'Rust', 'Docker', 'OpenAI', 'TypeScript', 'eBPF'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Back link */}
      <div>
        <Link
          to={`/hackathons/${hackathon.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {hackathon.title}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
          <Send className="w-4 h-4" />
          <span>Final Project Submission Sprint</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Submit Project to {hackathon.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Enter your team's code repository, live deployed demo link, and project description. Once submitted, your solution will be visible to evaluators and peers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200 space-y-6 shadow-xl">
            {/* Team Association */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Submitting Team <span className="text-teal-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. NeuralNomads"
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.teamName ? 'border-rose-500' : 'border-slate-200'
                  } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500`}
                />
                {userTeam && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    Code: {userTeam.code}
                  </span>
                )}
              </div>
              {errors.teamName && (
                <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>
              )}
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Project Name <span className="text-teal-400">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. EcoPulse AI, VoltMesh, GuardianMesh"
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  errors.projectName ? 'border-rose-500' : 'border-slate-200'
                } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500`}
              />
              {errors.projectName && (
                <p className="text-xs text-rose-400 mt-1">{errors.projectName}</p>
              )}
            </div>

            {/* Short Tagline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Short Elevator Pitch / Tagline <span className="text-teal-400">*</span>
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One sentence describing what your project does and why it matters"
                maxLength={140}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  errors.tagline ? 'border-rose-500' : 'border-slate-200'
                } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.tagline ? (
                  <p className="text-xs text-rose-400">{errors.tagline}</p>
                ) : (
                  <span />
                )}
                <span className="text-[11px] text-slate-500 font-mono">
                  {tagline.length}/140 chars
                </span>
              </div>
            </div>

            {/* Tech Stack Pills Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Tech Stack & Tools <span className="text-teal-400">*</span>
              </label>

              {/* Added Pills */}
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 mb-2 min-h-[46px]">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 text-teal-300 border border-slate-300"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tech)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={techStack.length === 0 ? "Type tech and press Enter..." : "+ Add tech..."}
                  className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none flex-1 min-w-[120px]"
                />
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="text-[11px] text-slate-500">Quick add:</span>
                {suggestedTags
                  .filter((t) => !techStack.includes(t))
                  .slice(0, 6)
                  .map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      +{tag}
                    </button>
                  ))}
              </div>
              {errors.techStack && (
                <p className="text-xs text-rose-400 mt-1">{errors.techStack}</p>
              )}
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-500" />
                  <span>GitHub Repository <span className="text-teal-400">*</span></span>
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/your-team/repo"
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.repoUrl ? 'border-rose-500' : 'border-slate-200'
                  } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500`}
                />
                {errors.repoUrl && (
                  <p className="text-xs text-rose-400 mt-1">{errors.repoUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Live Demo / Prototype URL</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://your-demo-url.vercel.app"
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.demoUrl ? 'border-rose-500' : 'border-slate-200'
                  } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500`}
                />
                {errors.demoUrl && (
                  <p className="text-xs text-rose-400 mt-1">{errors.demoUrl}</p>
                )}
              </div>
            </div>

            {/* Project Overview / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Detailed Architecture & Problem Solved <span className="text-teal-400">*</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the problem statement, how your engineering solution works, key architectural decisions, and next steps..."
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  errors.description ? 'border-rose-500' : 'border-slate-200'
                } text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 leading-relaxed`}
              />
              {errors.description && (
                <p className="text-xs text-rose-400 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <Link
                to={`/hackathons/${hackathon.id}`}
                className="px-5 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Project...' : 'Submit Project to Hackathon'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Live Preview Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Eye className="w-4 h-4 text-teal-400" />
            <span>Live Submission Preview</span>
          </div>

          <div className="p-6 rounded-3xl bg-white/90 border border-teal-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                Live Preview
              </span>
              <span className="text-xs text-slate-500">
                Team: <strong className="text-white">{teamName || 'Your Team'}</strong>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">
                {projectName || 'Untitled Innovation'}
              </h3>
              <p className="text-xs text-teal-300 font-medium mt-0.5">
                {tagline || 'Your short elevator pitch will appear here...'}
              </p>
            </div>

            <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">
              {description ||
                'Your detailed architectural summary, key features, and problem-solving thesis will appear in the hackathon submissions directory.'}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links preview */}
            <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              {repoUrl ? (
                <span className="text-teal-400 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> Repo Linked
                </span>
              ) : (
                <span className="text-slate-600 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> No Repo
                </span>
              )}
              <span>•</span>
              {demoUrl ? (
                <span className="text-cyan-400 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> Demo Live
                </span>
              ) : (
                <span className="text-slate-600 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> No Demo
                </span>
              )}
            </div>
          </div>

          {/* Submission Guidelines Reminder */}
          <div className="p-5 rounded-2xl bg-white/70 border border-slate-200 text-xs text-slate-500 space-y-2">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Submission Checklist
            </h5>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-500">
              <li>Ensure repository has a clear README with installation steps.</li>
              <li>Provide test credentials if your live demo requires login.</li>
              <li>Submissions can be updated anytime before the deadline.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
