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
} from '@heroicons/react/24/outline';

// Event Details
export const EVENT_DATE: Date | null = null; // Example: new Date('2024-08-10T09:00:00')
export const EVENT_LOCATION = 'Venue TBD';

// Terminal Text Animation
export const TERMINAL_TEXT = `> Welcome to CipherHacks 2025\n> Initializing hackathon sequence...\n> Loading innovation modules...\n> Preparing for 48 hours of coding...\n> System ready. Let's hack! 🚀`;

// Navigation Items
export const NAV_ITEMS = [
  { name: 'CipherHacks', icon: CodeBracketIcon, to: 'hero', primary: true, className: 'hidden lg:flex' },
  { name: 'About', icon: UserGroupIcon, to: 'about', className: 'flex' },
  { name: 'FAQ', icon: QuestionMarkCircleIcon, to: 'faq', className: 'flex' },
  { name: 'Sponsors', icon: HeartIcon, to: 'sponsors', className: 'flex' },
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
  { icon: CalendarIcon, text: 'Date TBD' },
  { icon: MapPinIcon, text: 'Venue TBD' },
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
}

export const SPONSOR_TIERS = [
  {
    tier: "PARTNER",
    color: "text-purple-400",
    icon: "🤝",
    sponsors: [
      { name: "Partner Corp", description: "Leading technology company focused on innovation.", website: "https://example.com", contribution: "Title Sponsor" },
      { name: "Tech Leader", description: "Global tech leader supporting young developers.", website: "https://example.com", contribution: "Venue Sponsor" }
    ]
  },
  {
    tier: "DIAMOND",
    color: "text-blue-400",
    icon: "💎",
    sponsors: [
      { name: "Example Corp", description: "Leading technology company focused on innovation.", website: "https://example.com", contribution: "Main Venue Sponsor" },
      { name: "Tech Giant", description: "Global tech leader supporting young developers.", website: "https://example.com", contribution: "Prize Pool Sponsor" },
      { name: "Future Labs", description: "Research and development company investing in education.", website: "https://example.com", contribution: "Workshop Provider" },
      { name: "Innovation Co", description: "Startup accelerator and tech education advocate.", website: "https://example.com", contribution: "Mentorship Program" }
    ]
  },
  {
    tier: "GOLD",
    color: "text-yellow-400",
    icon: "🏅",
    sponsors: Array(6).fill(null).map((_, i) => ({
      name: `Gold Sponsor ${i + 1}`,
      description: "Supporting sponsor providing valuable resources and mentorship.",
      website: "https://example.com"
    }))
  },
  {
    tier: "SILVER",
    color: "text-gray-300",
    icon: "🥈",
    sponsors: Array(8).fill(null).map((_, i) => ({
      name: `Silver Sponsor ${i + 1}`,
      description: "Community sponsor helping make this event possible.",
      website: "https://example.com"
    }))
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