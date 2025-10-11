import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * ⚠️ INTENTIONALLY VULNERABLE SEARCH COMPONENT ⚠️
 * 
 * This component contains a deliberate XSS (Cross-Site Scripting) vulnerability
 * for educational purposes at CipherHacks cybersecurity hackathon.
 * 
 * VULNERABILITY: User input is rendered using dangerouslySetInnerHTML without
 * sanitization, allowing arbitrary JavaScript execution.
 * 
 * DO NOT USE THIS CODE IN PRODUCTION!
 */
const VulnerableSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // VULNERABLE CODE: This allows XSS attacks!
    // Execute any JavaScript code in the search query
    if (searchQuery.trim()) {
      setSearchResults([searchQuery, ...searchResults.slice(0, 4)]);
      
      // Extract and execute script tags
      const scriptRegex = /<script>(.*?)<\/script>/gi;
      let match;
      while ((match = scriptRegex.exec(searchQuery)) !== null) {
        try {
          // eslint-disable-next-line no-eval
          eval(match[1]);
        } catch (err) {
          console.error('Script execution error:', err);
        }
      }
      
      // Also execute inline event handlers (onerror, onclick, etc.)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = searchQuery;
      document.body.appendChild(tempDiv);
      setTimeout(() => tempDiv.remove(), 100);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="fixed top-28 sm:top-32 md:top-36 left-4 z-40">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-atom-blue bg-opacity-90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 border border-atom-blue"
            aria-label="Open search"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </motion.button>
        ) : (
          <motion.div
            key="search-box"
            initial={{ opacity: 0, x: -50, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: -50, width: 0 }}
            className="bg-atom-bg bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl border border-atom-blue border-opacity-30 p-4 min-w-[320px] max-w-md"
          >
            <div className="flex items-center space-x-3 mb-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-atom-blue flex-shrink-0" />
              <h3 className="text-atom-blue font-semibold text-lg">Search</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="ml-auto text-atom-fg hover:text-atom-red transition-colors text-sm"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSearch} className="mb-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything"
                  className="flex-1 bg-black bg-opacity-50 border border-atom-blue border-opacity-30 rounded-lg px-3 py-2 text-atom-fg placeholder-atom-fg placeholder-opacity-50 focus:outline-none focus:border-atom-blue focus:border-opacity-60 text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-atom-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium"
                >
                  Go
                </button>
              </div>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-atom-fg-muted text-xs">Recent searches:</span>
                  <button
                    onClick={handleClear}
                    className="text-atom-purple hover:text-atom-blue text-xs underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-black bg-opacity-30 rounded-lg px-3 py-2 border border-atom-blue border-opacity-10"
                    >
                      {/* ⚠️ VULNERABLE: Using dangerouslySetInnerHTML without sanitization! */}
                      <div 
                        className="text-atom-fg text-sm break-words"
                        dangerouslySetInnerHTML={{ __html: result }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VulnerableSearch;
