// Compilation Process Section - Understanding how code becomes a program

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const CompilationSection: React.FC = () => {
  const [quiz2Answer, setQuiz2Answer] = useState<string[]>([]);
  const [quiz2Submitted, setQuiz2Submitted] = useState(false);

  const checkQuiz2 = () => setQuiz2Submitted(true);

  const toggleAnswer = (value: string) => {
    if (quiz2Answer.includes(value)) {
      setQuiz2Answer(quiz2Answer.filter(v => v !== value));
    } else {
      setQuiz2Answer([...quiz2Answer, value]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-green">
        <h3 className="text-2xl font-bold text-atom-green mb-4 flex items-center">
          <CodeBracketIcon className="h-8 w-8 mr-3" />
          Understanding the Compilation Process
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          Before we can reverse engineer code, we need to understand how human-readable code 
          becomes a compiled program. Let's follow the journey!
        </p>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue border-opacity-30">
        <h4 className="text-atom-blue font-bold text-xl mb-4">📚 The Journey of Code</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-900 bg-opacity-10 rounded-lg border-l-4 border-atom-blue">
            <div className="bg-atom-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div className="flex-1">
              <h5 className="font-bold text-atom-blue text-lg">Source Code (High-Level)</h5>
              <p className="text-atom-fg-muted mb-2">Human-readable code written by developers</p>
              <div className="bg-black bg-opacity-30 p-3 rounded font-mono text-sm text-green-400 overflow-x-auto">
                <pre>{`function greet(name) {
  // This is easy to read!
  return "Hello, " + name + "!";
}`}</pre>
              </div>
              <p className="text-sm text-blue-300 mt-2">
                ✅ Clear variable names, comments, readable structure
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-3xl text-atom-blue animate-pulse">↓</div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-purple-900 bg-opacity-10 rounded-lg border-l-4 border-atom-purple">
            <div className="bg-atom-purple text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div className="flex-1">
              <h5 className="font-bold text-atom-purple text-lg">Compiler/Interpreter Processing</h5>
              <p className="text-atom-fg-muted mb-2">Translates code into machine-readable format</p>
              <p className="text-sm text-purple-300">
                🔧 Tools: GCC, Clang, MSVC, Python interpreter, JVM
              </p>
              <div className="mt-2 bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-500 border-opacity-30">
                <p className="text-yellow-300 text-sm">
                  <strong>During compilation:</strong> Comments removed, variables renamed, code optimized for speed
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-3xl text-atom-purple animate-pulse">↓</div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-orange-900 bg-opacity-10 rounded-lg border-l-4 border-atom-orange">
            <div className="bg-atom-orange text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div className="flex-1">
              <h5 className="font-bold text-atom-orange text-lg">Machine Code / Binary</h5>
              <p className="text-atom-fg-muted mb-2">Binary instructions the computer executes directly</p>
              <div className="bg-black bg-opacity-30 p-3 rounded font-mono text-sm text-orange-400 overflow-x-auto">
                <pre>{`01001000 01100101 01101100 01101100
01101111 00101100 00100000 01110111
(Simplified binary representation)`}</pre>
              </div>
              <p className="text-sm text-orange-300 mt-2">
                ❌ Not human-readable! All context lost.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-3xl text-red-500">⚡ REVERSE! ⚡</div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-red-900 bg-opacity-10 rounded-lg border-l-4 border-red-500">
            <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
            <div className="flex-1">
              <h5 className="font-bold text-red-400 text-lg">Reverse Engineering Challenge!</h5>
              <p className="text-atom-fg-muted mb-2">
                We try to go backwards: machine code → understanding what it does
              </p>
              <p className="text-sm text-red-300">
                🔍 <strong>The Challenge:</strong> Original variable names, comments, and structure are gone forever!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-900 bg-opacity-20 rounded-lg p-6 border border-yellow-500 border-opacity-30">
        <h4 className="text-yellow-400 font-bold text-xl mb-3">💡 Why Is Reverse Engineering Hard?</h4>
        <ul className="space-y-2 text-yellow-300">
          <li>• <strong>Lost Information:</strong> "userAge" becomes "var_1" or memory address "0x12345"</li>
          <li>• <strong>Compiler Optimizations:</strong> Code is rearranged and combined for efficiency</li>
          <li>• <strong>Obfuscation:</strong> Some programs are intentionally made confusing</li>
          <li>• <strong>No Comments:</strong> All explanations and documentation are stripped away</li>
          <li>• <strong>Different Languages:</strong> Assembly/machine code looks nothing like Python or JavaScript</li>
        </ul>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-green border-opacity-30">
        <h4 className="text-atom-green font-bold text-xl mb-4">🎮 Interactive Demo: Code Transformation</h4>
        <p className="text-atom-fg-muted mb-4">
          See how readable code becomes harder to understand after compilation:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-900 bg-opacity-10 p-4 rounded-lg border border-green-500 border-opacity-30">
            <h5 className="font-bold text-green-400 mb-2 flex items-center">
              <span className="text-2xl mr-2">😊</span> Original Source Code
            </h5>
            <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-green-400 overflow-x-auto">
              <pre>{`function checkAge(userAge) {
  // Minimum age requirement
  const minimumAge = 18;
  
  // Check if user is old enough
  if (userAge >= minimumAge) {
    return "Access granted";
  } else {
    return "Access denied";
  }
}`}</pre>
            </div>
            <div className="mt-2 text-sm text-green-300">
              ✨ Clear names, helpful comments, easy logic flow
            </div>
          </div>
          
          <div className="bg-orange-900 bg-opacity-10 p-4 rounded-lg border border-orange-500 border-opacity-30">
            <h5 className="font-bold text-orange-400 mb-2 flex items-center">
              <span className="text-2xl mr-2">😵</span> After Compilation
            </h5>
            <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-orange-400 overflow-x-auto">
              <pre>{`function_0x1000(var_1) {
  var_2 = 18;
  
  if (var_1 >= var_2) {
    return mem[0x2000];
  } else {
    return mem[0x2010];
  }
}`}</pre>
            </div>
            <div className="mt-2 text-sm text-orange-300">
              ⚠️ Generic names, no comments, memory addresses instead of strings
            </div>
          </div>
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple border-opacity-30">
        <h4 className="text-atom-purple font-bold text-xl mb-4">🧪 Activity: Spot What's Lost in Compilation</h4>
        <p className="text-atom-fg-muted mb-4">
          Looking at the code comparison above, what information was lost during compilation? 
          (Select all that apply)
        </p>
        <div className="space-y-2">
          {[
            { value: 'a', text: 'Descriptive variable names (userAge, minimumAge)', correct: true },
            { value: 'b', text: 'The if/else logic and comparison operators', correct: false },
            { value: 'c', text: 'Helpful comments explaining the code', correct: true },
            { value: 'd', text: 'The actual number 18 used for comparison', correct: false },
            { value: 'e', text: 'Readable string messages ("Access granted", "Access denied")', correct: true },
            { value: 'f', text: 'The function itself completely disappears', correct: false }
          ].map(option => (
            <label 
              key={option.value} 
              className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                quiz2Answer.includes(option.value) 
                  ? 'bg-atom-purple bg-opacity-20 border-2 border-atom-purple' 
                  : 'bg-atom-bg border-2 border-transparent hover:bg-opacity-70'
              }`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={quiz2Answer.includes(option.value)}
                onChange={() => toggleAnswer(option.value)}
                className="text-atom-purple w-4 h-4"
              />
              <span className="text-atom-fg">{option.text}</span>
            </label>
          ))}
        </div>
        <button
          onClick={checkQuiz2}
          disabled={quiz2Answer.length === 0}
          className="mt-4 px-6 py-2 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check My Answers
        </button>
        {quiz2Submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded bg-blue-900 bg-opacity-20 border border-blue-500"
          >
            <p className="text-blue-300 mb-2">
              <strong>✅ Correct answers: A, C, and E</strong>
            </p>
            <ul className="text-blue-300 text-sm space-y-1">
              <li>• Variable names → replaced with generic names or memory addresses</li>
              <li>• Comments → completely removed (they're for humans, not machines)</li>
              <li>• String messages → stored as memory addresses</li>
              <li>• The logic, operators, and values are preserved (the computer needs those!)</li>
            </ul>
            <p className="text-blue-400 mt-3 font-bold">
              You selected: {quiz2Answer.length === 0 ? 'none' : quiz2Answer.map(a => a.toUpperCase()).join(', ')}
            </p>
          </motion.div>
        )}
      </div>

      <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 border border-green-500 border-opacity-30">
        <h4 className="text-green-400 font-bold text-xl mb-3">🎯 Key Takeaway</h4>
        <p className="text-green-300 text-lg">
          When code is compiled, it loses all the "human-friendly" parts (names, comments, structure) 
          but keeps the actual logic and functionality. Our job as reverse engineers is to piece together 
          what the code does by analyzing that remaining logic!
        </p>
      </div>
    </div>
  );
};

export default CompilationSection;
