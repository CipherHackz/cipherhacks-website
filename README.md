# CipherHacks Website

The official website for CipherHacks, San Diego's premier high school cybersecurity hackathon. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with Atom One Dark theme
- ⏱️ Live countdown to the event
- 📱 Mobile-friendly navigation
- 🔄 Smooth scroll animations with Framer Motion
- 💰 Comprehensive sponsorship tiers and benefits
- 📝 Integrated Tally.so forms for registration and sponsorship
- 🔍 Smart 404 handling with URL suggestions
- 💫 Interactive UI elements and micro-animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cipherhackz/cipherhacks-website.git
cd cipherhacks-website
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

The website will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
yarn build
```

The built files will be in the `build` directory.

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/        # Main page components
├── styles/       # Global styles and Tailwind config
└── utils/        # Helper functions and constants
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router
- React Countdown
- React Scroll
- Heroicons
- Tally.so (form integration)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

The website can be deployed to any hosting service that supports single-page applications (SPAs). Make sure to configure your server to handle client-side routing by redirecting all requests to index.html.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Email: team@cipherhacks.tech
- GitHub: [CipherHacks](https://github.com/CipherHackz)
- Website: [cipherhacks.tech](https://cipherhacks.tech)
