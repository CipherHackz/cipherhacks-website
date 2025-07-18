import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import {
  HeartIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  XMarkIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import InstagramIcon from './components/InstagramIcon';
import {
  EVENT_DATE,
  generateTerminalText,
  NAV_ITEMS,
  NAV_ACTION_BUTTONS,
  FEATURES,
  HERO_ITEMS,
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
  const [isMobile, setIsMobile] = useState(false);
  const terminalText = useMemo(() => generateTerminalText(), []);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            aria-label="Close fullscreen terminal"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsFullscreen(false);
              setHistory([]);
            }}
            className="h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
          />
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
            aria-label="Close terminal"
            className="h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
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
          aria-label="Close terminal"
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          whileTap={!isMobile ? { scale: 0.9 } : {}}
          onClick={() => {
            onStateChange('closed');
            setIsMinimized(false);
          }}
          className="h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
          disabled={isMobile}
        />
        {!isMobile && (
          <>
            <motion.button
              aria-label="Minimize terminal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsMinimized(true);
                onStateChange('minimized');
              }}
              className="h-5 w-5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
            />
            <motion.button
              aria-label="Maximize terminal"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(true)}
              className="h-5 w-5 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
            />
          </>
        )}
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

// Carousel speed constants
const CAROUSEL_SPEED = {
  NORMAL: 135, // pixels per second when not hovered
  HOVERED: 45, // pixels per second when hovered
};

// Add this component near other component definitions
const SponsorCarousel: React.FC<{
  sponsors: SponsorInfo[];
  tier: string;
  onSponsorClick: (sponsor: SponsorInfo) => void;
  isPopupOpen?: boolean;
}> = ({ sponsors, tier, onSponsorClick, isPopupOpen = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragThresholdMet, setIsDragThresholdMet] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(CAROUSEL_SPEED.NORMAL);

  // Constants
  const DRAG_THRESHOLD = 10; // pixels - minimum movement to start dragging

  // Calculate dimensions
  const baseWidth = tier === 'DIAMOND' ? 320 : tier === 'GOLD' ? 280 : 240;
  const gap = 16;
  const itemWidth = baseWidth + gap;
  const singleSetWidth = itemWidth * sponsors.length;
  
  // Create triple set for infinite scroll
  const displaySponsors = sponsors.length > 0 ? [...sponsors, ...sponsors, ...sponsors] : [];
  
  const visibleSponsors = Math.min(3, sponsors.length);
  const containerWidth = Math.min(
    itemWidth * visibleSponsors - gap,
    itemWidth * sponsors.length - gap
  );

  // Initialize position to middle set
  useEffect(() => {
    if (sponsors.length > 0 && currentX === 0) {
      setCurrentX(-singleSetWidth);
    }
  }, [sponsors.length, singleSetWidth, currentX]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    // Wraps the position to keep it within the infinite scroll bounds
    const wrapPosition = (newX: number) => {
      if (sponsors.length <= 1) return newX;
      
      if (newX <= -singleSetWidth * 2) {
        return newX + singleSetWidth;
      } else if (newX >= 0) {
        return newX - singleSetWidth;
      }
      return newX;
    };

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Determine target speed
    const targetSpeed = (isPopupOpen || isHovered) ? CAROUSEL_SPEED.HOVERED : CAROUSEL_SPEED.NORMAL;

    // Smoothly interpolate speed
    speedRef.current += (targetSpeed - speedRef.current) * 0.05; // Smoothing factor

    // Only animate if not dragging and we have multiple sponsors
    if (!isDragging && sponsors.length > 1) {
      const movement = (speedRef.current * deltaTime) / 1000;
      
      setCurrentX(prevX => wrapPosition(prevX - movement));
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isDragging, isHovered, isPopupOpen, sponsors.length, singleSetWidth]);

  // Start animation
  useEffect(() => {
    if (sponsors.length > 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, sponsors.length]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (sponsors.length <= 1) return;
    
    setDragStartX(e.clientX);
    setIsDragThresholdMet(false);
    
    // Don't set isDragging immediately - wait for threshold
  };

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragStartX) return;
    
    // Wraps the position to keep it within the infinite scroll bounds
    const wrapPosition = (newX: number) => {
      if (sponsors.length <= 1) return newX;
      
      if (newX <= -singleSetWidth * 2) {
        return newX + singleSetWidth;
      } else if (newX >= 0) {
        return newX - singleSetWidth;
      }
      return newX;
    };
    
    const deltaX = Math.abs(e.clientX - dragStartX);
    
    // Only start dragging if we've moved beyond the threshold
    if (!isDragThresholdMet && deltaX > DRAG_THRESHOLD) {
      setIsDragging(true);
      setIsDragThresholdMet(true);
      
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
    }
    
    // Only update position if we're actually dragging
    if (isDragThresholdMet && isDragging) {
      const actualDeltaX = e.clientX - dragStartX;
      
      setCurrentX(prevX => wrapPosition(prevX + actualDeltaX * 0.8)); // Damping factor for smoother feel
      
      setDragStartX(e.clientX);
    }
  }, [isDragging, isDragThresholdMet, dragStartX, singleSetWidth, sponsors.length, DRAG_THRESHOLD]);

  // Handle mouse up for dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsDragThresholdMet(false);
    setDragStartX(0);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (dragStartX) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [dragStartX, handleMouseMove, handleMouseUp]);

  // Handle card click
  const handleCardClick = (sponsor: SponsorInfo, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only trigger click if we haven't started dragging
    if (!isDragThresholdMet && !isDragging) {
      onSponsorClick(sponsor);
    }
  };

  // Handle card hover
  const handleCardHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative mx-auto overflow-hidden select-none"
      style={{ 
        width: containerWidth,
        maxWidth: '100%'
      }}
    >
      <div
        ref={containerRef}
        className="flex gap-4 px-4"
        style={{
          transform: `translateX(${currentX}px)`,
          cursor: isDragging ? 'grabbing' : (sponsors.length > 1 ? 'grab' : 'default'),
          width: itemWidth * displaySponsors.length
        }}
        onMouseDown={handleMouseDown}
      >
        {displaySponsors.map((sponsor, i) => (
          <motion.button
            key={`${sponsor.name}-${i}`}
            aria-label={`View details for ${sponsor.name}`}
            className={`
              flex-shrink-0 flex items-center justify-center p-4
              bg-black bg-opacity-50 rounded-lg
              border-2 border-atom-fg border-opacity-10
              cursor-pointer transition-all duration-300
              hover:border-atom-blue hover:border-opacity-50
              hover:scale-105 hover:-translate-y-2
              overflow-hidden user-select-none text-left
            `}
            style={{
              width: baseWidth,
              aspectRatio: tier === 'DIAMOND' ? '16/9' : tier === 'GOLD' ? '4/3' : '3/2',
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
            }}
            onClick={(e) => handleCardClick(sponsor, e)}
            onMouseEnter={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
          >
            {sponsor.logo ? (
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                  draggable={false}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-atom-blue text-lg font-semibold text-center px-2">${sponsor.name}</span>`;
                    }
                  }}
                />
              </div>
            ) : (
              <span className="text-atom-blue text-lg font-semibold text-center px-2 leading-tight pointer-events-none">
                {sponsor.name}
              </span>
            )}
          </motion.button>
        ))}
      </div>
      
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
           aria-label="Close sponsor details"
           className="text-atom-fg hover:text-atom-red transition-colors"
         >
           <XMarkIcon className="h-6 w-6" />
         </button>
       </div>
       {sponsor.logo && (
         <div className="mb-4 flex justify-center">
           <img
             src={sponsor.logo}
             alt={`${sponsor.name} logo`}
             className="max-w-32 max-h-20 object-contain"
             onError={(e) => {
               const target = e.target as HTMLImageElement;
               target.style.display = 'none';
             }}
           />
         </div>
       )}
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
    console.log('%cGitHub: https://github.com/cipherhackz', styles.link);
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
      console.log('%c  inspect()   - Run browser security analysis', styles.text);
      console.log('%c  decode()    - Decode encrypted strings', styles.text);
      console.log('\n%c🚨 Security Notice: Advanced penetration testers report unusual encrypted transmissions.', 'color: #e06c75; font-weight: bold;');
      console.log('%cRecommended tools: Terminal network commands, element inspection, cipher analysis.', styles.text);
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

    // Obfuscated CTF function - requires reverse engineering
    const _0x1337=function(s: string): string {return s.split('').map((c: string) => String.fromCharCode(c.charCodeAt(0)^42)).join('')};
    const _0x4242='=B@2CEF<92\x0fB@2CL_';
    (window as any).inspect = () => {
      const _decoded = _0x1337(_0x4242);
      console.log('%c🔍 Browser Security Analysis Complete', styles.subtitle);
      console.log('%cYou\'ve unlocked the inspector protocol! This requires true detective work.', styles.text);
      console.log(`%c${_decoded}`, 'color: #e06c75; font-weight: bold; font-size: 14px;');
    };

    // Hidden ROT13 decoder - for the advanced challenges
    (window as any).decode = (str: string) => {
      const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, (c: string) => {
        const code = c.charCodeAt(0) + 13;
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= code ? code : code - 26);
      });
      return rot13(str);
    };

    // Advanced JavaScript Features
    
    // 1. Konami Code Easter Egg
    let konamiCode = '';
    const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    const handleKonamiCode = (e: KeyboardEvent) => {
      konamiCode += e.code;
      if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
      }
      if (konamiCode === konamiSequence) {
        console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
        console.log('%c🚀 Welcome to the Elite Hackers Club!', 'color: #4ecdc4; font-size: 16px;');
        console.log('%cSecret Flag: CipherHacks{K0n4m1_M4st3r_H4ck3r}', 'color: #45b7d1; font-weight: bold;');
        // Add visual effect
        document.body.style.animation = 'hue-rotate 2s infinite';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 5000);
      }
    };
    document.addEventListener('keydown', handleKonamiCode);

    // 2. Mouse Tracker with Particle Effects
    const particles: Array<{x: number, y: number, life: number, vx: number, vy: number}> = [];
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    const createParticleCanvas = () => {
      canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1000';
      canvas.style.opacity = '0.7';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
    };

    const addParticle = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          life: 1.0,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1
        });
      }
    };

    const updateParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = `hsl(${(Date.now() / 10) % 360}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      requestAnimationFrame(updateParticles);
    };

    // 3. Advanced Console Commands
    (window as any).particles = (enable: boolean = true) => {
      if (enable && !canvas) {
        createParticleCanvas();
        updateParticles();
        
        const mouseHandler = (e: MouseEvent) => addParticle(e.clientX, e.clientY);
        document.addEventListener('mousemove', mouseHandler);
        
        console.log('%c✨ Particle effects enabled! Move your mouse around!', 'color: #ff6b6b; font-size: 14px;');
        
        (window as any).disableParticles = () => {
          document.removeEventListener('mousemove', mouseHandler);
          canvas?.remove();
          canvas = null;
          console.log('%c🚫 Particle effects disabled.', 'color: #ffa500;');
        };
      } else if (!enable && canvas) {
        (window as any).disableParticles();
      }
    };

    (window as any).glitch = () => {
      const elements = document.querySelectorAll('h1, h2, h3, p, span');
      elements.forEach((el, index) => {
        setTimeout(() => {
          const original = el.textContent;
          const glitched = original?.split('').map(char => 
            Math.random() < 0.1 ? String.fromCharCode(33 + Math.floor(Math.random() * 93)) : char
          ).join('');
          el.textContent = glitched || '';
          setTimeout(() => {
            el.textContent = original || '';
          }, 200);
        }, index * 50);
      });
      console.log('%c👾 GLITCH EFFECT ACTIVATED!', 'color: #ff0080; font-weight: bold; text-shadow: 2px 2px #00ff80;');
    };

    (window as any).rainbow = () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { color: #ff0000; }
          16% { color: #ff8000; }
          33% { color: #ffff00; }
          50% { color: #00ff00; }
          66% { color: #0080ff; }
          83% { color: #8000ff; }
          100% { color: #ff0000; }
        }
        .rainbow-text { animation: rainbow 2s infinite; }
      `;
      document.head.appendChild(style);
      
      document.querySelectorAll('h1, h2, h3').forEach(el => {
        el.classList.add('rainbow-text');
      });
      
      console.log('%c🌈 RAINBOW MODE ACTIVATED!', 'background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff); -webkit-background-clip: text; color: transparent; font-weight: bold; font-size: 16px;');
      
      setTimeout(() => {
        document.querySelectorAll('.rainbow-text').forEach(el => {
          el.classList.remove('rainbow-text');
        });
        style.remove();
        console.log('%c🌈 Rainbow mode disabled.', 'color: #888;');
      }, 10000);
    };

    (window as any).cyberpunk = () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff;
            filter: hue-rotate(0deg);
          }
          50% { 
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
            filter: hue-rotate(180deg);
          }
        }
        .cyberpunk-mode {
          background: linear-gradient(45deg, #000 25%, #111 25%, #111 50%, #000 50%, #000 75%, #111 75%, #111);
          background-size: 20px 20px;
          animation: neon-glow 2s ease-in-out infinite;
        }
        .cyberpunk-mode h1, .cyberpunk-mode h2, .cyberpunk-mode h3 {
          color: #00ffff !important;
          text-shadow: 0 0 10px #00ffff;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('cyberpunk-mode');
      
      console.log('%c🤖 CYBERPUNK MODE ENGAGED! 🤖', 'color: #00ffff; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
      
      setTimeout(() => {
        document.body.classList.remove('cyberpunk-mode');
        style.remove();
        console.log('%c🤖 Cyberpunk mode disabled.', 'color: #888;');
      }, 15000);
    };

    (window as any).status = () => {
      const memUsage = (performance as any).memory ? {
        used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
        total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
        limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576)
      } : 'N/A';
      
      console.log('%c🖥️  SYSTEM STATUS REPORT', 'color: #00ff00; font-weight: bold; font-size: 16px;');
      console.log('%c════════════════════════════', 'color: #00ff00;');
      console.log(`%cUser Agent: ${navigator.userAgent}`, 'color: #00ffff;');
      console.log(`%cScreen: ${window.screen.width}x${window.screen.height}`, 'color: #00ffff;');
      console.log(`%cViewport: ${window.innerWidth}x${window.innerHeight}`, 'color: #00ffff;');
      console.log(`%cMemory Usage: ${typeof memUsage === 'object' ? `${memUsage.used}MB / ${memUsage.total}MB` : memUsage}`, 'color: #00ffff;');
      console.log(`%cConnection: ${(navigator as any).connection?.effectiveType || 'Unknown'}`, 'color: #00ffff;');
      console.log(`%cOnline: ${navigator.onLine ? '✅' : '❌'}`, 'color: #00ffff;');
      console.log(`%cCookies Enabled: ${navigator.cookieEnabled ? '✅' : '❌'}`, 'color: #00ffff;');
      console.log(`%cTimezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`, 'color: #00ffff;');
      console.log('%c════════════════════════════', 'color: #00ff00;');
    };

    // Update help function to include new commands
    (window as any).help = () => {
      console.log('%cAvailable Commands:', styles.subtitle);
      console.log('%c  hack()         - Try to hack the mainframe', styles.text);
      console.log('%c  matrix()       - Enter the matrix', styles.text);
      console.log('%c  coffee()       - Get virtual coffee', styles.text);
      console.log('%c  easteregg()    - Find another easter egg', styles.text);
      console.log('%c  inspect()      - Run browser security analysis', styles.text);
      console.log('%c  decode()       - Decode encrypted strings', styles.text);
      console.log('\n%cVisual Effects:', 'color: #ff6b6b; font-weight: bold;');
      console.log('%c  particles()    - Enable mouse particle effects', styles.text);
      console.log('%c  glitch()       - Activate glitch effect', styles.text);
      console.log('%c  rainbow()      - Rainbow text mode', styles.text);
      console.log('%c  cyberpunk()    - Cyberpunk aesthetic mode', styles.text);
      console.log('%c  matrixRain()   - Matrix digital rain effect', styles.text);
      console.log('\n%cSystem Commands:', 'color: #4ecdc4; font-weight: bold;');
      console.log('%c  status()       - Show system information', styles.text);
      console.log('\n%cGames & Challenges:', 'color: #ffd700; font-weight: bold;');
      console.log('%c  typing_test()  - Test your typing speed', styles.text);
      console.log('\n%c🎮 Try the Konami Code: ↑↑↓↓←→←→BA', 'color: #ffa500; font-weight: bold;');
      console.log('\n%c🚨 Security Notice: Advanced penetration testers report unusual encrypted transmissions.', 'color: #e06c75; font-weight: bold;');
      console.log('%cRecommended tools: Terminal network commands, element inspection, cipher analysis.', styles.text);
    };

    // Matrix Rain Effect
    (window as any).matrixRain = () => {
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const columns = Math.floor(window.innerWidth / 20);
      
      const createMatrixChar = (x: number) => {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = x + 'px';
        char.style.top = '-20px';
        char.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(char);
        
        setTimeout(() => {
          char.remove();
        }, 3000);
      };
      
      console.log('%c🌧️ MATRIX RAIN ACTIVATED!', 'color: #00ff00; font-weight: bold; font-family: monospace;');
      
      const interval = setInterval(() => {
        for (let i = 0; i < columns; i++) {
          if (Math.random() < 0.1) {
            createMatrixChar(i * 20);
          }
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        console.log('%c🌧️ Matrix rain stopped.', 'color: #888;');
      }, 10000);
    };

    // Secret typing test challenge
    (window as any).typing_test = () => {
      const phrases = [
        'The quick brown fox jumps over the lazy dog',
        'CipherHacks is the best hackathon in San Diego',
        'Cybersecurity is not just about technology, its about people',
        'console.log("Hello, World!");',
        'SELECT * FROM hackers WHERE skill_level = "elite";'
      ];
      
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      const startTime = Date.now();
      
      console.log('%c⌨️ TYPING TEST CHALLENGE!', 'color: #ff6b6b; font-weight: bold; font-size: 16px;');
      console.log(`%cType this phrase: "${phrase}"`, 'color: #00ffff; font-size: 14px;');
      
      const checkTyping = (input: string) => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const wpm = Math.round((phrase.length / 5) / (duration / 60));
        
        if (input === phrase) {
          console.log(`%c🎉 PERFECT! Time: ${duration.toFixed(2)}s | WPM: ${wpm}`, 'color: #00ff00; font-weight: bold;');
          if (wpm > 60) {
            console.log('%c🚀 Speed Demon! You earn the title: Elite Typist', 'color: #ffd700; font-weight: bold;');
          }
        } else {
          console.log(`%c❌ Not quite right. You typed: "${input}"`, 'color: #ff6b6b;');
        }
      };
      
      (window as any).submit_typing = checkTyping;
      console.log('%cWhen done, run: submit_typing("your typed phrase here")', 'color: #ffa500;');
    };

    // Add cleanup function for event listeners
    return () => {
      document.removeEventListener('keydown', handleKonamiCode);
    };

  }, []);

  const handleSponsorClose = () => {
    setSelectedSponsor(null);
  };

  return (
    <div className="min-h-screen bg-atom-bg">
      {/* Hidden CTF Indicator - Only visible to those who know to look */}
      <div 
        className="fixed bottom-0 right-0 p-1 text-xs opacity-5 hover:opacity-20 transition-opacity duration-1000 select-none pointer-events-none"
        style={{ fontSize: '8px', color: '#282c34' }}
      >
        Security Level: 🔒🔒🔒 | Flags: 3 | Status: Hidden
      </div>

      {/* Navigation */}
      <motion.nav 
         className="fixed top-0 left-0 right-0 z-50"
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.5, duration: 0.3 }}
       >
         <div className={`w-full backdrop-blur-sm transition-all duration-300 ${
           scrolled ? 'bg-atom-bg bg-opacity-90 shadow-lg' : 'bg-transparent'
         }`}>
           <div className="container-custom">
             <div className="flex items-center justify-center h-12 sm:h-14 md:h-16 px-1 sm:px-2 md:px-4">
               <ul className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8">
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
                       href={`#${item.to}`}
                       className={`${item.className} items-center space-x-1 px-1 sm:px-2 md:px-3 py-1 rounded-lg group transition-all duration-300 ${
                         item.primary 
                           ? 'text-atom-blue font-bold text-sm sm:text-base md:text-lg' 
                           : 'text-atom-fg hover:text-atom-blue text-xs sm:text-sm md:text-base'
                       }`}
                     >
                       <motion.div 
                         className={`transition-colors ${
                           item.primary ? 'text-atom-blue' : 'text-atom-fg group-hover:text-atom-blue'
                         }`}
                         whileHover={{ rotate: 360 }}
                         transition={{ duration: 0.5 }}
                       >
                         <item.icon className={`${item.primary ? 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7' : 'h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5'}`} />
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
                     className="hidden md:block"
                   >
                     {button.name === 'Register' ? (
                       <RouterLink
                         to={button.href}
                         className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg text-white hover:bg-opacity-90 transition-all duration-300 text-xs md:text-sm ${button.className}`}
                       >
                         <motion.div
                           whileHover={{ rotate: 360 }}
                           transition={{ duration: 0.5 }}
                         >
                           <button.icon className="h-4 w-4 md:h-5 md:w-5" />
                         </motion.div>
                         <span className="hidden lg:inline">{button.name}</span>
                       </RouterLink>
                     ) : (
                       <a
                         href={button.href}
                         className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg text-white hover:bg-opacity-90 transition-all duration-300 text-xs md:text-sm ${button.className}`}
                       >
                         <motion.div
                           whileHover={{ rotate: 360 }}
                           transition={{ duration: 0.5 }}
                         >
                           <button.icon className="h-4 w-4 md:h-5 md:w-5" />
                         </motion.div>
                         <span className="hidden lg:inline">{button.name}</span>
                       </a>
                     )}
                   </motion.li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       </motion.nav>

      {/* Venue Notice Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="fixed top-12 sm:top-14 md:top-16 left-0 right-0 z-40 bg-gradient-to-r from-atom-purple to-atom-blue bg-opacity-95 backdrop-blur-sm border-b border-atom-blue border-opacity-30"
      >
        <div className="container-custom py-2 md:py-3 px-4">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center space-x-1 md:space-x-2 text-white">
              <HeartIcon className="h-4 w-4 md:h-5 md:w-5 animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-medium">
                💰 <strong>We're seeking monetary sponsorships and donations!</strong> Help us make this event amazing. 
                <a 
                  href="mailto:sponsors@cipherhacks.tech?subject=Sponsorship Inquiry" 
                  className="underline hover:text-atom-green transition-colors ml-1"
                >
                  Contact us!
                </a>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-20 sm:pt-24 sm:pb-24 md:pt-28 md:pb-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-custom text-center z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img 
              src="/logo.svg" 
              alt="CipherHacks Logo" 
              className="h-40 sm:h-48 md:h-64 lg:h-56 xl:h-64 w-auto mx-auto"
            />
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
            className="text-xl md:text-3xl text-atom-fg mb-6"
          >
            San Diego's Premier High School Hackathon
          </motion.p>
          
          {/* Combined Date and Venue Section */}
          <div className="mb-6">
            {targetDate ? (
              <div className="space-y-6">
                {/* Date and Venue Info - Centered */}
                <div className="text-lg md:text-xl text-atom-orange font-bold text-center">
                  📅 October 10-11, 2025 @ <a 
                    href="https://maps.google.com/?q=330+Park+Blvd,+San+Diego,+CA+92101" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-atom-blue hover:text-atom-green transition-colors underline"
                  >
                    San Diego Central Library Shiley Events Suite
                  </a>
                </div>
                
                {/* Countdown */}
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
                          className="bg-atom-bg bg-opacity-50 p-3 md:p-4 rounded-lg"
                        >
                          <div className="text-2xl md:text-3xl xl:text-4xl font-bold font-mono text-atom-green">{item.value}</div>
                          <div className="text-xs md:text-sm text-atom-fg">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                />
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-12 space-y-4 lg:space-y-0 text-center">
                <span className="text-2xl md:text-3xl xl:text-4xl font-bold text-atom-orange text-center">📅 October 10-11, 2025</span>
                <div className="text-lg md:text-xl text-atom-fg text-center">
                  📍 <span className="text-atom-orange font-semibold">Venue:</span> <a 
                    href="https://maps.google.com/?q=330+Park+Blvd,+San+Diego,+CA+92101" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-atom-blue hover:text-atom-green transition-colors underline"
                  >
                    San Diego Central Library Shiley Events Suite
                  </a>
                </div>
              </div>
            )}
          </div>
                     <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
             <RouterLink to="/register">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="border-2 border-atom-purple bg-atom-purple text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-lg md:text-xl hover:bg-opacity-90 transition-colors"
               >
                 Register Now
               </motion.button>
             </RouterLink>
             <RouterLink to="/sponsor">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="border-2 border-atom-blue text-atom-blue px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-lg md:text-xl hover:bg-atom-blue hover:bg-opacity-10 transition-colors"
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
                 className="border-2 border-atom-green text-atom-green px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-lg md:text-xl hover:bg-atom-green hover:bg-opacity-10 transition-colors"
               >
                 Donate
               </motion.button>
             </a>
           </div>
        </div>
        <div className={`mt-8 w-full px-4 ${terminalState === 'closed' ? 'mb-0' : 'mb-4'}`}>
          <AnimatePresence mode="wait">
            {terminalState !== 'closed' && (
              <Terminal onStateChange={setTerminalState} />
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 bg-black bg-opacity-30">
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
                {HERO_ITEMS.map((item, index) => (
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
                  key={tier.tier}
                  sponsors={tier.sponsors}
                  tier={tier.tier}
                  onSponsorClick={setSelectedSponsor}
                  isPopupOpen={selectedSponsor !== null}
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
            Meet Our Founding Team
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
                      aria-label="GitHub"
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
                      aria-label="LinkedIn"
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
                      aria-label="Twitter"
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
                      aria-label="Email"
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.links.website && (
                    <a 
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="text-atom-fg hover:text-atom-blue transition-colors"
                    >
                      <GlobeAltIcon className="h-5 w-5" />
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
                      aria-label={social.name}
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
