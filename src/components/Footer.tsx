import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import InstagramIcon from './InstagramIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-atom-bg text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-atom-blue border-opacity-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-atom-fg-muted">&copy; {new Date().getFullYear()} CipherHacks. All Rights Reserved.</p>
        <div className="flex items-center space-x-4">
          {SOCIAL_LINKS.map(social => {
            let icon;
            if (social.name === 'Instagram') {
              icon = <InstagramIcon className="h-6 w-6 text-atom-fg-muted hover:text-atom-purple transition-colors" />;
            } else {
              const IconComponent = social.icon;
              icon = <IconComponent className="h-6 w-6 text-atom-fg-muted hover:text-atom-purple transition-colors" />;
            }
            return (
              <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                {icon}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
