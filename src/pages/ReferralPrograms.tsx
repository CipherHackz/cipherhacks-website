import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, GiftIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const ReferralPrograms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg">
      <Link 
        to="/"
        className="absolute top-4 left-4 z-10 inline-flex items-center text-atom-blue hover:text-atom-purple transition-colors bg-black bg-opacity-50 px-4 py-2 rounded-lg"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CipherHacks 2025 Referral Programs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Invite your friends to join CipherHacks and earn amazing rewards! We have two exciting referral programs available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* YubiKey Referral Program */}
          <div className="bg-gradient-to-br from-atom-purple/20 to-atom-blue/20 backdrop-blur-sm border border-atom-purple/30 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-atom-purple/20 p-3 rounded-full mr-4">
                <GiftIcon className="h-8 w-8 text-atom-purple" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">YubiKey Referral Program</h2>
                <p className="text-atom-purple font-semibold">$50 Value!</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-atom-purple/10 border border-atom-purple/30 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">🔑 Reward: Free YubiKey NFC 5</h3>
                <p className="text-gray-300">Get a premium security key from our sponsor Yubico!</p>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">How it works:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-atom-purple mr-2">•</span>
                  Successfully refer <strong className="text-white">3 new people</strong> to register for CipherHacks
                </li>
                <li className="flex items-start">
                  <span className="text-atom-purple mr-2">•</span>
                  Fill out the referral form with your name and the 3 people you referred
                </li>
                <li className="flex items-start">
                  <span className="text-atom-purple mr-2">•</span>
                  All 3 referred participants must register AND attend the event in person with you
                </li>
                <li className="flex items-start">
                  <span className="text-atom-purple mr-2">•</span>
                  YubiKeys distributed at check-in once attendance is confirmed
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <h4 className="text-yellow-400 font-semibold mb-2">⚡ Important Notes:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Limited supply: Only ~25 YubiKeys available</li>
                <li>• First come, first served for referral groups</li>
                <li>• No sharing credit between multiple referrers</li>
                <li>• No additional prizes beyond referring 3 people</li>
              </ul>
            </div>

            <Link
              to="/referral"
              className="w-full bg-atom-purple hover:bg-atom-purple/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Submit YubiKey Referral Form
            </Link>
          </div>

          {/* Chipotle Referral Program */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500/20 p-3 rounded-full mr-4">
                <span className="text-2xl">🌯</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Chipotle Referral Program</h2>
                <p className="text-orange-400 font-semibold">$10 Value!</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">🌯 Reward: Free Chipotle Entree</h3>
                <p className="text-gray-300">Enjoy a delicious meal on us!</p>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">How it works:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Successfully refer <strong className="text-white">5 new people</strong> to register for CipherHacks
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Fill out the referral form with your name and the 5 people you referred
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  All 5 referred participants must register AND attend the event in person with you
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Entree cards distributed at check-in once attendance is confirmed
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <h4 className="text-yellow-400 font-semibold mb-2">⚡ Important Notes:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Limited to first 10 qualified participants</li>
                <li>• First come, first served for referral groups</li>
                <li>• No sharing credit between multiple referrers</li>
                <li>• No additional prizes beyond referring 5 people</li>
              </ul>
            </div>

            <Link
              to="/chipotle"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Submit Chipotle Referral Form
            </Link>
          </div>
        </div>

        {/* General Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-atom-blue/10 border border-atom-blue/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">General Program Rules</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-atom-blue mb-3">Eligibility Requirements</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• You must be registered for CipherHacks 2025</li>
                  <li>• Referred participants must be new registrations</li>
                  <li>• All participants must attend the event in person</li>
                  <li>• Forms must be submitted before the event</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-atom-blue mb-3">Important Policies</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Only one person can claim credit per referral group</li>
                  <li>• Rewards distributed only after attendance verification</li>
                  <li>• Programs subject to availability and terms</li>
                  <li>• CipherHacks reserves the right to verify referrals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Referring?</h2>
          <p className="text-gray-300 mb-6">
            Share CipherHacks with your friends and earn amazing rewards while building the cybersecurity community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-atom-blue hover:bg-atom-blue/80 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Register for CipherHacks
            </Link>
            <a
              href="https://cipherhacks.tech"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Share CipherHacks.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPrograms;
