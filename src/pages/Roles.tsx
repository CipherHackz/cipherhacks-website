import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  ChevronDownIcon, 
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';
import { 
  getAllRolesWithPeople,
  type RoleDefinition,
  type PersonInRole 
} from '../constants/roles';

// Expandable Text Component
const ExpandableText: React.FC<{ 
  text: string; 
  maxLength?: number; 
  className?: string;
}> = ({ text, maxLength = 150, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-atom-blue hover:text-atom-purple transition-colors text-sm underline font-medium"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};

// Person Card Component
const PersonCard: React.FC<{ person: PersonInRole }> = ({ person }) => {
  const getDefaultIcon = (gender: 'male' | 'female' | 'other') => {
    switch (gender) {
      case 'male':
        return (
          <svg className="h-12 w-12 text-atom-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'female':
        return (
          <svg className="h-12 w-12 text-atom-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <circle cx="12" cy="4" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="h-12 w-12 text-atom-green" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2M12 20v2" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black bg-opacity-30 rounded-lg p-4 border border-atom-blue border-opacity-20 hover:border-opacity-50 transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {person.image ? (
            <img 
              src={person.image} 
              alt={person.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-atom-blue"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-atom-bg flex items-center justify-center border-2 border-atom-blue">
              {getDefaultIcon(person.gender)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-atom-blue truncate">{person.name}</h4>
          {person.school && person.grade && (
            <p className="text-sm text-atom-purple font-mono">{person.grade} at {person.school}</p>
          )}
          {person.bio && (
            <p className="text-sm text-atom-fg-muted mt-2">
              <ExpandableText text={person.bio} maxLength={100} />
            </p>
          )}
          {person.specialties && person.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {person.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-atom-purple bg-opacity-20 text-atom-purple rounded">
                  {specialty}
                </span>
              ))}
              {person.specialties.length > 3 && (
                <span className="px-2 py-1 text-xs bg-atom-fg bg-opacity-20 text-atom-fg-muted rounded">
                  +{person.specialties.length - 3} more
                </span>
              )}
            </div>
          )}
          <div className="flex items-center space-x-3 mt-3">
            {person.email && (
              <a href={`mailto:${person.email}`} className="text-atom-fg hover:text-atom-blue transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
              </a>
            )}
            {person.links?.website && (
              <a href={person.links.website} target="_blank" rel="noopener noreferrer" className="text-atom-fg hover:text-atom-blue transition-colors">
                <GlobeAltIcon className="h-4 w-4" />
              </a>
            )}
            {person.links?.github && (
              <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="text-atom-fg hover:text-atom-blue transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {person.links?.linkedin && (
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-atom-fg hover:text-atom-blue transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Role Card Component
const RoleCard: React.FC<{ 
  role: RoleDefinition & { people: PersonInRole[] };
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ role, isExpanded, onToggle }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'leadership': return 'border-yellow-400 bg-yellow-400 bg-opacity-10';
      case 'executive': return 'border-purple-400 bg-purple-400 bg-opacity-10';
      case 'management': return 'border-blue-400 bg-blue-400 bg-opacity-10';
      case 'operations': return 'border-green-400 bg-green-400 bg-opacity-10';
      case 'community': return 'border-atom-blue bg-atom-blue bg-opacity-10';
      default: return 'border-atom-blue bg-atom-blue bg-opacity-10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leadership': return '👑';
      case 'executive': return '🎯';
      case 'management': return '📊';
      case 'operations': return '⚙️';
      case 'community': return '🏛️';
      default: return '🔧';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 backdrop-blur-sm transition-all duration-300 ${getCategoryColor(role.category)}`}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-black hover:bg-opacity-20 transition-colors duration-300 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{getCategoryIcon(role.category)}</span>
            <div>
              <h3 className="text-xl font-bold text-atom-blue flex items-center space-x-2">
                <span>{role.title}</span>
                <span className="text-sm font-normal text-atom-purple">
                  ({role.people.length} {role.people.length === 1 ? 'person' : 'people'})
                </span>
              </h3>
              <p className="text-sm text-atom-purple font-mono capitalize">
                Level {role.level + 1} • {role.category}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {role.timeCommitment && (
              <div className="flex items-center space-x-1 text-atom-fg-muted">
                <ClockIcon className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">{role.timeCommitment.split(',')[0]}</span>
              </div>
            )}
            {isExpanded ? (
              <ChevronDownIcon className="h-5 w-5 text-atom-fg" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-atom-fg" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Role Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-atom-blue mb-2">Description</h4>
                    <p className="text-atom-fg-muted">
                      <ExpandableText text={role.description} maxLength={200} />
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-atom-blue mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {role.responsibilities.slice(0, 4).map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-atom-fg-muted">
                          <CheckCircleIcon className="h-4 w-4 text-atom-green mt-0.5 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                      {role.responsibilities.length > 4 && (
                        <li className="text-sm text-atom-purple">
                          +{role.responsibilities.length - 4} more responsibilities
                        </li>
                      )}
                    </ul>
                  </div>

                  {role.requirements && (
                    <div>
                      <h4 className="text-lg font-semibold text-atom-blue mb-2">Requirements</h4>
                      <ul className="space-y-1">
                        {role.requirements.slice(0, 3).map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-atom-fg-muted">
                            <AcademicCapIcon className="h-4 w-4 text-atom-purple mt-0.5 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {role.benefits && (
                    <div>
                      <h4 className="text-lg font-semibold text-atom-blue mb-2">Benefits</h4>
                      <ul className="space-y-1">
                        {role.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-atom-fg-muted">
                            <span className="text-atom-green">✨</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* People in Role */}
                <div>
                  <h4 className="text-lg font-semibold text-atom-blue mb-4 flex items-center space-x-2">
                    <UserIcon className="h-5 w-5" />
                    <span>People in this Role</span>
                  </h4>
                  {role.people.length > 0 ? (
                    <div className="space-y-3">
                      {role.people.map((person, index) => (
                        <PersonCard key={index} person={person} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-black bg-opacity-20 rounded-lg p-6 text-center border border-atom-blue border-opacity-20">
                      <UserIcon className="h-12 w-12 text-atom-fg-muted mx-auto mb-3" />
                      <p className="text-atom-fg-muted mb-2">No one currently assigned to this role</p>
                      {role.category === 'management' || role.category === 'leadership' || role.category === 'executive' ? (
                        <p className="text-sm text-atom-purple">
                          Director positions require direct contact: <a href="mailto:team@cipherhacks.tech" className="underline hover:text-atom-blue">team@cipherhacks.tech</a>
                        </p>
                      ) : (
                        <p className="text-sm text-atom-purple">
                          Interested in volunteering? <Link to="/volunteer" className="underline hover:text-atom-blue">Apply here!</Link>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Roles: React.FC = () => {
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());
  const allRoles = getAllRolesWithPeople();

  const toggleRole = (roleId: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId);
    } else {
      newExpanded.add(roleId);
    }
    setExpandedRoles(newExpanded);
  };

  const expandAll = () => {
    setExpandedRoles(new Set(allRoles.map(role => role.id)));
  };

  const collapseAll = () => {
    setExpandedRoles(new Set());
  };

  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-atom-purple via-atom-bg to-atom-blue opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-atom-blue hover:text-atom-purple transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-atom-blue via-atom-purple to-atom-green bg-clip-text text-transparent">
              CipherHacks Roles & Hierarchy
            </h1>
            <p className="text-xl text-atom-fg-muted max-w-3xl mx-auto mb-8">
              Explore our organizational structure, discover opportunities, and meet the people behind CipherHacks
            </p>
            
            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-atom-blue bg-opacity-20 border border-atom-blue text-atom-blue rounded-lg hover:bg-atom-blue hover:text-white transition-all duration-300"
              >
                Expand All Roles
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-atom-purple bg-opacity-20 border border-atom-purple text-atom-purple rounded-lg hover:bg-atom-purple hover:text-white transition-all duration-300"
              >
                Collapse All
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Statistics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center border border-atom-blue border-opacity-20">
              <div className="text-2xl font-bold text-atom-blue">{allRoles.length}</div>
              <div className="text-sm text-atom-fg-muted">Total Roles</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center border border-atom-blue border-opacity-20">
              <div className="text-2xl font-bold text-atom-green">
                {allRoles.reduce((sum, role) => sum + role.people.length, 0)}
              </div>
              <div className="text-sm text-atom-fg-muted">Team Members</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center border border-atom-blue border-opacity-20">
              <div className="text-2xl font-bold text-atom-purple">
                {allRoles.filter(role => role.people.length === 0).length}
              </div>
              <div className="text-sm text-atom-fg-muted">Open Positions</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center border border-atom-blue border-opacity-20">
              <div className="text-2xl font-bold text-atom-yellow">5</div>
              <div className="text-sm text-atom-fg-muted">Categories</div>
            </div>
          </motion.div>

          {/* Roles List */}
          <div className="space-y-4">
            {allRoles.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                isExpanded={expandedRoles.has(role.id)}
                onToggle={() => toggleRole(role.id)}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16 text-center bg-black bg-opacity-30 rounded-xl p-8 border border-atom-blue border-opacity-20"
          >
            <h3 className="text-3xl font-bold mb-4 text-atom-purple">Ready to Join Our Team?</h3>
            <p className="text-atom-fg-muted mb-8 max-w-2xl mx-auto">
              Whether you're passionate about cybersecurity, love organizing events, or want to make a difference in tech education, 
              there's a place for you at CipherHacks. Join us in building the future of cybersecurity education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-atom-blue text-white rounded-lg hover:bg-opacity-80 transition-all duration-300 font-semibold text-lg"
              >
                Register as Participant
              </Link>
              <Link
                to="/volunteer"
                className="px-8 py-4 border-2 border-atom-purple text-atom-purple rounded-lg hover:bg-atom-purple hover:text-white transition-all duration-300 font-semibold text-lg"
              >
                Apply to Volunteer
              </Link>
            </div>
            
            {/* Director Contact Note */}
            <div className="mt-6 p-4 bg-atom-purple bg-opacity-10 rounded-lg border border-atom-purple border-opacity-30">
              <p className="text-sm text-atom-fg-muted text-center">
                <strong className="text-atom-purple">Director Positions:</strong> Leadership roles (Founder, Head Director, and specialized Directors) require direct contact at{' '}
                <a href="mailto:team@cipherhacks.tech" className="text-atom-purple underline hover:text-atom-blue">
                  team@cipherhacks.tech
                </a>
              </p>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-atom-blue flex items-center space-x-2">
                  <AcademicCapIcon className="h-5 w-5" />
                  <span>For Students</span>
                </h4>
                <p className="text-sm text-atom-fg-muted">
                  Build leadership skills, gain real-world experience, and make lasting connections in the tech industry.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-atom-blue flex items-center space-x-2">
                  <UserIcon className="h-5 w-5" />
                  <span>For Professionals</span>
                </h4>
                <p className="text-sm text-atom-fg-muted">
                  Give back to the community, mentor the next generation, and stay connected with emerging trends.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-atom-blue flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5" />
                  <span>Flexible Commitment</span>
                </h4>
                <p className="text-sm text-atom-fg-muted">
                  Choose roles that fit your schedule, from one-time event support to ongoing leadership positions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Roles;
