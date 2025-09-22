import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UserGroupIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const SanDiegoHackathon: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>San Diego Hackathon 2025 | CipherHacks - Premier High School Coding Event</title>
        <meta name="description" content="Looking for a San Diego hackathon? Join CipherHacks 2025 - San Diego's premier high school hackathon at the Central Library. Free registration, prizes, workshops, and networking for teen developers in San Diego." />
        <meta name="keywords" content="San Diego hackathon, hackathon San Diego 2025, high school hackathon San Diego, student coding competition San Diego, tech event San Diego, programming contest San Diego" />
        <link rel="canonical" href="https://cipherhacks.tech/san-diego-hackathon" />
      </Helmet>

      <div className="min-h-screen bg-atom-bg text-atom-fg">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-atom-blue to-atom-purple bg-clip-text text-transparent">
              San Diego's Premier Hackathon for High School Students
            </h1>
            <p className="text-xl md:text-2xl text-atom-fg-muted mb-8">
              CipherHacks 2025 is San Diego's top hackathon event, bringing together the brightest young minds 
              in cybersecurity and technology right here in America's Finest City.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-atom-purple text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors">
                Register for San Diego Hackathon
              </Link>
              <Link to="/" className="border-2 border-atom-blue text-atom-blue px-8 py-3 rounded-lg text-lg font-semibold hover:bg-atom-blue hover:bg-opacity-10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Why San Diego Section */}
        <section className="py-16 px-4 bg-atom-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-atom-blue">
              Why Choose This San Diego Hackathon?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-atom-bg p-6 rounded-lg border border-atom-blue/20">
                <MapPinIcon className="h-12 w-12 text-atom-blue mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-atom-green">Prime San Diego Location</h3>
                <p className="text-atom-fg-muted">
                  Located at the iconic San Diego Central Library in downtown, our hackathon offers the perfect 
                  venue in the heart of San Diego's tech district.
                </p>
              </div>
              <div className="bg-atom-bg p-6 rounded-lg border border-atom-blue/20">
                <UserGroupIcon className="h-12 w-12 text-atom-purple mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-atom-green">San Diego's Tech Community</h3>
                <p className="text-atom-fg-muted">
                  Connect with San Diego's thriving tech ecosystem, including mentors from local companies 
                  like Qualcomm, Illumina, and emerging startups.
                </p>
              </div>
              <div className="bg-atom-bg p-6 rounded-lg border border-atom-blue/20">
                <TrophyIcon className="h-12 w-12 text-atom-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-atom-green">Exclusive San Diego Prizes</h3>
                <p className="text-atom-fg-muted">
                  Win amazing prizes including tech gear, internship opportunities with San Diego companies, 
                  and recognition in the local tech community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* San Diego Schools Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-atom-blue">
              Calling All San Diego High School Students
            </h2>
            <p className="text-lg text-atom-fg-muted mb-8">
              Students from across San Diego County are invited to participate in this premier hackathon event. 
              Whether you're from Torrey Pines, La Jolla, Mission Bay, or anywhere in San Diego, this is your 
              chance to showcase your skills!
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-atom-green">San Diego County Schools Welcome:</h3>
                <ul className="space-y-2 text-atom-fg-muted">
                  <li>• All San Diego Unified School District schools</li>
                  <li>• Poway Unified School District students</li>
                  <li>• Sweetwater Union High School District</li>
                  <li>• Private and charter schools in San Diego</li>
                  <li>• Homeschool students in the San Diego area</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-atom-green">What Makes This San Diego Hackathon Special:</h3>
                <ul className="space-y-2 text-atom-fg-muted">
                  <li>• Focus on cybersecurity and emerging tech</li>
                  <li>• Mentorship from San Diego tech professionals</li>
                  <li>• Networking with local university programs</li>
                  <li>• Exposure to San Diego's startup ecosystem</li>
                  <li>• Pathways to local internships and opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 px-4 bg-atom-bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-atom-blue">
              San Diego Hackathon Event Details
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-atom-bg p-8 rounded-lg border border-atom-blue/20">
                <CalendarIcon className="h-12 w-12 text-atom-green mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-atom-green">When</h3>
                <p className="text-lg text-atom-fg-muted mb-2">October 10-11, 2025</p>
                <p className="text-atom-fg-muted">
                  A full weekend of coding, learning, and innovation in San Diego. 
                  Friday evening kickoff through Saturday evening presentations.
                </p>
              </div>
              <div className="bg-atom-bg p-8 rounded-lg border border-atom-blue/20">
                <MapPinIcon className="h-12 w-12 text-atom-blue mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-atom-green">Where</h3>
                <p className="text-lg text-atom-fg-muted mb-2">San Diego Central Library</p>
                <p className="text-atom-fg-muted">
                  330 Park Blvd, San Diego, CA 92101<br />
                  Shiley Events Suite - Downtown San Diego's premier event space
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-atom-blue">
              Ready to Join San Diego's Best Hackathon?
            </h2>
            <p className="text-xl text-atom-fg-muted mb-8">
              Don't miss out on San Diego's premier high school hackathon experience. 
              Register now to secure your spot at CipherHacks 2025!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-atom-purple text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-colors">
                Register Now - Free!
              </Link>
              <Link to="/discord" className="bg-atom-blue text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-colors">
                Join San Diego Hackathon Community
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SanDiegoHackathon;
