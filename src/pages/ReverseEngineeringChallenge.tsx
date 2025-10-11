// Reverse Engineering Challenge - Main Page
// Beginner-friendly interactive workshop using modular components

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  BookOpenIcon,
  CodeBracketIcon,
  PlayIcon,
  LightBulbIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Import section components
import IntroSection from '../components/ReverseEngineering/IntroSection';
import CompilationSection from '../components/ReverseEngineering/CompilationSection';
import DecompilationSection from '../components/ReverseEngineering/DecompilationSection';
import PasswordChallengeSection from '../components/ReverseEngineering/PasswordChallengeSection';
import ControlFlowSection from '../components/ReverseEngineering/ControlFlowSection';

const ReverseEngineeringChallenge: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 'intro',
      title: '🎯 Welcome to Reverse Engineering',
      icon: <BookOpenIcon className="h-8 w-8" />,
      component: <IntroSection />,
      color: 'blue'
    },
    {
      id: 'compilation',
      title: '🔄 From Code to Compilation',
      icon: <CodeBracketIcon className="h-8 w-8" />,
      component: <CompilationSection />,
      color: 'green'
    },
    {
      id: 'decompilation',
      title: '🔓 Simplified Decompilation',
      icon: <PlayIcon className="h-8 w-8" />,
      component: <DecompilationSection />,
      color: 'purple'
    },
    {
      id: 'password',
      title: '🕵️ Challenge: Password Finder',
      icon: <LightBulbIcon className="h-8 w-8" />,
      component: <PasswordChallengeSection />,
      color: 'orange'
    },
    {
      id: 'controlflow',
      title: '🎯 Control Flow Analysis',
      icon: <ArrowPathIcon className="h-8 w-8" />,
      component: <ControlFlowSection />,
      color: 'green'
    }
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg">
      {/* Navigation Header */}
      <nav className="bg-black bg-opacity-50 border-b border-atom-blue border-opacity-20 p-4 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/advanced-cyber-workshop" 
            className="flex items-center space-x-2 text-atom-blue hover:text-atom-green transition-colors"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="font-mono hidden sm:inline">Back to Workshop</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-atom-blue font-mono">
            Reverse Engineering
          </h1>
          <div className="text-atom-fg-muted font-mono text-sm sm:text-base">
            {currentSection + 1} / {sections.length}
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-black bg-opacity-30 border-b border-atom-blue border-opacity-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-atom-fg-muted text-sm font-mono">Workshop Progress</span>
            <span className="text-atom-blue text-sm font-mono font-bold">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-atom-bg rounded-full h-2 overflow-hidden">
            <motion.div 
              className="bg-atom-blue h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Navigation Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(index);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    index === currentSection
                      ? `bg-atom-${section.color} bg-opacity-20 border-2 border-atom-${section.color} text-atom-${section.color}`
                      : 'bg-atom-bg bg-opacity-50 border border-atom-fg-muted border-opacity-20 text-atom-fg-muted hover:bg-opacity-70'
                  }`}
                >
                  <span className="text-sm">{index + 1}</span>
                  <span className="hidden sm:inline text-sm">{section.title.split(' ').slice(1).join(' ')}</span>
                  <span className="sm:hidden text-lg">{section.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black bg-opacity-30 rounded-lg border border-atom-blue border-opacity-30 p-6 sm:p-8 md:p-12"
            >
              {/* Section Header */}
              <div className="mb-8 pb-6 border-b border-atom-fg-muted border-opacity-20">
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`text-atom-${currentSectionData.color}`}>
                    {currentSectionData.icon}
                  </div>
                  <h2 className={`text-3xl sm:text-4xl font-bold text-atom-${currentSectionData.color}`}>
                    {currentSectionData.title}
                  </h2>
                </div>
                <p className="text-atom-fg-muted font-mono text-sm">
                  Section {currentSection + 1} of {sections.length}
                </p>
              </div>

              {/* Section Component */}
              {currentSectionData.component}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-atom-blue text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSection(index);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSection 
                      ? 'bg-atom-blue w-8' 
                      : 'bg-atom-fg-muted bg-opacity-30 hover:bg-opacity-50'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className="flex items-center space-x-2 px-6 py-3 bg-atom-blue text-white rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Completion Badge */}
          {currentSection === sections.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-to-r from-atom-green to-atom-blue bg-opacity-20 rounded-lg border-2 border-atom-green p-8 text-center"
            >
              <h3 className="text-3xl font-bold text-atom-green mb-3">
                🎉 Workshop Complete!
              </h3>
              <p className="text-atom-fg-muted mb-6">
                Congratulations! You've completed the Reverse Engineering workshop. 
                You now have foundational skills in analyzing compiled code!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/advanced-cyber-workshop"
                  className="px-6 py-3 bg-atom-blue text-white rounded-lg hover:bg-opacity-80 transition-colors font-bold"
                >
                  Back to Workshop
                </Link>
                <button
                  onClick={() => {
                    setCurrentSection(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-atom-green text-white rounded-lg hover:bg-opacity-80 transition-colors font-bold"
                >
                  Review from Start
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick Tips Card */}
          <div className="mt-8 bg-black bg-opacity-30 rounded-lg border border-atom-purple border-opacity-30 p-6">
            <h3 className="text-atom-purple font-bold text-lg mb-3">💡 Workshop Tips</h3>
            <ul className="text-atom-fg-muted text-sm space-y-2">
              <li>• Take your time with each exercise—understanding is more important than speed</li>
              <li>• Try the challenges before looking at hints—you learn more by struggling a bit!</li>
              <li>• Use the navigation dots to jump to specific sections</li>
              <li>• Come back and review sections if concepts aren't clicking</li>
              <li>• Practice these skills on platforms like PicoCTF or CrackMes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverseEngineeringChallenge;
