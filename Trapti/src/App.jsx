import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { HackathonDetailPage } from './pages/HackathonDetailPage';
import { ProjectSubmissionPage } from './pages/ProjectSubmissionPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-teal-500 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
          <Route path="/hackathons/:id/submit" element={<ProjectSubmissionPage />} />
          <Route path="/organizer" element={<OrganizerDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
