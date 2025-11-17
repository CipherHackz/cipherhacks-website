import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Organizer2026: React.FC = () => {
  useEffect(() => {
    const widgetScriptSrc = 'https://tally.so/widgets/embed.js';

    const load = () => {
      // Load Tally embeds
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
        return;
      }

      // Fallback if window.Tally is not available
      document
        .querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])')
        .forEach((iframeEl) => {
          iframeEl.src = iframeEl.dataset.tallySrc || '';
        });
    };

    // If Tally is already loaded, load the embeds
    if (typeof window.Tally !== 'undefined') {
      load();
      return;
    }

    // If the Tally widget script is not loaded yet, load it
    if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
      const script = document.createElement('script');
      script.src = widgetScriptSrc;
      script.onload = load;
      script.onerror = load;
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup if needed
      const script = document.querySelector(`script[src="${widgetScriptSrc}"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-atom-bg relative">
      <Link 
        to="/"
        className="absolute top-4 left-4 z-10 inline-flex items-center text-atom-blue hover:text-atom-purple transition-colors bg-black bg-opacity-50 px-4 py-2 rounded-lg"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
      <div className="h-screen w-full">
        <iframe
          data-tally-src="https://tally.so/r/q44dd8"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="CipherHacks 2026 Organizer Interest Form"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

// Add TypeScript declaration for Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default Organizer2026;
