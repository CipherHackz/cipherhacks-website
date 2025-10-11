// Control Flow Analysis Section - Understanding program logic

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const ControlFlowSection: React.FC = () => {
  const [flowAnalysisAnswer, setFlowAnalysisAnswer] = useState<string[]>([]);
  const [flowAnalysisSubmitted, setFlowAnalysisSubmitted] = useState(false);
  const [obfuscationExercise, setObfuscationExercise] = useState('');
  const [obfuscationResult, setObfuscationResult] = useState('');
  const [logicPuzzle, setLogicPuzzle] = useState('');
  const [logicResult, setLogicResult] = useState('');

  const toggleFlowStep = (step: string) => {
    if (flowAnalysisAnswer.includes(step)) {
      setFlowAnalysisAnswer(flowAnalysisAnswer.filter(s => s !== step));
    } else {
      setFlowAnalysisAnswer([...flowAnalysisAnswer, step]);
    }
  };

  const checkFlowAnalysis = () => setFlowAnalysisSubmitted(true);

  const flowAnalysisCorrect = 
    flowAnalysisAnswer.includes('step1') &&
    flowAnalysisAnswer.includes('step2') &&
    flowAnalysisAnswer.includes('step4') &&
    flowAnalysisAnswer.includes('step6') &&
    !flowAnalysisAnswer.includes('step3') &&
    !flowAnalysisAnswer.includes('step5');

  const checkObfuscation = () => {
    const answer = obfuscationExercise.trim().toLowerCase();
    if (answer === 'secret_flag' || answer === 'secretflag' || answer === 'secret flag') {
      setObfuscationResult('correct');
    } else {
      setObfuscationResult('incorrect');
    }
  };

  const checkLogicPuzzle = () => {
    const answer = logicPuzzle.trim().toLowerCase();
    if (answer === 'admin' || answer === '"admin"') {
      setLogicResult('correct');
    } else {
      setLogicResult('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-green">
        <h3 className="text-2xl font-bold text-atom-green mb-4 flex items-center">
          <ArrowPathIcon className="h-8 w-8 mr-3" />
          Control Flow Analysis
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          Control flow is how a program moves from one instruction to the next. Understanding 
          control flow helps you trace what a program does step-by-step, which is crucial 
          for finding vulnerabilities or understanding malware behavior!
        </p>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue border-opacity-30">
        <h4 className="text-atom-blue font-bold text-xl mb-4">🎯 Interactive Exercise: Trace the Execution</h4>
        <p className="text-atom-fg-muted mb-4">
          Given this decompiled function with input value <code className="bg-black bg-opacity-40 px-2 py-1 rounded text-blue-400">userAge = 25</code>, 
          which steps will actually execute? Select all that run:
        </p>

        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-cyan-400 mb-4 overflow-x-auto">
          <pre>{`function checkAccess(userAge) {
  console.log("Step 1: Function started");        // ALWAYS runs
  
  if (userAge >= 18) {
    console.log("Step 2: Adult access granted");  // Runs if age >= 18
  } else {
    console.log("Step 3: Minor, access denied");  // Runs if age < 18
  }
  
  if (userAge >= 21) {
    console.log("Step 4: Premium features unlocked"); // Runs if age >= 21
  } else {
    console.log("Step 5: Premium locked");        // Runs if age < 21
  }
  
  console.log("Step 6: Function complete");       // ALWAYS runs
  
  return true;
}

// Called with: checkAccess(25)`}</pre>
        </div>

        <div className="bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-500 border-opacity-30 mb-4">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Remember:</strong> userAge = 25. Trace through each if/else condition carefully!
          </p>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { value: 'step1', text: 'Step 1: Function started' },
            { value: 'step2', text: 'Step 2: Adult access granted' },
            { value: 'step3', text: 'Step 3: Minor, access denied' },
            { value: 'step4', text: 'Step 4: Premium features unlocked' },
            { value: 'step5', text: 'Step 5: Premium locked' },
            { value: 'step6', text: 'Step 6: Function complete' }
          ].map(option => (
            <label
              key={option.value}
              className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                flowAnalysisAnswer.includes(option.value)
                  ? 'bg-atom-blue bg-opacity-20 border-2 border-atom-blue'
                  : 'bg-atom-bg border-2 border-transparent hover:bg-opacity-70'
              }`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={flowAnalysisAnswer.includes(option.value)}
                onChange={() => toggleFlowStep(option.value)}
                className="text-atom-blue w-4 h-4"
              />
              <span className="text-atom-fg">{option.text}</span>
            </label>
          ))}
        </div>

        <button
          onClick={checkFlowAnalysis}
          disabled={flowAnalysisAnswer.length === 0}
          className="px-6 py-2 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check My Analysis
        </button>

        {flowAnalysisSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded ${
              flowAnalysisCorrect
                ? 'bg-green-900 bg-opacity-20 border border-green-500'
                : 'bg-red-900 bg-opacity-20 border border-red-500'
            }`}
          >
            {flowAnalysisCorrect ? (
              <div className="text-green-400">
                <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                <span className="font-bold">Perfect trace! 🎉</span>
                <p className="text-sm mt-2">
                  With userAge = 25:<br/>
                  • Step 1 runs (always)<br/>
                  • Step 2 runs (25 ≥ 18 ✓)<br/>
                  • Step 3 skipped (else branch)<br/>
                  • Step 4 runs (25 ≥ 21 ✓)<br/>
                  • Step 5 skipped (else branch)<br/>
                  • Step 6 runs (always)
                </p>
              </div>
            ) : (
              <div className="text-red-400">
                <XCircleIcon className="h-6 w-6 inline mr-2" />
                <span className="font-bold">Not quite!</span>
                <p className="text-sm mt-1">
                  Since userAge = 25: it's ≥18 (adult) AND ≥21 (premium). 
                  Both if conditions are true, so their else branches don't run.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple border-opacity-30">
        <h4 className="text-atom-purple font-bold text-xl mb-4">🧩 De-obfuscation Challenge</h4>
        <p className="text-atom-fg-muted mb-4">
          Malware often obfuscates strings to hide their purpose. Can you figure out what this reveals?
        </p>

        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-purple-400 mb-4 overflow-x-auto">
          <pre>{`function revealSecret() {
  // String split into parts to avoid detection
  let part_a = String.fromCharCode(115, 101, 99, 114, 101, 116);
  let separator = "_";
  let part_b = String.fromCharCode(102, 108, 97, 103);
  
  // Reconstruct the hidden string
  let hiddenValue = part_a + separator + part_b;
  
  return hiddenValue;
}

// Hint: 115='s', 101='e', 99='c', 114='r', 101='e', 116='t'
// Hint: 102='f', 108='l', 97='a', 103='g'`}</pre>
        </div>

        <div className="space-y-3">
          <label className="block text-atom-purple font-bold">What string does this reveal?</label>
          <input
            type="text"
            value={obfuscationExercise}
            onChange={(e) => setObfuscationExercise(e.target.value)}
            placeholder="Your answer..."
            className="w-full bg-atom-bg border border-atom-purple rounded px-4 py-2 text-atom-fg"
          />
          <button
            onClick={checkObfuscation}
            className="px-6 py-2 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors"
          >
            Submit
          </button>

          {obfuscationResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded ${
                obfuscationResult === 'correct'
                  ? 'bg-green-900 bg-opacity-20 border border-green-500'
                  : 'bg-red-900 bg-opacity-20 border border-red-500'
              }`}
            >
              {obfuscationResult === 'correct' ? (
                <div className="text-green-400">
                  <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Excellent! 🏆</span>
                  <p className="text-sm mt-1">
                    The function reveals "secret_flag"! Malware uses this technique to hide 
                    malicious commands, URLs, or credentials from simple string searches.
                  </p>
                </div>
              ) : (
                <div className="text-red-400">
                  <XCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Try again!</span>
                  <p className="text-sm mt-1">
                    Convert each set of numbers to letters, then combine: part_a + "_" + part_b
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-orange border-opacity-30">
        <h4 className="text-atom-orange font-bold text-xl mb-4">🔐 Logic Puzzle: Authentication Bypass</h4>
        <p className="text-atom-fg-muted mb-4">
          Study this flawed authentication code. What username would bypass the security check?
        </p>

        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-orange-400 mb-4 overflow-x-auto">
          <pre>{`function authenticate(username, password) {
  let isAdmin = false;
  
  // Check username
  if (username.length > 0) {
    if (username === "admin") {
      isAdmin = true;
    }
  }
  
  // Flawed logic: only checks password if NOT admin
  if (!isAdmin) {
    if (password !== "secret123") {
      return "ACCESS DENIED";
    }
  }
  
  // If we reach here, access granted!
  return "ACCESS GRANTED";
}

// Question: What username lets you in WITHOUT
// knowing the password?`}</pre>
        </div>

        <div className="bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-500 border-opacity-30 mb-4">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Hint:</strong> Look carefully at the logic flow. When is the password check skipped?
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-atom-orange font-bold">What username bypasses authentication?</label>
          <input
            type="text"
            value={logicPuzzle}
            onChange={(e) => setLogicPuzzle(e.target.value)}
            placeholder="Your answer..."
            className="w-full bg-atom-bg border border-atom-orange rounded px-4 py-2 text-atom-fg"
          />
          <button
            onClick={checkLogicPuzzle}
            className="px-6 py-2 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors"
          >
            Test Answer
          </button>

          {logicResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded ${
                logicResult === 'correct'
                  ? 'bg-green-900 bg-opacity-20 border border-green-500'
                  : 'bg-red-900 bg-opacity-20 border border-red-500'
              }`}
            >
              {logicResult === 'correct' ? (
                <div className="text-green-400">
                  <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">You found the vulnerability! 🎯</span>
                  <p className="text-sm mt-2">
                    Username "admin" sets isAdmin=true, which causes the password check to be skipped 
                    entirely! This is a classic authentication bypass bug. The code grants access to 
                    anyone using "admin" as a username, regardless of password.
                  </p>
                  <div className="mt-3 bg-black bg-opacity-30 p-3 rounded">
                    <p className="text-green-300 text-xs">
                      <strong>Lesson:</strong> Always validate credentials properly. This type of 
                      logic flaw is exactly what reverse engineers look for!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-red-400">
                  <XCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Not the right username!</span>
                  <p className="text-sm mt-1">
                    Think about what makes isAdmin = true. When isAdmin is true, the password 
                    check inside if(!isAdmin) is skipped...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-purple-900 bg-opacity-20 rounded-lg p-6 border border-purple-500 border-opacity-30">
        <h4 className="text-purple-400 font-bold text-xl mb-3">🎓 Control Flow Analysis Skills</h4>
        <p className="text-purple-300 mb-3">
          You've learned to:
        </p>
        <ul className="space-y-2 text-purple-300">
          <li>✓ <strong>Trace execution paths</strong> through if/else branches</li>
          <li>✓ <strong>Identify logic flaws</strong> in authentication code</li>
          <li>✓ <strong>De-obfuscate strings</strong> hidden in compiled binaries</li>
          <li>✓ <strong>Recognize patterns</strong> that indicate vulnerabilities</li>
          <li>✓ <strong>Think like an attacker</strong> to find security weaknesses</li>
        </ul>
      </div>

      <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 border border-green-500 border-opacity-30">
        <h4 className="text-green-400 font-bold text-xl mb-3">🚀 Real-World Applications</h4>
        <p className="text-green-300 mb-3">
          These control flow analysis skills are used for:
        </p>
        <ul className="space-y-1 text-green-300 text-sm">
          <li>• <strong>Malware analysis:</strong> Understanding what malicious code does</li>
          <li>• <strong>Vulnerability research:</strong> Finding bugs in software</li>
          <li>• <strong>Exploit development:</strong> Creating security tools</li>
          <li>• <strong>CTF competitions:</strong> Solving reverse engineering challenges</li>
          <li>• <strong>Security audits:</strong> Verifying code behaves correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlFlowSection;
