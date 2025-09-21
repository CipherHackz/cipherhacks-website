import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const rulesAndPolicies = [
  {
    title: 'Overview & Definitions',
    content: [
      'Event: CipherHacks 2025 (the “Hackathon”), a two-day, in-person student hackathon held October 10-11, 2025 at San Diego Central Library, 330 Park Blvd, San Diego, CA.',
      'Organizer: CipherHacks Organizing Committee, fiscally sponsored by The Hack Foundation (Hack Club), a 501(c)(3) nonprofit, via Hack Club Bank.',
      'Participant: Any individual attending as a hacker, mentor, volunteer, organizer, judge, speaker, sponsor representative, or guest.',
      'Project: Software, hardware, or mixed-media deliverable created by a team during the official hacking window.',
    ],
  },
  {
    title: 'Key Dates (Pacific Time)',
    content: [
      'Registration opens: Aug 25, 2025 - 9:00 AM PT',
      'Registration closes: Oct 2, 2025 - 11:59 PM PT',
      'Check-in & team forming: Oct 10, 2025 - 10:00-10:30 AM PT',
      'Opening ceremony: Oct 10, 2025 - 10:45 AM PT',
      'Hacking window: Oct 10 - 11:00 AM PT to Oct 11 - 3:00 PM PT',
      'Submission freeze (Devpost): Oct 11, 2025 - 3:00 PM PT',
      'Expo & demos: Oct 11, 2025 - 1:30-3:30 PM PT',
      'Judging & awards: Oct 11, 2025 - 3:45-5:00 PM PT',
      'Subject to massive changes. Any made will be emailed to registrants and posted in Discord.',
    ],
  },
  {
    title: 'Eligibility',
    content: [
      'Age & School Status: Open to students 13-19 currently enrolled in high school (or equivalent).',
      'Residency: International students welcome; travel/visa arrangements are the participant’s responsibility.',
      'Teams: 1–4 people. Team changes after hacking begins require organizer approval.',
      'Parental Consent: Under-18 participants must submit a signed permission & liability waiver at check-in.',
      'Conflicts of Interest: Organizers, judges, mentors, and sponsor staff may not compete for prizes.',
      'Code of Conduct: Admission and continued participation require acceptance and compliance with the CipherHacks Code of Conduct.',
    ],
  },
  {
    title: 'Registration, Check-In, Venue Hours & Supervision',
    content: [
      'Apply via the official application form; acceptance emails include instructions.',
      'Bring a school ID or government photo ID to on-site check-in.',
      'Capacity: Walk-ins are not guaranteed once capacity (target: ~150 hackers) is reached.',
      'Venue Hours: On both October 10 and 11, participants can enter the venue between 9:45-10:00 AM and must be outside of the venue by 5:30 PM. A more detailed schedule will be emailed to registrants. Overnight stay is not permitted.',
      'Minors: Guardians must provide a pick-up plan. Organizers are not responsible for off-site supervision.',
    ],
  },
  {
    title: 'Intellectual Property & Licensing',
    content: [
      'You own your work. Teams retain all rights to their Project, including code, designs, and documentation.',
      'License to Organizer: You grant CipherHacks a perpetual, worldwide, royalty-free, non-exclusive license to display, demo, photograph, film, and publicize your Project for judging, promotional, or educational purposes.',
      'Open Source Requirement (for prize eligibility): A public repository must be linked at submission time and remain public through Dec 31, 2025. Remove secrets/keys; use environment variables and .gitignore.',
      'Exception: With pre-approval from the Head Organizer, security-sensitive projects may submit a private repo shared with judges plus a redacted public readme/video.',
    ],
  },
  {
    title: 'Competition Rules',
    subsections: [
        {
            subtitle: 'Fresh Work:',
            content: ['All code/assets/wiring must be created or substantially modified during the hacking window. Planning, ideation, design sketches, and mentoring before the event are fine.']
        },
        {
            subtitle: 'Permitted Resources:',
            content: [
                'Public, properly licensed libraries/frameworks/templates',
                'Generative-AI tools (e.g., Copilot, ChatGPT) with clear attribution in the README',
                'Off-the-shelf hardware modules (Arduino, sensors, etc.)'
            ]
        },
        {
            subtitle: 'Prohibited Content:',
            content: [
                'Malware, illicit data scraping, credential stuffing, or any activity violating U.S. law or venue policies',
                'Projects that facilitate discrimination, harassment, or direct harm'
            ]
        },
        {
            subtitle: 'AI & Third-Party Use:',
            content: [
                'Attribute all third-party/AI-generated code, assets, and models.',
                'Ensure license compliance for fonts, images, datasets, and music.',
                'Do not expose proprietary data or secrets in repos or demos.'
            ]
        },
        {
            subtitle: 'Cybersecurity & Network Acceptable Use (critical):',
            content: [
                'Security testing is limited to explicitly provided targets (CTF ranges, local sandboxes, or approved endpoints announced by organizers).',
                'Do not scan/attack the venue network, public Internet targets, personal devices, or any system not in-scope.',
                'Network disruption tools, packet flooding, or traffic interception of other participants are prohibited.',
                'Violations may result in immediate disqualification and removal.'
            ]
        },
        {
            subtitle: 'Submission Package (Devpost):',
            content: [
                'Project title + one-sentence tagline',
                'Public Git repo link (or approved private w/ judge access)',
                'Up to 2-minute demo video (YouTube/Vimeo)',
                'Description, tech stack, what you built/learned, challenges, screenshots'
            ]
        },
        {
            subtitle: 'Late Fixes:',
            content: ['After the deadline, only minor bug-fixes (e.g., truly minimal, organizer/judge-approved) to preserve demo stability - no new features.']
        },
        {
            subtitle: 'Cheating & Plagiarism:',
            content: [
                'Copy-pasting uncredited work or recycling old projects is prohibited.',
                'Prior personal code may be reused only if clearly disclosed and the project is substantially new (guideline: >=70% new work).'
            ]
        }
    ]
  },
  {
    title: 'Code of Conduct',
    content: [
        'All participants must follow the CipherHacks Code of Conduct (separate document).',
        'Reporting: team@cipherhacks.tech or find any staff member. Retaliation against good-faith reports is prohibited.'
    ]
  },
  {
    title: 'Judging & Awards',
    subsections: [
      {
        subtitle: 'Round 1: Judging Criteria',
        content: [
          'In the first round, judges will visit teams to assess projects on the following criteria: Technical Implementation, Creativity/Originality, Impact/Purpose, Polish/Presentation, Cyber Alignment/Ethics, and Wow-Factor.',
          'Based on qualifications, judges may also tag projects as eligible for special tracks like Best Beginner Hack, Best Design.',
        ],
      },
      {
        subtitle: 'Round 2: Finalist Selection',
        content: [
          'The second round incorporates a popular vote. Final winners are determined by a combination of judge scores and the popular vote. Further details on the process will be released closer to the event.',
        ],
      },
      {
        subtitle: 'Prizes & Final Decisions',
        content: [
          'Prizes will be posted on Devpost and the event website.',
          'All judging decisions are final. Procedural appeals may be submitted to appeals@cipherhacks.tech.',
          'Tax Notice: Winners are responsible for any applicable federal, state, or local taxes on prizes.',
        ],
      },
    ]
  },
  {
    title: 'Health, Safety & Accessibility',
    content: [
        'Trained first-aid lead and stocked kit on site. In emergencies, call 911, then alert staff.',
        'Accessibility: We aim to provide an inclusive, accessible event. For mobility, sensory, communication, dietary, prayer/quiet space, or other needs, email accessibility@cipherhacks.tech at least 14 days prior.',
        'Allergies/Medical: Disclose in your application; carry your own medications (e.g., inhaler, EpiPen). We label common allergens but cannot guarantee an allergen-free environment.',
        'Maker/Hardware Safety: Soldering, hot tools, blades, batteries, aerosols, and chemicals are permitted only in designated areas under staff guidance.'
    ]
  },
  {
    title: 'Cheating & Plagiarism Policy (Enforcement)',
    content: [
        'Grounds for Investigation: Private or suspicious repos, unusually large last-minute commits, identical code to public tutorials without attribution, or credible reports.',
        'Process: Organizer review of repo and commit history; team interview.',
        'Outcomes: Coaching/warning, project hidden on Devpost, disqualification, prize revocation, and/or bans from future events.'
    ]
  },
  {
    title: 'Privacy & Data Use',
    content: ['Seperate document.']
  },
  {
    title: 'Liability Waiver',
    content: ['Participants and (if applicable) guardians agree to hold CipherHacks, The Hack Foundation (Hack Club), the San Diego Public Library, and event sponsors harmless for injury, loss, or damage incurred during the event, except in cases of gross negligence or willful misconduct. A signed Event Liability Release is required to be completed by check-in.']
  },
  {
    title: 'Media Release',
    content: ['As referenced in the liability release form, by attending, you consent to photography, video, and livestreams that may include your likeness for promotional or educational use without additional compensation.']
  },
  {
    title: 'Alcohol, Drugs, Smoking & Weapons',
    content: [
        'No alcohol, cannabis, illegal drugs, vaping, e-cigarettes, or smoking on premises.',
        'No firearms, knives, or weapons. Maker tools with small blades/hot tips are allowed only in designated areas under staff guidance.'
    ]
  },
  {
    title: 'Communications & Email Verification',
    content: [
        'Official communications are via the email provided in your application and the event Discord. You are responsible for monitoring both.',
        'Applicants must complete the Email Deliverability Verification step during the application. Failure to verify may result in missed notices (acceptance, logistics) and could affect participation.'
    ]
  },
  {
    title: 'Incident Reporting & Enforcement',
    content: ['Report any safety or conduct concern to team@cipherhacks.tech, a staff badge on site, or the Safety Lead desk. We may take any action necessary to protect participants and the event, up to removal and bans. No retaliation against good-faith reporters.']
  },
  {
    title: 'Amendments',
    content: ['Organizers may update these policies for clarity, safety, or legal compliance. Material changes will be announced in Discord and emailed to registered hackers and will be highlighted at least 24 hours before taking effect (except emergency safety updates).']
  },
  {
    title: 'Administrative Discretion (Head Organizer)',
    content: ['Interpretation and enforcement of these Rules & Policies are at the sole discretion of the Head Organizer, Arshan Shokoohi, or their designee. Decisions made in good faith to protect participants, staff, and the event are final.']
  },
  {
    title: 'Governing Law & Severability',
    content: ['These terms are governed by the laws of the State of California. If any provision is held invalid or unenforceable, the remainder remains in full force, and the invalid provision will be replaced with an enforceable one that most closely reflects the original intent.']
  },
  {
    title: 'Contact',
    content: [
        'Email: team@cipherhacks.tech',
        'Phone Number: (858) 588-1821',
        'See you in October - happy hacking!'
    ]
  }
];

const RulesAndPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-30 p-6 sm:p-8 rounded-xl shadow-2xl border border-atom-blue border-opacity-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-atom-blue mb-2 text-center">CipherHacks 2025 - Official Rules & Policies</h1>
          <p className="text-center text-sm text-atom-fg-muted mb-8">Last updated: August 21, 2025</p>
          <p className="text-center bg-yellow-900 bg-opacity-50 border border-yellow-600 text-yellow-300 p-4 rounded-lg mb-8">
            <strong>Important:</strong> By registering for or attending CipherHacks, you (and a parent/guardian if under 18) agree to abide by every section of this document. Failure to do so may result in disqualification, removal from the event, prize revocation, future bans, or referral to law enforcement where appropriate.
          </p>
        </motion.div>

        <div className="space-y-8">
          {rulesAndPolicies.map((section, index) => (
            <motion.section 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.25, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-atom-cyan mb-4 border-b-2 border-atom-blue pb-2">{index + 1}) {section.title}</h2>
              {section.content && section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-3 leading-relaxed">{paragraph}</p>
              ))}
              {section.subsections && section.subsections.map((subsection, sIndex) => (
                <div key={sIndex} className="ml-4 mt-4">
                  <h3 className="text-xl font-semibold text-atom-green mb-2">{subsection.subtitle}</h3>
                  {subsection.content.map((paragraph, pIndex) => (
                     <p key={pIndex} className="mb-2 pl-4 border-l-2 border-atom-green border-opacity-30 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              ))}
            </motion.section>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 text-center">
          <RouterLink to="/" className="inline-block bg-atom-purple text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-lg">
            Back to Home
          </RouterLink>
        </motion.div>
      </div>
    </div>
  );
};

export default RulesAndPolicy;
