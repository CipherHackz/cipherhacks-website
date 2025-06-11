import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Sponsor from './pages/Sponsor';
import NotFound from './pages/NotFound';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/donate" element={<Navigate to="https://hcb.hackclub.com/donations/start/cipherhacks" replace />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 