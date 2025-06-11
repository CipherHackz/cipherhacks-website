import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, CodeBracketIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  // Get the current URL that caused the 404
//   const currentUrl = window.location.href;
  const baseUrl = window.location.origin;
  
  // Extract the path that caused the 404
  const wrongPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-atom-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-8 border border-atom-blue border-opacity-20"
        >
          {/* Error Message */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-block mb-6 text-atom-blue"
            >
              <CodeBracketIcon className="h-24 w-24" />
            </motion.div>
            <h1 className="text-4xl font-bold text-atom-blue mb-4">404 - Page Not Found</h1>
            <p className="text-xl text-atom-fg mb-6">
              Oops! Looks like you've ventured into uncharted territory.
            </p>
          </div>

          {/* Technical Explanation */}
          <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="h-6 w-6 text-atom-orange flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-atom-orange mb-2">Looking for Something?</h2>
                <p className="text-atom-fg mb-4">
                  The page you're trying to access doesn't exist. Check the URL and try again, or use the navigation menu to find what you're looking for.
                </p>
                <div className="bg-black bg-opacity-50 rounded p-4 font-mono text-sm">
                  <p className="text-red-400 line-through mb-2">{wrongPath}</p>
                  <p className="text-green-400">Try: /sponsor or /register</p>
                </div>
                <p className="text-atom-fg mt-4">
                  For example, to access the sponsor page, use: <code className="text-atom-purple">{baseUrl}/sponsor</code>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-atom-purple text-white rounded-lg hover:bg-opacity-90 transition-colors w-full sm:w-auto justify-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <a 
              href="https://github.com/cipherhacks/cipherhacks-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-atom-blue text-atom-blue rounded-lg hover:bg-atom-blue hover:bg-opacity-10 transition-colors w-full sm:w-auto justify-center"
            >
              <CodeBracketIcon className="h-5 w-5 mr-2" />
              View Source
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
