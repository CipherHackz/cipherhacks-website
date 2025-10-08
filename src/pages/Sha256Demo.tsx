// Educational Demo Only - Do Not Deploy Publicly
// Learning Goal: Demonstrate SHA-256 hashing and why common inputs are vulnerable to precomputed attacks

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, FingerPrintIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Sha256Demo: React.FC = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  const computeHash = async () => {
    if (!input.trim()) return;
    
    setIsHashing(true);
    
    try {
      // Use Web Crypto API for SHA-256
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      
      // Convert buffer to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHash(hashHex);
    } catch (error) {
      console.error('Hashing error:', error);
      setHash('Error computing hash');
    } finally {
      setIsHashing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      computeHash();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-50 border-b border-atom-blue border-opacity-20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-atom-blue hover:text-atom-green transition-colors">
            <HomeIcon className="h-6 w-6" />
            <span className="font-mono">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-atom-blue font-mono">SHA-256 Hash Generator</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Info Card */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <FingerPrintIcon className="h-8 w-8 text-atom-purple" />
              <h2 className="text-3xl font-bold text-atom-blue">SHA-256 Hashing Demo</h2>
            </div>
            
            <div className="space-y-4 text-atom-fg-muted">
              <p className="text-lg">
                SHA-256 is a cryptographic hash function that converts any input into a unique 256-bit (64-character hex) fingerprint.
              </p>
              
              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-green">
                <h3 className="text-atom-green font-bold mb-2">✅ Hash Properties:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>One-way function (cannot reverse the hash to get original input)</li>
                  <li>Deterministic (same input always produces same hash)</li>
                  <li>Avalanche effect (tiny input change = completely different hash)</li>
                </ul>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-orange">
                <h3 className="text-atom-orange font-bold mb-2">⚠️ The Vulnerability:</h3>
                <p>
                  If your input is common (like a name or simple password), it may exist in precomputed hash databases. 
                  Attackers can use these "rainbow tables" to instantly crack your hash!
                </p>
              </div>
            </div>
          </div>

          {/* Hash Generator */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-purple border-opacity-30 p-8 mb-8">
            <h3 className="text-2xl font-bold text-atom-purple mb-6">Generate Hash</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-atom-blue font-mono mb-2">Enter your name or text:</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., alice, bob, password123"
                  className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono focus:outline-none focus:border-atom-blue"
                />
              </div>

              <button
                onClick={computeHash}
                disabled={!input.trim() || isHashing}
                className="w-full px-6 py-3 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold flex items-center justify-center space-x-2"
              >
                <span>{isHashing ? 'Hashing...' : 'Generate SHA-256 Hash'}</span>
                {!isHashing && <ArrowRightIcon className="h-5 w-5" />}
              </button>

              {hash && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-atom-bg bg-opacity-50 rounded p-4 border-2 border-atom-green"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-atom-green font-bold">SHA-256 Hash:</span>
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1 bg-atom-green text-black rounded hover:bg-opacity-80 transition-colors text-sm font-mono"
                    >
                      Copy
                    </button>
                  </div>
                  <code className="block text-atom-fg font-mono text-sm break-all bg-black bg-opacity-50 p-3 rounded">
                    {hash}
                  </code>
                </motion.div>
              )}
            </div>
          </div>

          {/* Next Step */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-orange border-opacity-30 p-6 mb-8">
            <h3 className="text-atom-orange font-bold text-xl mb-4">🔍 Try Cracking Your Hash!</h3>
            <p className="text-atom-fg-muted mb-4">
              If your name is common, it might be in precomputed lists. Copy your hash and try cracking it!
            </p>
            <Link
              to="/crack-sha256"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors font-mono font-bold"
            >
              <span>Go to Hash Cracker</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Educational Note */}
          <div className="bg-atom-bg bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-6">
            <h3 className="text-atom-blue font-bold text-xl mb-4">🎓 Security Best Practices</h3>
            <div className="space-y-3 text-atom-fg-muted">
              <p>
                <strong className="text-atom-green">For Passwords:</strong> Never store plain passwords. Use bcrypt, Argon2, or PBKDF2 with salt (not plain SHA-256).
              </p>
              <p>
                <strong className="text-atom-green">Add Salt:</strong> Append random data before hashing to prevent rainbow table attacks.
              </p>
              <p>
                <strong className="text-atom-green">Use Strong Inputs:</strong> Long, random, unique passwords are much harder to crack.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sha256Demo;
