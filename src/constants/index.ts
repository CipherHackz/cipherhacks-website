import { ComponentType } from 'react';
import {
  CalendarIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  HeartIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  TrophyIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

// Event Details
export const EVENT_DATE: Date | null = new Date('2025-10-04T09:00:00'); // Example: new Date('2024-08-10T09:00:00')
export const EVENT_LOCATION = 'Venue TBD';

// ASCII Art
export const ASCII_ART = {
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

// Terminal Text Animation System
const TERMINAL_MESSAGES = {
  bootCommands: [
    '$ ./launch_cipherhacks.sh',
    '$ sudo hack init --force',
    '$ chmod 777 imagination.py',
    '$ npm install @cipherhacks/awesome',
    '$ git commit -m "Initial chaos"',
    '$ docker run -d awesome-sauce',
  ],
  bootMessages: [
    '[INFO] Booting up CipherHacks 2025...',
    '[INFO] Initializing hackathon protocols...',
    '[INFO] Loading creative modules...',
    '[INFO] Preparing for epicness...',
    '[INFO] Starting up the matrix...',
    '[INFO] Q2lwaGVySGFja3N7UjByMTNuVF80X04zdzNSX1MzY3VyMXR5fQ== decryption module loaded...',
  ],
  hackerStats: [
    '[DEBUG] Found 1337 potential hackers in San Diego',
    '[DEBUG] Detected 42 coding wizards nearby',
    '[DEBUG] Scanning for caffeine-powered humans...',
    '[DEBUG] Located 404 sleep-deprived developers',
    '[DEBUG] Identified 101 future tech leaders',
  ],
  supplies: [
    '[SYSTEM] Loading caffeine supplies... ☕️',
    '[SYSTEM] Checking pizza reserves... 🍕',
    '[SYSTEM] Calculating energy drink levels... ⚡️',
    '[SYSTEM] Monitoring snack inventory... 🍪',
    '[SYSTEM] Preparing midnight ramen... 🍜',
  ],
  techModules: [
    '[DEBUG] Quantum encryption: ACTIVE',
    '[DEBUG] Neural networks: TRAINING',
    '[DEBUG] Blockchain: CHUNKY',
    '[DEBUG] AI models: SASSY',
    '[DEBUG] Cloud servers: FLUFFY',
    '[DEBUG] Firewalls: SPICY',
  ],
  memeStatus: [
    '[DEBUG] Memes: DANK',
    '[DEBUG] Meme quality: OVER 9000',
    '[DEBUG] Reddit integration: POGGERS',
    '[DEBUG] Joke module: DAD MODE',
    '[DEBUG] Vibes: IMMACULATE',
  ],
  funFeatures: [
    '[SYSTEM] Activating anti-gravity field...',
    '[SYSTEM] Engaging rubber duck debugger...',
    '[SYSTEM] Downloading more RAM...',
    '[SYSTEM] Feeding the code monkeys...',
    '[SYSTEM] Reticulating splines...',
  ],
  successMessages: [
    '[SUCCESS] Hack mode: ENABLED',
    '[SUCCESS] Maximum effort: ACTIVATED',
    '[SUCCESS] Beast mode: ENGAGED',
    '[SUCCESS] Pro gamer mode: ON',
    '[SUCCESS] Galaxy brain: EXPANDED',
  ],
  timeWarnings: [
    '[INFO] T-minus 48 hours until pure coding chaos',
    '[INFO] 172800 seconds of pure innovation ahead',
    '[INFO] Preparing for 2880 minutes of awesomeness',
    '[INFO] Time until coffee dependency: imminent',
  ],
  sleepReminders: [
    '[SYSTEM] Remember: Sleep is for the weak! (jk, please sleep)',
    '[SYSTEM] Warning: Excessive coding may cause spontaneous genius',
    '[SYSTEM] Fun fact: Bugs fear well-rested developers',
    '[SYSTEM] PSA: Sleeping occasionally improves code quality',
    '[SYSTEM] Note: Dreams are just offline coding sessions',
  ],
  finalCommands: [
    '$ echo "Ready to hack the planet? 🚀"',
    '$ echo "Time to show them what you got! 💪"',
    '$ echo "Let the games begin! 🎮"',
    '$ echo "May the code be with you! ⭐"',
    '$ echo "Challenge accepted! 🔥"',
  ],
};

const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const generateTerminalText = () => {
  return [
    getRandomMessage(TERMINAL_MESSAGES.bootCommands),
    getRandomMessage(TERMINAL_MESSAGES.bootMessages),
    getRandomMessage(TERMINAL_MESSAGES.hackerStats),
    getRandomMessage(TERMINAL_MESSAGES.supplies),
    getRandomMessage(TERMINAL_MESSAGES.supplies),
    getRandomMessage(TERMINAL_MESSAGES.techModules),
    getRandomMessage(TERMINAL_MESSAGES.techModules),
    getRandomMessage(TERMINAL_MESSAGES.memeStatus),
    getRandomMessage(TERMINAL_MESSAGES.funFeatures),
    getRandomMessage(TERMINAL_MESSAGES.successMessages),
    getRandomMessage(TERMINAL_MESSAGES.timeWarnings),
    getRandomMessage(TERMINAL_MESSAGES.sleepReminders),
    getRandomMessage(TERMINAL_MESSAGES.finalCommands),
  ].join('\n');
};

export const TERMINAL_TEXT = generateTerminalText();

// Navigation Items
export const NAV_ITEMS = [
  { name: 'CipherHacks', icon: CodeBracketIcon, to: 'hero', primary: true, className: 'hidden lg:flex' },
  { name: 'About', icon: InformationCircleIcon, to: 'about', className: 'flex' },
  { name: 'FAQ', icon: QuestionMarkCircleIcon, to: 'faq', className: 'flex' },
  { name: 'Sponsors', icon: HeartIcon, to: 'sponsors', className: 'flex' },
  { name: 'Team', icon: UserGroupIcon, to: 'team', className: 'flex' },
  { name: 'Contact', icon: RocketLaunchIcon, to: 'contact', className: 'flex' }
];

export const NAV_ACTION_BUTTONS = [
  {
    name: 'Donate',
    icon: HeartIcon,
    href: 'https://cipherhacks.tech/donate',
    className: 'bg-atom-purple'
  },
  {
    name: 'Sponsor',
    icon: DocumentTextIcon,
    href: 'https://cipherhacks.tech/sponsor',
    className: 'bg-atom-green'
  },
  {
    name: 'Register',
    icon: UserGroupIcon,
    href: '/register',
    className: 'bg-atom-blue'
  }
];

// Features Section
export const FEATURES = [
  {
    icon: ShieldCheckIcon,
    title: "Cybersecurity Focus",
    description: "Dive deep into the world of cybersecurity. Learn about encryption, network security, and ethical hacking from industry experts.",
    color: "text-atom-green"
  },
  {
    icon: UserGroupIcon,
    title: "Beginner Friendly",
    description: "New to coding or cybersecurity? No problem! We'll provide workshops, mentorship, and resources to help you succeed.",
    color: "text-atom-blue"
  },
  {
    icon: LightBulbIcon,
    title: "Learn & Build",
    description: "Get hands-on experience with real-world security tools and technologies while building your own innovative solutions.",
    color: "text-atom-orange"
  },
  {
    icon: TrophyIcon,
    title: "Amazing Prizes",
    description: "Compete for exciting prizes while gaining valuable experience and networking with industry professionals.",
    color: "text-atom-purple"
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: "Expert Mentorship",
    description: "Connect with experienced mentors from leading tech companies who will guide you throughout the hackathon.",
    color: "text-atom-cyan"
  },
  {
    icon: RocketLaunchIcon,
    title: "Launch Your Journey",
    description: "Kickstart your journey in tech and cybersecurity. Create lasting connections and discover new opportunities.",
    color: "text-atom-blue"
  }
];

// About Section
export const ABOUT_ITEMS = [
  { icon: CalendarIcon, text: 'Tentative Date: October 4-5, 2025' },
  { icon: MapPinIcon, text: 'Venue: Currently seeking sponsors!' },
  { icon: CommandLineIcon, text: 'All Skill Levels Welcome' }
];

export const WHAT_TO_EXPECT = [
  { emoji: '🚀', text: 'Hands-on workshops led by industry experts' },
  { emoji: '💡', text: 'One-on-one mentorship from tech professionals' },
  { emoji: '🏆', text: 'Exciting prizes and swag for winners' },
  { emoji: '🤝', text: 'Networking with fellow tech enthusiasts' },
  { emoji: '🍕', text: 'Delicious meals and refreshments' },
  { emoji: '🎮', text: 'Fun activities and mini-events' }
];

// FAQ Section
export const FAQ_ITEMS = [
  {
    q: "Who can participate?",
    a: "Any high school student in the San Diego area! No coding experience required. We welcome beginners and experienced coders alike."
  },
  {
    q: "What should I bring?",
    a: "Your laptop, charger, student ID, and enthusiasm for learning! We'll provide all the necessary tools and resources."
  },
  {
    q: "Is it free?",
    a: "Yes! Thanks to our generous sponsors, CipherHacks is completely free for all participants. This includes meals, swag, and access to all workshops."
  },
  {
    q: "Will there be food?",
    a: "Absolutely! We provide all meals, snacks, and drinks throughout the event. We accommodate dietary restrictions - just let us know in advance!"
  },
  {
    q: "Do I need a team?",
    a: "Not at all! You can come solo and form a team during our team formation event, or bring your own team of up to 4 members."
  },
  {
    q: "What can I build?",
    a: "Anything! The theme of this hackathon is Cybersecurity, so you can build anything related to that. Web apps, mobile apps, games, hardware projects - if you can dream it, you can build it. We'll have mentors to help guide you."
  }
];

// Sponsors Section
export interface SponsorInfo {
  name: string;
  description: string;
  website?: string;
  contribution?: string;
  logo?: string; // URL to sponsor logo image
}

export const SPONSOR_TIERS = [
  {
    tier: "PARTNER",
    color: "text-purple-400",
    icon: "🤝",
    sponsors: [
      { 
        name: "HCB", 
        description: "Hack Club is a 501(c)(3) nonprofit that supports thousands of student-run coding clubs and events worldwide. As CipherHacks' fiscal sponsor, they handle our donation processing, insurance, and financial oversight so the hackathon can stay free and accessible to every student.",
        website: "https://hackclub.com/hcb", 
        contribution: "Fiscal Sponsor",
        logo: "/sponsors/hcb-icon-icon-dark.png"
      },
      { 
        name: "PLACEHOLDER", 
        description: "PLACEHOLDER", 
        website: "https://google.com", 
        contribution: "PLACEHOLDER",
        logo: ""
      }
    ]
  },
  {
    tier: "DIAMOND",
    color: "text-blue-400",
    icon: "💎",
    sponsors: [
      { 
        name: "Example Corp", 
        description: "Leading technology company focused on innovation.", 
        website: "https://example.com", 
        contribution: "Main Venue Sponsor",
        logo: "/sponsors/example-corp-logo.png"
      },
      { 
        name: "Tech Giant", 
        description: "Global tech leader supporting young developers.", 
        website: "https://example.com", 
        contribution: "Prize Pool Sponsor",
        logo: "/sponsors/tech-giant-logo.png"
      },
      { 
        name: "Future Labs", 
        description: "Research and development company investing in education.", 
        website: "https://example.com", 
        contribution: "Workshop Provider",
        logo: "/sponsors/future-labs-logo.png"
      },
      { 
        name: "Innovation Co", 
        description: "Startup accelerator and tech education advocate.", 
        website: "https://example.com", 
        contribution: "Mentorship Program",
        logo: "/sponsors/innovation-co-logo.png"
      }
    ]
  },
  {
    tier: "GOLD",
    color: "text-yellow-400",
    icon: "🏅",
    sponsors: Array(6).fill(null).map((_, i) => ({
      name: `Gold Sponsor ${i + 1}`,
      contribution: "PLACEHOLDER",
      description: "Supporting sponsor providing valuable resources and mentorship.",
      website: "https://example.com",
      logo: `/sponsors/gold-sponsor-${i + 1}-logo.png`
    }))
  },
  {
    tier: "SILVER",
    color: "text-gray-300",
    icon: "🥈",
    sponsors: Array(2).fill(null).map((_, i) => ({
      name: `Silver Sponsor ${i + 1}`,
      contribution: "PLACEHOLDER",
      description: "Community sponsor helping make this event possible.",
      website: "https://example.com",
      logo: `/sponsors/silver-sponsor-${i + 1}-logo.png`
    })).concat([
      {
        name: "Sublime Text & Merge",
        contribution: "In-kind donation",
        description: "Sublime HQ is supporting CipherHacks with five license keys for its flagship tools, Sublime Text and Sublime Merge. These licenses will be awarded as participant prizes, giving our student coders professional-grade software for future projects.",
        website: "https://sublimetext.com",
        logo: "/sponsors/sublime_light_logos.png"
      },
      {
        name: "theCoderSchool",
        contribution: "In-kind donation",
        description: "theCoderSchool is a San Diego coding academy that gives kids and teens personalized, semi-private coaching in Python, Java, game development, and more. They're fueling CipherHacks by donating month-long class passes to our winning teams, so students can keep leveling up long after the hackathon ends.",
        website: "https://thecoderschool.com",
        logo: "/sponsors/coderschool.png"
      },
      {
        name: `O'Reilly`,
        contribution: "In-kind donation",
        description: "For over 40 years O’Reilly has provided technology and business training, knowledge, and insight to help companies succeed. Their unique network of experts and innovators share their knowledge and expertise through books, articles, and our online learning platform. O’Reilly online learning gives you on-demand access to live training courses, in-depth learning paths, interactive coding environments, certification prep materials, and a vast collection of text and video from O’Reilly and 200+ other publishers. O'Reilly is providing a free 30-day subscription to their learning platform for all attendees.",
        website: "https://www.oreilly.com/",
        logo: "/sponsors/oreilly_logo.png"
      }
    ]).concat(Array(3).fill(null).map((_, i) => ({
      name: `Silver Sponsor ${i + 1}`,
      contribution: "PLACEHOLDER",
      description: "Community sponsor helping make this event possible.",
      website: "https://example.com",
        logo: `/sponsors/silver-sponsor-${i + 1}-logo.png`
      })))
  }
];

// Contact Section
export const CONTACT_EMAIL = "team@cipherhacks.tech";

interface SocialLink {
  name: string;
  icon: ComponentType<{ className?: string }>;
  link: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    icon: CodeBracketIcon,
    link: "https://github.com/cipherhackz"
  },
  {
    name: "Instagram",
    icon: CodeBracketIcon,
    link: "https://instagram.com/cipherhacks2025"
  },
  {
    name: "Email",
    icon: EnvelopeIcon,
    link: "mailto:team@cipherhacks.tech"
  }
];

// Team Section
export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string; // URL to profile image (optional)
  gender: 'male' | 'female' | 'other';
  links: {  
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Arshan Shokoohi",
    role: "Creator of CipherHacks",
    description: "Senior at Rancho Bernardo High School, passionate about computer science, cybersecurity and making tech education accessible to all.",
    image: "/team/arshan.jpg",
    gender: "male",
    links: {
      website: "https://arshan.dev",
      github: "https://github.com/arshansgithub",
      linkedin: "https://www.linkedin.com/in/arshanshokoohi/",
      email: "arshan@cipherhacks.tech"
    }
  },
  {
    name: "Kevin Wang",
    role: "Director",
    description: "Senior at Rancho Bernardo High School, passionate about AI and computer science for social good.",
    image: "/team/kevin.png",
    gender: "male",
    links: {
      email: "kevin@cipherhacks.tech"
    }
  },
  {
    name: "Aaran Chahal",
    role: "Director",
    description: "Sophomore at Rancho Bernardo High School, passionate about computer science and AI for innovation.",
    image: "/team/aaran.jpg",
    gender: "male",
    links: {
      github: "https://github.com/a-chahal",
      email: "aaran@cipherhacks.tech"
    }
  }
];

// Terminal Commands
interface Command {
  name: string;
  description: string;
  usage?: string;
  action: (args: string[]) => string | Promise<string>;
}

export const COMMANDS: Command[] = [
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

Kevin Wang
Role: Program Director
About: Senior at Rancho Bernardo High School, passionate about AI and computer science for social good.

Aaran Chahal
Role: Director
About: Sophomore at Rancho Bernardo High School, passionate about computer science and AI for innovation.
GitHub: https://github.com/a-chahal

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
        // Add the network-scan class to body temporarily for CSS steganography
        document.body.classList.add('network-scan');
        setTimeout(() => document.body.classList.remove('network-scan'), 5000);
        return `Starting Nmap scan on ${target}...

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
1337/tcp open  elite-hacker-port
8080/tcp open  http-proxy

Nmap done: 1 IP address scanned, encrypted payloads detected in CSS layer.
Advanced hackers should inspect element styles for hidden transmissions.`;
      }
      return `Scanning ${target}... Permission denied. Target may be protected by advanced security measures.`;
    }
  },
  {
    name: 'netstat',
    description: 'Display network connections',
    action: () => {
      document.body.classList.add('security-protocol');
      setTimeout(() => document.body.classList.remove('security-protocol'), 3000);
      return `Active Internet connections:
Proto Local Address    Foreign Address   State
tcp   0.0.0.0:80       *.*               LISTEN
tcp   0.0.0.0:443      *.*               LISTEN  
tcp   127.0.0.1:1337   127.0.0.1:31415   ESTABLISHED

Warning: Unusual activity detected on port 1337.
Security protocols activated. Check CSS pseudo-elements for system diagnostics.`;
    }
  },
  {
    name: 'wireshark',
    description: 'Network protocol analyzer',
    action: () => `Wireshark-style packet capture initiated...

=== PACKET CAPTURE LOG ===
[13:37:42] TCP 192.168.1.100:1337 → 10.0.0.1:80 [SYN]
[13:37:42] HTTP GET /api/v1/flags HTTP/1.1
[13:37:43] Response: 200 OK
[13:37:43] Payload: ZmxhZ3tzM2NyM3RfaDNhZDNyX2ZvdW5kfQ==

Packet analysis complete. Base64 encoded payloads detected.
Experienced penetration testers know where to look... 🕵️‍♂️`
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

// Helper function for making text clickable
const makeClickable = (text: string) => {
  // Convert URLs to clickable links with special formatting
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="text-atom-blue hover:underline cursor-pointer">$1</a>'
  );
}; 