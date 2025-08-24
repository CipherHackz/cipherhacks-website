import React from 'react';

const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M19.802 5.802a2.5 2.5 0 00-1.768-1.768C16.53 3.5 12 3.5 12 3.5s-4.53 0-6.034.534a2.5 2.5 0 00-1.768 1.768C3.5 7.47 3.5 12 3.5 12s0 4.53.7 6.034a2.5 2.5 0 001.768 1.768C7.47 20.5 12 20.5 12 20.5s4.53 0 6.034-.534a2.5 2.5 0 001.768-1.768C20.5 16.53 20.5 12 20.5 12s0-4.53-.698-6.198zM9.5 15.5V8.5l6 3.5-6 3.5z"
      clipRule="evenodd"
    />
  </svg>
);

export default YouTubeIcon;
