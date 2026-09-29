# CSI Hackathon Builder

> A modern, production-grade hackathon management and team collaboration platform built for the **Computer Society of India (CSI)** collegiate and industry chapters.

---

## 🌟 Key Features

1. **Discovery & Browsing**:
   - **Status Tabs**: Instant switching across *All*, *Ongoing*, *Upcoming*, and *Past / Completed* hackathons with live counters.
   - **Instant Search & Tag Filtering**: Real-time fuzzy filtering on event title, theme, and tech tags (e.g. `Generative AI`, `Solidity`, `Rust`, `Kubernetes`).
   - **Sorting Engine**: Sort by nearest registration deadline, newest events, highest prize pool, or registered team count.
   - **Dynamic Live Countdown Timer**: Every card features a ticking real-time countdown (`dd:hh:mm:ss`) to registration deadline with urgent alerts for events ending soon.

2. **Pre-populated Realistic Hackathons**:
   - ⚡ **Ongoing Sprint**: *CSI National HackGenesis 2026* (~18 hours left, AI & Smart Cities, active submissions & teams).
   - 🚀 **Upcoming (Next Week)**: *CSI ChainCraft Web3 & DeFi Summit* ($10,000 prize pool, ZK Proofs).
   - 🌐 **Upcoming (Next Month)**: *CSI QuantumCloud & Edge AI 2026* (₹1,80,000 prize pool, WASM & Edge nodes).
   - 🏆 **Past (Completed)**: *CSI CyberShield Hackathon 2026* (Defensive security, featuring 3 fully documented champion projects with Gold/Silver/Bronze badges, GitHub repos, and live demos).

3. **Hackathon Detail View (`/hackathons/:id`)**:
   - Complete breakdown of key dates, schedule milestones, eligibility criteria, and allowed team size.
   - Prize breakdown matrix (Grand Champion, Runner-ups, and Track awards).
   - Dynamic CTA based on event lifecycle (*Register Team*, *Submit Project*, *View Winners*).
   - Interactive tab navigation: *Overview*, *Prizes*, *Registered Teams*, *Submissions & Winners*, and *Rules & Guidelines*.

4. **Team Formation & Registration**:
   - Slide-over / modal with two tabs:
     - **Create Team**: Enter team name and leader name -> generates a readable **6-character team invite code** (e.g. `CSI7A4`).
     - **Join Team**: Enter member name and 6-character code to join an existing squad.
   - **Capacity Enforcement**: Prevents squads from exceeding the hackathon's maximum team size.
   - **Team Management Card**: 1-click copy-to-clipboard for invite codes, member list with Leader/Member badges, and ability to leave/switch teams.

5. **Project Submission Pipeline (`/hackathons/:id/submit`)**:
   - Input fields: Project Name, Elevator Tagline, Tech Stack (interactive pills with quick-add chips), GitHub Repo URL, and Live Demo URL.
   - Standard form validation (valid URL protocols, required character counts).
   - **Real-Time Live Preview Card**: Renders the project submission card in real-time as the developer types.
   - Automatically attaches to the hackathon's submission directory with confetti celebration and instant visibility.

6. **Organizer & Admin Console (`/organizer`)**:
   - High-level KPI metrics: Total Events, Live Ongoing, Total Teams, Submissions Received.
   - Management table with Edit, Delete, and Public View actions.
   - **Host New Hackathon Modal**: Full controls for title, tagline, banner URL, start/end dates, registration deadlines, prize tiers, team size limits, tech tags, and rules.
   - **1-Click Reset**: Restore demo seed data at any time.

7. **Aesthetics & Technology Stack**:
   - **React 18 + Vite** with client-side routing via **React Router DOM v6**.
   - **Tailwind CSS v3** with custom slate/zinc dark mode, glassmorphism blur effects, and curated gradients.
   - **Lucide Icons** across all UI elements.
   - **LocalStorage Persistence**: Full state retention across browser reloads.
   - **Floating Toast System**: Auto-dismissing notifications with custom icons and borders.
   - **Confetti Animations**: Rewarding feedback upon team creation and project submissions.

---

## 📁 Folder Structure

```
csi-hackathon-builder/
├── index.html                   # HTML template with Google Fonts (Inter + JetBrains Mono)
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom Tailwind theme, colors, and animations
├── vite.config.js               # Vite configuration with port 3000
├── src/
│   ├── main.jsx                 # React root entry point
│   ├── App.jsx                  # Main application router and layout
│   ├── index.css                # Global CSS styles & glassmorphism utilities
│   ├── context/
│   │   └── HackathonContext.jsx # React context, state machine & localStorage syncing
│   ├── data/
│   │   └── initialData.js       # Dynamic seed data with 4 realistic hackathons
│   ├── components/
│   │   ├── CountdownTimer.jsx   # Real-time ticking countdown (compact & expanded)
│   │   ├── EmptyState.jsx       # Reusable empty state view
│   │   ├── Footer.jsx           # Chapter footer with stack info
│   │   ├── HackathonCard.jsx    # Card with timer, badges, prize pool & tags
│   │   ├── Navbar.jsx           # Sticky glassmorphic navbar with mobile drawer
│   │   ├── SearchAndFilter.jsx  # Search bar, tag filter pills, and sort dropdown
│   │   ├── StatusTabs.jsx       # All, Ongoing, Upcoming, Past filter tabs
│   │   ├── TeamRegistrationModal.jsx # Team creation & join modal with 6-char codes
│   │   └── Toast.jsx            # Floating toast notification container
│   └── pages/
│       ├── HomePage.jsx               # Event discovery, hero stats, and filters
│       ├── HackathonDetailPage.jsx    # Complete detail view, prizes, teams, and submissions
│       ├── ProjectSubmissionPage.jsx  # Submission form with live preview
│       ├── OrganizerDashboardPage.jsx # Event management console with Add/Edit/Delete
│       └── NotFoundPage.jsx           # 404 error page
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.
