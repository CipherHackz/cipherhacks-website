module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'atom-bg': '#282c34',
        'atom-fg': '#abb2bf',
        'atom-blue': '#61afef',
        'atom-green': '#98c379',
        'atom-red': '#e06c75',
        'atom-purple': '#c678dd',
        'atom-orange': '#d19a66',
        'atom-cyan': '#56b6c2',
      },
      animation: {
        'glow-blue': 'glow-blue 2s ease-in-out infinite',
        'glow-purple': 'glow-purple 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-blue': {
          '0%, 100%': { boxShadow: '0 0 5px #61afef, 0 0 10px #61afef' },
          '50%': { boxShadow: '0 0 20px #61afef, 0 0 30px #61afef' },
        },
        'glow-purple': {
          '0%, 100%': { boxShadow: '0 0 5px #c678dd, 0 0 10px #c678dd' },
          '50%': { boxShadow: '0 0 20px #c678dd, 0 0 30px #c678dd' },
        },
      }
    },
  },
  plugins: [],
} 