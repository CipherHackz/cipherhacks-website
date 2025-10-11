// AI Security Introduction - Understanding AI vulnerabilities

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CpuChipIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const IntroSection: React.FC = () => {
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [vulnerabilityMatch, setVulnerabilityMatch] = useState<Record<string, string>>({});
  const [matchSubmitted, setMatchSubmitted] = useState(false);

  const checkQuiz = () => setQuizSubmitted(true);
  const quizCorrect = quizAnswer === 'c';

  const vulnerabilities = [
    { attack: 'Prompt Injection', defense: 'Input validation' },
    { attack: 'Data Poisoning', defense: 'Training data verification' },
    { attack: 'Model Theft', defense: 'API rate limiting' },
    { attack: 'Evasion Attack', defense: 'Adversarial training' }
  ];

  const checkMatch = () => setMatchSubmitted(true);

  const allMatchCorrect = 
    vulnerabilityMatch['Prompt Injection'] === 'Input validation' &&
    vulnerabilityMatch['Data Poisoning'] === 'Training data verification' &&
    vulnerabilityMatch['Model Theft'] === 'API rate limiting' &&
    vulnerabilityMatch['Evasion Attack'] === 'Adversarial training';

  return (
    <div className="space-y-6">
      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-purple">
        <h3 className="text-2xl font-bold text-atom-purple mb-4 flex items-center">
          <CpuChipIcon className="h-8 w-8 mr-3" />
          What is AI Security?
        </h3>
        <p className="text-lg text-atom-fg-muted mb-4">
          As AI systems become more powerful and widespread, they also become attractive targets for 
          attackers. AI security focuses on protecting AI models from manipulation, theft, and misuse—while 
          also preventing AI from being weaponized for attacks!
        </p>
        <div className="bg-blue-900 bg-opacity-20 p-4 rounded border border-blue-500 border-opacity-30">
          <p className="text-blue-300 text-sm">
            <strong>💡 Real World:</strong> In 2023, researchers demonstrated how simple prompt 
            injections could trick ChatGPT into revealing confidential information or generating 
            malicious code. AI security is more critical than ever!
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-900 bg-opacity-20 rounded-lg p-6 border border-red-500 border-opacity-30">
          <h4 className="text-red-400 font-bold text-xl mb-3">⚠️ AI Threat Landscape</h4>
          <ul className="space-y-2 text-red-300 text-sm">
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>🎯 Prompt Injection:</strong> Manipulating AI inputs to bypass safety filters
            </li>
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>🔓 Jailbreaking:</strong> Forcing AI to ignore ethical guidelines
            </li>
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>💉 Data Poisoning:</strong> Corrupting training data to manipulate behavior
            </li>
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>🕵️ Model Extraction:</strong> Stealing proprietary AI models through queries
            </li>
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>👻 Adversarial Examples:</strong> Crafted inputs that fool AI classifiers
            </li>
            <li className="p-2 bg-red-900 bg-opacity-20 rounded">
              <strong>📤 Data Leakage:</strong> AI revealing sensitive training data
            </li>
          </ul>
        </div>

        <div className="bg-green-900 bg-opacity-20 rounded-lg p-6 border border-green-500 border-opacity-30">
          <h4 className="text-green-400 font-bold text-xl mb-3">🛡️ Defense Strategies</h4>
          <ul className="space-y-2 text-green-300 text-sm">
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>✅ Input Validation:</strong> Filter and sanitize all user inputs
            </li>
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>🔒 Output Filtering:</strong> Scan responses for sensitive information
            </li>
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>🎯 Context Isolation:</strong> Separate system prompts from user inputs
            </li>
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>📊 Monitoring & Logging:</strong> Track unusual behavior patterns
            </li>
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>⚡ Rate Limiting:</strong> Prevent model extraction attempts
            </li>
            <li className="p-2 bg-green-900 bg-opacity-20 rounded">
              <strong>🧪 Adversarial Training:</strong> Train models to resist attacks
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-900 bg-opacity-20 rounded-lg p-6 border border-purple-500 border-opacity-30">
        <h4 className="text-purple-400 font-bold text-xl mb-3">🌍 Why AI Security Matters</h4>
        <div className="grid md:grid-cols-2 gap-4 text-purple-300 text-sm">
          <div>
            <p className="font-bold mb-2">Business Impact:</p>
            <ul className="space-y-1">
              <li>• Protect proprietary AI models (worth millions)</li>
              <li>• Prevent data breaches through AI leaks</li>
              <li>• Maintain customer trust and compliance</li>
              <li>• Avoid legal liability from AI failures</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-2">Societal Impact:</p>
            <ul className="space-y-1">
              <li>• Prevent AI-powered misinformation</li>
              <li>• Stop automated fraud and scams</li>
              <li>• Ensure AI fairness and ethics</li>
              <li>• Protect critical infrastructure</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue border-opacity-30">
        <h4 className="text-atom-blue font-bold text-xl mb-4">🎮 Interactive: Match Attack to Defense</h4>
        <p className="text-atom-fg-muted mb-4">
          Match each AI attack type to its primary defense mechanism:
        </p>
        
        <div className="space-y-3">
          {vulnerabilities.map(vuln => (
            <div key={vuln.attack} className="bg-atom-bg bg-opacity-50 p-4 rounded border border-atom-blue border-opacity-30">
              <p className="text-atom-fg font-bold mb-2">Attack: {vuln.attack}</p>
              <div className="flex gap-2 flex-wrap">
                {['Input validation', 'Training data verification', 'API rate limiting', 'Adversarial training'].map(defense => (
                  <label 
                    key={defense}
                    className={`px-3 py-1 rounded cursor-pointer text-sm transition-colors ${
                      vulnerabilityMatch[vuln.attack] === defense
                        ? 'bg-atom-blue text-white'
                        : 'bg-atom-bg text-atom-fg hover:bg-opacity-70'
                    }`}
                  >
                    <input
                      type="radio"
                      name={vuln.attack}
                      value={defense}
                      checked={vulnerabilityMatch[vuln.attack] === defense}
                      onChange={(e) => setVulnerabilityMatch({...vulnerabilityMatch, [vuln.attack]: e.target.value})}
                      className="sr-only"
                    />
                    {defense}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={checkMatch}
          disabled={Object.keys(vulnerabilityMatch).length < 4}
          className="mt-4 px-6 py-2 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50"
        >
          Check Matches
        </button>

        {matchSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded ${allMatchCorrect ? 'bg-green-900 bg-opacity-20 border border-green-500' : 'bg-yellow-900 bg-opacity-20 border border-yellow-500'}`}
          >
            {allMatchCorrect ? (
              <div className="text-green-400">
                <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                <span className="font-bold">Perfect! 🎉</span>
                <p className="text-sm mt-1">You correctly matched all attacks to their defenses!</p>
              </div>
            ) : (
              <div className="text-yellow-300">
                <span className="font-bold">Review the matches:</span>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Prompt Injection → Input validation (filter malicious inputs)</li>
                  <li>• Data Poisoning → Training data verification (ensure clean data)</li>
                  <li>• Model Theft → API rate limiting (prevent extraction)</li>
                  <li>• Evasion Attack → Adversarial training (strengthen model)</li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple border-opacity-30">
        <h4 className="text-atom-purple font-bold text-xl mb-4">📝 Knowledge Check</h4>
        <p className="text-atom-fg-muted mb-4">
          What makes AI systems particularly vulnerable to security attacks?
        </p>
        <div className="space-y-3">
          {[
            { value: 'a', text: 'AI is always connected to the internet' },
            { value: 'b', text: 'AI models are written in insecure programming languages' },
            { value: 'c', text: 'AI learns from data which can be manipulated, and responds to natural language which is hard to validate' },
            { value: 'd', text: 'AI systems have no security features at all' }
          ].map(option => (
            <label key={option.value} className="flex items-center space-x-3 p-3 bg-atom-bg rounded hover:bg-opacity-70 cursor-pointer">
              <input
                type="radio"
                name="quiz1"
                value={option.value}
                checked={quizAnswer === option.value}
                onChange={(e) => setQuizAnswer(e.target.value)}
                className="text-atom-purple w-4 h-4"
              />
              <span className="text-atom-fg">{option.value.toUpperCase()}) {option.text}</span>
            </label>
          ))}
        </div>
        <button
          onClick={checkQuiz}
          disabled={!quizAnswer}
          className="mt-4 px-6 py-2 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50"
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
              <div className="text-green-400">
                <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                <span className="font-bold">Correct! 🎉</span>
                <p className="text-sm mt-1">
                  AI's unique vulnerabilities come from its data-driven nature and natural language 
                  interface, making it susceptible to manipulation through both training data and user inputs!
                </p>
              </div>
            ) : (
              <div className="text-red-400">
                <XCircleIcon className="h-6 w-6 inline mr-2" />
                <span className="font-bold">Not quite!</span>
                <p className="text-sm mt-1">The answer is C. AI's core vulnerabilities stem from learning from potentially malicious data and accepting natural language inputs.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6 border border-blue-500 border-opacity-30">
        <h4 className="text-blue-400 font-bold text-xl mb-3">🚀 Career in AI Security</h4>
        <p className="text-blue-300 mb-3">
          AI security is one of the fastest-growing fields in cybersecurity:
        </p>
        <div className="grid md:grid-cols-2 gap-3 text-blue-300 text-sm">
          <div>• AI Security Researcher</div>
          <div>• ML Security Engineer</div>
          <div>• Red Team AI Specialist</div>
          <div>• AI Ethics & Safety Officer</div>
          <div>• Adversarial ML Expert</div>
          <div>• AI Policy & Compliance</div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
