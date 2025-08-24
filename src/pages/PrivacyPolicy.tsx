import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const policyData = [
  {
    title: '1) Scope',
    content: [
            'This policy covers information we collect through our application and registration forms, email deliverability test, event check-in, judging and submissions portals (e.g., Devpost), event communications (email and Discord), and on-site activities (e.g., photos and video). Please note that additional information may be collected through other forms, surveys, or interactive features provided by CipherHacks.',
    ],
  },
  {
    title: '2) What we collect',
    subsections: [
      {
        subtitle: 'Registration Information You Provide',
        content: [
          'Identity & Contact: First and last name, preferred name, preferred pronouns, age, email address, phone number, school name, and grade.',
          'Guardian & Emergency Contacts: Parent/guardian full name and email, plus an emergency contact’s full name, phone number, and relationship to you.',
          'Event Logistics: T-shirt size, allergies, dietary needs, or other accessibility accommodations.',
          'Demographic Information (Optional): You may voluntarily provide information like your gender identity, race/ethnicity, first-generation college student status, low-income status, and residential ZIP code. You can always select “Prefer not to say.”',
          'Sponsor Profile Sharing (Optional): If you opt in, we will collect your first name and email to share with select sponsors. You may also optionally share links to your GitHub, LinkedIn, or personal portfolio.',
          'Referral Source: How you heard about CipherHacks.',
        ],
      },
      {
        subtitle: 'Information We Collect Automatically',
        content: [
          'Technical Logs: We collect standard web server logs, which include your device type, browser, IP address, and access timestamps. This helps us maintain security and troubleshoot.',
          'Event Media: We may take photographs and record video at the event, which may include your likeness. Your attendance constitutes consent to this as outlined in our Media Release.',
        ],
      },
    ],
  },
  {
    title: '3) How we use your information',
    content: [
      'Run the event: process applications, manage rosters/teams, coordinate logistics and safety, and contact you about event operations.',
      'Judging & prizes: publish your project information to judges and attendees, administer awards, and showcase projects.',
      'Communications: send acceptance notices, schedules, updates, and the email deliverability test.',
      'Improvements & reporting: generate anonymized, aggregate statistics (e.g., attendance, experience levels, demographics) to improve future events and support grants/sponsorships.',
      'Legal & safety: enforce our Rules & Policies and Code of Conduct, and comply with applicable laws.',
    ],
  },
  {
    title: '4) When we share information',
    content: [
      'Service providers (processors): We use reputable vendors to host forms, store files, send email, manage websites, process submissions, run the event Discord, and similar. These providers may process personal information solely to provide their services to us and must protect it appropriately.',
      'Anonymized demographics: We may share anonymized and aggregate demographic data publicly or with sponsors/partners. This data does not identify you.',
      'Sponsor outreach (opt-in only): We do not share your personal information with sponsors unless you explicitly opt in. If you opt in, we will share only the fields you consent to share (e.g., name and email, and optionally LinkedIn, GitHub, or portfolio), and only for the purpose stated (e.g., opportunities, resources).',
      'Legal/safety: We may disclose information if required by law or to protect participants and the event.',
      'We do not sell personal information. Shocker right?',
    ],
  },
  {
    title: '5) Legal bases / our reasons',
    content: [
      'We process information to operate the event, fulfill our commitments to you, and pursue our legitimate interests in running a safe, educational hackathon. For optional sponsor sharing and certain communications, we rely on your consent, which you can withdraw at any time.',
    ],
  },
  {
    title: '6) Data retention',
    content: [
      'Identifiable event data including anonymized statistics: kept for indefinitely unless specifically requested not to.',
      'Why? We may use your information to recontact for future events.',
      'Media (photos and video): may be retained and used per the event’s media consent terms.',
      'If you withdraw consent or request deletion, we will act within a reasonable timeframe unless we must retain data for legal or safety reasons.',
    ],
  },
  {
    title: '7) Your choices & rights',
    content: [
      'Access, Update, or Delete: You can request a copy, correction, or deletion of your information.',
      'Sponsor opt-in: It’s optional. You can change your preference or opt out later.',
      'Email preferences: You can unsubscribe from non-essential emails; note that operational emails (e.g., acceptance, schedule, safety) are required for participation.',
      'To exercise these choices, email team@cipherhacks.tech (guardians may contact us on behalf of minors).',
    ],
  },
  {
    title: '8) Security',
    content: [
      'We apply reasonable administrative, technical, and physical safeguards (limited access, secure storage, transport encryption where applicable). No method is perfectly secure; please avoid sending secrets or unnecessary sensitive data.',
    ],
  },
  {
    title: '9) Minors',
    content: [
      'Participation is for students typically 13-19. If you’re under 18, we require parent or guardian permission and signatures as part of registration. We do not knowingly collect personal information from children under 13 without verifiable parental consent.',
    ],
  },
  {
    title: '10) International participants',
    content: [
      'Data may be stored or processed in the United States or other locations where our service providers operate. By participating, you understand your information may be transferred to jurisdictions with different data protection laws.',
    ],
  },
  {
    title: '11) Changes to this policy',
    content: [
      'We may update this policy. Material changes will be posted on our site and, when appropriate, emailed or announced in Discord with the effective date.',
    ],
  },
  {
    title: '12) Contact us',
    content: [
      'Email: privacy@cipherhacks.tech',
      'The data controller for event operations is the CipherHacks Organizing Committee (fiscally sponsored by The Hack Foundation / Hack Club). If you have concerns we can’t resolve, you may have rights under local law to contact a supervisory authority.',
    ],
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-atom-bg text-atom-fg p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-30 p-6 sm:p-8 rounded-xl shadow-2xl border border-atom-blue border-opacity-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-atom-blue mb-2 text-center">CipherHacks Privacy Policy</h1>
          <p className="text-center text-sm text-atom-fg-muted mb-8">Effective date: August 21, 2025</p>
          <p className="text-center bg-blue-900 bg-opacity-50 border border-blue-600 text-blue-300 p-4 rounded-lg mb-8">
            <strong>Heads up:</strong> CipherHacks is a student-run event fiscally sponsored by The Hack Foundation (Hack Club). This policy explains what info we collect and why. If you are under 18, a parent or guardian must review this with you.
          </p>
        </motion.div>

        <div className="space-y-8">
          {policyData.map((section, index) => (
            <motion.section 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.25, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-atom-cyan mb-4 border-b-2 border-atom-blue pb-2">{section.title}</h2>
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

export default PrivacyPolicy;
