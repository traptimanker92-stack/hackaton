import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInitialHackathons } from '../data/initialData';
import confetti from 'canvas-confetti';

const HackathonContext = createContext(null);

const STORAGE_KEYS = {
  HACKATHONS: 'csi_hackathons_v1',
  USER_TEAMS: 'csi_user_teams_v1',
  USER_PROFILE: 'csi_user_profile_v1',
};

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']
    });
  } catch (err) {
    console.debug('Confetti effect unavailable:', err);
  }
};

// Generates a readable 6-character invite code like "CSI8K2"
export const generateTeamCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 3; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CSI${randomPart}`;
};

export const HackathonProvider = ({ children }) => {
  // Load Hackathons from localStorage with fallback to 4 realistic seeds
  const [hackathons, setHackathons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HACKATHONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading hackathons from localStorage:', e);
    }
    const initial = getInitialHackathons();
    localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(initial));
    return initial;
  });

  // User registered teams: array of { hackathonId, teamId, teamName, memberName, role, code }
  const [userTeams, setUserTeams] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_TEAMS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Current user info (customizable)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return saved ? JSON.parse(saved) : { name: 'Dev Lead', email: 'innovator@csi-collegiate.edu' };
    } catch (e) {
      return { name: 'Dev Lead', email: 'innovator@csi-collegiate.edu' };
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync hackathons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(hackathons));
    } catch (e) {
      console.error('Failed to sync hackathons to localStorage:', e);
    }
  }, [hackathons]);

  // Sync user teams to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TEAMS, JSON.stringify(userTeams));
    } catch (e) {
      console.error('Failed to sync user teams to localStorage:', e);
    }
  }, [userTeams]);

  // Sync user profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to sync user profile:', e);
    }
  }, [currentUser]);

  // Toast Helper
  const showToast = ({ title, message, type = 'success' }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Get specific hackathon
  const getHackathon = (id) => {
    return hackathons.find((h) => h.id === id);
  };

  // Create new Hackathon (Admin / Organizer)
  const createHackathon = (data) => {
    const newId = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(100 + Math.random() * 900);
    const newHackathon = {
      ...data,
      id: newId,
      status: data.status || 'upcoming',
      registeredTeams: data.registeredTeams || [],
      submissions: data.submissions || [],
      createdAt: new Date().toISOString()
    };

    setHackathons((prev) => [newHackathon, ...prev]);
    showToast({
      title: 'Hackathon Created',
      message: `"${newHackathon.title}" is now published and live!`,
      type: 'success'
    });
    triggerConfetti();
    return newHackathon;
  };

  // Update existing Hackathon
  const updateHackathon = (id, updatedFields) => {
    setHackathons((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updatedFields, updatedAt: new Date().toISOString() } : h))
    );
    showToast({
      title: 'Hackathon Updated',
      message: 'Changes have been saved successfully.',
      type: 'success'
    });
  };

  // Delete Hackathon
  const deleteHackathon = (id) => {
    const target = hackathons.find((h) => h.id === id);
    setHackathons((prev) => prev.filter((h) => h.id !== id));
    setUserTeams((prev) => prev.filter((ut) => ut.hackathonId !== id));
    showToast({
      title: 'Hackathon Deleted',
      message: target ? `"${target.title}" was removed.` : 'Event removed.',
      type: 'info'
    });
  };

  // Team Registration: Create Team
  const createTeam = (hackathonId, { teamName, leaderName }) => {
    const hackathon = getHackathon(hackathonId);
    if (!hackathon) {
      showToast({ title: 'Error', message: 'Hackathon not found.', type: 'error' });
      return { success: false, error: 'Hackathon not found' };
    }

    const trimmedName = teamName?.trim();
    const trimmedLeader = leaderName?.trim() || currentUser.name || 'Team Leader';

    if (!trimmedName) {
      showToast({ title: 'Missing Field', message: 'Please provide a team name.', type: 'error' });
      return { success: false, error: 'Team name is required' };
    }

    // Check duplicate team name in this hackathon
    const exists = hackathon.registeredTeams.some(
      (t) => t.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      showToast({ title: 'Duplicate Name', message: 'A team with this name already exists in this hackathon.', type: 'error' });
      return { success: false, error: 'Team name already exists' };
    }

    const teamCode = generateTeamCode();
    const newTeam = {
      id: `team-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: trimmedName,
      code: teamCode,
      leader: trimmedLeader,
      members: [trimmedLeader],
      createdAt: new Date().toISOString()
    };

    // Update hackathon registeredTeams
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id === hackathonId) {
          return {
            ...h,
            registeredTeams: [...(h.registeredTeams || []), newTeam]
          };
        }
        return h;
      })
    );

    // Record user affiliation
    setUserTeams((prev) => [
      ...prev.filter((ut) => ut.hackathonId !== hackathonId),
      {
        hackathonId,
        teamId: newTeam.id,
        teamName: newTeam.name,
        memberName: trimmedLeader,
        role: 'leader',
        code: teamCode
      }
    ]);

    showToast({
      title: 'Team Created!',
      message: `Team "${newTeam.name}" registered. Invite Code: ${teamCode}`,
      type: 'success'
    });
    triggerConfetti();

    return { success: true, team: newTeam, code: teamCode };
  };

  // Team Registration: Join Team
  const joinTeam = (hackathonId, { inviteCode, memberName }) => {
    const hackathon = getHackathon(hackathonId);
    if (!hackathon) {
      showToast({ title: 'Error', message: 'Hackathon not found.', type: 'error' });
      return { success: false, error: 'Hackathon not found' };
    }

    const cleanCode = inviteCode?.trim().toUpperCase();
    const cleanMember = memberName?.trim() || currentUser.name || 'Teammate';

    if (!cleanCode) {
      showToast({ title: 'Missing Code', message: 'Please enter a 6-character team invite code.', type: 'error' });
      return { success: false, error: 'Invite code is required' };
    }

    const targetTeam = (hackathon.registeredTeams || []).find((t) => t.code.toUpperCase() === cleanCode);
    if (!targetTeam) {
      showToast({ title: 'Invalid Code', message: `No team found with invite code "${cleanCode}".`, type: 'error' });
      return { success: false, error: 'Invalid invite code' };
    }

    // Capacity validation
    const maxCapacity = hackathon.teamSize?.max || 4;
    if (targetTeam.members.length >= maxCapacity) {
      showToast({
        title: 'Team is Full',
        message: `Team "${targetTeam.name}" already has ${targetTeam.members.length} members (Maximum allowed: ${maxCapacity}).`,
        type: 'error'
      });
      return { success: false, error: `Team reached maximum capacity of ${maxCapacity} members` };
    }

    // Check if member already in team
    if (targetTeam.members.some((m) => m.toLowerCase() === cleanMember.toLowerCase())) {
      showToast({
        title: 'Already a Member',
        message: `"${cleanMember}" is already registered in team "${targetTeam.name}".`,
        type: 'info'
      });
      return { success: true, team: targetTeam };
    }

    const updatedTeam = {
      ...targetTeam,
      members: [...targetTeam.members, cleanMember]
    };

    // Update in hackathon
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id === hackathonId) {
          return {
            ...h,
            registeredTeams: h.registeredTeams.map((t) => (t.id === targetTeam.id ? updatedTeam : t))
          };
        }
        return h;
      })
    );

    // Save to user affiliation
    setUserTeams((prev) => [
      ...prev.filter((ut) => ut.hackathonId !== hackathonId),
      {
        hackathonId,
        teamId: updatedTeam.id,
        teamName: updatedTeam.name,
        memberName: cleanMember,
        role: 'member',
        code: updatedTeam.code
      }
    ]);

    showToast({
      title: 'Joined Team!',
      message: `You have successfully joined "${updatedTeam.name}"!`,
      type: 'success'
    });
    triggerConfetti();

    return { success: true, team: updatedTeam };
  };

  // Leave Team Affiliation
  const leaveTeam = (hackathonId) => {
    setUserTeams((prev) => prev.filter((ut) => ut.hackathonId !== hackathonId));
    showToast({
      title: 'Team Left',
      message: 'You have detached your active team registration for this event.',
      type: 'info'
    });
  };

  // Project Submission
  const submitProject = (hackathonId, projectData) => {
    const hackathon = getHackathon(hackathonId);
    if (!hackathon) {
      showToast({ title: 'Error', message: 'Hackathon not found.', type: 'error' });
      return { success: false, error: 'Hackathon not found' };
    }

    const newSubmission = {
      id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      teamId: projectData.teamId || 'direct-submission',
      teamName: projectData.teamName || 'Independent Hacker',
      projectName: projectData.projectName.trim(),
      tagline: projectData.tagline.trim(),
      techStack: Array.isArray(projectData.techStack)
        ? projectData.techStack
        : projectData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      repoUrl: projectData.repoUrl.trim(),
      demoUrl: projectData.demoUrl?.trim() || '',
      description: projectData.description.trim(),
      submittedAt: new Date().toISOString(),
      isWinner: false
    };

    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id === hackathonId) {
          return {
            ...h,
            submissions: [newSubmission, ...(h.submissions || [])]
          };
        }
        return h;
      })
    );

    showToast({
      title: 'Project Submitted!',
      message: `"${newSubmission.projectName}" is officially registered in ${hackathon.title}!`,
      type: 'success'
    });
    triggerConfetti();

    return { success: true, submission: newSubmission };
  };

  // Reset to original 4 seed hackathons
  const resetToDefaults = () => {
    const initial = getInitialHackathons();
    setHackathons(initial);
    setUserTeams([]);
    localStorage.setItem(STORAGE_KEYS.HACKATHONS, JSON.stringify(initial));
    localStorage.removeItem(STORAGE_KEYS.USER_TEAMS);
    showToast({
      title: 'Defaults Restored',
      message: 'Reset platform to the original 4 seeded hackathons.',
      type: 'info'
    });
  };

  // Get user's registered team for a specific hackathon
  const getUserTeamForHackathon = (hackathonId) => {
    const affiliation = userTeams.find((ut) => ut.hackathonId === hackathonId);
    if (!affiliation) return null;
    const hackathon = getHackathon(hackathonId);
    if (!hackathon) return null;
    const liveTeam = (hackathon.registeredTeams || []).find((t) => t.id === affiliation.teamId || t.code === affiliation.code);
    return liveTeam ? { ...liveTeam, role: affiliation.role } : null;
  };

  return (
    <HackathonContext.Provider
      value={{
        hackathons,
        userTeams,
        currentUser,
        setCurrentUser,
        toasts,
        showToast,
        dismissToast,
        getHackathon,
        createHackathon,
        updateHackathon,
        deleteHackathon,
        createTeam,
        joinTeam,
        leaveTeam,
        submitProject,
        resetToDefaults,
        getUserTeamForHackathon
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathons = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathons must be used within a HackathonProvider');
  }
  return context;
};
