// Educational Demo Only - Do Not Deploy Publicly
// Learning Goal: Demonstrate insecure API endpoints and query parameter vulnerabilities

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ShieldExclamationIcon, LockClosedIcon, LockOpenIcon, SparklesIcon, BoltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const ApiDemo: React.FC = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Check if URL contains ?admin=true
    const params = new URLSearchParams(location.search);
    const adminParam = params.get('admin');
    const wasAdmin = isAdmin;
    setIsAdmin(adminParam === 'true');
    
    // Show confetti when gaining admin access
    if (!wasAdmin && adminParam === 'true') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    // Update current URL display
    setCurrentUrl(window.location.href);
  }, [location.search, isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempted(true);
    // Show hint after failed login
    setTimeout(() => setShowHint(true), 1000);
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
          <h1 className="text-xl font-bold text-atom-blue font-mono">API Security Demo</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Fun Header */}
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg border-2 border-purple-500 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <SparklesIcon className="h-10 w-10 text-purple-400 animate-pulse" />
                <h2 className="text-4xl font-bold text-white">ChatGPT Premium Access</h2>
              </div>
              <p className="text-purple-200 text-lg mb-4">
                Get unlimited access to ChatGPT Plus for FREE! 🎉
              </p>
              <div className="bg-black bg-opacity-40 rounded p-4 border-l-4 border-yellow-500">
                <p className="text-yellow-300 text-sm">
                  ⚡ <strong>Limited Time Offer:</strong> We're giving away free premium subscriptions! 
                  Just sign up below... or is there another way? 🤔
                </p>
              </div>
            </div>
          </div>

          {/* Login Form or Challenge Card - Only show if not admin */}
          {!isAdmin && (
            <div className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-atom-blue mb-6 text-center">Sign Up for ChatGPT Plus</h2>
              
              <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-atom-fg-muted mb-2 font-mono text-sm">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono focus:outline-none focus:border-atom-blue"
                  />
                </div>

                <div>
                  <label className="block text-atom-fg-muted mb-2 font-mono text-sm">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a strong password"
                    required
                    className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono focus:outline-none focus:border-atom-blue"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-bold text-lg"
                >
                  Get ChatGPT Plus - $20/month
                </button>
              </form>

              {loginAttempted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-red-900 bg-opacity-20 rounded p-4 border border-red-500 border-opacity-30"
                >
                  <p className="text-red-300 text-center mb-2">
                    💸 <strong>Payment Failed!</strong> Your card was declined. (Because you're broke, remember?)
                  </p>
                  <p className="text-red-400 text-center text-sm">
                    Error: Insufficient funds. Please add a payment method with at least $20.
                  </p>
                </motion.div>
              )}

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className="bg-black bg-opacity-50 rounded-lg border border-atom-orange border-opacity-30 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <ShieldExclamationIcon className="h-8 w-8 text-atom-orange" />
                      <h3 className="text-2xl font-bold text-atom-orange">Wait... There Might Be Another Way 🤔</h3>
                    </div>
                    
                    <div className="space-y-4 text-atom-fg-muted">
                      <p className="text-lg">
                        You can't afford ChatGPT Plus, but what if this site has a <span className="text-atom-orange font-bold">security vulnerability</span>? 😈
                      </p>
                      
                      <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-orange">
                        <h4 className="text-atom-orange font-bold mb-2">🎯 Your Quest:</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li>The site might check if you're an admin using a URL parameter (rookie mistake!)</li>
                          <li>Try adding <code className="bg-black px-2 py-1 rounded text-atom-green">?admin=true</code> to the URL</li>
                          <li>Unlock the premium subscription and grab the flag!</li>
                        </ul>
                      </div>

                      <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-blue">
                        <h4 className="text-atom-blue font-bold mb-2">💡 Hacker's Guide:</h4>
                        <p className="mb-2">Click on the URL bar at the top of your browser and add the magic words:</p>
                        <div className="bg-black rounded p-3 space-y-2">
                          <p className="text-sm text-red-400">❌ Current: <code className="text-atom-fg break-all">{currentUrl}</code></p>
                          <p className="text-sm text-green-400">✅ Try: <code className="text-atom-fg break-all">{window.location.origin}/api-demo?admin=true</code></p>
                        </div>
                        <p className="text-xs text-atom-fg-muted mt-2 italic">
                          (Hint: Just add "?admin=true" to the end and press Enter)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Current URL Display */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-purple border-opacity-30 p-6 mb-8">
            <h3 className="text-atom-purple font-bold text-xl mb-4">Current Request</h3>
            <div className="bg-atom-bg bg-opacity-50 rounded p-4">
              <div className="flex items-center space-x-2 mb-2">
                <code className="text-atom-green font-mono text-sm break-all">GET {currentUrl}</code>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-atom-fg-muted text-sm">Query Parameters:</span>
                {location.search ? (
                  <code className="bg-black px-2 py-1 rounded text-atom-orange text-sm">{location.search}</code>
                ) : (
                  <span className="text-atom-fg-muted text-sm italic">(none)</span>
                )}
              </div>
            </div>
          </div>

          {/* Access Status */}
          {!isAdmin ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900 bg-opacity-20 rounded-lg border-2 border-red-500 p-8 mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <LockClosedIcon className="h-12 w-12 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-bold text-2xl">💸 Payment Required</h3>
                  <p className="text-red-300">Status: 401 Unauthorized (aka You're Broke)</p>
                </div>
              </div>
              
              <div className="bg-black bg-opacity-50 rounded p-4 mb-4">
                <p className="text-white font-mono text-sm">
                  &#123;<br />
                  &nbsp;&nbsp;"error": "PaymentRequired",<br />
                  &nbsp;&nbsp;"message": "ChatGPT Plus costs $20/month",<br />
                  &nbsp;&nbsp;"your_balance": "$0.00",<br />
                  &nbsp;&nbsp;"hint": "Unless you're an admin... 👀"<br />
                  &#125;
                </p>
              </div>

              <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30">
                <p className="text-yellow-300 text-sm mb-2">
                  💡 <strong>Hmm...</strong> The error message mentions "admin". What if you could trick the system into thinking you're an admin?
                </p>
                <p className="text-yellow-200 text-xs italic">
                  (Psst... try adding something to the URL... something about being an admin... something like "?admin=true"...)
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg border-2 border-green-400 p-8 mb-8 relative overflow-hidden"
              >
                {/* Confetti effect */}
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 1 }}
                        animate={{ y: 1000, rotate: 360 }}
                        transition={{ duration: 2, delay: Math.random() * 0.5 }}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: 2 }}
                  >
                    <LockOpenIcon className="h-12 w-12 text-green-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-green-400 font-bold text-3xl">🎉 HACKED! You're In!</h3>
                    <p className="text-green-300">Status: 200 OK (You Absolute Legend)</p>
                  </div>
                </div>

                <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-4 border-2 border-purple-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <RocketLaunchIcon className="h-8 w-8 text-purple-400" />
                    <h4 className="text-purple-400 font-bold text-2xl">ChatGPT Plus - UNLOCKED!</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded p-4 border border-purple-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-200 font-bold">Subscription Status:</span>
                        <span className="text-green-400 font-bold flex items-center">
                          <BoltIcon className="h-5 w-5 mr-1" />
                          PREMIUM ACTIVATED
                        </span>
                      </div>
                      <p className="text-purple-300 text-sm">Access to GPT-5, Sora, and more!</p>
                    </div>

                    <div className="bg-atom-bg bg-opacity-50 rounded p-3">
                      <p className="text-atom-fg-muted text-sm mb-1">Account Type:</p>
                      <p className="text-white font-mono">👑 ADMIN (Lifetime Free Access)</p>
                    </div>

                    <div className="bg-atom-bg bg-opacity-50 rounded p-3">
                      <p className="text-atom-fg-muted text-sm mb-1">Monthly Savings:</p>
                      <p className="text-white font-mono">$20/month × ∞ = $∞ saved! 💰</p>
                    </div>

                    <div className="bg-atom-bg bg-opacity-50 rounded p-3">
                      <p className="text-atom-fg-muted text-sm mb-1">Hacker Level:</p>
                      <p className="text-white font-mono">Elite URL Manipulator 😎</p>
                    </div>

                    <motion.div 
                      className="bg-green-900 bg-opacity-50 rounded p-4 border-2 border-green-400"
                      animate={{ boxShadow: ["0 0 0px #4ade80", "0 0 20px #4ade80", "0 0 0px #4ade80"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-green-400 font-bold mb-2 flex items-center">
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        🚩 FLAG CAPTURED:
                      </p>
                      <code className="text-atom-green font-mono text-lg">CTF&#123;insecure_api_parameter_bypass&#125;</code>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30">
                  <p className="text-yellow-300 text-sm">
                    ✅ <strong>Congratulations!</strong> You just exploited a real vulnerability! 
                    In the real world, this would be a <span className="text-red-400 font-bold">CRITICAL security flaw</span>. 
                    Never trust client-side parameters for authentication! 🔐
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Educational Explanation */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-green border-opacity-30 p-6 mb-8">
            <h3 className="text-atom-green font-bold text-xl mb-4">🎓 What You Just Learned (The Serious Stuff)</h3>
            <div className="space-y-3 text-atom-fg-muted">
              <p>
                <strong className="text-atom-blue">The Vulnerability:</strong> This page trusts the <code className="bg-black px-2 py-1 rounded">?admin=true</code> parameter without proper authentication. 
                It's like a bouncer at a club who lets anyone in if they just say "I'm on the VIP list" 🤦
              </p>
              <p>
                <strong className="text-atom-blue">Real-World Impact:</strong> In 2019, a similar vulnerability let hackers access 419 million Facebook user records. 
                Attackers can manipulate query parameters to bypass security, access admin panels, steal data, or get free stuff (like ChatGPT Plus... hypothetically 😏).
              </p>
              <p>
                <strong className="text-atom-blue">How to Fix It:</strong> Always validate authentication <strong>server-side</strong> using secure sessions/tokens. 
                Never trust anything from the client (URL parameters, cookies, headers). 
                Think of it like this: Would you trust someone who just walks up and says "I'm the CEO"? No! You'd check their ID badge (server-side token).
              </p>
              <p>
                <strong className="text-atom-blue">URL Parameters 101:</strong> Query parameters are added after <code className="bg-black px-2 py-1 rounded">?</code> in the URL. 
                Multiple parameters use <code className="bg-black px-2 py-1 rounded">&</code>. 
                Example: <code className="bg-black px-2 py-1 rounded">site.com/page?user=bob&premium=true&hacker=yes</code>
              </p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-purple-900 bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30 p-6 mb-8">
            <h3 className="text-purple-400 font-bold text-xl mb-4">🤓 Fun Hacker Facts</h3>
            <div className="space-y-2 text-atom-fg-muted text-sm">
              <p>• This type of vulnerability is called "Insecure Direct Object Reference" (IDOR)</p>
              <p>• Bug bounty hunters get paid $500-$10,000+ for finding these in real apps</p>
              <p>• The first rule of hacking: "Never trust user input" (even if it's in the URL)</p>
              <p>• Real hackers use tools like Burp Suite to manipulate requests automatically</p>
              <p>• You just learned a skill that's tested in every security certification exam! 🎓</p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-900 bg-opacity-20 rounded-lg border border-red-500 border-opacity-30 p-6">
            <h3 className="text-red-400 font-bold mb-2">⚠️ Legal Disclaimer (The Boring But Important Part)</h3>
            <p className="text-red-300 text-sm mb-3">
              This is a deliberately vulnerable demo for educational purposes only. 
              What you just did here is <strong>100% legal and encouraged</strong> because we built it for you to hack!
            </p>
            <p className="text-red-300 text-sm">
              <strong className="text-red-400">BUT:</strong> Doing this on real websites without permission is <strong>illegal</strong> and can get you arrested. 
              Only test on sites you own, have permission to test, or are explicitly designed for hacking practice (like HackTheBox, TryHackMe, etc.). 
              Be a <strong className="text-green-400">white hat hacker</strong>, not a criminal! 🎩✨
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiDemo;
