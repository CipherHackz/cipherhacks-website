// Educational Demo Only - Redirect to HaveIBeenPwned
// Learning Goal: Teach students about password breach databases

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldExclamationIcon, HomeIcon } from '@heroicons/react/24/outline';

const CheckPwned: React.FC = () => {
  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://haveibeenpwned.com/Passwords';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 text-center">
          <ShieldExclamationIcon className="h-16 w-16 text-atom-orange mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-atom-blue mb-4">Redirecting to Have I Been Pwned</h2>
          <p className="text-atom-fg-muted mb-6">
            You'll be redirected to the official Have I Been Pwned password checker...
          </p>

          <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30 mb-6">
            <h3 className="text-yellow-300 font-bold mb-2">⚠️ Important Security Warning</h3>
            <ul className="text-yellow-300 text-sm text-left space-y-2">
              <li>• <strong>Never paste your real passwords into third-party sites</strong> unless you trust them completely</li>
              <li>• Have I Been Pwned is a legitimate, trusted service created by security expert Troy Hunt</li>
              <li>• The service uses k-anonymity - it never sees your full password</li>
              <li>• For maximum security, use your password manager's built-in breach checker</li>
            </ul>
          </div>

          <div className="bg-atom-bg bg-opacity-50 rounded p-4 mb-6 text-left">
            <h3 className="text-atom-green font-bold mb-2">✅ What Have I Been Pwned Does:</h3>
            <ul className="text-atom-fg-muted text-sm space-y-2">
              <li>• Checks if your password appears in known data breaches</li>
              <li>• Uses secure hashing (SHA-1) with k-anonymity protection</li>
              <li>• Helps you identify compromised passwords that should be changed</li>
            </ul>
          </div>

          <p className="text-atom-fg-muted text-sm mb-4">
            If you're not redirected automatically, 
            <a 
              href="https://haveibeenpwned.com/Passwords" 
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

export default CheckPwned;
