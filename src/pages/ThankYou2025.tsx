import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  TrophyIcon, 
  CodeBracketIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  BuildingLibraryIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

// All event photos from /photos/2025/ folder
const ALL_EVENT_PHOTOS = [
  '/photos/2025/IMG_0049.webp',
  '/photos/2025/IMG_1572.webp',
  '/photos/2025/IMG_6895.webp',
  '/photos/2025/IMG_6900.webp',
  '/photos/2025/IMG_6905.webp',
  '/photos/2025/IMG_6914.webp',
  '/photos/2025/IMG_6941.webp',
  '/photos/2025/art-1052.webp',
  '/photos/2025/art-1053.webp',
  '/photos/2025/art-1054.webp',
  '/photos/2025/art-1055.webp',
  '/photos/2025/art-1056.webp',
  '/photos/2025/art-1057.webp',
  '/photos/2025/art-1058.webp',
  '/photos/2025/art-1061.webp',
  '/photos/2025/art-1063.webp',
  '/photos/2025/art-1064.webp',
  '/photos/2025/art-1068.webp',
  '/photos/2025/art-1069.webp',
  '/photos/2025/art-1070.webp',
  '/photos/2025/art-1071.webp',
  '/photos/2025/art-1073.webp',
  '/photos/2025/art-1074.webp',
  '/photos/2025/art-1078.webp',
  '/photos/2025/art-1079.webp',
  '/photos/2025/art-1083.webp',
  '/photos/2025/art-1089.webp',
  '/photos/2025/art-1091.webp',
  '/photos/2025/art-1092.webp',
  '/photos/2025/art-1093.webp',
  '/photos/2025/art-1095.webp',
  '/photos/2025/art-1096.webp',
  '/photos/2025/art-1097.webp',
  '/photos/2025/art-1098.webp',
  '/photos/2025/art-1099.webp',
  '/photos/2025/art-1100.webp',
  '/photos/2025/art-1101.webp',
  '/photos/2025/art-1103.webp',
  '/photos/2025/art-1104.webp',
  '/photos/2025/art-1105.webp',
  '/photos/2025/art-1106.webp',
  '/photos/2025/art-1107.webp',
  '/photos/2025/art-1109.webp',
  '/photos/2025/art-1110.webp',
  '/photos/2025/art-1111.webp',
  '/photos/2025/art-1112.webp',
  '/photos/2025/art-1113.webp',
  '/photos/2025/art-1114.webp',
  '/photos/2025/art-1115.webp',
  '/photos/2025/art-1116.webp',
  '/photos/2025/art-1117.webp',
  '/photos/2025/art-1118.webp',
  '/photos/2025/art-1119.webp',
  '/photos/2025/art-1120.webp',
  '/photos/2025/art-1121.webp',
  '/photos/2025/art-1122.webp',
  '/photos/2025/art-1124.webp',
  '/photos/2025/art-1125.webp',
  '/photos/2025/art-1128.webp',
  '/photos/2025/art-1129.webp',
  '/photos/2025/art-1133.webp',
];

// Shuffle and pick random photos
const getRandomPhotos = (photos: string[], count: number): string[] => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const ThankYou2025: React.FC = () => {
  const galleryTriggerRef = useRef<HTMLDivElement>(null);
  const [showTeamPhoto, setShowTeamPhoto] = React.useState(false);
  const [imagesLoaded, setImagesLoaded] = React.useState<boolean[]>([]);
  
  // Pick 6 random photos
  const selectedPhotos = useMemo(() => getRandomPhotos(ALL_EVENT_PHOTOS, 6), []);
  
  // Initialize loaded state
  React.useEffect(() => {
    setImagesLoaded(new Array(selectedPhotos.length).fill(false));
  }, [selectedPhotos.length]);

  // Event Statistics
  const stats = [
    { icon: UserGroupIcon, label: 'Avg Hackers Per Day', value: '50', color: 'text-atom-blue' },
    { icon: CodeBracketIcon, label: 'Teams/Projects Built', value: '14', color: 'text-atom-green' },
    { icon: TrophyIcon, label: 'Winning Teams', value: '5', color: 'text-atom-orange' },
    { icon: SparklesIcon, label: 'Prize Value', value: '$2K+', color: 'text-atom-purple' },
    { icon: ClockIcon, label: 'Days of Hacking', value: '2', color: 'text-atom-red' },
    { icon: BuildingLibraryIcon, label: 'Funds Raised', value: '$1.3K', color: 'text-atom-green' },
  ];

  return (
    <div className="min-h-screen bg-atom-bg relative">
      {/* Photo Grid Background - Simple and performant */}
      <div className="fixed inset-0 z-0 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-0 opacity-50">
        {selectedPhotos.map((photoUrl, index) => (
          <div 
            key={index} 
            className="w-full aspect-square bg-atom-bg overflow-hidden relative"
          >
            <img
              src={photoUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              onLoad={() => {
                setImagesLoaded(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }}
              style={{
                opacity: imagesLoaded[index] ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
            {/* Curtain reveal animation */}
            <div 
              className="absolute inset-0 bg-atom-bg"
              style={{
                transform: imagesLoaded[index] ? 'translateY(-100%)' : 'translateY(0)',
                transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-atom-bg/60 pointer-events-none" />
      </div>

      {/* Floating Back Button */}
      <Link
        to="/"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-atom-blue hover:bg-atom-blue/90 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        title="Back to Home"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="CipherHacks Logo" 
              className="h-32 md:h-40 w-auto mx-auto mb-8"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-atom-blue mb-4 sm:mb-6">
            Thank You! 🎉
          </h1>

          <p className="text-xl sm:text-2xl md:text-4xl text-white font-semibold mb-3 sm:mb-4 px-4">
            CipherHacks 2025 Was a Success
          </p>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Our inaugural year brought together San Diego's brightest high school minds 
            for 2 days of innovation, learning, and cybersecurity excellence.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://cipherhacks.devpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-atom-purple to-atom-blue text-white rounded-lg hover:opacity-90 transition-all duration-300 font-bold text-lg flex items-center space-x-2 shadow-xl"
            >
              <CodeBracketIcon className="h-5 w-5" />
              <span>View Projects on Devpost</span>
            </a>
            <Link
              to="/2025"
              className="px-8 py-4 bg-atom-blue text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold text-lg flex items-center space-x-2 shadow-xl"
            >
              <span>View 2025 Website</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Trigger Section with Animated Smileys */}
      <section 
        ref={galleryTriggerRef}
        className="relative py-32 z-10 bg-gradient-to-b from-transparent via-atom-bg/95 to-atom-bg/98 overflow-hidden"
      >
        {/* Static Smileys Background - no animation for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 text-6xl">
          <div className="absolute top-10 left-10">😊</div>
          <div className="absolute top-20 right-20">😊</div>
          <div className="absolute bottom-20 left-1/4">😊</div>
          <div className="absolute top-1/3 right-1/3">😊</div>
          <div className="absolute bottom-40 right-10">😊</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-atom-blue/20 to-atom-purple/20 backdrop-blur-lg rounded-3xl p-12 border-2 border-atom-blue border-opacity-40">
              <PhotoIcon className="h-20 w-20 text-atom-blue mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-atom-blue mb-4">
                Relive the Moments
              </h3>
              <p className="text-lg text-atom-fg-muted mb-8">
                2 days of hacking, learning, and community captured in photos
              </p>
              <a
                href="https://photos.app.goo.gl/HHrckHyhj8HGpWRm7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-gradient-to-r from-atom-blue to-atom-purple text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                View Photo Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-atom-bg/98 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-atom-blue mb-3 sm:mb-4">
              By the Numbers
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-atom-fg-muted">
              CipherHacks 2025 in numbers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-atom-bg bg-opacity-50 p-6 rounded-xl border border-atom-blue border-opacity-20 text-center backdrop-blur-sm"
              >
                <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-atom-fg-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Founder's Message Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-atom-blue to-atom-purple bg-clip-text text-transparent mb-4 sm:mb-6">
                A Message from Our Founder
              </h2>
              <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-atom-blue to-atom-purple mx-auto rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-atom-blue/10 via-atom-bg/95 to-atom-purple/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-atom-blue/30 shadow-2xl">
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-center justify-center mb-8 sm:mb-10 pb-6 sm:pb-8 pt-3 sm:pt-4 border-b-2 border-gradient-to-r from-atom-blue/20 via-atom-purple/20 to-atom-blue/20">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-atom-blue via-atom-purple to-atom-blue rounded-full blur opacity-60"></div>
                    <div 
                      className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-atom-blue to-atom-purple shadow-2xl ring-4 ring-atom-blue/20"
                      style={{
                        backgroundImage: 'url(/photos/founder/arshan.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="opacity-0">A</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-atom-blue to-atom-purple bg-clip-text text-transparent mb-2 sm:mb-3">
                    Arshan Shokoohi
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-atom-purple font-semibold mb-1 sm:mb-2">
                    Founder & Head Organizer
                  </p>
                  <div className="flex gap-2 items-center justify-center md:justify-start text-atom-blue">
                    <span className="text-xl sm:text-2xl">✨</span>
                    <span className="text-sm sm:text-base font-medium">Senior @ Rancho Bernardo High School</span>
                  </div>
                </div>
                {/* Team Photo - Visible on mobile as smaller, full size on desktop */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <div className="relative group cursor-pointer" onClick={() => setShowTeamPhoto(true)}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-atom-blue to-atom-purple rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div 
                      className="relative w-full md:w-80 h-40 sm:h-48 md:h-52 rounded-xl overflow-hidden border-2 border-atom-blue/40 shadow-xl group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: 'url(/photos/founder/daTeam.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-3xl sm:text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-atom-blue font-semibold mt-2 text-center">
                      Organizers/Event Staff (Click to expand)
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
                <div className="bg-gradient-to-r from-atom-blue/5 to-atom-purple/5 p-6 rounded-xl border-l-4 border-atom-blue">
                  <p className="text-atom-fg">
                    <span className="text-2xl text-atom-blue mr-2">"</span>
                    CipherHacks began because, through my 4 years of being a high schooler striving for a career in STEM, 
                    I had immense amounts of fun at the very few and select hackathons that were available to San Diegan 
                    high schoolers. Each hackathon I've attended has had an impact on my life in some shape or form, and 
                    as I near the end of high school, wishing for the chance of attending just one more high school hackathon 
                    before graduation, I decided to take initiative and begin CipherHacks for all of you.
                    <span className="text-2xl text-atom-blue ml-2">"</span>
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🚀</span>
                  <p className="text-atom-fg flex-1">
                    I think it's safe to say that <span className="text-atom-blue font-bold text-xl">CipherHacks 2026</span> will be in the works, 
                    and as we work out more details, we will keep you all in the loop. I may be nearing graduation, 
                    but just know I won't be going anywhere just yet 😉
                  </p>
                </div>

                <div className="bg-gradient-to-r from-atom-purple/10 to-atom-blue/10 p-6 rounded-xl border-l-4 border-atom-purple">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🙏</span>
                    <p className="text-atom-fg flex-1">
                      On behalf of all CipherHacks attendees, I'd like to thank our <span className="text-atom-purple font-semibold">sponsors, donators, mentors, industry & college panelists, event staff, organizers, and parents</span> for all of their support. 
                      We couldn't have made it this far without you all. 
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl">💙</span>
                  <p className="text-atom-fg flex-1">
                    I'm incredibly grateful for the opportunity to put on CipherHacks and I'm excited to see what the future holds. 
                  </p>
                </div>
                
                <div className="pt-6 mt-8">
                  <div className="bg-gradient-to-r from-atom-green/20 via-atom-blue/20 to-atom-green/20 p-6 rounded-2xl border-2 border-atom-green/40 shadow-lg">
                    <p className="text-atom-green font-bold text-2xl text-center">
                      See you all in 2026. 🚀
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looking Forward Section */}
      <section className="py-20 bg-atom-bg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-atom-blue mb-4">
              Looking Beyond
            </h2>
            <p className="text-xl text-atom-fg-muted max-w-3xl mx-auto mb-12">
              Our mission extends beyond the hackathon, focusing on building community, 
              enhancing the experience, and creating more opportunities for high school students 
              to explore cybersecurity and STEM.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-atom-blue/20 to-atom-blue/5 p-8 rounded-2xl border-2 border-atom-blue border-opacity-30 backdrop-blur-sm">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-atom-blue mb-4">
                CipherHacks 2026 & Beyond
              </h3>
              <p className="text-atom-fg-muted">
                Building on our success, we're committed to making CipherHacks even better, 
                enhancing the experience, and creating more opportunities for high school students 
                to explore cybersecurity and STEM.
              </p>
            </div>

            <div className="bg-gradient-to-br from-atom-purple/20 to-atom-purple/5 p-8 rounded-2xl border-2 border-atom-purple border-opacity-30 backdrop-blur-sm">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-atom-purple mb-4">
                Community of Like-Minded Individuals
              </h3>
              <p className="text-atom-fg-muted">
                Building a strong community where passionate students, mentors, and industry 
                professionals can connect, collaborate, and support each other's growth in 
                cybersecurity and technology.
              </p>
            </div>

            <div className="bg-gradient-to-br from-atom-green/20 to-atom-green/5 p-8 rounded-2xl border-2 border-atom-green border-opacity-30 backdrop-blur-sm">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-atom-green mb-4">
                STEM Education for All
              </h3>
              <p className="text-atom-fg-muted">
                Bringing quality STEM education to underprivileged communities, ensuring every 
                student has access to the tools, knowledge, and opportunities they need to 
                pursue their passion in technology.
              </p>
            </div>

            <div className="bg-atom-bg bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border-2 border-atom-blue border-opacity-30">
              <h3 className="text-3xl font-bold text-atom-blue mb-4">
                Stay Connected
              </h3>
              <p className="text-atom-fg-muted mb-6">
                Want to be the first to know about CipherHacks 2026 and our upcoming events?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://instagram.com/cipherhacks2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 font-bold"
                >
                  Follow on Instagram
                </a>
                <a
                  href="mailto:team@cipherhacks.tech"
                  className="px-6 py-3 bg-atom-blue text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-bold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photo Modal/Overlay */}
      {showTeamPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          onClick={() => setShowTeamPhoto(false)}
        >
          <div
            className="relative w-full max-w-5xl mx-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="relative w-full">
                <img
                  src="/photos/founder/daTeam.jpg"
                  alt="CipherHacks Organizers and Event Staff"
                  className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl mx-auto"
                />
                <button
                  onClick={() => setShowTeamPhoto(false)}
                  className="absolute -top-4 -right-4 w-14 h-14 bg-atom-red hover:bg-atom-red/90 text-white rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-200 hover:scale-110 shadow-xl z-10"
                >
                  ×
                </button>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-atom-bg/95 backdrop-blur-md px-8 py-4 rounded-full border-2 border-atom-blue/40 shadow-xl">
                  <p className="text-atom-blue font-bold text-xl whitespace-nowrap">
                    CipherHacks Organizers & Event Staff
                  </p>
                </div>
              </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ThankYou2025;
