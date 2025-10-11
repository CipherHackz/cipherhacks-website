// Introduction Section - What is Reverse Engineering?

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const IntroSection: React.FC = () => {
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const checkQuiz = () => setQuizSubmitted(true);
  const quizCorrect = quizAnswer === 'b';

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-blue">
        <h3 className="text-2xl font-bold text-atom-blue mb-4 flex items-center">
          <BookOpenIcon className="h-8 w-8 mr-3" />
          What is Reverse Engineering?
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          Imagine you have a locked treasure chest, but no key. Reverse engineering is like being a detective 
          who figures out how the lock works by carefully examining it—without having the original blueprints!
        </p>
        <p className="text-lg text-atom-fg-muted mb-4">
          In cybersecurity, we analyze compiled programs (code that's already been turned into machine language) 
          to understand what they do—even without having the original source code.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 border border-green-500 border-opacity-30">
          <h4 className="text-green-400 font-bold text-xl mb-3">✅ Why It's Useful</h4>
          <ul className="space-y-2 text-green-300">
            <li>🔍 <strong>Finding vulnerabilities</strong> in software before hackers do</li>
            <li>🛡️ <strong>Understanding malware</strong> to protect against it</li>
            <li>🔓 <strong>Analyzing file formats</strong> and protocols</li>
            <li>🎮 <strong>Modding games</strong> and customizing software</li>
            <li>🏆 <strong>Solving CTF challenges</strong> in competitions</li>
            <li>🔬 <strong>Security research</strong> and auditing</li>
          </ul>
        </div>

        <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6 border border-blue-500 border-opacity-30">
          <h4 className="text-blue-400 font-bold text-xl mb-3">🛠️ Common Tools</h4>
          <ul className="space-y-2 text-blue-300">
            <li><strong>Ghidra:</strong> Free decompiler by NSA (great for beginners!)</li>
            <li><strong>IDA Pro:</strong> Professional disassembler</li>
            <li><strong>x64dbg:</strong> Debugger for Windows programs</li>
            <li><strong>GDB:</strong> GNU debugger for Linux</li>
            <li><strong>Binary Ninja:</strong> Modern reverse engineering platform</li>
            <li><strong>Hopper:</strong> Disassembler for macOS</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-900 bg-opacity-20 rounded-lg p-6 border border-yellow-500 border-opacity-30">
        <h4 className="text-yellow-400 font-bold text-xl mb-3">💡 Key Concept</h4>
        <p className="text-yellow-300 text-lg">
          Think of reverse engineering as translating from a language you don't know well (machine code) 
          back to a language you do know (like Python or JavaScript). We're not creating new code—we're 
          understanding and analyzing existing code to discover how it works!
        </p>
      </div>

      <div className="bg-purple-900 bg-opacity-20 rounded-lg p-6 border border-purple-500 border-opacity-30">
        <h4 className="text-purple-400 font-bold text-xl mb-3">🎯 Real-World Example</h4>
        <p className="text-purple-300 mb-3">
          Imagine a video game has a "premium currency" system. Through reverse engineering, security 
          researchers could:
        </p>
        <ul className="text-purple-300 space-y-2">
          <li>1. <strong>Analyze</strong> how the game validates purchases</li>
          <li>2. <strong>Discover</strong> if there are vulnerabilities in the payment system</li>
          <li>3. <strong>Report</strong> security issues to the developers</li>
          <li>4. <strong>Help</strong> make the game more secure for everyone!</li>
        </ul>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue border-opacity-30">
        <h4 className="text-atom-blue font-bold text-xl mb-4">📝 Quick Knowledge Check</h4>
        <p className="text-atom-fg-muted mb-4">
          What is the main goal of reverse engineering in cybersecurity?
        </p>
        <div className="space-y-3">
          {[
            { value: 'a', text: 'Writing brand new programs from scratch' },
            { value: 'b', text: 'Understanding how existing compiled code works without source code' },
            { value: 'c', text: 'Deleting viruses from infected computers' },
            { value: 'd', text: 'Building physical hardware components' }
          ].map(option => (
            <label key={option.value} className="flex items-center space-x-3 p-3 bg-atom-bg rounded hover:bg-opacity-70 cursor-pointer transition-colors">
              <input
                type="radio"
                name="quiz1"
                value={option.value}
                checked={quizAnswer === option.value}
                onChange={(e) => setQuizAnswer(e.target.value)}
                className="text-atom-blue w-4 h-4"
              />
              <span className="text-atom-fg">{option.value.toUpperCase()}) {option.text}</span>
            </label>
          ))}
        </div>
        <button
          onClick={checkQuiz}
          disabled={!quizAnswer}
          className="mt-4 px-6 py-2 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
        {quizSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded ${quizCorrect ? 'bg-green-900 bg-opacity-20 border border-green-500' : 'bg-red-900 bg-opacity-20 border border-red-500'}`}
          >
            {quizCorrect ? (
              <div className="flex items-start space-x-2 text-green-400">
                <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                <div>
                  <span className="font-bold">Correct! 🎉</span>
                  <p className="text-sm mt-1">
                    Reverse engineering is all about understanding existing compiled code when you don't have 
                    access to the original source. It's a crucial skill for security researchers!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-2 text-red-400">
                <XCircleIcon className="h-6 w-6 flex-shrink-0" />
                <div>
                  <span className="font-bold">Not quite!</span>
                  <p className="text-sm mt-1">
                    The answer is B. Reverse engineering is about analyzing and understanding existing 
                    compiled code, not writing new programs or fixing infections.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
