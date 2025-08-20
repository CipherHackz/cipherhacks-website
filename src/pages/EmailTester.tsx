import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

const EmailTester: React.FC = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const turnstileSiteKey = "0x4AAAAAABtbTNrJD8WuPQih";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      setMessage('Please enter your email and complete the CAPTCHA.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    turnstileRef.current?.reset();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Test email sent successfully! Please check your inbox and spam folder. If you don\'t receive it within 5 minutes, please let us know.');
        setToken(null);
      } else {

        setStatus('error');
        setMessage(data.error || 'An unknown error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send request. Please try again.');
    }
  };

  if (!turnstileSiteKey) {
    return (
      <div className="min-h-screen bg-atom-bg flex items-center justify-center text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Configuration Error</h1>
          <p className="mt-2">Turnstile site key is not configured. Please set REACT_APP_TURNSTILE_SITEKEY in your environment.</p>
          <Link to="/" className="mt-4 inline-block text-atom-blue hover:text-atom-purple">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atom-bg relative flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-4">Email Delivery Test</h1>
        <p className="text-center text-gray-400 mb-6">Enter your email to receive a test message and ensure you can get our communications.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-atom-purple focus:border-atom-purple sm:text-sm"
            />
          </div>

          <div className="flex justify-center">
            <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} onSuccess={setToken} />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-atom-blue hover:bg-atom-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-atom-purple disabled:bg-gray-600 transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}


        <div className="mt-8 pt-6 border-t border-gray-700">
          <button 
            onClick={() => setIsHelpOpen(!isHelpOpen)} 
            className="w-full flex justify-between items-center text-left text-gray-300 hover:text-white transition-colors"
          >
            <span className="font-bold">Didn't receive an email?</span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform ${isHelpOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isHelpOpen && (
            <div className="mt-4 text-sm text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Check your spam or junk folder.</li>
                <li>Verify you entered your email address correctly.</li>
                <li>Please wait up to 5 minutes, as some email providers may have delays.</li>
                <li>If you still haven't received it, please contact us at <a href="mailto:team@cipherhacks.tech" className="text-atom-blue hover:underline">team@cipherhacks.tech</a> for help.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTester;
