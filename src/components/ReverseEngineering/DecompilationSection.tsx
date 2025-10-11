// Decompilation Section - Interactive decompiler and pattern recognition

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const DecompilationSection: React.FC = () => {
  const [decompilerInput, setDecompilerInput] = useState('binary');
  const [decompilerOutput, setDecompilerOutput] = useState('');
  const [codeExercise1, setCodeExercise1] = useState('');
  const [codeExercise1Result, setCodeExercise1Result] = useState('');
  const [asciiExercise, setAsciiExercise] = useState('');
  const [asciiResult, setAsciiResult] = useState('');

  const runDecompiler = () => {
    if (decompilerInput === 'binary') {
      setDecompilerOutput(`// Decompiled High-Level Code
function checkPassword(userInput) {
  let secretPassword = "cipher2025";
  
  // Check if lengths match
  if (userInput.length != secretPassword.length) {
    return false;
  }
  
  // Compare character by character
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] != secretPassword[i]) {
      return false;
    }
  }
  
  return true;
}

// Analysis: This function checks if the
// input matches "cipher2025" exactly!`);
    } else if (decompilerInput === 'obfuscated') {
      setDecompilerOutput(`// Deobfuscated Code
function calculateSum(numbers) {
  let total = 0;
  
  // Add each number to the total
  for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
  }
  
  return total;
}

// Analysis: This is a simple sum function
// that adds all numbers in an array.`);
    } else if (decompilerInput === 'xor') {
      setDecompilerOutput(`// Decompiled XOR Encryption
function decryptMessage(encrypted, key) {
  let decrypted = "";
  
  for (let i = 0; i < encrypted.length; i++) {
    // XOR each character with key
    let charCode = encrypted.charCodeAt(i);
    let keyCode = key.charCodeAt(i % key.length);
    let decryptedChar = charCode ^ keyCode;
    decrypted += String.fromCharCode(decryptedChar);
  }
  
  return decrypted;
}

// Analysis: Basic XOR cipher - easily reversible!
// Same operation encrypts AND decrypts.`);
    }
  };

  const checkCodeExercise1 = () => {
    const userAnswer = codeExercise1.trim().toLowerCase();
    if (userAnswer.includes('hello') && userAnswer.includes('world')) {
      setCodeExercise1Result('correct');
    } else {
      setCodeExercise1Result('incorrect');
    }
  };

  const checkAsciiExercise = () => {
    const userAnswer = asciiExercise.trim().toLowerCase();
    if (userAnswer === 'hack' || userAnswer === '"hack"') {
      setAsciiResult('correct');
    } else {
      setAsciiResult('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-purple">
        <h3 className="text-2xl font-bold text-atom-purple mb-4 flex items-center">
          <PlayIcon className="h-8 w-8 mr-3" />
          Understanding Decompilation
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          Decompilation is the process of taking compiled code and trying to convert it back into 
          something humans can read and understand. Think of it as "un-compiling" the code!
        </p>
        <p className="text-lg text-atom-fg-muted">
          Instead of showing raw assembly (which looks like gibberish), we'll use simplified 
          pseudocode that's much easier to understand for beginners!
        </p>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple border-opacity-30">
        <h4 className="text-atom-purple font-bold text-xl mb-4">🔬 Interactive Decompiler Simulator</h4>
        <p className="text-atom-fg-muted mb-4">
          Choose a compiled program and watch our simulated decompiler convert it back to readable code:
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-atom-blue font-bold mb-2">Choose a compiled program:</label>
            <select
              value={decompilerInput}
              onChange={(e) => {
                setDecompilerInput(e.target.value);
                setDecompilerOutput('');
              }}
              className="w-full bg-atom-bg border border-atom-blue rounded px-4 py-2 text-atom-fg"
            >
              <option value="binary">🔒 Password Checker (Binary)</option>
              <option value="obfuscated">🧮 Calculator Function (Obfuscated)</option>
              <option value="xor">🔐 XOR Encryption (Cipher)</option>
            </select>
          </div>

          <button
            onClick={runDecompiler}
            className="flex items-center space-x-2 px-6 py-3 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors font-bold"
          >
            <PlayIcon className="h-5 w-5" />
            <span>Run Decompiler</span>
          </button>

          {decompilerOutput && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h5 className="font-bold text-green-400 mb-2">✅ Decompiled Code:</h5>
              <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-green-400 overflow-x-auto">
                <pre>{decompilerOutput}</pre>
              </div>
              <div className="mt-3 bg-green-900 bg-opacity-20 p-4 rounded border border-green-500 border-opacity-30">
                <p className="text-green-300">
                  <strong>✨ Success!</strong> The decompiler converted binary machine code back into readable format! 
                  {decompilerInput === 'binary' && ' This program checks if the input matches "cipher2025"!'}
                  {decompilerInput === 'obfuscated' && ' This function adds up all numbers in an array!'}
                  {decompilerInput === 'xor' && ' This is a simple XOR cipher that can encrypt and decrypt!'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue border-opacity-30">
        <h4 className="text-atom-blue font-bold text-xl mb-4">🧩 Pattern Recognition Exercise #1</h4>
        <p className="text-atom-fg-muted mb-4">
          Analyze this decompiled code. What string do you think it's trying to create?
        </p>
        
        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-blue-400 mb-4 overflow-x-auto">
          <pre>{`function mysteryFunction() {
  let array = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
  let result = "";
  
  // Convert each number to a character
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  
  return result;
}

// 💡 Hint: These numbers are ASCII character codes!
// ASCII is a standard way to represent characters as numbers
// Example: 72 = 'H', 101 = 'e', 108 = 'l'`}</pre>
        </div>

        <div className="bg-yellow-900 bg-opacity-20 p-3 rounded border border-yellow-500 border-opacity-30 mb-4">
          <p className="text-yellow-300 text-sm">
            <strong>💡 Learning Tip:</strong> Storing text as ASCII numbers is a common way to hide strings 
            in compiled code. Security researchers often see this in malware trying to hide commands!
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-atom-blue font-bold">What string does this function return?</label>
          <input
            type="text"
            value={codeExercise1}
            onChange={(e) => setCodeExercise1(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full bg-atom-bg border border-atom-blue rounded px-4 py-2 text-atom-fg"
          />
          <button
            onClick={checkCodeExercise1}
            className="px-6 py-2 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors"
          >
            Check Answer
          </button>

          {codeExercise1Result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded ${
                codeExercise1Result === 'correct' 
                  ? 'bg-green-900 bg-opacity-20 border border-green-500' 
                  : 'bg-red-900 bg-opacity-20 border border-red-500'
              }`}
            >
              {codeExercise1Result === 'correct' ? (
                <div className="text-green-400">
                  <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Excellent work! 🎉</span>
                  <p className="text-sm mt-1">
                    The function converts ASCII codes [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100] 
                    to spell "Hello World"! This obfuscation technique is used to hide strings from 
                    simple text searches in binaries.
                  </p>
                </div>
              ) : (
                <div className="text-red-400">
                  <XCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Not quite!</span>
                  <p className="text-sm mt-1">
                    Try converting each number to its ASCII character: 72='H', 101='e', 108='l', 108='l', 111='o'...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-orange border-opacity-30">
        <h4 className="text-atom-orange font-bold text-xl mb-4">🎯 Pattern Recognition Exercise #2</h4>
        <p className="text-atom-fg-muted mb-4">
          Here's another common pattern. What does this decode to?
        </p>
        
        <div className="bg-black bg-opacity-40 p-4 rounded font-mono text-sm text-orange-400 mb-4 overflow-x-auto">
          <pre>{`function decodeSecret() {
  // Hex values that need decoding
  let hexValues = [0x68, 0x61, 0x63, 0x6B];
  let decoded = "";
  
  for (let i = 0; i < hexValues.length; i++) {
    decoded += String.fromCharCode(hexValues[i]);
  }
  
  return decoded;
}

// 💡 Hint: Convert hex to decimal first!
// 0x68 (hex) = 104 (decimal) = 'h' (ASCII)
// 0x61 (hex) = 97 (decimal) = 'a' (ASCII)`}</pre>
        </div>

        <div className="space-y-3">
          <label className="block text-atom-orange font-bold">What word does this decode to?</label>
          <input
            type="text"
            value={asciiExercise}
            onChange={(e) => setAsciiExercise(e.target.value)}
            placeholder="Your answer..."
            className="w-full bg-atom-bg border border-atom-orange rounded px-4 py-2 text-atom-fg"
          />
          <button
            onClick={checkAsciiExercise}
            className="px-6 py-2 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors"
          >
            Check Answer
          </button>

          {asciiResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded ${
                asciiResult === 'correct' 
                  ? 'bg-green-900 bg-opacity-20 border border-green-500' 
                  : 'bg-red-900 bg-opacity-20 border border-red-500'
              }`}
            >
              {asciiResult === 'correct' ? (
                <div className="text-green-400">
                  <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Perfect! 🎯</span>
                  <p className="text-sm mt-1">
                    The word is "hack"! You decoded: 0x68→'h', 0x61→'a', 0x63→'c', 0x6B→'k'. 
                    Hexadecimal encoding is super common in compiled programs!
                  </p>
                </div>
              ) : (
                <div className="text-red-400">
                  <XCircleIcon className="h-6 w-6 inline mr-2" />
                  <span className="font-bold">Try again!</span>
                  <p className="text-sm mt-1">
                    Convert each hex value to ASCII: 0x68=104='h', 0x61=97='a'...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-purple-900 bg-opacity-20 rounded-lg p-6 border border-purple-500 border-opacity-30">
        <h4 className="text-purple-400 font-bold text-xl mb-3">🎓 What You've Learned</h4>
        <ul className="space-y-2 text-purple-300">
          <li>• <strong>Decompilers</strong> convert machine code back to readable pseudocode</li>
          <li>• <strong>ASCII encoding</strong> is used to hide strings as numeric arrays</li>
          <li>• <strong>Hexadecimal values</strong> are another common way to obfuscate data</li>
          <li>• <strong>Pattern recognition</strong> helps identify what obfuscated code really does</li>
          <li>• These techniques work even if you don't understand assembly language!</li>
        </ul>
      </div>

      <div className="bg-yellow-900 bg-opacity-20 rounded-lg p-6 border border-yellow-500 border-opacity-30">
        <h4 className="text-yellow-400 font-bold text-xl mb-3">💡 Key Takeaway</h4>
        <p className="text-yellow-300 text-lg">
          Decompilers are powerful tools that translate machine code back to human-readable format. 
          While they're not perfect, they give us a huge head start in understanding what compiled 
          programs do—no assembly language required!
        </p>
      </div>
    </div>
  );
};

export default DecompilationSection;
