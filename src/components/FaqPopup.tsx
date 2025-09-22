import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  QuestionMarkCircleIcon,
  UserGroupIcon,
  GiftIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from './InstagramIcon';

interface FaqPopupProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const FaqPopup: React.FC<FaqPopupProps> = ({ isVisible, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);

  // Auto-dismiss after 10 seconds if not interacted with
  useEffect(() => {
    if (isVisible && !hasBeenExpanded) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasBeenExpanded, onDismiss]);

  const handleExpand = () => {
    setIsExpanded(true);
    setHasBeenExpanded(true);
  };

  const handleDismiss = () => {
    setIsExpanded(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 400, scale: 0.8 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.5 
        }}
        className="fixed top-[100px] right-5 z-[1000] max-w-[400px] w-[calc(100vw-40px)]"
      >
        {!isExpanded ? (
          // Compact notification view
          <motion.div
            className="relative bg-gradient-to-br from-atom-bg to-[#21252b] border-2 border-atom-blue/30 rounded-xl p-4 
                       shadow-[0_10px_25px_rgba(0,0,0,0.3),0_0_20px_rgba(97,175,239,0.1)] cursor-pointer 
                       transition-all duration-300 backdrop-blur-[10px] overflow-hidden
                       hover:border-atom-blue/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_30px_rgba(97,175,239,0.2)]
                       hover:-translate-y-0.5 max-md:m-5 max-md:rounded-2xl max-md:p-5
                       before:absolute before:top-0 before:-left-full before:w-full before:h-full 
                       before:bg-gradient-to-r before:from-transparent before:via-atom-blue/10 before:to-transparent
                       before:transition-all before:duration-500 hover:before:left-full"
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={handleExpand}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-atom-red/10 border border-atom-red/30 rounded-md p-1.5 
                         text-atom-red transition-all duration-200 flex items-center justify-center z-10
                         hover:bg-atom-red/20 hover:border-atom-red/50 hover:scale-110
                         max-sm:top-2.5 max-sm:right-2.5 max-sm:w-9 max-sm:h-9"
              aria-label="Dismiss FAQ popup"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 relative z-[1] w-full">
              <div className="relative flex-shrink-0">
                <QuestionMarkCircleIcon className="h-6 w-6 text-atom-blue z-[2] relative max-sm:h-5.5 max-sm:w-5.5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 
                               border-2 border-atom-blue rounded-full opacity-60 animate-ping
                               max-sm:w-9 max-sm:h-9"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-atom-blue mb-1 leading-tight max-sm:text-sm">
                  Quick FAQ
                </h3>
                <p className="text-sm text-atom-fg-muted leading-snug opacity-90 max-sm:text-xs">
                  Click to see registration info, prizes & more!
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          // Expanded detailed view - Full screen overlay
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleDismiss}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gradient-to-br from-atom-bg to-[#21252b] border-2 border-atom-blue/40 rounded-2xl 
                         shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(97,175,239,0.15)] backdrop-blur-[15px] 
                         w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between px-6 py-5 pb-4 border-b border-atom-blue/20 
                           bg-gradient-to-r from-atom-blue/5 to-atom-green/5 relative flex-shrink-0
                           max-md:px-5 max-md:py-5 max-md:pb-4 max-md:sticky max-md:top-0 max-md:z-10 
                           max-md:bg-gradient-to-br max-md:from-atom-bg max-md:to-[#21252b] max-md:border-b-2 max-md:border-atom-blue/30">
              <div className="flex items-center space-x-2">
                <QuestionMarkCircleIcon className="h-6 w-6 text-atom-blue" />
                <h2 className="text-xl font-bold text-atom-blue m-0 max-md:text-lg">CipherHacks FAQ</h2>
              </div>
              <button
                onClick={handleDismiss}
                className="bg-atom-red/10 border border-atom-red/30 rounded-md p-1.5 text-atom-red 
                           transition-all duration-200 flex items-center justify-center
                           hover:bg-atom-red/20 hover:border-atom-red/50 hover:scale-110"
                aria-label="Close FAQ"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-track-atom-blue/10 
                           scrollbar-thumb-atom-blue/40 hover:scrollbar-thumb-atom-blue/60
                           max-md:px-5 max-md:py-5 max-md:flex-1 max-md:overflow-y-auto">
              {/* Q&A Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-atom-blue/20">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-atom-blue" />
                  <h3 className="text-lg font-semibold text-atom-green m-0 max-md:text-base">Common Questions</h3>
                </div>
                <div className="text-atom-fg leading-relaxed">
                  <div className="flex flex-col gap-4">
                    <div className="bg-atom-bg/50 border border-atom-blue/15 rounded-lg p-4 transition-all duration-300 
                                   hover:border-atom-blue/25 hover:bg-atom-bg/70 max-md:p-3.5">
                      <h4 className="text-sm font-semibold text-atom-red mb-2.5 m-0 leading-snug max-md:text-sm max-md:mb-2">
                        Q: How can I stay updated before the event?
                      </h4>
                      <div className="text-atom-fg leading-relaxed">
                        <p className="m-0 mb-2"><strong>A:</strong> Join our official Discord for updates, team forming, and announcements:</p>
                        <a 
                          href="https://cipherhacks.tech/discord" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-atom-blue no-underline font-medium transition-all duration-200 
                                     border-b border-transparent hover:text-atom-green hover:border-atom-green"
                        >
                          https://cipherhacks.tech/discord
                        </a>
                        <p className="m-0 mt-2">Follow us on Instagram 
                          <a 
                            href="https://instagram.com/cipherhacks2025" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-atom-blue no-underline font-medium transition-all duration-200 
                                       border-b border-transparent hover:text-atom-green hover:border-atom-green ml-1"
                          >
                            @CipherHacks2025
                          </a> for live updates, funny reels, and prize announcements.
                        </p>
                      </div>
                    </div>

                    <div className="bg-atom-bg/50 border border-atom-blue/15 rounded-lg p-4 transition-all duration-300 
                                   hover:border-atom-blue/25 hover:bg-atom-bg/70 max-md:p-3.5">
                      <h4 className="text-sm font-semibold text-atom-red mb-2.5 m-0 leading-snug max-md:text-sm max-md:mb-2">
                        Q: Myself or my friends have the PSAT on the 11th. Can we attend only one day?
                      </h4>
                      <div className="text-atom-fg leading-relaxed">
                        <p className="m-0 mb-2"><strong>A:</strong> Yes. It's preferred to attend both days, but if not:</p>
                        <ul className="list-none p-0 m-0 mb-2">
                          <li className="relative pl-4 mb-1 before:content-['•'] before:absolute before:left-0 before:text-atom-blue">
                            At least one teammate MUST attend BOTH days for check in, form/register your team, to start the project, to present and submit to judges.
                          </li>
                          <li className="relative pl-4 mb-1 before:content-['•'] before:absolute before:left-0 before:text-atom-blue">
                            All other team members MUST attend ATLEAST one day.
                          </li>
                        </ul>
                        <p className="m-0">Come for whichever day(s) you can - you'll still get value and experience!</p>
                      </div>
                    </div>

                    <div className="bg-atom-bg/50 border border-atom-blue/15 rounded-lg p-4 transition-all duration-300 
                                   hover:border-atom-blue/25 hover:bg-atom-bg/70 max-md:p-3.5">
                      <h4 className="text-sm font-semibold text-atom-red mb-2.5 m-0 leading-snug max-md:text-sm max-md:mb-2">
                        Q: I have school on Friday. Do I need to skip class?
                      </h4>
                      <div className="text-atom-fg leading-relaxed">
                        <p className="m-0"><strong>A:</strong> We'd prefer if you did. Since CipherHacks is a nonprofit educational event, we provide school excusal forms at check-in. We recommend coordinating with your teachers to make up missed work or tests before/after the event.</p>
                      </div>
                    </div>

                    <div className="bg-atom-bg/50 border border-atom-blue/15 rounded-lg p-4 transition-all duration-300 
                                   hover:border-atom-blue/25 hover:bg-atom-bg/70 max-md:p-3.5">
                      <h4 className="text-sm font-semibold text-atom-red mb-2.5 m-0 leading-snug max-md:text-sm max-md:mb-2">
                        Q: What are the prizes?
                      </h4>
                      <div className="text-atom-fg leading-relaxed">
                        <p className="m-0 mb-2"><strong>A:</strong> We've confirmed a $350+ prize pool (and growing!). Prizes may include gift cards, electronics, and more. Final pools will scale based on attendees + sponsor funding.</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <InstagramIcon className="h-4 w-4" />
                          <span>Check out our Instagram 
                            <a 
                              href="https://instagram.com/cipherhacks2025" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-atom-blue no-underline font-medium transition-all duration-200 
                                         border-b border-transparent hover:text-atom-green hover:border-atom-green ml-1"
                            >
                              @CipherHacks2025
                            </a> for the latest prize reveals.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-atom-bg/50 border border-atom-blue/15 rounded-lg p-4 transition-all duration-300 
                                   hover:border-atom-blue/25 hover:bg-atom-bg/70 max-md:p-3.5">
                      <h4 className="text-sm font-semibold text-atom-red mb-2.5 m-0 leading-snug max-md:text-sm max-md:mb-2">
                        Q: Traveling to the hackathon is expensive. Are there reimbursements?
                      </h4>
                      <div className="text-atom-fg leading-relaxed">
                        <p className="m-0 mb-2"><strong>A:</strong> Yes! Thanks to Hack Club, you can apply for a gas reimbursement here:</p>
                        <a 
                          href="https://gas.hackclub.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-atom-blue no-underline font-medium transition-all duration-200 
                                     border-b border-transparent hover:text-atom-green hover:border-atom-green"
                        >
                          gas.hackclub.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Register Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-atom-blue/20">
                  <UserGroupIcon className="h-5 w-5 text-atom-purple" />
                  <h3 className="text-lg font-semibold text-atom-green m-0 max-md:text-base">Why Register?</h3>
                </div>
                <div className="text-atom-fg leading-relaxed">
                  <p className="font-medium text-atom-orange mb-3">At CipherHacks, high school students will:</p>
                  <ul className="list-none p-0 m-0 mb-4">
                    <li className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-atom-blue before:font-bold">
                      Team up to design, build, and code projects in just two days
                    </li>
                    <li className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-atom-blue before:font-bold">
                      Learn through workshops & mentorship from industry engineers
                    </li>
                    <li className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-atom-blue before:font-bold">
                      Compete for prizes across multiple categories (Beginner, Design, + Overall Top 3)
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 bg-atom-orange/10 border border-atom-orange/30 rounded-lg p-3 my-3 text-atom-orange">
                    <TrophyIcon className="h-4 w-4 text-yellow-400" />
                    <span><strong>Prize Pool:</strong> $350+ confirmed (and growing: scales with attendees + sponsors).</span>
                  </div>
                  <p className="text-sm text-atom-fg-muted italic mt-2">Prizes may include gift cards, electronics, and more.</p>
                </div>
              </div>

              {/* Referral Rewards Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-atom-blue/20">
                  <GiftIcon className="h-5 w-5 text-atom-green" />
                  <h3 className="text-lg font-semibold text-atom-green m-0 max-md:text-base">Referral Rewards</h3>
                </div>
                <div className="text-atom-fg leading-relaxed">
                  <p className="font-medium text-atom-orange mb-4">Help us make CipherHacks a success by inviting friends!</p>
                  <div className="flex flex-col gap-3 my-4">
                    <div className="flex items-start gap-3 bg-atom-green/5 border border-atom-green/20 rounded-lg p-4 
                                   transition-all duration-300 hover:bg-atom-green/8 hover:border-atom-green/30 hover:-translate-y-0.5
                                   max-md:flex-col max-md:text-center max-md:p-3">
                      <div className="text-2xl flex-shrink-0 max-md:text-4xl max-md:mb-2">🔑</div>
                      <div>
                        <h4 className="text-base font-semibold text-atom-blue mb-1.5 m-0">YubiKey Giveaway</h4>
                        <p className="text-sm text-atom-fg mb-2 leading-snug m-0">Refer 3 friends and score a free YubiKey 5 NFC ($50 value)!</p>
                        <RouterLink to="/referral" className="text-atom-blue no-underline font-medium transition-all duration-200 
                                                           border-b border-transparent hover:text-atom-green hover:border-atom-green">
                          cipherhacks.tech/referral
                        </RouterLink>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-atom-orange/5 border border-atom-orange/20 rounded-lg p-4 
                                   transition-all duration-300 hover:bg-atom-orange/8 hover:border-atom-orange/30 hover:-translate-y-0.5
                                   max-md:flex-col max-md:text-center max-md:p-3">
                      <div className="text-2xl flex-shrink-0 max-md:text-4xl max-md:mb-2">🌯</div>
                      <div>
                        <h4 className="text-base font-semibold text-atom-blue mb-1.5 m-0">Chipotle Raffle</h4>
                        <p className="text-sm text-atom-fg mb-2 leading-snug m-0">First 10 people with 5 successful referrals are entered into a raffle for a free Chipotle entree.</p>
                        <RouterLink to="/chipotle" className="text-atom-blue no-underline font-medium transition-all duration-200 
                                                           border-b border-transparent hover:text-atom-green hover:border-atom-green">
                          cipherhacks.tech/chipotle
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-atom-fg-muted italic mt-2">Every registration helps us secure more sponsor funding → bigger prizes and a better event for everyone.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-5 pt-4 border-t border-atom-blue/20 
                             max-md:flex-col max-md:gap-3 max-md:p-5 max-md:-mx-5 max-md:-mb-5 
                             max-md:bg-atom-bg/50 max-md:border-t-2 max-md:border-atom-blue/20">
                <RouterLink 
                  to="/register" 
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium 
                           no-underline transition-all duration-300 flex-1 text-sm
                           bg-gradient-to-r from-atom-blue to-atom-green text-white
                           hover:from-[#4a9eff] hover:to-[#7fb069] hover:-translate-y-0.5 
                           hover:shadow-[0_4px_12px_rgba(97,175,239,0.3)]
                           max-md:px-4 max-md:py-3.5 max-md:text-base max-md:font-semibold"
                >
                  <UserGroupIcon className="h-4 w-4" />
                  Register Now
                </RouterLink>
                <a 
                  href="https://cipherhacks.tech/discord" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium 
                           no-underline transition-all duration-300 flex-1 text-sm
                           bg-atom-blue/10 text-atom-blue border border-atom-blue/30
                           hover:bg-atom-blue/20 hover:border-atom-blue/50 hover:-translate-y-0.5
                           max-md:px-4 max-md:py-3.5 max-md:text-base max-md:font-semibold"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  Join Discord
                </a>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FaqPopup;
