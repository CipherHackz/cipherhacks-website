// Advanced Cybersecurity Workshop - Main Slides & Navigation
// 50-minute workshop covering reverse engineering, malware analysis, and AI security

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  BugAntIcon,
  CpuChipIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const AdvancedCyberWorkshop: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "🧩 Advanced Cybersecurity Workshop",
      subtitle: "CipherHacks 2025",
      content: (
        <div className="space-y-6">
          <p className="text-2xl text-atom-fg-muted">
            Welcome to the Advanced Cybersecurity Workshop!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-blue">
              <CodeBracketIcon className="h-12 w-12 text-atom-blue mb-4" />
              <h3 className="text-xl font-bold text-atom-blue mb-2">Reverse Engineering</h3>
              <p className="text-atom-fg-muted">Analyze binaries, understand assembly, and decode obfuscated code</p>
            </div>
            <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-orange">
              <BugAntIcon className="h-12 w-12 text-atom-orange mb-4" />
              <h3 className="text-xl font-bold text-atom-orange mb-2">Malware Behavior</h3>
              <p className="text-atom-fg-muted">Study how malware operates, spreads, and evades detection</p>
            </div>
            <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border border-atom-purple">
              <CpuChipIcon className="h-12 w-12 text-atom-purple mb-4" />
              <h3 className="text-xl font-bold text-atom-purple mb-2">AI Security</h3>
              <p className="text-atom-fg-muted">Explore prompt injection, jailbreaking, and AI vulnerabilities</p>
            </div>
          </div>
          <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30 mt-8">
            <p className="text-yellow-300">
              ⏱️ <strong>Duration:</strong> 50 minutes | <strong>Level:</strong> Advanced | <strong>Prerequisites:</strong> Basic programming & security knowledge
            </p>
          </div>
        </div>
      )
    },
    {
      title: "📋 Workshop Agenda",
      subtitle: "What we'll cover in 50 minutes",
      content: (
        <div className="space-y-4">
          <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-blue">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl font-bold text-atom-blue">01</span>
              <div>
                <h3 className="text-xl font-bold text-atom-blue">Introduction (5 min)</h3>
                <p className="text-atom-fg-muted">Workshop overview & goals</p>
              </div>
            </div>
          </div>
          
          <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-green">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl font-bold text-atom-green">02</span>
              <div>
                <h3 className="text-xl font-bold text-atom-green">Reverse Engineering (15 min)</h3>
                <p className="text-atom-fg-muted">Interactive binary analysis & assembly basics</p>
              </div>
            </div>
          </div>
          
          <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-orange">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl font-bold text-atom-orange">03</span>
              <div>
                <h3 className="text-xl font-bold text-atom-orange">Malware Analysis (15 min)</h3>
                <p className="text-atom-fg-muted">Safe malware behavior simulation & detection</p>
              </div>
            </div>
          </div>
          
          <div className="bg-atom-bg bg-opacity-50 rounded-lg p-6 border-l-4 border-atom-purple">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl font-bold text-atom-purple">04</span>
              <div>
                <h3 className="text-xl font-bold text-atom-purple">AI Security (15 min)</h3>
                <p className="text-atom-fg-muted">Prompt injection attacks & defenses</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🔧 Part 1: Reverse Engineering",
      subtitle: "Understanding how software really works",
      content: (
        <div className="space-y-6">
          <div className="bg-atom-bg bg-opacity-50 rounded p-6 border-l-4 border-atom-blue">
            <h3 className="text-atom-blue font-bold text-xl mb-4">What is Reverse Engineering?</h3>
            <p className="text-atom-fg-muted mb-4">
              Reverse engineering is the process of analyzing compiled software to understand its functionality, 
              find vulnerabilities, or recover source code logic.
            </p>
            <ul className="list-disc list-inside space-y-2 text-atom-fg-muted">
              <li><strong className="text-atom-blue">Disassembly:</strong> Convert binary machine code back to assembly</li>
              <li><strong className="text-atom-blue">Decompilation:</strong> Attempt to recover high-level code structure</li>
              <li><strong className="text-atom-blue">Dynamic Analysis:</strong> Run the program and observe behavior</li>
              <li><strong className="text-atom-blue">Static Analysis:</strong> Examine code without executing it</li>
            </ul>
          </div>

          <div className="bg-green-900 bg-opacity-20 rounded p-4 border border-green-500 border-opacity-30">
            <h4 className="text-green-400 font-bold mb-2">🎯 Common Use Cases:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-green-300">
              <div>✓ Finding vulnerabilities in software</div>
              <div>✓ Understanding malware behavior</div>
              <div>✓ Analyzing proprietary protocols</div>
              <div>✓ Cracking software protection</div>
              <div>✓ CTF challenges & competitions</div>
              <div>✓ Security research & auditing</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/reverse-engineering-challenge')}
              className="px-8 py-4 bg-atom-blue text-white rounded-lg hover:bg-opacity-80 transition-colors font-bold text-lg"
            >
              🚀 Start Reverse Engineering Challenge
            </button>
          </div>
        </div>
      )
    },
    {
      title: "🦠 Part 2: Malware Behavior Analysis",
      subtitle: "Understanding how malware operates",
      content: (
        <div className="space-y-6">
          <div className="bg-atom-bg bg-opacity-50 rounded p-6 border-l-4 border-atom-orange">
            <h3 className="text-atom-orange font-bold text-xl mb-4">What is Malware Analysis?</h3>
            <p className="text-atom-fg-muted mb-4">
              Malware analysis is the process of studying malicious software to understand its behavior, 
              capabilities, and potential impact on systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900 bg-opacity-20 rounded p-4 border border-red-500 border-opacity-30">
              <h4 className="text-red-400 font-bold mb-3">Common Malware Types</h4>
              <ul className="space-y-2 text-sm text-red-300">
                <li>🦠 <strong>Viruses:</strong> Self-replicating code</li>
                <li>🐛 <strong>Worms:</strong> Network-spreading malware</li>
                <li>🐴 <strong>Trojans:</strong> Disguised malicious programs</li>
                <li>🔒 <strong>Ransomware:</strong> Encrypts victim files</li>
                <li>👁️ <strong>Spyware:</strong> Steals information</li>
                <li>🤖 <strong>Botnets:</strong> Coordinated zombie networks</li>
              </ul>
            </div>

            <div className="bg-green-900 bg-opacity-20 rounded p-4 border border-green-500 border-opacity-30">
              <h4 className="text-green-400 font-bold mb-3">Analysis Techniques</h4>
              <ul className="space-y-2 text-sm text-green-300">
                <li>📊 <strong>Static Analysis:</strong> Examine without execution</li>
                <li>▶️ <strong>Dynamic Analysis:</strong> Run in sandbox</li>
                <li>🔍 <strong>Behavioral Analysis:</strong> Monitor actions</li>
                <li>🧬 <strong>Code Analysis:</strong> Reverse engineer logic</li>
                <li>🌐 <strong>Network Analysis:</strong> Monitor communications</li>
                <li>💾 <strong>Memory Analysis:</strong> Inspect runtime state</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/malware-analysis-demo')}
              className="px-8 py-4 bg-atom-orange text-white rounded-lg hover:bg-opacity-80 transition-colors font-bold text-lg"
            >
              🔬 Start Malware Analysis Demo
            </button>
          </div>
        </div>
      )
    },
    {
      title: "🤖 Part 3: AI Security",
      subtitle: "Attacking and defending AI systems",
      content: (
        <div className="space-y-6">
          <div className="bg-atom-bg bg-opacity-50 rounded p-6 border-l-4 border-atom-purple">
            <h3 className="text-atom-purple font-bold text-xl mb-4">AI Security & Prompt Engineering</h3>
            <p className="text-atom-fg-muted mb-4">
              As AI systems become more prevalent, understanding their vulnerabilities is crucial for security professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-900 bg-opacity-20 rounded p-4 border border-purple-500 border-opacity-30">
              <h4 className="text-purple-400 font-bold mb-3">🎯 Prompt Injection</h4>
              <p className="text-sm text-purple-300">
                Manipulating AI prompts to bypass safety measures and extract unauthorized information or behaviors
              </p>
            </div>

            <div className="bg-red-900 bg-opacity-20 rounded p-4 border border-red-500 border-opacity-30">
              <h4 className="text-red-400 font-bold mb-3">🔓 Jailbreaking</h4>
              <p className="text-sm text-red-300">
                Techniques to bypass AI content filters and safety restrictions to elicit prohibited responses
              </p>
            </div>

            <div className="bg-blue-900 bg-opacity-20 rounded p-4 border border-blue-500 border-opacity-30">
              <h4 className="text-blue-400 font-bold mb-3">🛡️ Defense</h4>
              <p className="text-sm text-blue-300">
                Input validation, output filtering, and robust system prompts to protect AI systems
              </p>
            </div>
          </div>

          <div className="bg-yellow-900 bg-opacity-20 rounded p-4 border border-yellow-500 border-opacity-30">
            <h4 className="text-yellow-400 font-bold mb-2">⚡ Key Concepts:</h4>
            <ul className="text-sm text-yellow-300 space-y-1">
              <li>• <strong>Prompt Injection:</strong> Inserting malicious instructions into user input</li>
              <li>• <strong>Data Extraction:</strong> Tricking AI into revealing training data or secrets</li>
              <li>• <strong>Role-Playing Attacks:</strong> Making AI assume unrestricted personas</li>
              <li>• <strong>Token Smuggling:</strong> Hiding instructions in encoded formats</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/ai-security-challenge')}
              className="px-8 py-4 bg-atom-purple text-white rounded-lg hover:bg-opacity-80 transition-colors font-bold text-lg"
            >
              🎯 Start AI Security Challenge
            </button>
          </div>
        </div>
      )
    },
    {
      title: "🎓 Workshop Summary",
      subtitle: "Key Takeaways",
      content: (
        <div className="space-y-6">
          <div className="bg-atom-bg bg-opacity-50 rounded p-6">
            <h3 className="text-atom-green font-bold text-2xl mb-6">What You've Learned</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <CodeBracketIcon className="h-8 w-8 text-atom-blue mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-atom-blue font-bold text-lg">Reverse Engineering</h4>
                  <p className="text-atom-fg-muted">
                    How to analyze binaries, read assembly, and understand program flow without source code
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <BugAntIcon className="h-8 w-8 text-atom-orange mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-atom-orange font-bold text-lg">Malware Analysis</h4>
                  <p className="text-atom-fg-muted">
                    Identifying malware behaviors, analyzing attack patterns, and understanding detection techniques
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CpuChipIcon className="h-8 w-8 text-atom-purple mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-atom-purple font-bold text-lg">AI Security</h4>
                  <p className="text-atom-fg-muted">
                    Prompt injection techniques, AI vulnerabilities, and how to secure AI systems
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-900 bg-opacity-20 rounded-lg border border-green-500 border-opacity-30 p-6">
            <h3 className="text-green-400 font-bold text-xl mb-4">🚀 Next Steps</h3>
            <ul className="space-y-2 text-green-300">
              <li>✓ Practice on CTF platforms (HackTheBox, TryHackMe, PicoCTF)</li>
              <li>✓ Learn more about tools: IDA Pro, Ghidra, Cuckoo Sandbox</li>
              <li>✓ Study real malware samples on malware analysis platforms</li>
              <li>✓ Follow AI security research and OWASP AI guidelines</li>
              <li>✓ Join security communities and contribute to open source</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/reverse-engineering-challenge')}
              className="px-6 py-3 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors font-bold"
            >
              Try Reverse Engineering
            </button>
            <button
              onClick={() => navigate('/malware-analysis-demo')}
              className="px-6 py-3 bg-atom-orange text-white rounded hover:bg-opacity-80 transition-colors font-bold"
            >
              Try Malware Analysis
            </button>
            <button
              onClick={() => navigate('/ai-security-challenge')}
              className="px-6 py-3 bg-atom-purple text-white rounded hover:bg-opacity-80 transition-colors font-bold"
            >
              Try AI Security
            </button>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
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
          <h1 className="text-xl font-bold text-atom-blue font-mono">Advanced Cybersecurity Workshop</h1>
          <div className="text-atom-fg-muted font-mono">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-black bg-opacity-50 rounded-lg border border-atom-blue border-opacity-30 p-12"
            >
              <h2 className="text-4xl font-bold text-atom-blue mb-4">{slides[currentSlide].title}</h2>
              <p className="text-xl text-atom-green mb-8 font-mono">{slides[currentSlide].subtitle}</p>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-atom-blue' : 'bg-atom-fg-muted bg-opacity-30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center space-x-2 px-6 py-3 bg-atom-blue text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono"
            >
              <span>Next</span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 bg-black bg-opacity-50 rounded-lg border border-atom-green border-opacity-30 p-6">
            <h3 className="text-atom-green font-bold text-lg mb-4">🔗 Quick Access to Challenges</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/reverse-engineering-challenge"
                className="bg-atom-blue bg-opacity-20 border border-atom-blue rounded p-4 hover:bg-opacity-30 transition-colors"
              >
                <CodeBracketIcon className="h-8 w-8 text-atom-blue mb-2" />
                <p className="text-atom-blue font-bold">Reverse Engineering</p>
              </Link>
              <Link
                to="/malware-analysis-demo"
                className="bg-atom-orange bg-opacity-20 border border-atom-orange rounded p-4 hover:bg-opacity-30 transition-colors"
              >
                <BugAntIcon className="h-8 w-8 text-atom-orange mb-2" />
                <p className="text-atom-orange font-bold">Malware Analysis</p>
              </Link>
              <Link
                to="/ai-security-challenge"
                className="bg-atom-purple bg-opacity-20 border border-atom-purple rounded p-4 hover:bg-opacity-30 transition-colors"
              >
                <CpuChipIcon className="h-8 w-8 text-atom-purple mb-2" />
                <p className="text-atom-purple font-bold">AI Security</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCyberWorkshop;
