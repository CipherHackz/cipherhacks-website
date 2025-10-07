// Role definitions and organizational structure for CipherHacks

export interface RoleDefinition {
  id: string;
  title: string;
  level: number;
  category: 'leadership' | 'executive' | 'management' | 'operations' | 'community';
  description: string;
  responsibilities: string[];
  requirements?: string[];
  timeCommitment?: string;
  benefits?: string[];
}

export interface PersonInRole {
  name: string;
  email?: string;
  image?: string;
  gender: 'male' | 'female' | 'other';
  bio?: string;
  school?: string;
  grade?: string;
  specialties?: string[];
  links?: {
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface RoleAssignment {
  roleId: string;
  people: PersonInRole[];
}

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    id: 'founder',
    title: 'Founder',
    level: 0,
    category: 'leadership',
    description: 'The visionary architect behind CipherHacks, establishing the foundation, mission, and long-term strategic direction of the organization.',
    responsibilities: [
      'Define organizational mission, vision, and core values',
      'Establish strategic partnerships with sponsors and educational institutions',
      'Oversee major organizational decisions and policy development',
      'Represent CipherHacks at high-level meetings and conferences',
      'Ensure sustainable growth and community impact',
      'Mentor leadership team and foster organizational culture'
    ],
    requirements: [
      'Demonstrated leadership experience in tech or educational initiatives',
      'Strong vision for cybersecurity education and community building',
      'Excellent communication and public speaking skills',
      'Ability to make strategic decisions under pressure'
    ],
    timeCommitment: 'Year-round commitment, 15-25 hours per week during event season',
    benefits: [
      'Shape the future of cybersecurity education',
      'Build lasting industry connections',
      'Develop executive leadership skills',
      'Recognition as a community leader'
    ]
  },
  {
    id: 'head-director',
    title: 'Head Director',
    level: 1,
    category: 'executive',
    description: 'The operational leader responsible for executing the annual CipherHacks event, coordinating all departments and ensuring seamless event delivery.',
    responsibilities: [
      'Lead event planning and execution from conception to completion',
      'Coordinate cross-functional teams and resolve inter-departmental conflicts',
      'Manage event timeline, milestones, and deliverables',
      'Serve as primary point of contact for sponsors and key stakeholders',
      'Oversee budget allocation and resource management',
      'Conduct post-event analysis and implement improvements',
      'Represent the organization at sponsor meetings and community events'
    ],
    requirements: [
      'Previous experience in event management or project leadership',
      'Strong organizational and time management skills',
      'Excellent interpersonal and conflict resolution abilities',
      'Understanding of hackathon logistics and cybersecurity landscape'
    ],
    timeCommitment: '20-30 hours per week during planning season, full-time during event week',
    benefits: [
      'Gain comprehensive event management experience',
      'Develop leadership and team coordination skills',
      'Build professional network in tech industry',
      'Letter of recommendation and leadership certification'
    ]
  },
  {
    id: 'general-director',
    title: 'Director',
    level: 2,
    category: 'management',
    description: 'Versatile leaders who oversee multiple aspects of event operations, providing strategic guidance and hands-on management across various departments.',
    responsibilities: [
      'Manage multiple operational areas and cross-functional initiatives',
      'Support specialized directors and coordinate between departments',
      'Lead strategic planning sessions and contribute to organizational decisions',
      'Mentor junior team members and volunteers',
      'Handle escalated issues and emergency situations during events',
      'Represent CipherHacks at community outreach events'
    ],
    requirements: [
      'Leadership experience in academic, professional, or volunteer settings',
      'Strong problem-solving and decision-making abilities',
      'Excellent communication and mentorship skills',
      'Flexibility to work across multiple domains'
    ],
    timeCommitment: '15-20 hours per week during planning, increased during event week',
    benefits: [
      'Develop broad operational management skills',
      'Gain experience in strategic planning and execution',
      'Build leadership portfolio for college and career applications',
      'Access to exclusive networking opportunities'
    ]
  },
  {
    id: 'marketing-director',
    title: 'Marketing Director',
    level: 2,
    category: 'management',
    description: 'Creative strategist responsible for building CipherHacks brand awareness, managing digital presence, and driving participant registration through innovative marketing campaigns.',
    responsibilities: [
      'Develop and execute comprehensive marketing strategies',
      'Manage social media presence across all platforms (Instagram, LinkedIn, Twitter, TikTok)',
      'Create engaging content including graphics, videos, and written materials',
      'Coordinate with schools and organizations for outreach partnerships',
      'Track marketing metrics and optimize campaigns for maximum reach',
      'Manage influencer partnerships and community ambassador programs',
      'Design promotional materials and swag for events'
    ],
    requirements: [
      'Experience with social media marketing and content creation',
      'Proficiency in design tools (Canva, Adobe Creative Suite, Figma)',
      'Understanding of digital marketing analytics and SEO',
      'Creative mindset with strong visual and written communication skills'
    ],
    timeCommitment: '12-18 hours per week, with spikes during registration periods',
    benefits: [
      'Build comprehensive digital marketing portfolio',
      'Gain experience with professional marketing tools and platforms',
      'Develop brand management and creative strategy skills',
      'Access to marketing industry mentors and internship opportunities'
    ]
  },
  {
    id: 'technology-director',
    title: 'Technology Director',
    level: 2,
    category: 'management',
    description: 'Technical architect responsible for all digital infrastructure, from registration systems to live event technology, ensuring seamless technical operations.',
    responsibilities: [
      'Develop and maintain CipherHacks website and registration platform',
      'Manage technical infrastructure for virtual and hybrid events',
      'Oversee cybersecurity challenges and CTF platform development',
      'Coordinate with IT vendors and manage technical partnerships',
      'Provide technical support during events and troubleshoot issues',
      'Lead technical workshops and educational content development',
      'Implement security measures and data protection protocols'
    ],
    requirements: [
      'Strong programming skills (JavaScript, Python, web technologies)',
      'Experience with cloud platforms (AWS, Azure, or Google Cloud)',
      'Understanding of cybersecurity principles and tools',
      'Problem-solving abilities and attention to detail'
    ],
    timeCommitment: '15-25 hours per week, with intensive periods during platform development',
    benefits: [
      'Gain real-world experience with enterprise-level systems',
      'Build impressive technical portfolio with measurable impact',
      'Access to cutting-edge cybersecurity tools and platforms',
      'Mentorship from industry professionals and potential internship opportunities'
    ]
  },
  {
    id: 'logistics-director',
    title: 'Logistics Director',
    level: 2,
    category: 'management',
    description: 'Operations expert who ensures flawless event execution by managing venues, catering, transportation, and all physical aspects of the hackathon experience.',
    responsibilities: [
      'Secure and manage event venues, including backup locations',
      'Coordinate catering services and dietary accommodations',
      'Manage equipment procurement and setup (AV, networking, furniture)',
      'Oversee registration check-in processes and attendee flow',
      'Coordinate transportation and parking arrangements',
      'Manage vendor relationships and service contracts',
      'Develop emergency response plans and safety protocols'
    ],
    requirements: [
      'Strong organizational and project management skills',
      'Experience with vendor management and contract negotiation',
      'Attention to detail and ability to manage multiple timelines',
      'Problem-solving skills and ability to work under pressure'
    ],
    timeCommitment: '12-20 hours per week, full-time during event setup and execution',
    benefits: [
      'Develop comprehensive event management expertise',
      'Build vendor and supplier network relationships',
      'Gain experience in contract negotiation and budget management',
      'Transferable skills for career in operations or project management'
    ]
  },
  {
    id: 'partnerships-director',
    title: 'Partnerships Director',
    level: 2,
    category: 'management',
    description: 'Relationship builder who secures sponsorships, manages corporate partnerships, and develops strategic alliances to support CipherHacks growth and sustainability.',
    responsibilities: [
      'Identify and pursue sponsorship opportunities with tech companies',
      'Develop and maintain relationships with corporate partners',
      'Create compelling sponsorship packages and proposals',
      'Negotiate partnership terms and manage sponsor expectations',
      'Coordinate sponsor activations and brand integration at events',
      'Manage partnership communications and deliverable tracking',
      'Develop long-term strategic partnerships with educational institutions'
    ],
    requirements: [
      'Excellent communication and presentation skills',
      'Experience in sales, business development, or relationship management',
      'Understanding of corporate sponsorship and partnership models',
      'Professional demeanor and ability to represent organization effectively'
    ],
    timeCommitment: '10-15 hours per week, with intensive periods during sponsor outreach',
    benefits: [
      'Develop business development and sales skills',
      'Build professional network in tech industry',
      'Gain experience in contract negotiation and relationship management',
      'Access to exclusive corporate events and networking opportunities'
    ]
  },
  {
    id: 'event-staff',
    title: 'Event Staff',
    level: 3,
    category: 'operations',
    description: 'Dedicated volunteers who provide essential support during events, ensuring smooth operations and positive participant experiences through hands-on assistance.',
    responsibilities: [
      'Assist with event setup, registration, and check-in processes',
      'Guide participants and answer questions throughout the event',
      'Support technical workshops and challenge facilitation',
      'Help with meal service and break coordination',
      'Assist judges during project evaluations and presentations',
      'Support cleanup and breakdown activities',
      'Provide general event support and troubleshooting'
    ],
    requirements: [
      'Enthusiasm for cybersecurity and technology education',
      'Strong interpersonal and customer service skills',
      'Reliability and punctuality',
      'Willingness to learn and take direction'
    ],
    timeCommitment: 'Event weekend plus 2-3 preparation sessions',
    benefits: [
      'Gain behind-the-scenes event experience',
      'Network with industry professionals and participants',
      'Develop teamwork and communication skills',
      'Volunteer service hours for academic requirements'
    ]
  },
  {
    id: 'mentor',
    title: 'Mentor',
    level: 3,
    category: 'operations',
    description: 'Experienced professionals and advanced students who provide technical guidance, career advice, and support to hackathon participants throughout their journey.',
    responsibilities: [
      'Provide technical guidance and troubleshooting support to teams',
      'Share industry knowledge and best practices in cybersecurity',
      'Offer career advice and professional development insights',
      'Help participants refine project ideas and implementation strategies',
      'Facilitate networking opportunities between students and industry',
      'Support workshop delivery and educational content',
      'Assist with team formation and collaboration'
    ],
    requirements: [
      'Professional experience in cybersecurity, software development, or related fields',
      'Strong technical knowledge and problem-solving abilities',
      'Patience and enthusiasm for teaching and mentoring',
      'Excellent communication skills across different experience levels'
    ],
    timeCommitment: 'Event weekend plus optional preparation workshops',
    benefits: [
      'Give back to the cybersecurity community',
      'Develop mentoring and leadership skills',
      'Stay connected with emerging trends and student perspectives',
      'Build professional reputation as a thought leader'
    ]
  },
  {
    id: 'judge',
    title: 'Judge',
    level: 3,
    category: 'operations',
    description: 'Expert evaluators who assess participant projects, provide constructive feedback, and determine winners based on technical merit, innovation, and presentation quality.',
    responsibilities: [
      'Evaluate team projects against established criteria and rubrics',
      'Provide detailed, constructive feedback to participants',
      'Participate in deliberation sessions to determine winners',
      'Ask insightful questions during project presentations',
      'Mentor teams on project improvement and future development',
      'Represent industry standards and best practices in evaluation',
      'Support awards ceremony and winner recognition'
    ],
    requirements: [
      'Senior-level experience in cybersecurity, technology, or related fields',
      'Strong analytical and evaluation skills',
      'Fair and objective assessment abilities',
      'Experience with technical project evaluation or code review'
    ],
    timeCommitment: 'Project evaluation day plus awards ceremony',
    benefits: [
      'Influence the next generation of cybersecurity professionals',
      'Stay current with innovative approaches and emerging technologies',
      'Network with other industry leaders and experts',
      'Gain recognition as a subject matter expert'
    ]
  },
  {
    id: 'industry-professional',
    title: 'Industry Professional',
    level: 3,
    category: 'operations',
    description: 'Working professionals who share real-world insights through workshops, panels, and networking sessions, bridging the gap between academic learning and industry practice.',
    responsibilities: [
      'Lead specialized workshops on current industry topics and tools',
      'Share insights about career paths and professional development',
      'Provide real-world context for cybersecurity challenges and solutions',
      'Participate in career panels and Q&A sessions',
      'Offer networking opportunities and potential internship connections',
      'Mentor students on professional skills and industry expectations',
      'Represent their companies and share recruitment opportunities'
    ],
    requirements: [
      'Active employment in cybersecurity, technology, or related industries',
      'Willingness to share knowledge and engage with students',
      'Strong presentation and communication skills',
      'Passion for education and community involvement'
    ],
    timeCommitment: 'Workshop sessions plus networking time during event',
    benefits: [
      'Enhance personal brand and professional reputation',
      'Identify potential talent for recruitment',
      'Stay connected with academic community and emerging trends',
      'Fulfill corporate social responsibility and community engagement goals'
    ]
  },
  {
    id: 'college-panelist',
    title: 'College Panelist',
    level: 3,
    category: 'operations',
    description: 'University representatives and admissions professionals who provide guidance on higher education pathways, cybersecurity programs, and academic opportunities.',
    responsibilities: [
      'Present information about cybersecurity and computer science programs',
      'Provide guidance on college applications and admissions processes',
      'Share insights about campus life and academic opportunities',
      'Discuss scholarship and financial aid opportunities',
      'Network with prospective students and answer individual questions',
      'Represent their institutions and recruitment initiatives',
      'Participate in college fair and information sessions'
    ],
    requirements: [
      'Employment at accredited higher education institution',
      'Knowledge of cybersecurity and technology academic programs',
      'Experience in student recruitment or academic advising',
      'Strong presentation and interpersonal skills'
    ],
    timeCommitment: 'Panel sessions and networking time during event',
    benefits: [
      'Connect with motivated and talented prospective students',
      'Promote institutional programs and increase enrollment',
      'Build relationships with high school counselors and educators',
      'Support educational pipeline development in cybersecurity'
    ]
  },
  {
    id: 'hacker-attendee',
    title: 'Hacker/Attendee',
    level: 4,
    category: 'community',
    description: 'The heart of CipherHacks - passionate students and learners who participate in challenges, build innovative projects, and form the vibrant community that drives our mission.',
    responsibilities: [
      'Actively participate in cybersecurity challenges and workshops',
      'Collaborate effectively in teams and contribute to project development',
      'Engage respectfully with mentors, judges, and fellow participants',
      'Follow event guidelines and code of conduct',
      'Provide feedback to help improve future events',
      'Share knowledge and support fellow participants',
      'Represent the CipherHacks community positively'
    ],
    requirements: [
      'Interest in cybersecurity, technology, or related fields',
      'Willingness to learn and collaborate with others',
      'Commitment to respectful and inclusive behavior',
      'Basic computer literacy and problem-solving skills'
    ],
    timeCommitment: 'Event participation (typically weekend hackathon)',
    benefits: [
      'Learn cutting-edge cybersecurity skills and techniques',
      'Build portfolio projects and gain hands-on experience',
      'Network with industry professionals and like-minded peers',
      'Compete for prizes, scholarships, and recognition',
      'Access exclusive workshops and educational content',
      'Potential internship and job opportunities',
      'Join a supportive community of cybersecurity enthusiasts'
    ]
  }
];

export const ROLE_ASSIGNMENTS: RoleAssignment[] = [
  {
    roleId: 'founder',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Visionary founder passionate about making cybersecurity education accessible to all students.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Cybersecurity', 'Web Development', 'Community Building', 'Public Speaking'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'head-director',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Currently serving as Head Director for the 2024-2025 event season.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Event Management', 'Strategic Planning', 'Team Leadership'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'general-director',
    people: [
      {
        name: 'Wyatt Gill',
        email: 'wyatt@cipherhacks.tech',
        image: '/team/wyatt.jpg',
        gender: 'male',
        bio: 'Passionate about low-level systems, cybersecurity, and AI with strong leadership capabilities.',
        school: 'Francis Parker High School',
        grade: 'Freshman',
        specialties: ['Systems Programming', 'Cybersecurity', 'Artificial Intelligence'],
        links: {
          website: 'https://wyattgill9.github.io',
          github: 'https://github.com/wyattgill9',
          linkedin: 'https://www.linkedin.com/in/wyatt-gill-17380b323'
        }
      },
      {
        name: 'Aaran Chahal',
        email: 'aaran@cipherhacks.tech',
        image: '/team/aaran.jpg',
        gender: 'male',
        bio: 'Innovative thinker focused on AI applications and computer science advancement.',
        school: 'Rancho Bernardo High School',
        grade: 'Sophomore',
        specialties: ['Artificial Intelligence', 'Machine Learning', 'Innovation Strategy'],
        links: {
          github: 'https://github.com/a-chahal'
        }
      },
      {
        name: 'Kevin Wang',
        email: 'kevin@cipherhacks.tech',
        image: '/team/kevin.png',
        gender: 'male',
        bio: 'Dedicated to leveraging AI and computer science for positive social impact.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['AI for Social Good', 'Computer Science', 'Community Impact'],
        links: {}
      },
      {
        name: 'Elijah Reuben Agcaoili',
        email: 'elijah@cipherhacks.tech',
        image: '/team/elijah.jpg',
        gender: 'male',
        bio: 'Administrative leader passionate about technology and community development.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Administration', 'Technology Management', 'Community Outreach'],
        links: {}
      },
      {
        name: 'Jonathan Le',
        email: 'jonathan@cipherhacks.tech',
        image: '/team/jonathan.jpeg',
        gender: 'male',
        bio: 'Passionate in stem education specializing in finance management and marketing.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Finance Management', 'Marketing', 'Community Outreach'],
        links: {
          linkedin: "https://www.linkedin.com/in/jonathan-le-036796342",
        }
      },
      {
        name: 'Gabe Santos',
        email: 'gabe@cipherhacks.tech',
        image: '/team/gabe.jpeg',
        gender: 'male',
        bio: 'Passionate in stem education specializing in outreach and community engagement.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Outreach', 'Community Engagement', 'Marketing'],
        links: {
        }
      }
    ]
  },
  {
    roleId: 'marketing-director',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Currently handling marketing responsibilities while seeking dedicated team members to take over this role.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Marketing Strategy', 'Social Media', 'Community Outreach', 'Brand Management'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'technology-director',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Managing technical infrastructure while actively recruiting dedicated technology leaders to take ownership of this critical role.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Web Development', 'System Architecture', 'Cybersecurity', 'Platform Management'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'logistics-director',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Overseeing event logistics while seeking organized individuals to lead venue coordination and operational planning.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Event Planning', 'Venue Coordination', 'Operations Management', 'Vendor Relations'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'partnerships-director',
    people: [
      {
        name: 'Arshan Shokoohi',
        email: 'arshan@cipherhacks.tech',
        image: '/team/arshan.jpg',
        gender: 'male',
        bio: 'Managing sponsor relationships and partnerships while looking for business-minded individuals to lead corporate engagement.',
        school: 'Rancho Bernardo High School',
        grade: 'Senior',
        specialties: ['Business Development', 'Sponsor Relations', 'Partnership Strategy', 'Corporate Communications'],
        links: {
          website: 'https://arshan.dev',
          github: 'https://github.com/arshansgithub',
          linkedin: 'https://www.linkedin.com/in/arshanshokoohi/'
        }
      }
    ]
  },
  {
    roleId: 'event-staff',
    people: []
  },
  {
    roleId: 'mentor',
    people: []
  },
  {
    roleId: 'judge',
    people: []
  },
  {
    roleId: 'industry-professional',
    people: []
  },
  {
    roleId: 'college-panelist',
    people: []
  },
  {
    roleId: 'hacker-attendee',
    people: [
      {
        name: 'CipherHacks Community',
        email: 'hello@cipherhacks.tech',
        image: '/192trans.png',
        gender: 'other',
        bio: 'Representing passionate students, cybersecurity enthusiasts, and future tech leaders who will participate in our inaugural hackathon.',
        school: 'Various High Schools & Universities',
        grade: 'Mixed Levels',
        specialties: ['Cybersecurity', 'Programming', 'Innovation', 'Problem Solving', 'Teamwork'],
        links: {
          website: 'https://cipherhacks.tech'
        }
      }
    ]
  }
];

// Helper functions
export const getRoleById = (roleId: string): RoleDefinition | undefined => {
  return ROLE_DEFINITIONS.find(role => role.id === roleId);
};

export const getPeopleInRole = (roleId: string): PersonInRole[] => {
  const assignment = ROLE_ASSIGNMENTS.find(assignment => assignment.roleId === roleId);
  return assignment?.people || [];
};

export const getRolesByCategory = (category: RoleDefinition['category']): RoleDefinition[] => {
  return ROLE_DEFINITIONS.filter(role => role.category === category);
};

export const getAllRolesWithPeople = () => {
  return ROLE_DEFINITIONS.map(role => ({
    ...role,
    people: getPeopleInRole(role.id)
  }));
};
