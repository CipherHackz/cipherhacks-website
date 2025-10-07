import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Sponsor from './pages/Sponsor';
import EmailTester from './pages/EmailTester';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RulesAndPolicy from './pages/RulesAndPolicy';
import CodeOfConduct from './pages/CodeOfConduct';
import Referral from './pages/Referral';
import Chipotle from './pages/Chipotle';
// import ReferralPrograms from './pages/ReferralPrograms';
import Roles from './pages/Roles';
import Volunteer from './pages/Volunteer';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import SanDiegoHackathon from './pages/SanDiegoHackathon';

// Discord redirect component
const DiscordRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://discord.gg/3WvKNfBdQ6';
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-atom-blue mb-4">Redirecting to Discord...</h2>
        <p className="text-atom-fg-muted">If you're not redirected automatically, 
          <a 
            href="https://discord.gg/3WvKNfBdQ6" 
            className="text-atom-blue hover:text-atom-green ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

// Donate redirect component
const DonateRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://hcb.hackclub.com/donations/start/cipherhacks';
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-atom-blue mb-4">Redirecting to donation page...</h2>
        <p className="text-atom-fg-muted">If you're not redirected automatically, 
          <a 
            href="https://hcb.hackclub.com/donations/start/cipherhacks" 
            className="text-atom-blue hover:text-atom-green ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

// Event Guide redirect component
const EventGuideRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://solstice-radish-06f.notion.site/Guide-to-CipherHacks-2025-284c9b2800fd80debae6c74e28c07238';
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-atom-orange mb-4">Redirecting to Event Guide...</h2>
        <p className="text-atom-fg-muted">If you're not redirected automatically, 
          <a 
            href="https://solstice-radish-06f.notion.site/Guide-to-CipherHacks-2025-284c9b2800fd80debae6c74e28c07238" 
            className="text-atom-orange hover:text-atom-green ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
                <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/email-tester" element={<EmailTester />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/rules" element={<RulesAndPolicy />} />
        <Route path="/conduct" element={<CodeOfConduct />} />
        <Route path="/donate" element={<DonateRedirect />} />
        <Route path="/guide" element={<EventGuideRedirect />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/chipotle" element={<Chipotle />} />
        {/* <Route path="/referral-programs" element={<ReferralPrograms />} /> */}
        <Route path="/roles" element={<Roles />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/san-diego-hackathon" element={<SanDiegoHackathon />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* Redirect to discord */}
        <Route path="/discord" element={<DiscordRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 