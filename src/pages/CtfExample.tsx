// Educational Demo Only - Do Not Deploy Publicly
// Learning Goal: Teach CTF basics - finding hidden flags via HTML inspection, hidden elements, and base64 decoding

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CtfExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-50 border-b border-atom-blue border-opacity-20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-atom-blue hover:text-atom-green transition-colors">
            <HomeIcon className="h-6 w-6" />
            <span className="font-mono">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-atom-blue font-mono">CTF Challenge</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Challenge Card */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <MagnifyingGlassIcon className="h-8 w-8 text-atom-purple" />
              <h2 className="text-3xl font-bold text-atom-blue">Capture The Flag - Beginner</h2>
            </div>
            
            <div className="space-y-4 text-atom-fg-muted">
              <p className="text-lg">
                Welcome to your first CTF challenge! There are <span className="text-atom-green font-bold">three flags</span> hidden on this page.
              </p>
              
              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-orange">
                <h3 className="text-atom-orange font-bold mb-2">🎯 Your Mission:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Find the flag hidden in an HTML comment</li>
                  <li>Discover the flag in a hidden div element</li>
                  <li>Decode the base64-encoded flag</li>
                </ul>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-blue">
                <h3 className="text-atom-blue font-bold mb-2">💡 Hints:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Right-click on the page and select "Inspect" or "Inspect Element"</li>
                  <li>Look through the HTML source code carefully</li>
                  <li>For the base64 flag, open the browser console (F12) and use: <code className="bg-black px-2 py-1 rounded text-atom-green">atob(document.getElementById('b64').dataset.flag)</code></li>
                </ul>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-green">
                <h3 className="text-atom-green font-bold mb-2">✅ Flag Format:</h3>
                <p>All flags follow the format: <code className="bg-black px-2 py-1 rounded text-atom-purple">CTF&#123;flag_text_here&#125;</code></p>
              </div>
            </div>
          </div>

          {/* Visible Content Area */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-purple border-opacity-30 p-8">
            <h3 className="text-2xl font-bold text-atom-purple mb-4">Welcome to the Challenge Zone</h3>
            <p className="text-atom-fg-muted mb-4">
              This looks like a normal webpage, but there's more than meets the eye...
            </p>
            <p className="text-atom-fg-muted">
              Use your browser's developer tools to uncover the hidden secrets!
            </p>
            
            {/* Hidden flag in a div */}
            <div style={{ display: 'none' }} id="hidden-flag">
              FLAG: CTF&#123;hidden_div_inspector_master&#125;
            </div>
            
            {/* Base64 encoded flag in data attribute */}
            <span id="b64" data-flag="Q1RGe2Jhc2U2NF9kZWNvZGVyX2V4cGVydH0="></span>
          </div>

          {/* Educational Note */}
          <div className="mt-8 bg-red-900 bg-opacity-20 rounded-lg border border-red-500 border-opacity-30 p-6">
            <h3 className="text-red-400 font-bold mb-2">⚠️ Educational Demo Only</h3>
            <p className="text-red-300 text-sm">
              This is a safe, educational demonstration for learning CTF techniques. 
              Never use these skills to access systems without permission. 
              Always practice ethical hacking and follow responsible disclosure practices.
            </p>
          </div>
        </motion.div>
      </div>
      {/* FLAG: CTF{html_comment_detective} */}
    </div>
  );
};

export default CtfExample;
