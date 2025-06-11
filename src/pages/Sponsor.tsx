import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CheckIcon,
  UserGroupIcon,
  GlobeAmericasIcon,
  LightBulbIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ArrowDownIcon,
  ChevronDoubleDownIcon
} from '@heroicons/react/24/outline';

const BenefitCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-atom-blue border-opacity-20"
  >
    <Icon className="h-8 w-8 text-atom-blue mb-4" />
    <h3 className="text-xl font-bold text-atom-blue mb-2">{title}</h3>
    <p className="text-atom-fg">{description}</p>
  </motion.div>
);

const SponsorTierCard: React.FC<{
  tier: string;
  amount: string;
  color: string;
  benefits: string[];
  icon: string;
}> = ({ tier, amount, color, benefits, icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border-2 ${color} h-full`}
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="text-4xl">{icon}</span>
      <h3 className={`text-4xl font-mono font-bold ${color}`}>{tier}</h3>
    </div>
    <p className={`text-2xl font-mono mb-8 ${color}`}>{amount}</p>
    <ul className="space-y-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <CheckIcon className={`h-6 w-6 ${color}`} />
          <span className="text-atom-fg">{benefit}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Sponsor: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Load Tally script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.Tally) {
        // @ts-ignore
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sponsorBenefits = [
    {
      icon: UserGroupIcon,
      title: "Talent Recruitment",
      description: "Connect with passionate high school students early in their tech journey. Build your talent pipeline and identify potential future interns and employees."
    },
    {
      icon: GlobeAmericasIcon,
      title: "Brand Awareness",
      description: "Showcase your brand to hundreds of young, tech-savvy students, their families, and the broader San Diego tech community."
    },
    {
      icon: LightBulbIcon,
      title: "Product Feedback",
      description: "Get real-time feedback on your products or APIs from fresh perspectives. See how the next generation interacts with your technology."
    },
    {
      icon: BriefcaseIcon,
      title: "Community Impact",
      description: "Make a lasting impact on tech education in San Diego. Help create opportunities for students to learn, grow, and explore cybersecurity."
    },
    {
      icon: RocketLaunchIcon,
      title: "Innovation Insights",
      description: "Witness emerging technology trends and innovative solutions firsthand. See what the next generation of developers is creating."
    },
    {
      icon: DocumentTextIcon,
      title: "Tax Benefits",
      description: "As a registered 501(c)(3) non-profit organization, your sponsorship is tax-deductible to the extent allowed by law, providing financial benefits while supporting education."
    }
  ];

  const sponsorTiers = [
    {
      tier: "SILVER",
      amount: "UP TO $500",
      color: "text-gray-300 border-gray-300",
      icon: "🥈",
      benefits: [
        "Logo on website & shirt",
        "Table at event",
        "Shoutout on social media",
        "Awards ceremony mention"
      ]
    },
    {
      tier: "GOLD",
      amount: "UP TO $1000",
      color: "text-yellow-400 border-yellow-400",
      icon: "🏅",
      benefits: [
        "Logo on website & shirt",
        "Table at event",
        "Workshop or tech talk",
        "Shoutout on social media",
        "Awards ceremony mention"
      ]
    },
    {
      tier: "DIAMOND",
      amount: "UP TO $2000",
      color: "text-blue-400 border-blue-400",
      icon: "💎",
      benefits: [
        "Large print logo on website & shirt",
        "Table at event",
        "2x Workshop or tech talk",
        "Shoutout on social media",
        "Awards ceremony mention",
        "API/Product Demo",
        "API/Product Challenge"
      ]
    },
    {
      tier: "PARTNER",
      amount: "ABOVE $2000",
      color: "text-purple-400 border-purple-400",
      icon: "🤝",
      benefits: [
        "Large print logo on website & shirt",
        "Table at event",
        "2x Workshop or tech talk",
        "Shoutout on social media",
        "Awards ceremony mention",
        "API/Product Demo",
        "API/Product Challenge",
        "Access to resumes (opt-in)",
        '"Presented by" Naming Rights'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-atom-bg">
      <Link 
        to="/"
        className="fixed top-4 left-4 z-10 inline-flex items-center text-atom-blue hover:text-atom-purple transition-colors bg-black bg-opacity-50 px-4 py-2 rounded-lg"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      {/* Floating Action Button */}
      <motion.button
        onClick={scrollToForm}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, -10, 0]
        }}
        transition={{ 
          opacity: { delay: 1 },
          y: { 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
        className="fixed bottom-8 right-8 z-50 p-4 bg-atom-purple text-white rounded-full shadow-lg hover:bg-opacity-90 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDoubleDownIcon className="h-6 w-6" />
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Skip to Form
        </div>
      </motion.button>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold text-atom-blue mb-6">Sponsor CipherHacks 2025</h1>
          <p className="text-xl text-atom-fg max-w-3xl mx-auto">
            Join us in empowering the next generation of cybersecurity professionals. CipherHacks is San Diego's premier high school hackathon, 
            bringing together passionate students for 48 hours of learning, building, and innovation in cybersecurity.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { label: "Expected Participants", value: "80+" },
            { label: "Hours of Hacking", value: "48" },
            { label: "Estimated Budget", value: "$5K" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-black bg-opacity-20 rounded-xl">
              <h3 className="text-4xl font-bold text-atom-green mb-2">{stat.value}</h3>
              <p className="text-atom-fg text-lg">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Why Sponsor Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-atom-blue text-center mb-12">Why Sponsor CipherHacks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BenefitCard {...benefit} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsorship Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-atom-blue text-center mb-4">Sponsorship Tiers</h2>
          <p className="text-center text-atom-fg mb-12">
            Choose the tier that best fits your organization's goals. Need something custom?{' '}
            <a href="mailto:sponsors@cipherhacks.tech" className="text-atom-blue hover:underline">
              Let's talk!
            </a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SponsorTierCard {...tier} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-atom-blue mb-8">Ready to Support the Future?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a 
              href="/files/CipherHacks_2025_Sponsorship_Prospectus.pdf" 
              target="_blank"
              className="inline-flex items-center px-6 py-3 bg-atom-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Download Prospectus
            </a>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-atom-fg"
            >
              <ArrowDownIcon className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black bg-opacity-20 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-atom-blue text-center mb-4">Become a Sponsor</h2>
          <p className="text-center text-atom-fg mb-8">
            Fill out the form below and we'll get back to you within 24 hours to discuss next steps.
          </p>
          <div style={{ position: 'relative', width: '100%', height: '1200px' }}>
            <iframe
              src="https://tally.so/embed/mDEdV5"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="CipherHacks 2025 Sponsor Form"
              style={{
                border: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default Sponsor; 