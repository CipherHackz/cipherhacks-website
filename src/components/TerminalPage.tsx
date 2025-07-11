import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Command {
  name: string;
  description: string;
  usage?: string;
  action: (args: string[]) => string | Promise<string>;
}

const ASCII_ART = {
  logo: `
   ██████╗██╗██████╗ ██╗  ██╗███████╗██████╗ ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗
  ██╔════╝██║██╔══██╗██║  ██║██╔════╝██╔══██╗██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝
  ██║     ██║██████╔╝███████║█████╗  ██████╔╝███████║███████║██║     █████╔╝ ███████╗
  ██║     ██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗██╔══██║██╔══██║██║     ██╔═██╗ ╚════██║
  ╚██████╗██║██║     ██║  ██║███████╗██║  ██║██║  ██║██║  ██║╚██████╗██║  ██╗███████║
   ╚═════╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝
                                                                       v1.0.0-beta
  `,
  rocket: `
    🚀
   /|\\
  / | \\
 /  |  \\
|   |   |
 '--|--'
    |
    |
  `,
  hack: `
   _    _          _____ _  __
  | |  | |   /\\   / ____| |/ /
  | |__| |  /  \\ | |    | ' / 
  |  __  | / /\\ \\| |    |  <  
  | |  | |/ ____ \\ |____| . \\ 
  |_|  |_/_/    \\_\\_____|_|\\_\\
  `,
  
};

const makeClickable = (text: string) => {
  // Convert URLs to clickable links with special formatting
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="text-atom-blue hover:underline cursor-pointer">$1</a>'
  );
};

const COMMANDS: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    action: () => `Available commands:
${COMMANDS.map(cmd => `  ${cmd.name.padEnd(15)} - ${cmd.description}`).join('\n')}

Type 'info <command>' for more details about a specific command.`,
  },
  {
    name: 'info',
    description: 'Get detailed information about a command',
    action: (args) => {
      const commandName = args[0];
      const command = COMMANDS.find(c => c.name === commandName);
      if (!command) {
        return `Command not found: ${commandName}. Type "help" for available commands.`;
      }
      return `Command: ${command.name}
Description: ${command.description}
Usage: ${command.name} ${command.usage || ''}`;
    }
  },
  {
    name: 'about',
    description: 'Learn about CipherHacks',
    action: () => makeClickable(`${ASCII_ART.logo}
CipherHacks is San Diego's premier high school hackathon, focusing on cybersecurity and innovation.
Join us for an unforgettable weekend of coding, learning, and building alongside fellow students 
passionate about technology.

🗓️ Date: Tentatively October 4-5, 2025
📍 Location: TBD - We're seeking venue sponsors! (San Diego, CA)
💻 Format: In-person hackathon
🎯 Focus: Cybersecurity & Computer Science
👥 Who: High school students in San Diego

Visit our website: https://cipherhacks.tech
Follow us on Instagram: https://instagram.com/cipherhacks2025
`)
  },
  {
    name: 'status',
    description: 'Check current event status',
    action: () => makeClickable(`🚀 CipherHacks 2025 Status:

Registration: Not yet open
Interest Form: OPEN - https://cipherhacks.tech/register
Location: TBD - We're actively seeking venue sponsors!
Date: Tentatively set for October 4-5, 2025
Sponsorships: Open for discussion

Want to stay updated? Fill out the interest form!`)
  },
  {
    name: 'register',
    description: 'Get registration information',
    action: () => makeClickable(`${ASCII_ART.rocket}
🎉 Registration Status: Coming Soon!

While registration isn't open yet, you can:
1. Fill out our interest form: https://cipherhacks.tech/register
2. Follow us on social media for updates

We'll notify you as soon as registration opens!`)
  },
  {
    name: 'schedule',
    description: 'View event schedule (TBA)',
    action: () => `📅 Schedule Status: To Be Announced

The detailed schedule will be released closer to the event date.
We're working hard to create an exciting lineup of:
- Engaging workshops
- Technical talks
- Fun activities
- Networking sessions
- And more!

Stay tuned for updates! Use 'notify' command to sign up for notifications.`
  },
  {
    name: 'faq',
    description: 'View frequently asked questions',
    action: () => makeClickable(`❓ Frequently Asked Questions:

Q: Who can participate?
A: Any high school student in the San Diego area! No coding experience required.

Q: How much does it cost?
A: CipherHacks is completely FREE thanks to our sponsors!

Q: Do I need a team?
A: Nope! You can come solo and form a team during our team formation event.

Q: What should I bring?
A: Laptop, charger, student ID, and enthusiasm for learning!

Q: Will there be food?
A: Yes! We provide all meals and snacks during the event.

More questions? Email us: team@cipherhacks.tech`)
  },
  {
    name: 'sponsors',
    description: 'View sponsorship information',
    action: () => makeClickable(`💎 Sponsorship Opportunities

Interested in sponsoring? We'd love to have you join us in empowering the next generation
of cybersecurity professionals and innovators!

Benefits include:
- Brand exposure to talented high school students
- Recruitment opportunities
- Community impact
- Tax deductions (through Hack Club's 501(c)(3) status)

Contact us:
- Email: sponsors@cipherhacks.tech
- Visit: https://cipherhacks.tech/sponsor`)
  },
  {
    name: 'team',
    description: 'Meet the organizing team',
    action: () => makeClickable(`👥 CipherHacks Team:

Arshan Shokoohi
Role: Creator of CipherHacks
About: Senior at Rancho Bernardo High School
GitHub: https://github.com/arshansgithub
LinkedIn: https://www.linkedin.com/in/arshanshokoohi/
Website: https://arshan.dev

Kevin Wang
Role: Team Member
About: Senior at Rancho Bernardo High School

Aaran Chalal
Role: Team Member
About: Sophomore at Rancho Bernardo High School

Want to join the team? Email us at team@cipherhacks.tech`)
  },
  {
    name: 'notify',
    description: 'Sign up for notifications',
    action: () => makeClickable(`🔔 Stay Updated!

Choose how you'd like to receive updates:
1. Fill out the interest form: https://cipherhacks.tech/register
2. Follow on Instagram: @cipherhacks2025

We'll notify you about:
- Registration opening
- Schedule updates
- Workshop announcements
- Important deadlines`)
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    action: () => ''
  },
  {
    name: 'whoami',
    description: 'Display current user',
    action: () => 'hacker@cipherhacks'
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    action: () => '/home/hacker/cipherhacks'
  },
  {
    name: 'ls',
    description: 'List directory contents',
    action: () => `drwxr-xr-x  2 hacker  cipherhacks  4096 Oct  4 09:00 about
drwxr-xr-x  2 hacker  cipherhacks  4096 Oct  4 09:00 schedule
drwxr-xr-x  2 hacker  cipherhacks  4096 Oct  4 09:00 register
drwxr-xr-x  2 hacker  cipherhacks  4096 Oct  4 09:00 sponsors
-rw-r--r--  1 hacker  cipherhacks  1337 Oct  4 09:00 README.md
-rwxrwxrwx  1 root    cipherhacks   666 Oct  4 13:37 .hidden`
  },
  {
    name: 'nmap',
    description: 'Network discovery and security auditing',
    action: (args) => {
      if (args.length === 0) {
        return `nmap: At least one host must be specified
Usage: nmap [target]
Try 'nmap localhost' or 'nmap -sS target' for stealth scan`;
      }
      const target = args[0];
      if (target === 'localhost' || target === '127.0.0.1') {
        return `Starting Nmap scan on ${target}...

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
1337/tcp open  elite-hacker-port
8080/tcp open  http-proxy

Nmap done: 1 IP address scanned, encrypted payloads detected.
Advanced hackers should inspect browser console for hidden transmissions.`;
      }
      return `Scanning ${target}... Permission denied. Target may be protected by advanced security measures.`;
    }
  },
  {
    name: 'cat',
    description: 'Display file contents',
    action: (args) => {
      if (args.length === 0) {
        return 'cat: missing file operand';
      }
      const filename = args[0];
      if (filename === '.hidden') {
        return `# CLASSIFIED SECURITY BRIEFING
# Access Level: Elite Hacker
#
# Subject: Advanced Penetration Testing Protocols
# Date: October 4, 2025
#
# The following are hints for dedicated security researchers:
#
# 1. Terminal boot sequences may contain Base64 encoded intelligence
# 2. Browser inspection tools reveal obfuscated cipher challenges  
# 3. Network scanning activates CSS-based steganographic protocols
# 4. ROT13 is an ancient cipher, but still useful for modern challenges
#
# Remember: True hackers don't just read source code - they reverse engineer!
# 
# Encrypted Message: PvcureUnpxf{G3zu_Jbex_Qbar_Jryy}
# (Hint: This message uses a simple substitution cipher)`;
      }
      return `cat: ${filename}: No such file or directory`;
    }
  },
];

interface Props {
  onClose: () => void;
}

const TerminalPage: React.FC<Props> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    `${ASCII_ART.logo}`,
    'Welcome to CipherHacks CLI! Type "help" to get started.',
    'Current user: hacker@cipherhacks:/home/hacker/cipherhacks$'
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    ].filter(Boolean); // Remove empty lines from clear command
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
          onClick={onClose}
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
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-atom-bg bg-opacity-50">
        <div className="flex items-center space-x-2">
          <span className="text-atom-blue">hacker@cipherhacks:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-atom-green font-mono"
            autoFocus
          />
        </div>
      </form>
    </motion.div>
  );
};

export default TerminalPage; 