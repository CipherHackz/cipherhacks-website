import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const cocData = [
  {
    title: 'Who this applies to',
    content: ['All participants-hackers, mentors, volunteers, organizers, judges, sponsors, and guests-in all CipherHacks spaces, including our venue, Discord, email, social media, and any meetups or side chats associated with the event.'],
  },
  {
    title: 'Our values',
    content: [
      'Respect: Treat people, their time, and their work with care.',
      'Inclusion: Make space for everyone; especially those new to tech or from underrepresented groups.',
      'Honesty: Give credit, communicate clearly, and act in good faith.',
      'Safety: Choose words and actions that keep others physically and emotionally safe.',
      'Learning first: Encourage curiosity, questions, and constructive feedback.',
    ],
  },
  {
    title: 'Expected behavior',
    content: [
      'Be welcoming; use clear, polite language.',
      'Offer help generously; accept feedback gracefully.',
      'Credit teammates and sources; attribute third-party code/designs.',
      'Ask for consent before taking photos, recording, or direct-messaging someone new.',
      'Respect personal boundaries and pronouns; use names people give you.',
      'Include remote/quiet voices; avoid interrupting or talking over others.',
      'Keep private information private; share only what you’re allowed to share.',
      'If conflict arises, pause, listen, and try to resolve respectfully - or ask staff to help.',
    ],
  },
  {
    title: 'Unacceptable behavior',
    content: [
      'Harassment or discrimination, including but not limited to:',
      'Offensive comments or slurs related to race, color, ethnicity, nationality, gender identity/expression, sexual orientation, religion, disability, neurotype, body size, age, or any protected characteristic.',
      'Threats, stalking, doxxing, unwanted photography/recording, or sustained disruption.',
      'Unwanted physical contact or sexual attention - romantic or sexual advances are not appropriate in this space.',
      'Bullying, shaming, or belittling someone’s experience/skills.',
      'Repeated one-on-one contact after being asked to stop (including DMs).',
      'Sharing others’ private content or personal data without explicit permission.',
      'Sabotaging projects, plagiarism, or misrepresenting others’ work as your own.',
      'If someone says “stop” or “no”, your interaction must end immediately.',
    ],
  },
  {
    title: 'Additional expectations for mentors, sponsors, and judges',
    content: [
      'Power & boundaries: Be mindful of the influence you have. No recruiting pressure, quid pro quo, or personal advances toward participants.',
      'Equity: Give equal time and attention across teams; avoid favoritism and conflicts of interest.',
      'Privacy: Do not solicit personal contact info from minors; route communications through public channels or guardians when appropriate.',
      'Professionalism: Feedback should be specific, kind, and focused on growth.',
    ],
  },
  {
    title: 'Online & communications etiquette',
    content: [
      'Keep discussions on topic; move side debates to appropriate channels.',
      'No spamming or mass-tagging.',
      'Mark spoilers or sensitive content and use content warnings when relevant.',
      'Don’t post screenshots/recordings of chats, code, or people without permission.',
    ],
  },
  {
    title: 'Accessibility & inclusion',
    content: [
      'Ask about access needs; don’t question or challenge someone’s disclosed accommodations.',
      'Provide alternatives (text + visuals), avoid jargon when possible, and be patient with language differences.',
    ],
  },
  {
    title: 'If you’re impacted (or see a problem)',
    content: [
      'Tell us. We take concerns seriously and respond quickly.',
      'Report to: Email: safety@cipherhacks.tech, On-site: Find any organizer (staff members), Online: DM administrators in our Discord server.',
      'Please share (if you can): what happened, where/when, who was involved, any witnesses, and what you need right now. We will keep reports confidential, share only with those who must act, and prohibit retaliation against anyone who reports in good faith.',
      'If anyone is in immediate danger, call local emergency services first.',
    ],
  },
  {
    title: 'How we enforce',
    content: [
      'Our team may take any action we deem appropriate to protect participants, including:',
      'Conversation, coaching, or verbal reminder',
      'Formal warning',
      'Removal from a session, channel, or space',
      'Disqualification from prizes/participation',
      'Ban from future CipherHacks events',
      'Contacting a school/guardian or, if necessary, law enforcement',
      'We aim to: listen first, act promptly, document incidents, and prioritize the safety of impacted people. You may request a brief explanation of any decision - appeals can be sent to appeals@cipherhacks.tech within 7 days.',
    ],
  },
  {
    title: 'Attribution & updates',
    content: ['This Code of Conduct is adapted from community best practices (open-source CoCs and youth-event guidance) and tailored for CipherHacks. We review it regularly and welcome suggestions at team@cipherhacks.tech.'],
  },
];

const CodeOfConduct: React.FC = () => {
  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-30 p-6 sm:p-8 rounded-xl shadow-2xl border border-atom-blue border-opacity-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-atom-blue mb-2 text-center">CipherHacks Code of Conduct</h1>
          <p className="text-center text-sm text-atom-fg-muted mb-8">Last updated: August 21, 2025</p>
          <p className="text-center bg-red-900 bg-opacity-50 border border-red-600 text-red-300 p-4 rounded-lg mb-8">
            <strong>Short version:</strong> Be kind, inclusive, and truthful. Help others. Ask for consent. No harassment, bullying, or discrimination - ever. If you see something unsafe or disrespectful, report it. We’ll act quickly to keep everyone safe.
          </p>
        </motion.div>

        <div className="space-y-8">
          {cocData.map((section, index) => (
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

export default CodeOfConduct;
