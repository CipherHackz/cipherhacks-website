import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
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
  XMarkIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

// Set this to a Date object for a real countdown, or null for TBD
const targetDate: Date | null = null; // Example: new Date('2024-08-10T09:00:00')

// Add this interface near the top of the file
interface SponsorInfo {
  name: string;
  description: string;
  website?: string;
  contribution?: string;
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const Terminal: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = '> Welcome to CipherHacks 2025\n> Initializing hackathon sequence...\n> Loading innovation modules...\n> Preparing for 48 hours of coding...\n> System ready. Let\'s hack! 🚀';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black bg-opacity-80 p-4 rounded-lg font-mono text-sm md:text-base w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center mb-2 space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="text-atom-green whitespace-pre-wrap">{text}</pre>
    </motion.div>
  );
};

const StatCard: React.FC<{ icon: any; title: string; value: string }> = ({ icon: Icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-atom-bg p-6 rounded-lg shadow-xl border border-atom-blue border-opacity-20"
  >
    <Icon className="h-8 w-8 text-atom-blue mb-4" />
    <h3 className="text-xl font-bold text-atom-purple mb-2">{title}</h3>
    <p className="text-2xl font-bold text-atom-green">{value}</p>
  </motion.div>
);

// Add this component near other component definitions
const SponsorPopup: React.FC<{
  sponsor: SponsorInfo;
  onClose: () => void;
}> = ({ sponsor, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
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

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorInfo | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this example sponsor data
  const sponsorTiers = [
    {
      tier: "Diamond",
      cols: 4,
      sponsors: [
        { name: "Example Corp", description: "Leading technology company focused on innovation.", website: "https://example.com", contribution: "Main Venue Sponsor" },
        { name: "Tech Giant", description: "Global tech leader supporting young developers.", website: "https://example.com", contribution: "Prize Pool Sponsor" },
        { name: "Future Labs", description: "Research and development company investing in education.", website: "https://example.com", contribution: "Workshop Provider" },
        { name: "Innovation Co", description: "Startup accelerator and tech education advocate.", website: "https://example.com", contribution: "Mentorship Program" }
      ]
    },
    {
      tier: "Gold",
      cols: 6,
      sponsors: Array(6).fill(null).map((_, i) => ({
        name: `Gold Sponsor ${i + 1}`,
        description: "Supporting sponsor providing valuable resources and mentorship.",
        website: "https://example.com"
      }))
    },
    {
      tier: "Silver",
      cols: 8,
      sponsors: Array(8).fill(null).map((_, i) => ({
        name: `Silver Sponsor ${i + 1}`,
        description: "Community sponsor helping make this event possible.",
        website: "https://example.com"
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-atom-bg">
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center relative py-20 pt-24"
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
            <CodeBracketIcon className="h-20 w-20 text-atom-blue mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-atom-blue mb-4 tracking-tight"
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
          <div className="text-4xl font-mono text-atom-green mb-8">
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
              <span className="text-3xl md:text-4xl font-bold text-atom-orange">Date: TBD</span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <RouterLink to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-atom-purple text-white px-8 py-3 rounded-lg text-xl hover:bg-opacity-90 transition-colors"
              >
                Register Now
              </motion.button>
            </RouterLink>
            <RouterLink to="/sponsor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-atom-blue text-atom-blue px-8 py-3 rounded-lg text-xl hover:bg-atom-blue hover:bg-opacity-10 transition-colors"
              >
                Sponsor Us
              </motion.button>
            </RouterLink>
          </div>
        </div>
        <div className="mt-12 w-full px-4">
          <Terminal />
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
            {[
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
            ].map((feature, index) => (
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
                <div className="flex items-center space-x-3 text-atom-green">
                  <CalendarIcon className="h-6 w-6" />
                  <span>Date TBD</span>
                </div>
                <div className="flex items-center space-x-3 text-atom-green">
                  <MapPinIcon className="h-6 w-6" />
                  <span>Venue TBD</span>
                </div>
                <div className="flex items-center space-x-3 text-atom-green">
                  <CommandLineIcon className="h-6 w-6" />
                  <span>All Skill Levels Welcome</span>
                </div>
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
                {[
                  { emoji: '🚀', text: 'Hands-on workshops led by industry experts' },
                  { emoji: '💡', text: 'One-on-one mentorship from tech professionals' },
                  { emoji: '🏆', text: 'Exciting prizes and swag for winners' },
                  { emoji: '🤝', text: 'Networking with fellow tech enthusiasts' },
                  { emoji: '🍕', text: 'Delicious meals and refreshments' },
                  { emoji: '🎮', text: 'Fun activities and mini-events' },
                ].map((item, index) => (
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
            {[
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
            ].map((faq, index) => (
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
            Our Sponsors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl mb-12"
          >
            Join these amazing organizations in supporting the next generation of innovators
          </motion.p>
          <div className="space-y-12">
            {sponsorTiers.map((tier) => (
              <div key={tier.tier} className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-center text-atom-orange"
                >
                  {tier.tier} Sponsors
                </motion.h3>
                <div 
                  className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-${tier.cols} gap-4 px-4`}
                  style={{
                    gridTemplateColumns: `repeat(${tier.cols}, minmax(0, 1fr))`
                  }}
                >
                  {tier.sponsors.map((sponsor, i) => (
                    <motion.div
                      key={sponsor.name}
                      layoutId={`sponsor-${sponsor.name}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedSponsor(sponsor)}
                      className={`
                        flex items-center justify-center p-4
                        bg-black bg-opacity-50 rounded-lg
                        border-2 border-atom-fg border-opacity-10
                        cursor-pointer transition-all duration-300
                        hover:border-atom-blue hover:border-opacity-50
                        ${tier.tier === 'Diamond' ? 'aspect-video' : tier.tier === 'Gold' ? 'aspect-[4/3]' : 'aspect-[3/2]'}
                      `}
                    >
                      <span className="text-atom-fg opacity-50 text-center">
                        {sponsor.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xl mb-6">
              Interested in sponsoring? Contact us at{" "}
              <a href="mailto:sponsors@cipherhacks.tech" className="text-atom-blue hover:underline">
                sponsors@cipherhacks.tech
              </a>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-atom-blue bg-opacity-20 text-atom-blue px-8 py-3 rounded-lg text-xl hover:bg-opacity-30 transition-colors"
            >
              Download Sponsor Packet
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Sponsor Popup */}
      <AnimatePresence>
        {selectedSponsor && (
          <SponsorPopup
            sponsor={selectedSponsor}
            onClose={() => setSelectedSponsor(null)}
          />
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black bg-opacity-30">
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
                <a href="mailto:team@cipherhacks.tech" className="text-atom-blue hover:underline">
                  team@cipherhacks.tech
                </a>
              </p>
              <div className="flex justify-center space-x-8">
                {[
                  {
                    name: "GitHub",
                    icon: CodeBracketIcon,
                    link: "https://github.com/cipherhackz"
                  },
                  {
                    name: "Instagram",
                    icon: InstagramIcon,
                    link: "https://instagram.com/cipherhacks2025"
                  },
                  {
                    name: "Email",
                    icon: EnvelopeIcon,
                    link: "mailto:team@cipherhacks.tech"
                  }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-atom-fg hover:text-atom-blue transition-colors"
                  >
                    <social.icon className="h-8 w-8" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className={`w-full backdrop-blur-sm transition-all duration-300 ${
          scrolled ? 'bg-atom-bg bg-opacity-90 shadow-lg' : 'bg-transparent'
        }`}>
          <div className="container-custom">
            <div className="flex items-center justify-center h-16 px-4">
              <ul className="flex items-center space-x-8">
                {[
                  { name: 'CipherHacks', icon: CodeBracketIcon, to: 'hero', primary: true },
                  { name: 'About', icon: UserGroupIcon, to: 'about' },
                  { name: 'FAQ', icon: QuestionMarkCircleIcon, to: 'faq' },
                  { name: 'Sponsors', icon: HeartIcon, to: 'sponsors' },
                  { name: 'Contact', icon: RocketLaunchIcon, to: 'contact' }
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <ScrollLink
                      to={item.to}
                      smooth={true}
                      duration={500}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg group transition-all duration-300 ${
                        item.primary 
                          ? 'text-atom-blue font-bold text-lg' 
                          : 'text-atom-fg hover:text-atom-blue'
                      }`}
                    >
                      <motion.div 
                        className={`transition-colors ${
                          item.primary ? 'text-atom-blue' : 'text-atom-fg group-hover:text-atom-blue'
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className={`${item.primary ? 'h-7 w-7' : 'h-5 w-5'}`} />
                      </motion.div>
                      <span className={`${scrolled ? 'opacity-100' : 'opacity-90'}`}>
                        {item.name}
                      </span>
                    </ScrollLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default App;
