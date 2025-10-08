// Educational Demo Only - Redirect to Security.org Password Strength Checker
// Learning Goal: Teach students about password strength analysis

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { KeyIcon, HomeIcon } from '@heroicons/react/24/outline';

const CheckStrength: React.FC = () => {
  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://www.security.org/how-secure-is-my-password/';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 text-center">
          <KeyIcon className="h-16 w-16 text-atom-purple mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-atom-blue mb-4">Redirecting to Password Strength Checker</h2>
          <p className="text-atom-fg-muted mb-6">
            You'll be redirected to Security.org's password strength analyzer...
          </p>

          <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30 mb-6">
            <h3 className="text-yellow-300 font-bold mb-2">⚠️ Important Security Warning</h3>
            <ul className="text-yellow-300 text-sm text-left space-y-2">
              <li>• <strong>Never enter your real passwords into online checkers</strong></li>
              <li>• Use these tools only with example/test passwords</li>
              <li>• For real password checking, use your password manager's built-in tools</li>
              <li>• Always assume third-party sites could log your input</li>
            </ul>
          </div>

          <div className="bg-atom-bg bg-opacity-50 rounded p-4 mb-6 text-left">
            <h3 className="text-atom-green font-bold mb-2">✅ What This Tool Shows:</h3>
            <ul className="text-atom-fg-muted text-sm space-y-2">
              <li>• Estimated time to crack your password</li>
              <li>• Password complexity analysis</li>
              <li>• Recommendations for stronger passwords</li>
              <li>• Common password patterns to avoid</li>
            </ul>
          </div>

          <div className="bg-atom-bg bg-opacity-50 rounded p-4 mb-6 text-left">
            <h3 className="text-atom-blue font-bold mb-2">💡 Strong Password Tips:</h3>
            <ul className="text-atom-fg-muted text-sm space-y-2">
              <li>• Use at least 12-16 characters</li>
              <li>• Mix uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid dictionary words, names, and common patterns</li>
              <li>• Use a unique password for every account</li>
              <li>• Consider using a password manager to generate and store strong passwords</li>
            </ul>
          </div>

          <p className="text-atom-fg-muted text-sm mb-4">
            If you're not redirected automatically, 
            <a 
              href="https://www.security.org/how-secure-is-my-password/" 
              className="text-atom-blue hover:text-atom-green ml-1 underline"
            >
              click here
            </a>
          </p>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-atom-purple hover:text-atom-blue transition-colors"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckStrength;
