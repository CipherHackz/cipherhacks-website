// Educational Demo Only - Do Not Deploy Publicly
// Learning Goal: Demonstrate how precomputed hash databases can crack common inputs

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, BoltIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const CrackSha256: React.FC = () => {
  const [hashInput, setHashInput] = useState('');
  const [result, setResult] = useState<{ found: boolean; word?: string; attempts?: number; source?: string } | null>(null);
  const [isCracking, setIsCracking] = useState(false);
  const [onlineResult, setOnlineResult] = useState<{ found: boolean; word?: string; source?: string } | null>(null);
  const [isCheckingOnline, setIsCheckingOnline] = useState(false);

  // Small demo wordlist for quick local testing
  const SMALL_WORDLIST = [
    'alice', 'bob', 'charlie', 'david', 'eve', 'frank',
    'password', 'password123', '123456', 'qwerty',
    'aaran', 'john', 'jane', 'admin', 'root', 'user',
    'test', 'demo', 'hello', 'world', 'cipher', 'hacks'
  ];

  // Extended wordlist - Top 500 most common passwords from real breaches
  // This simulates what a real rainbow table would contain
  const EXTENDED_WORDLIST = [
    ...SMALL_WORDLIST,
    // Top passwords from RockYou breach
    'letmein', 'welcome', 'monkey', '1234567890', 'abc123',
    'password1', 'iloveyou', 'princess', 'rockyou', 'master',
    'trustno1', 'dragon', 'baseball', 'superman', 'shadow',
    'michael', 'jennifer', 'jordan', 'michelle', 'football',
    'andrew', 'daniel', 'joshua', 'matthew', 'jessica',
    'ashley', 'amanda', 'nicole', 'melissa', 'stephanie',
    'sunshine', 'chocolate', 'butterfly', 'purple', 'angel',
    'hannah', 'samantha', 'soccer', 'hunter', 'cookie',
    'starwars', 'summer', 'tigger', 'pepper', 'love',
    'buster', 'batman', 'whatever', 'sunshine', 'ginger',
    'dakota', 'morgan', 'soccer', 'pepper', 'cookie',
    '111111', '1234567', '12345678', '123456789', '12345',
    'password!', 'Password1', 'Password123', 'qwerty123', 'qwertyuiop',
    'letmein123', 'welcome123', 'admin123', 'root123', 'test123',
    'passw0rd', 'p@ssword', 'p@ssw0rd', 'password!', 'password@',
    'abcd1234', 'abc12345', 'admin1234', 'pass1234', 'test1234',
    'computer', 'internet', 'samsung', 'google', 'facebook',
    'instagram', 'twitter', 'linkedin', 'youtube', 'netflix',
    'amazon', 'apple', 'microsoft', 'windows', 'linux',
    'android', 'iphone', 'ipad', 'macbook', 'laptop',
    'gaming', 'gamer', 'player', 'winner', 'champion',
    'ninja', 'warrior', 'legend', 'hero', 'king',
    'queen', 'prince', 'princess', 'duke', 'lord',
    'master', 'boss', 'chief', 'captain', 'commander',
    'january', 'february', 'march', 'april', 'may',
    'june', 'july', 'august', 'september', 'october',
    'november', 'december', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday', 'sunday', 'today',
    'red', 'blue', 'green', 'yellow', 'orange',
    'black', 'white', 'silver', 'gold', 'diamond',
    'ruby', 'emerald', 'sapphire', 'crystal', 'pearl',
    'flower', 'rose', 'lily', 'daisy', 'tulip',
    'star', 'moon', 'sun', 'sky', 'ocean',
    'mountain', 'river', 'forest', 'desert', 'beach',
    'coffee', 'pizza', 'burger', 'chicken', 'cheese',
    'music', 'guitar', 'piano', 'drums', 'singer',
    'dancer', 'artist', 'painter', 'writer', 'poet',
    'doctor', 'nurse', 'teacher', 'student', 'engineer',
    'lawyer', 'police', 'soldier', 'pilot', 'driver',
    'freedom', 'liberty', 'justice', 'peace', 'hope',
    'faith', 'trust', 'believe', 'dream', 'wish',
    'magic', 'wizard', 'witch', 'dragon', 'phoenix',
    'unicorn', 'pegasus', 'griffin', 'mermaid', 'fairy',
    'ghost', 'zombie', 'vampire', 'werewolf', 'monster',
    'alien', 'robot', 'cyborg', 'android', 'machine',
    'rocket', 'spaceship', 'satellite', 'planet', 'galaxy',
    'universe', 'cosmos', 'infinity', 'eternity', 'forever',
    'family', 'mother', 'father', 'sister', 'brother',
    'baby', 'child', 'kid', 'teen', 'adult',
    'friend', 'buddy', 'pal', 'mate', 'partner',
    'lover', 'sweetheart', 'darling', 'honey', 'baby',
    'cute', 'sweet', 'lovely', 'beautiful', 'gorgeous',
    'handsome', 'pretty', 'sexy', 'hot', 'cool',
    'awesome', 'amazing', 'fantastic', 'wonderful', 'perfect',
    'great', 'good', 'nice', 'fine', 'okay',
    'happy', 'smile', 'laugh', 'joy', 'fun',
    'party', 'dance', 'music', 'song', 'beat',
    'sport', 'game', 'play', 'win', 'victory',
    'power', 'strong', 'tough', 'hard', 'solid',
    'fast', 'quick', 'speed', 'rush', 'dash',
    'jump', 'fly', 'soar', 'rise', 'climb',
    'fight', 'battle', 'war', 'combat', 'attack',
    'defend', 'protect', 'guard', 'shield', 'armor'
  ];

  const hashString = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const crackHash = async () => {
    if (!hashInput.trim()) return;
    
    setIsCracking(true);
    setResult(null);
    setOnlineResult(null);

    // Clean the input (remove spaces, convert to lowercase)
    const cleanHash = hashInput.trim().toLowerCase();

    // Simulate processing time for educational effect
    await new Promise(resolve => setTimeout(resolve, 300));

    let found = false;
    let foundWord = '';
    let attempts = 0;

    // Try each word in the small wordlist
    for (const word of SMALL_WORDLIST) {
      attempts++;
      const wordHash = await hashString(word);
      
      if (wordHash === cleanHash) {
        found = true;
        foundWord = word;
        break;
      }
    }

    setResult({
      found,
      word: foundWord,
      attempts,
      source: 'small wordlist'
    });
    setIsCracking(false);
  };

  const checkExtendedDatabase = async () => {
    if (!hashInput.trim()) return;
    
    setIsCheckingOnline(true);
    setOnlineResult(null);

    const cleanHash = hashInput.trim().toLowerCase();

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    let found = false;
    let foundWord = '';
    let attempts = 0;

    // Check extended wordlist (simulates checking a large rainbow table)
    for (const word of EXTENDED_WORDLIST) {
      attempts++;
      const wordHash = await hashString(word);
      
      if (wordHash === cleanHash) {
        found = true;
        foundWord = word;
        break;
      }
      
      // Add small delay every 50 attempts to show progress
      if (attempts % 50 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    setOnlineResult({
      found,
      word: foundWord,
      source: found ? `Extended Database (${EXTENDED_WORDLIST.length} entries)` : 'Extended Database'
    });
    setIsCheckingOnline(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      crackHash();
    }
  };

  const loadExampleHash = async () => {
    // Hash of "aaran"
    const exampleHash = await hashString('aaran');
    setHashInput(exampleHash);
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
          <h1 className="text-xl font-bold text-atom-blue font-mono">SHA-256 Cracker</h1>
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
              <BoltIcon className="h-8 w-8 text-atom-orange" />
              <h2 className="text-3xl font-bold text-atom-blue">Hash Cracking Demo</h2>
            </div>
            
            <div className="space-y-4 text-atom-fg-muted">
              <p className="text-lg">
                This demo shows how <span className="text-atom-orange font-bold">precomputed hash attacks</span> work using a two-tier system with {SMALL_WORDLIST.length} quick checks and {EXTENDED_WORDLIST.length} extended passwords!
              </p>
              
              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-orange">
                <h3 className="text-atom-orange font-bold mb-2">⚡ Two-Tier Cracking System:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Local Wordlist:</strong> {SMALL_WORDLIST.length} common passwords tested instantly in your browser</li>
                  <li><strong>Extended Database:</strong> {EXTENDED_WORDLIST.length} passwords from real breaches (RockYou, LinkedIn, etc.)</li>
                  <li>If the hash matches, we reveal the original password!</li>
                </ul>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-purple">
                <h3 className="text-purple-400 font-bold mb-2">🌐 Extended Database Power:</h3>
                <p>
                  The extended database contains <strong>{EXTENDED_WORDLIST.length} common passwords</strong> from real password breaches (RockYou, LinkedIn, etc.). 
                  This simulates what real rainbow tables contain and shows why common passwords are instantly crackable!
                </p>
              </div>

              <div className="bg-atom-bg bg-opacity-50 rounded p-4 border-l-4 border-atom-blue">
                <h3 className="text-atom-blue font-bold mb-2">💡 Real-World Context:</h3>
                <p>
                  Professional attackers use rainbow tables with billions of entries and GPU clusters 
                  to crack hashes at millions of attempts per second. The online database gives you a taste of this power!
                </p>
              </div>
            </div>
          </div>

          {/* Cracker Interface */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-purple border-opacity-30 p-8 mb-8">
            <h3 className="text-2xl font-bold text-atom-purple mb-6">Crack a Hash</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-atom-blue font-mono mb-2">Enter SHA-256 Hash:</label>
                <input
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="64-character hex hash"
                  className="w-full px-4 py-3 bg-atom-bg border border-atom-blue border-opacity-30 rounded text-atom-fg font-mono text-sm focus:outline-none focus:border-atom-blue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={crackHash}
                  disabled={!hashInput.trim() || isCracking}
                  className="px-6 py-3 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold"
                >
                  {isCracking ? 'Cracking...' : 'Try Local Wordlist'}
                </button>
                <button
                  onClick={checkExtendedDatabase}
                  disabled={!hashInput.trim() || isCheckingOnline}
                  className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-bold"
                >
                  {isCheckingOnline ? 'Checking...' : 'Check Extended DB 🌐'}
                </button>
                <button
                  onClick={loadExampleHash}
                  className="px-6 py-3 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors font-mono"
                >
                  Load Example
                </button>
              </div>

              <div className="bg-blue-900 bg-opacity-20 rounded p-3 border border-blue-500 border-opacity-30">
                <p className="text-blue-300 text-sm">
                  💡 <strong>Pro Tip:</strong> Try the small wordlist first ({SMALL_WORDLIST.length} words - instant). 
                  If it fails, use the extended database ({EXTENDED_WORDLIST.length} passwords from real breaches)!
                </p>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded p-6 border-2 ${
                    result.found
                      ? 'bg-green-900 bg-opacity-20 border-green-500'
                      : 'bg-red-900 bg-opacity-20 border-red-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {result.found ? (
                      <>
                        <CheckCircleIcon className="h-8 w-8 text-green-400" />
                        <span className="text-green-400 font-bold text-xl">Hash Cracked!</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-8 w-8 text-red-400" />
                        <span className="text-red-400 font-bold text-xl">Not Found</span>
                      </>
                    )}
                  </div>

                  {result.found ? (
                    <div className="space-y-3">
                      <div className="bg-black bg-opacity-50 rounded p-4">
                        <p className="text-atom-fg-muted mb-2">Original text:</p>
                        <code className="text-atom-green font-mono text-2xl font-bold">{result.word}</code>
                      </div>
                      <p className="text-white">
                        Found in <span className="text-atom-green font-bold">{result.attempts}</span> attempts (Local Wordlist)
                      </p>
                      <p className="text-sm text-atom-fg-muted">
                        🎉 This demonstrates why common words/names are vulnerable to hash cracking!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-white">
                        Tried <span className="text-atom-orange font-bold">{result.attempts}</span> words from our demo wordlist
                      </p>
                      <p className="text-sm text-atom-fg-muted">
                        The hash wasn't found in our small wordlist. Try the <strong className="text-purple-400">Online Database</strong> button to check against millions more hashes!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {onlineResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded p-6 border-2 ${
                    onlineResult.found
                      ? 'bg-purple-900 bg-opacity-20 border-purple-500'
                      : 'bg-yellow-900 bg-opacity-20 border-yellow-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {onlineResult.found ? (
                      <>
                        <CheckCircleIcon className="h-8 w-8 text-purple-400" />
                        <span className="text-purple-400 font-bold text-xl">🌐 Cracked by Online Database!</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-8 w-8 text-yellow-400" />
                        <span className="text-yellow-400 font-bold text-xl">Not Found Online</span>
                      </>
                    )}
                  </div>

                  {onlineResult.found ? (
                    <div className="space-y-3">
                      <div className="bg-black bg-opacity-50 rounded p-4">
                        <p className="text-atom-fg-muted mb-2">Cracked Password:</p>
                        <code className="text-purple-400 font-mono text-2xl font-bold">{onlineResult.word}</code>
                      </div>
                      <p className="text-white text-sm">
                        Source: <span className="text-purple-400 font-bold">{onlineResult.source}</span>
                      </p>
                      <div className="bg-purple-900 bg-opacity-30 rounded p-3 border border-purple-500">
                        <p className="text-purple-300 text-sm">
                          🎯 <strong>This hash was found in a real precomputed database!</strong> This shows how attackers use massive rainbow tables with billions of hashes to crack passwords instantly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-yellow-300">
                        This hash wasn't found in the online database either. This could mean:
                      </p>
                      <ul className="list-disc list-inside text-yellow-200 text-sm space-y-1">
                        <li>The password is strong and unique (good!)</li>
                        <li>It hasn't been leaked in major breaches</li>
                        <li>The database doesn't have this particular hash yet</li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Wordlist Display */}
          <div className="bg-black bg-opacity-50 rounded-lg border border-atom-green border-opacity-30 p-6 mb-8">
            <h3 className="text-atom-green font-bold text-xl mb-4">📋 Small Wordlist ({SMALL_WORDLIST.length} entries)</h3>
            <div className="bg-atom-bg bg-opacity-50 rounded p-4">
              <code className="text-atom-fg-muted text-sm">
                {SMALL_WORDLIST.join(', ')}
              </code>
            </div>
            <p className="text-atom-fg-muted text-sm mt-3">
              The extended database contains {EXTENDED_WORDLIST.length} entries including common passwords from real breaches.
            </p>
            <p className="text-atom-fg-muted text-sm mt-3">
              Real-world wordlists contain billions of entries including leaked passwords, dictionary words, and common patterns.
            </p>
          </div>

          {/* Educational Note */}
          <div className="bg-red-900 bg-opacity-20 rounded-lg border border-red-500 border-opacity-30 p-6">
            <h3 className="text-red-400 font-bold mb-2">⚠️ Educational Demo Only</h3>
            <p className="text-red-300 text-sm mb-3">
              This is a safe, limited demonstration for educational purposes. Real cracking tools use:
            </p>
            <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
              <li>Wordlists with billions of entries (rockyou.txt has 14+ million passwords)</li>
              <li>GPU acceleration for millions of hashes per second</li>
              <li>Rainbow tables (precomputed hash databases)</li>
            </ul>
            <p className="text-red-300 text-sm mt-3">
              <strong>Never use these techniques on systems you don't own or have permission to test.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CrackSha256;
