import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Sponsor from './pages/Sponsor';
import NotFound from './pages/NotFound';
import EmailTester from './pages/EmailTester';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RulesAndPolicy from './pages/RulesAndPolicy';
import CodeOfConduct from './pages/CodeOfConduct';
import ScrollToTop from './components/ScrollToTop';

const DonateRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = 'https://hcb.hackclub.com/donations/start/cipherhacks';
  }, []);

  return <div>Redirecting to donation page...</div>;
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
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 