// Educational Demo Only - Do Not Deploy Publicly
// Learning Goal: Illustrate insecure network/login behavior and importance of HTTPS

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, ShieldExclamationIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const NetSecLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPlaintext, setShowPlaintext] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(false);

  const simulatePlaintextRequest = () => {
    setShowPlaintext(true);
    setShowEncrypted(false);
  };

  const simulateEncryptedRequest = () => {
    setShowEncrypted(true);
    setShowPlaintext(false);
  };

  const plaintextPayload = `POST /login HTTP/1.1
Host: insecure-site.com
Content-Type: application/x-www-form-urlencoded

username=${username || 'user123'}&password=${password || 'mySecretPass'}`;

  const encryptedPayload = `POST /login HTTP/1.1
Host: secure-site.com
Content-Type: application/x-www-form-urlencoded

[ENCRYPTED DATA - TLS 1.3]
Cipher Suite: TLS_AES_256_GCM_SHA384
Data: 4f8a3b2c9d1e... (encrypted)`;

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-50 border-b border-atom-blue border-opacity-20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-atom-blue hover:text-atom-green transition-colors">
            <HomeIcon className="h-6 w-6" />
            <span className="font-mono">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-atom-blue font-mono">Network Security Demo</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Info Card */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <ShieldExclamationIcon className="h-8 w-8 text-atom-orange" />
              <h2 className="text-3xl font-bold text-atom-blue">HTTP vs HTTPS Security</h2>
            </div>
            
            <div className="space-y-4 text-atom-fg-muted">
              <p className="text-lg">
                This demo illustrates the critical difference between <span className="text-red-400 font-bold">unencrypted HTTP</span> and <span className="text-green-400 font-bold">encrypted HTTPS</span> connections.
              </p>
              
              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-orange">
                <h3 className="text-atom-orange font-bold mb-2">⚠️ The Danger:</h3>
                <p>
                  When you send data over HTTP (without encryption), anyone on the network path can intercept and read your data - including passwords, credit cards, and personal information.
                </p>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-green">
                <h3 className="text-atom-green font-bold mb-2">🔒 The Solution:</h3>
                <p>
                  HTTPS uses TLS/SSL encryption to protect your data in transit. Even if intercepted, the data appears as random gibberish to attackers.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Form */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-purple border-opacity-30 p-8 mb-8">
            <h3 className="text-2xl font-bold text-atom-purple mb-6">Simulated Login Form</h3>
            
            <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30 mb-6">
              <p className="text-yellow-300 text-sm">
                ⚠️ <strong>This form does NOT submit data anywhere.</strong> It only demonstrates what the network traffic would look like. Your input stays in your browser.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-atom-blue font-mono mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono focus:outline-none focus:border-atom-blue"
                />
              </div>

              <div>
                <label className="block text-atom-blue font-mono mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono focus:outline-none focus:border-atom-blue"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={simulatePlaintextRequest}
                className="px-6 py-4 bg-red-600 text-white rounded hover:bg-opacity-80 transition-colors font-mono font-bold flex items-center justify-center space-x-2"
              >
                <LockOpenIcon className="h-6 w-6" />
                <span>Send via HTTP (Insecure)</span>
              </button>

              <button
                onClick={simulateEncryptedRequest}
                className="px-6 py-4 bg-green-600 text-white rounded hover:bg-opacity-80 transition-colors font-mono font-bold flex items-center justify-center space-x-2"
              >
                <LockClosedIcon className="h-6 w-6" />
                <span>Send via HTTPS (Secure)</span>
              </button>
            </div>
          </div>

          {/* Network Traffic Display */}
          {showPlaintext && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900 bg-opacity-20 rounded-lg border-2 border-red-500 p-6 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <LockOpenIcon className="h-8 w-8 text-red-400" />
                <h3 className="text-red-400 font-bold text-xl">Unencrypted HTTP Request</h3>
              </div>
              
              <div className="bg-black bg-opacity-50 rounded p-4 mb-4">
                <pre className="text-red-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                  {plaintextPayload}
                </pre>
              </div>

              <div className="space-y-2 text-red-300">
                <p className="font-bold">🚨 What an attacker sees:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your username: <code className="bg-black px-2 py-1 rounded">{username || 'user123'}</code></li>
                  <li>Your password: <code className="bg-black px-2 py-1 rounded">{password || 'mySecretPass'}</code></li>
                  <li>The destination website</li>
                  <li>Everything in plain text!</li>
                </ul>
              </div>
            </motion.div>
          )}

          {showEncrypted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900 bg-opacity-20 rounded-lg border-2 border-green-500 p-6 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <LockClosedIcon className="h-8 w-8 text-green-400" />
                <h3 className="text-green-400 font-bold text-xl">Encrypted HTTPS Request</h3>
              </div>
              
              <div className="bg-black bg-opacity-50 rounded p-4 mb-4">
                <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                  {encryptedPayload}
                </pre>
              </div>

              <div className="space-y-2 text-green-300">
                <p className="font-bold">✅ What an attacker sees:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Encrypted gibberish - impossible to read without the encryption key</li>
                  <li>The destination domain (but not the specific page or data)</li>
                  <li>Your IP address (but not what you're doing)</li>
                  <li>All sensitive data is protected!</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Network Diagram */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 mb-8">
            <h3 className="text-atom-blue font-bold text-xl mb-6">📡 Network Path Visualization</h3>
            
            <div className="space-y-6">
              {/* HTTP Path */}
              <div className="bg-red-900 bg-opacity-10 rounded p-4 border border-red-500 border-opacity-30">
                <h4 className="text-red-400 font-bold mb-3">HTTP (Unencrypted):</h4>
                <div className="flex items-center justify-between text-sm font-mono">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-atom-fg-muted">You</p>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-red-500 mx-2 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-atom-bg px-2">
                      <span className="text-red-400">👁️ Visible</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <p className="text-atom-fg-muted">Server</p>
                  </div>
                </div>
              </div>

              {/* HTTPS Path */}
              <div className="bg-green-900 bg-opacity-10 rounded p-4 border border-green-500 border-opacity-30">
                <h4 className="text-green-400 font-bold mb-3">HTTPS (Encrypted):</h4>
                <div className="flex items-center justify-between text-sm font-mono">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-atom-fg-muted">You</p>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-green-500 mx-2 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-atom-bg px-2">
                      <span className="text-green-400">🔒 Encrypted</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <p className="text-atom-fg-muted">Server</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Summary */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-green border-opacity-30 p-6 mb-8">
            <h3 className="text-atom-green font-bold text-xl mb-4">🎓 Key Takeaways</h3>
            <div className="space-y-3 text-atom-fg-muted">
              <p>
                <strong className="text-atom-blue">Always use HTTPS:</strong> Look for the padlock icon 🔒 in your browser's address bar before entering sensitive information.
              </p>
              <p>
                <strong className="text-atom-blue">Public WiFi is dangerous:</strong> On unencrypted networks (coffee shops, airports), attackers can easily intercept HTTP traffic.
              </p>
              <p>
                <strong className="text-atom-blue">Man-in-the-Middle attacks:</strong> Without HTTPS, attackers can intercept, read, and even modify your data in transit.
              </p>
              <p>
                <strong className="text-atom-blue">For developers:</strong> Always implement HTTPS on your websites. Use services like Let's Encrypt for free SSL certificates.
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-900 bg-opacity-20 rounded-lg border border-red-500 border-opacity-30 p-6">
            <h3 className="text-red-400 font-bold mb-2">⚠️ Educational Demo Only</h3>
            <p className="text-red-300 text-sm">
              This demonstration does not actually send any data. All processing happens in your browser. 
              Never enter real passwords into untrusted websites. Always verify HTTPS before submitting sensitive information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NetSecLogin;
