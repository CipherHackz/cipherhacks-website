import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import {
  HeartIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import InstagramIcon from './components/InstagramIcon';
import {
  EVENT_DATE,
  generateTerminalText,
  NAV_ITEMS,
  NAV_ACTION_BUTTONS,
  FEATURES,
  ABOUT_ITEMS,
  WHAT_TO_EXPECT,
  FAQ_ITEMS,
  SPONSOR_TIERS,
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  TEAM_MEMBERS,
  COMMANDS,
  type SponsorInfo,
  ASCII_ART,
} from './constants';

// Set this to a Date object for a real countdown, or null for TBD
const targetDate: Date | null = EVENT_DATE; // Example: new Date('2024-08-10T09:00:00')

interface TerminalProps {
  onStateChange: (state: 'open' | 'minimized' | 'closed') => void;
}

const Terminal: React.FC<TerminalProps> = ({ onStateChange }) => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalText = useMemo(() => generateTerminalText(), []);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(terminalText.slice(0, index));
      index++;
      if (index > terminalText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [terminalText]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmd: string) => {
    const args = cmd.trim().split(' ');
    const commandName = args[0].toLowerCase();
    const command = COMMANDS.find(c => c.name === commandName);

    if (!command) {
      return `Command not found: ${commandName}. Type "help" for available commands.`;
    }

    return await command.action(args.slice(1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [
      ...history,
      `hacker@cipherhacks:/home/hacker/cipherhacks$ ${input}`,
      await handleCommand(input)
    ].filter(Boolean);
    setHistory(newHistory);
    setCommandHistory(prev => [input, ...prev]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Reset history when entering fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setHistory([
        ASCII_ART.logo,
        'Welcome to CipherHacks CLI! Type "help" to see available commands.',
        'Current user: hacker@cipherhacks',
        ''
      ]);
      setCommandHistory([]);
      setHistoryIndex(-1);
      setInput('');
    }
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-2 bg-atom-bg bg-opacity-50">
          <h2 className="text-atom-blue font-mono text-lg">hacker@cipherhacks: ~</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsFullscreen(false);
              setHistory([]);
            }}
            className="text-atom-fg hover:text-atom-red transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="flex-1 overflow-auto p-4 font-mono">
          {history.map((line, i) => (
            <pre 
              key={i} 
              className="text-atom-green whitespace-pre-wrap mb-2"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="text-atom-blue">hacker@cipherhacks:~$</span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-atom-green font-mono"
              autoFocus
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    );
  }

  if (isMinimized) {
    return (
      <motion.button
        initial={{ opacity: 0, height: "auto" }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        onClick={() => {
          setIsMinimized(false);
          onStateChange('open');
        }}
        className="bg-black bg-opacity-80 p-3 rounded-lg font-mono text-sm w-full max-w-2xl mx-auto flex items-center justify-between hover:bg-opacity-90 transition-all duration-300 border border-atom-blue border-opacity-20 hover:border-opacity-50"
      >
        <div className="flex items-center space-x-2">
          <CodeBracketIcon className="h-5 w-5 text-atom-blue" />
          <span className="text-atom-blue">Terminal (Click to expand)</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onStateChange('closed');
              setIsMinimized(false);
            }}
            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
          />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black bg-opacity-80 p-4 rounded-lg font-mono text-sm md:text-base w-full max-w-2xl mx-auto border border-atom-blue border-opacity-20"
    >
      <div className="flex items-center mb-2 space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onStateChange('closed');
            setIsMinimized(false);
          }}
          className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsMinimized(true);
            onStateChange('minimized');
          }}
          className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFullscreen(true)}
          className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
        />
      </div>
      <pre className="text-atom-green whitespace-pre-wrap">{text}</pre>
    </motion.div>
  );
};

// const StatCard: React.FC<{ icon: any; title: string; value: string }> = ({ icon: Icon, title, value }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-atom-bg p-6 rounded-lg shadow-xl border border-atom-blue border-opacity-20"
//   >
//     <Icon className="h-8 w-8 text-atom-blue mb-4" />
//     <h3 className="text-xl font-bold text-atom-purple mb-2">{title}</h3>
//     <p className="text-2xl font-bold text-atom-green">{value}</p>
//   </motion.div>
// );

// Add this component near other component definitions
const SponsorCarousel: React.FC<{
  sponsors: SponsorInfo[];
  tier: string;
  onSponsorClick: (sponsor: SponsorInfo) => void;
}> = ({ sponsors, tier, onSponsorClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate base widths for sponsor cards
  const baseWidth = tier === 'DIAMOND' ? 320 : tier === 'GOLD' ? 280 : 240;
  const gap = 16;
  const visibleSponsors = Math.min(3, sponsors.length);
  const itemWidth = baseWidth + gap;
  
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors];
  const totalWidth = itemWidth * sponsors.length;

  const containerWidth = Math.min(
    itemWidth * visibleSponsors - gap,
    itemWidth * sponsors.length - gap
  );

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    
    if (!carouselRef.current) return;
    
    const newOffset = -info.offset.x;
    const middleSetStart = totalWidth;
    const middleSetEnd = totalWidth * 2;
    
    let adjustment = 0;
    if (newOffset < middleSetStart) {
      adjustment = totalWidth;
    } else if (newOffset > middleSetEnd) {
      adjustment = -totalWidth;
    }
    
    if (adjustment !== 0) {
      carouselRef.current.style.transform = `translateX(${-(newOffset + adjustment)}px)`;
    }
  };

  // Handle sponsor click
  const handleSponsorClick = (sponsor: SponsorInfo) => {
    setIsPaused(true);
    onSponsorClick(sponsor);
  };

  // Resume animation when popup closes
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transform = 'translateX(0)';
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isPaused]);

  return (
    <div 
      className="relative mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: containerWidth,
        maxWidth: '100%'
      }}
    >
      <motion.div
        ref={carouselRef}
        className="flex gap-4 px-4 cursor-grab active:cursor-grabbing"
        animate={!isDragging && !isPaused && sponsors.length > 1 ? {
          x: [-totalWidth, -totalWidth * 2],
          transition: {
            duration: isHovered ? 45 : 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        } : undefined}
        drag={sponsors.length > 1 ? "x" : false}
        dragConstraints={{
          left: -totalWidth * 3 + containerWidth,
          right: 0
        }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{
          width: totalWidth * 3,
          touchAction: "none"
        }}
      >
        {displaySponsors.map((sponsor, i) => (
          <motion.div
            key={`${sponsor.name}-${i}`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSponsorClick(sponsor)}
            className={`
              flex-shrink-0 flex items-center justify-center p-4
              bg-black bg-opacity-50 rounded-lg
              border-2 border-atom-fg border-opacity-10
              cursor-pointer transition-all duration-300
              hover:border-atom-blue hover:border-opacity-50
            `}
            style={{
              width: baseWidth,
              aspectRatio: tier === 'DIAMOND' ? '16/9' : tier === 'GOLD' ? '4/3' : '3/2'
            }}
          >
            <span className="text-atom-fg opacity-50 text-center">
              {sponsor.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
      {sponsors.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-atom-bg to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-atom-bg to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );
};

const SponsorPopup: React.FC<{
  sponsor: SponsorInfo;
  onClose: () => void;
}> = ({ sponsor, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="bg-atom-bg rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-atom-blue"
        onClick={e => e.stopPropagation()}
        layoutId={`sponsor-${sponsor.name}`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-atom-blue">{sponsor.name}</h3>
          <button
            onClick={onClose}
            className="text-atom-fg hover:text-atom-red transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-atom-fg mb-4">{sponsor.description}</p>
        {sponsor.contribution && (
          <p className="text-atom-green mb-4">Contribution: {sponsor.contribution}</p>
        )}
        {sponsor.website && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-atom-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Visit Website
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

const getDefaultIcon = (gender: 'male' | 'female' | 'other') => {
  switch (gender) {
    case 'male':
      return (
        <svg className="h-12 w-12 text-atom-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'female':
      return (
        <svg className="h-12 w-12 text-atom-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <circle cx="12" cy="4" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg className="h-12 w-12 text-atom-green" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2M12 20v2" />
        </svg>
      );
  }
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorInfo | null>(null);
  const [carouselKey, setCarouselKey] = useState(0);
  const [terminalState, setTerminalState] = useState<'open' | 'minimized' | 'closed'>('open');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easter egg in console
  useEffect(() => {
    const styles = {
      title: [
        'color: #61afef',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px #282c34',
        'padding: 10px',
      ].join(';'),
      subtitle: [
        'color: #98c379',
        'font-size: 14px',
        'font-weight: bold',
      ].join(';'),
      text: [
        'color: #abb2bf',
        'font-size: 12px',
      ].join(';'),
      link: [
        'color: #61afef',
        'font-size: 12px',
        'text-decoration: underline',
      ].join(';'),
    };

    console.log('%cWelcome to CipherHacks! 🚀', styles.title);
    console.log('%c👾 You found our secret console message!', styles.subtitle);
    console.log('%cSince you\'re here, you might be interested in:', styles.text);
    console.log('%c1. Contributing to our open source code', styles.text);
    console.log('%c2. Joining our development team', styles.text);
    console.log('%c3. Finding more easter eggs...', styles.text);
    console.log('\n');
    console.log('%cGitHub: https://github.com/cipherhacks', styles.link);
    console.log('%cEmail: team@cipherhacks.tech', styles.link);
    console.log('\n');
    console.log('%cTry running %chelp()%c in the console...', styles.text, styles.subtitle, styles.text);

    // Add help function to window object
    (window as any).help = () => {
      console.log('%cAvailable Commands:', styles.subtitle);
      console.log('%c  hack()      - Try to hack the mainframe', styles.text);
      console.log('%c  matrix()    - Enter the matrix', styles.text);
      console.log('%c  coffee()    - Get virtual coffee', styles.text);
      console.log('%c  easteregg() - Find another easter egg', styles.text);
    };

    (window as any).hack = () => {
      console.log('%cACCESS DENIED 🔒\nNice try though! Maybe try attending CipherHacks to learn real hacking skills? 😉', styles.subtitle);
    };

    (window as any).matrix = () => {
      console.log('%cLoading the Matrix...', styles.subtitle);
      setTimeout(() => {
        console.log('%c Wake up, Neo...', 'color: #98c379; font-family: monospace;');
        setTimeout(() => {
          console.log('%c The Matrix has you...', 'color: #98c379; font-family: monospace;');
          setTimeout(() => {
            console.log('%c Follow the white rabbit.', 'color: #98c379; font-family: monospace;');
            setTimeout(() => {
              console.log('%c 🐰', 'font-size: 50px;');
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    };

    (window as any).coffee = () => {
      console.log('%cHere\'s your virtual coffee! ☕\nError: Coffee not found. Please get real coffee.', styles.subtitle);
    };

    (window as any).easteregg = () => {
      console.log('%cCongratulations! You found another easter egg! 🥚\nBut wait... there\'s more! Keep exploring...', styles.subtitle);
    };

  }, []);

  const handleSponsorClose = () => {
    setSelectedSponsor(null);
    setCarouselKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-atom-bg">
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className={`w-full backdrop-blur-sm transition-all duration-300 ${
          scrolled ? 'bg-atom-bg bg-opacity-90 shadow-lg' : 'bg-transparent'
        }`}>
          <div className="container-custom">
            <div className="flex items-center justify-center h-14 sm:h-16 px-2 sm:px-4">
              <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
                {NAV_ITEMS.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <ScrollLink
                      to={item.to}
                      smooth={true}
                      duration={500}
                      className={`${item.className} items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg group transition-all duration-300 ${
                        item.primary 
                          ? 'text-atom-blue font-bold text-base sm:text-lg' 
                          : 'text-atom-fg hover:text-atom-blue text-sm sm:text-base'
                      }`}
                    >
                      <motion.div 
                        className={`transition-colors ${
                          item.primary ? 'text-atom-blue' : 'text-atom-fg group-hover:text-atom-blue'
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className={`${item.primary ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-4 w-4 sm:h-5 sm:w-5'}`} />
                      </motion.div>
                      <span className={`${scrolled ? 'opacity-100' : 'opacity-90'}`}>
                        {item.name}
                      </span>
                    </ScrollLink>
                  </motion.li>
                ))}
                {NAV_ACTION_BUTTONS.map((button) => (
                  <motion.li
                    key={button.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="hidden lg:block"
                  >
                    {button.name === 'Register' ? (
                      <RouterLink
                        to={button.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-opacity-90 transition-all duration-300 ${button.className}`}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <button.icon className="h-5 w-5" />
                        </motion.div>
                        <span>{button.name}</span>
                      </RouterLink>
                    ) : (
                      <a
                        href={button.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white hover:bg-opacity-90 transition-all duration-300 ${button.className}`}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <button.icon className="h-5 w-5" />
                        </motion.div>
                        <span>{button.name}</span>
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center relative py-12 sm:py-16 md:py-20 pt-20 sm:pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-custom text-center z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <CodeBracketIcon className="h-16 w-16 sm:h-20 sm:w-20 text-atom-blue mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-atom-blue mb-4 tracking-tight"
          >
            CipherHacks 2025
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-atom-fg mb-8"
          >
            San Diego's Premier High School Hackathon
          </motion.p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-mono text-atom-green mb-8">
          {/* <span className="text-3xl md:text-4xl font-bold text-atom-orange">Date: Tentatively October 4-5, 2025</span> */}
            {targetDate ? (
              <Countdown 
                date={targetDate}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
                    {[
                      { value: days, label: 'Days' },
                      { value: hours, label: 'Hours' },
                      { value: minutes, label: 'Minutes' },
                      { value: seconds, label: 'Seconds' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-atom-bg bg-opacity-50 p-4 rounded-lg"
                      >
                        <div className="text-3xl md:text-4xl font-bold">{item.value}</div>
                        <div className="text-sm text-atom-fg">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              />
            ) : (
              <span className="text-3xl md:text-4xl font-bold text-atom-orange">Date: Tentatively October 4-5, 2025</span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <RouterLink to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-atom-purple bg-atom-purple text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-lg sm:text-xl hover:bg-opacity-90 transition-colors"
              >
                Register Now
              </motion.button>
            </RouterLink>
            <RouterLink to="/sponsor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-atom-blue text-atom-blue px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-lg sm:text-xl hover:bg-atom-blue hover:bg-opacity-10 transition-colors"
              >
                Sponsor Us
              </motion.button>
            </RouterLink>
            <a
              href="https://cipherhacks.tech/donate"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-atom-green text-atom-green px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-lg sm:text-xl hover:bg-atom-green hover:bg-opacity-10 transition-colors"
              >
                Donate
              </motion.button>
            </a>
          </div>
        </div>
        <div className={`mt-12 w-full px-4 ${terminalState === 'closed' ? 'mb-0' : 'mb-6'}`}>
          <AnimatePresence mode="wait">
            {terminalState !== 'closed' && (
              <Terminal onStateChange={setTerminalState} />
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-black bg-opacity-30">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center mb-12"
          >
            What Makes CipherHacks Special
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-atom-bg bg-opacity-50 p-6 rounded-lg shadow-xl border border-atom-blue border-opacity-20 hover:border-opacity-50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`${feature.color} p-3 rounded-lg bg-black bg-opacity-30`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${feature.color}`}>
                      {feature.title}
                    </h3>
                    <p className="text-atom-fg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            About CipherHacks
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                CipherHacks is more than just a hackathon - it's a celebration of innovation, creativity, and the future of technology. 
                Join us for an unforgettable weekend of coding, learning, and building alongside fellow high school students passionate about technology.
              </p>
              <div className="space-y-4">
                {ABOUT_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-atom-green">
                    <item.icon className="h-6 w-6" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black bg-opacity-50 rounded-lg p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-atom-orange mb-6">What to Expect</h3>
              <ul className="space-y-4">
                {WHAT_TO_EXPECT.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-lg"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black bg-opacity-30">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-atom-bg bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-atom-blue border-opacity-0 hover:border-opacity-20"
              >
                <h3 className="text-xl font-bold text-atom-cyan mb-3 group-hover:text-atom-blue transition-colors">{faq.q}</h3>
                <p className="text-atom-fg leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Amazing Sponsors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl mb-12"
          >
            We are incredibly grateful to our sponsors who make CipherHacks possible. As a Hack Club fiscally sponsored event, 
            all donations are tax-deductible through Hack Club's 501(c)(3) nonprofit status.
          </motion.p>
          <div className="space-y-16">
            {SPONSOR_TIERS.map((tier) => (
              <div key={tier.tier} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <span className="text-4xl">{tier.icon}</span>
                  <h3 className={`text-2xl font-bold ${tier.color}`}>
                    {tier.tier} Sponsors
                  </h3>
                </motion.div>
                <SponsorCarousel
                  key={`${tier.tier}-${carouselKey}`}
                  sponsors={tier.sponsors}
                  tier={tier.tier}
                  onSponsorClick={setSelectedSponsor}
                />
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <RouterLink 
              to="/sponsor"
              className="inline-flex items-center px-8 py-3 bg-atom-purple text-white rounded-lg text-xl hover:bg-opacity-90 transition-colors group"
            >
              <HeartIcon className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
              Become a Sponsor
            </RouterLink>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="pt-12 pb-20 bg-black bg-opacity-30">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center"
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl mb-12"
          >
            The passionate students behind CipherHacks
          </motion.p>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto ${
            TEAM_MEMBERS.length === 1 ? 'lg:grid-cols-1 max-w-lg' :
            TEAM_MEMBERS.length === 2 ? 'lg:grid-cols-2 max-w-3xl' :
            TEAM_MEMBERS.length === 3 ? 'lg:grid-cols-3 max-w-5xl' :
            'lg:grid-cols-4'
          }`}>
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-atom-blue border-opacity-20 hover:border-opacity-50 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-atom-blue shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-atom-bg flex items-center justify-center border-2 border-atom-blue shadow-lg">
                      {getDefaultIcon(member.gender)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-atom-blue">{member.name}</h3>
                  <p className="text-atom-purple font-mono">{member.role}</p>
                </div>
                <p className="text-atom-fg text-sm mb-4 text-center">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.links.github && (
                    <a 
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a 
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.links.twitter && (
                    <a 
                      href={member.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {member.links.email && (
                    <a 
                      href={`mailto:${member.links.email}`}
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Get in Touch
          </motion.h2>
          <div className="text-center space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl"
            >
              Have questions? We'd love to hear from you!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto bg-atom-bg bg-opacity-50 p-8 rounded-lg shadow-xl"
            >
              <p className="text-xl mb-6">
                Reach out to us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-atom-blue hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <div className="flex justify-center space-x-8">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.name === "Instagram" ? InstagramIcon : social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <Icon className="h-8 w-8" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsor Popup */}
      <AnimatePresence>
        {selectedSponsor && (
          <SponsorPopup
            sponsor={selectedSponsor}
            onClose={handleSponsorClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
