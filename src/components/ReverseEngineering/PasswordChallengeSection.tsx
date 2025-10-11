// Password Challenge Section - Real-world cracking exercise

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const PasswordChallengeSection: React.FC = () => {
  const [passwordAttempt, setPasswordAttempt] = useState('');
  const [passwordResult, setPasswordResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [bonusChallenge, setBonusChallenge] = useState('');
  const [bonusResult, setBonusResult] = useState('');

  const attemptPasswordCrack = () => {
    setAttempts(attempts + 1);
    if (passwordAttempt.toLowerCase() === 'cipher2025') {
      setPasswordResult('success');
    } else {
      setPasswordResult('failure');
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const checkBonusChallenge = () => {
    const answer = bonusChallenge.trim().toLowerCase();
    if (answer === 'hackthebox' || answer === 'hack the box') {
      setBonusResult('correct');
    } else {
      setBonusResult('incorrect');
    }
  };

  const resetChallenge = () => {
    setPasswordAttempt('');
    setPasswordResult('');
    setAttempts(0);
    setShowHint(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-orange">
        <h3 className="text-2xl font-bold text-atom-orange mb-4 flex items-center">
          <LightBulbIcon className="h-8 w-8 mr-3" />
          Real-World Challenge: Password Cracker
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          You've intercepted a compiled login program. Using your reverse engineering skills from 
          previous sections, can you figure out the correct password by analyzing the decompiled code?
        </p>
        <div className="bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-500 border-opacity-30">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Tip:</strong> Look for patterns like hex values, ASCII codes, or string comparisons!
          </p>
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-orange border-opacity-30">
        <h4 className="text-atom-orange font-bold text-xl mb-4">🔍 The Decompiled Login Program</h4>
        <p className="text-atom-fg-muted mb-4">
          Our decompiler analyzed the binary and produced this code:
        </p>

        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-cyan-400 mb-4 overflow-x-auto">
          <pre>{`function authenticateUser(input_string) {
  // Password stored as hex byte array
  let password_bytes = [
    0x63, 0x69, 0x70, 0x68,  // Bytes 0-3
    0x65, 0x72, 0x32, 0x30,  // Bytes 4-7
    0x32, 0x35                // Bytes 8-9
  ];
  
  // First check: length must be exactly 10
  if (input_string.length != 10) {
    console.log("FAILED: Wrong length");
    return false;
  }
  
  // Second check: byte-by-byte comparison
  for (let i = 0; i < 10; i++) {
    let input_byte = input_string.charCodeAt(i);
    if (input_byte != password_bytes[i]) {
      console.log("FAILED: Wrong character at position " + i);
      return false;
    }
  }
  
  console.log("SUCCESS: Access granted!");
  return true;
}

// ==========================================
// ASCII REFERENCE TABLE (Your Cheat Sheet!)
// ==========================================
// 0x63 = 99  = 'c'    0x69 = 105 = 'i'
// 0x70 = 112 = 'p'    0x68 = 104 = 'h'
// 0x65 = 101 = 'e'    0x72 = 114 = 'r'
// 0x32 = 50  = '2'    0x30 = 48  = '0'
// 0x35 = 53  = '5'`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-900 bg-opacity-20 p-4 rounded border border-blue-500 border-opacity-30">
            <h5 className="text-blue-400 font-bold mb-2">🧠 Analysis Tips:</h5>
            <ul className="text-blue-300 space-y-1 text-sm">
              <li>✓ The password is exactly <strong>10 characters</strong> long</li>
              <li>✓ Each hex value represents one ASCII character</li>
              <li>✓ We've provided the hex→char conversions above!</li>
              <li>✓ Just read the characters in order</li>
            </ul>
          </div>

          <div className="bg-purple-900 bg-opacity-20 p-4 rounded border border-purple-500 border-opacity-30">
            <h5 className="text-purple-400 font-bold mb-2">🎯 Your Mission:</h5>
            <p className="text-purple-300 text-sm">
              Convert each hex byte to its ASCII character and piece together the password. 
              Start with the first four bytes: 0x63, 0x69, 0x70, 0x68...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-atom-orange font-bold">
            Enter the password: <span className="text-sm text-atom-fg-muted">(Attempts: {attempts})</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={passwordAttempt}
              onChange={(e) => setPasswordAttempt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && attemptPasswordCrack()}
              placeholder="Your answer..."
              className="flex-1 bg-atom-bg border border-atom-orange rounded px-4 py-2 text-atom-fg"
              disabled={passwordResult === 'success'}
            />
            <button
              onClick={attemptPasswordCrack}
              disabled={!passwordAttempt || passwordResult === 'success'}
              className="px-6 py-2 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔓 Crack It!
            </button>
          </div>

          {showHint && passwordResult !== 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-900 bg-opacity-20 p-4 rounded border border-yellow-500"
            >
              <p className="text-yellow-300 text-sm">
                <strong>💡 Hint:</strong> The first 4 letters spell "ciph". The next 2 spell "er". 
                The last 4 are digits forming a year!
              </p>
            </motion.div>
          )}

          {passwordResult === 'failure' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded bg-red-900 bg-opacity-20 border border-red-500"
            >
              <div className="flex items-start space-x-2 text-red-400">
                <XCircleIcon className="h-6 w-6 flex-shrink-0" />
                <div>
                  <span className="font-bold">ACCESS DENIED! ❌</span>
                  <p className="text-sm mt-1">
                    That's not the correct password. Review the hex values and try again!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {passwordResult === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded bg-green-900 bg-opacity-20 border-2 border-green-500"
            >
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto mb-3" />
                <h4 className="text-green-400 font-bold text-2xl mb-2">🎉 SUCCESS! ACCESS GRANTED!</h4>
                <p className="text-green-300 mb-4">
                  You cracked the password: <strong className="text-xl">cipher2025</strong>
                </p>
                <div className="bg-black bg-opacity-30 p-4 rounded text-left">
                  <p className="text-green-400 text-sm font-mono">
                    {'>'} Decoding process:<br/>
                    {'>'} 0x63 0x69 0x70 0x68 = "ciph"<br/>
                    {'>'} 0x65 0x72 = "er"<br/>
                    {'>'} 0x32 0x30 0x32 0x35 = "2025"<br/>
                    {'>'} Result: "cipher2025" ✓
                  </p>
                </div>
                <button
                  onClick={resetChallenge}
                  className="mt-4 px-4 py-2 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors text-sm flex items-center space-x-2 mx-auto"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {passwordResult === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple border-opacity-30"
        >
          <h4 className="text-atom-purple font-bold text-xl mb-4">🌟 Bonus Challenge (Advanced)</h4>
          <p className="text-atom-fg-muted mb-4">
            Ready for a tougher one? Decode this more complex password:
          </p>

          <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-purple-400 mb-4 overflow-x-auto">
            <pre>{`// Decompiled authentication function
function checkAdvancedPassword(input) {
  let part1 = [0x68, 0x61, 0x63, 0x6B];  // 4 chars
  let part2 = [0x74, 0x68, 0x65];        // 3 chars
  let part3 = [0x62, 0x6F, 0x78];        // 3 chars
  
  let fullPassword = "";
  
  // Build password from three parts
  for (let byte of part1) fullPassword += String.fromCharCode(byte);
  for (let byte of part2) fullPassword += String.fromCharCode(byte);
  for (let byte of part3) fullPassword += String.fromCharCode(byte);
  
  return input === fullPassword;
}`}</pre>
          </div>

          <div className="space-y-3">
            <label className="block text-atom-purple font-bold">Decode the password:</label>
            <input
              type="text"
              value={bonusChallenge}
              onChange={(e) => setBonusChallenge(e.target.value)}
              placeholder="Your answer..."
              className="w-full bg-atom-bg border border-atom-purple rounded px-4 py-2 text-atom-fg"
            />
            <button
              onClick={checkBonusChallenge}
              className="px-6 py-2 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors"
            >
              Check Answer
            </button>

            {bonusResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded ${
                  bonusResult === 'correct'
                    ? 'bg-green-900 bg-opacity-20 border border-green-500'
                    : 'bg-red-900 bg-opacity-20 border border-red-500'
                }`}
              >
                {bonusResult === 'correct' ? (
                  <div className="text-green-400">
                    <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                    <span className="font-bold">Outstanding! 🏆</span>
                    <p className="text-sm mt-1">
                      You decoded all three parts correctly: "hack" + "the" + "box" = "hackthebox"!
                      This is actually a famous cybersecurity training platform!
                    </p>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <XCircleIcon className="h-6 w-6 inline mr-2" />
                    <span className="font-bold">Not quite!</span>
                    <p className="text-sm mt-1">
                      Try decoding each part separately, then combine them: part1 + part2 + part3
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 border border-green-500 border-opacity-30">
        <h4 className="text-green-400 font-bold text-xl mb-3">🎓 What You Learned</h4>
        <ul className="space-y-2 text-green-300">
          <li>✓ <strong>Hex to ASCII conversion</strong> is a fundamental reverse engineering skill</li>
          <li>✓ <strong>Pattern recognition</strong> helps identify password checking logic</li>
          <li>✓ <strong>Static analysis</strong> (reading code) can reveal secrets without running the program</li>
          <li>✓ Real malware often hides credentials and commands this exact way!</li>
          <li>✓ These techniques work on actual compiled binaries, not just examples</li>
        </ul>
      </div>

      <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6 border border-blue-500 border-opacity-30">
        <h4 className="text-blue-400 font-bold text-xl mb-3">🚀 Next Steps</h4>
        <p className="text-blue-300 mb-3">
          Want to practice more? Try these beginner-friendly platforms:
        </p>
        <ul className="text-blue-300 space-y-1 text-sm">
          <li>• <strong>PicoCTF:</strong> Free CTF challenges perfect for beginners</li>
          <li>• <strong>CrackMe challenges:</strong> Programs designed to be reverse engineered</li>
          <li>• <strong>Ghidra tutorials:</strong> Learn to use professional RE tools</li>
          <li>• <strong>YouTube:</strong> Search for "reverse engineering for beginners"</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordChallengeSection;
