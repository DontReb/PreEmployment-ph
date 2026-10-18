// The documents a first-time job seeker usually needs.
// Components read from this list, so adding a document here updates the site.
//
// Fees and steps change. When you re-check them, update LAST_CHECKED too.
// Each requirement has:
//   cost        what people usually pay (null when it's free for everyone)
//   free        how to get it for free, if possible
//   apply       official websites only (never third-party "helper" sites)
//   bring       what to have with you
//   steps       how to get it, in order
//   tips        things that save time or trouble
//   mode        'online', 'visit' (you go in person), or 'employer' (HR does it)
//   forms       forms you'll fill out or print, and where to find the current version
export const LAST_CHECKED = 'October 2026'

const requirements = [
  {
    id: 'psa',
    name: 'PSA birth certificate',
    agency: 'PSA',
    agencyName: 'Philippine Statistics Authority',
    summary:
      'Your official birth record. Many other offices ask for it, so it usually comes first.',
    cost: '₱155 per copy at a PSA outlet, or ₱330 per copy delivered to your home through PSA Serbilis.',
    free: 'Free once under RA 11261. Bring your first-time jobseeker certification to a PSA outlet in person.',
    apply: [{ label: 'PSA Serbilis (online, delivered)', url: 'https://www.psaserbilis.com.ph' }],
    bring: [
      'A valid ID',
      'Your full name, birthday, birthplace, and both parents’ full names (your mother’s maiden name)',
      'Your first-time jobseeker certification, if you’re using RA 11261',
    ],
    steps: [
      'Go to a PSA Civil Registry System outlet, or order online through PSA Serbilis.',
      'Fill out the birth certificate request form.',
      'Pay the fee, or present your first-time jobseeker certification.',
      'Claim your copy at the outlet, or wait for delivery.',
    ],
    tips: [
      'Check every letter of your name and your birthday on the copy before you leave. Other offices copy these details from it.',
      'Some employers ask for an original copy, so consider getting more than one.',
    ],
    mode: 'online',
    forms: [],
  },
  {
    id: 'barangay',
    name: 'Barangay clearance',
    agency: 'Your barangay',
    agencyName: 'Your barangay hall',
    summary: 'Confirms that you live in your barangay and are in good standing there.',
    cost: 'Set by each barangay.',
    free: 'Free once under RA 11261. Ask for your first-time jobseeker certification at the same visit.',
    apply: [],
    bring: [
      'A valid ID or proof that you live in the barangay',
      'Money for the fee, unless you’re using RA 11261',
    ],
    steps: [
      'Go to your barangay hall and say you need a barangay clearance for employment.',
      'If this is your first job, also ask for a First-Time Jobseeker Certification. Many barangays ask you to sign an oath of undertaking with it.',
      'Fill out the form and wait for the barangay captain or an authorized officer to sign.',
    ],
    tips: [
      'Get the first-time jobseeker certification only when you’re ready to apply for jobs. Its benefits last one year from the day it’s issued.',
      'Ask for photocopies of the certification. Each office you visit may keep one.',
    ],
    mode: 'visit',
    forms: [
      {
        name: 'First-Time Jobseeker Certification and oath of undertaking',
        where: 'Given and signed at your barangay hall. Each barangay uses its own copy.',
      },
    ],
  },
  {
    id: 'nbi',
    name: 'NBI clearance',
    agency: 'NBI',
    agencyName: 'National Bureau of Investigation',
    summary: 'Shows whether you have a criminal record anywhere in the country.',
    cost: '₱130, plus about ₱25 for online payment.',
    free: 'Free once under RA 11261. Bring your first-time jobseeker certification to your appointment.',
    apply: [{ label: 'NBI Clearance Online', url: 'https://clearance.nbi.gov.ph' }],
    bring: [
      'Two valid government-issued IDs (originals)',
      'Your reference number from the online registration',
      'Your first-time jobseeker certification, if you’re using RA 11261',
    ],
    steps: [
      'Create an account on NBI Clearance Online and fill out the application form.',
      'Choose an NBI branch and an appointment date.',
      'Pay online and save your reference number, or choose the first-time jobseeker option if it’s offered.',
      'Go to your appointment for your photo, fingerprints, and signature.',
      'Claim your clearance. Without a “hit,” it’s usually released the same day.',
    ],
    tips: [
      'Use only clearance.nbi.gov.ph. Look-alike sites charge extra or steal personal data.',
      'A “hit” means someone in the database has a similar name. It doesn’t mean you did anything wrong. You’ll be told when to come back.',
    ],
    mode: 'visit',
    forms: [],
  },
  {
    id: 'police',
    name: 'Police clearance',
    agency: 'PNP',
    agencyName: 'Philippine National Police',
    summary: 'Shows whether you have a record with the police.',
    cost: '₱150, plus a small fee (about ₱20 to ₱30) if you pay online.',
    free: 'Free once under RA 11261. Bring your first-time jobseeker certification to the station.',
    apply: [{ label: 'National Police Clearance System', url: 'https://pnpclearance.ph' }],
    bring: [
      'Two valid government-issued IDs (originals)',
      'Your appointment slip and payment receipt from the website',
      'Your first-time jobseeker certification, if you’re using RA 11261',
    ],
    steps: [
      'Register on the National Police Clearance System.',
      'Choose a police station and an appointment time.',
      'Pay online, or prepare your first-time jobseeker certification.',
      'Go to the station for your photo and fingerprints.',
      'Claim your clearance. Without a “hit,” it’s usually released within the hour.',
    ],
    tips: [
      'Use only pnpclearance.ph. Fake sites copy its look to steal personal data.',
      'Some employers accept either an NBI or a police clearance. Ask which one they need before getting both.',
    ],
    mode: 'visit',
    forms: [],
  },
  {
    id: 'sss',
    name: 'SSS number',
    agency: 'SSS',
    agencyName: 'Social Security System',
    summary:
      'Your membership number for social security benefits like sickness, maternity, and retirement.',
    cost: null,
    free: 'Free for everyone.',
    apply: [{ label: 'SSS website (Apply for an SS Number)', url: 'https://www.sss.gov.ph' }],
    bring: ['An email address you can open', 'Your PSA birth certificate details', 'A valid ID'],
    steps: [
      'On the SSS website, choose “Apply for an SS Number” and fill out the form.',
      'Save the SS number shown on screen, and print the E-1 form if you need a copy.',
      'Open the link sent to your email to create your My.SSS account. It expires after 30 days.',
    ],
    tips: [
      'You only ever need one SS number. If you had one before (even from a part-time job), use that one.',
      'Give your employer the 10-digit SS number so they can pay your contributions.',
    ],
    mode: 'online',
    forms: [
      {
        name: 'SSS Form E-1 (Personal Record)',
        where: 'Shown after you apply for an SS number online. Print it if your employer asks.',
      },
    ],
  },
  {
    id: 'pagibig',
    name: 'Pag-IBIG MID number',
    agency: 'Pag-IBIG Fund',
    agencyName: 'Home Development Mutual Fund',
    summary: 'Your membership number for the Pag-IBIG savings and housing loan program.',
    cost: null,
    free: 'Free for everyone.',
    apply: [
      { label: 'Virtual Pag-IBIG (Be a Member)', url: 'https://www.pagibigfundservices.com/virtualpagibig/' },
    ],
    bring: ['An email address and mobile number you can open', 'A valid ID'],
    steps: [
      'Open Virtual Pag-IBIG and choose “Be a Member.”',
      'Fill out the online form.',
      'Save your Registration Tracking Number (RTN) and print your Member’s Data Form (MDF).',
      'Wait about 2 to 3 working days for your permanent 12-digit MID number.',
    ],
    tips: [
      'The RTN is not your MID number. Give your employer the 12-digit MID, because that’s the number they pay contributions to.',
    ],
    mode: 'online',
    forms: [
      {
        name: 'Member’s Data Form (MDF)',
        where: 'Print it from Virtual Pag-IBIG right after you register.',
      },
    ],
  },
  {
    id: 'philhealth',
    name: 'PhilHealth number',
    agency: 'PhilHealth',
    agencyName: 'Philippine Health Insurance Corporation',
    summary: 'Your national health insurance number (PIN).',
    cost: null,
    free: 'Free for everyone.',
    apply: [{ label: 'PhilHealth Member Portal', url: 'https://memberinquiry.philhealth.gov.ph' }],
    bring: [
      'A filled-out PhilHealth Member Registration Form (PMRF), if you go in person',
      'A valid ID',
      'Your PSA birth certificate',
    ],
    steps: [
      'Ask your employer first. Many companies register new hires for you.',
      'If you register yourself, use the PhilHealth Member Portal, the eGovPH app, or a PhilHealth office.',
      'Online, choose the option for people who don’t have a PIN yet.',
      'Wait for your PIN by email, usually within 3 to 5 working days.',
    ],
    tips: ['Submit only one application. Duplicate applications slow everything down.'],
    mode: 'online',
    forms: [
      {
        name: 'PhilHealth Member Registration Form (PMRF)',
        where: 'Only needed if you register in person. On the PhilHealth website, open Downloads, then Forms.',
        url: 'https://www.philhealth.gov.ph',
      },
    ],
  },
  {
    id: 'tin',
    name: 'TIN',
    agency: 'BIR',
    agencyName: 'Bureau of Internal Revenue',
    summary: 'Your Taxpayer Identification Number, used to file and pay your income tax.',
    cost: null,
    free: 'Free for everyone.',
    apply: [{ label: 'BIR ORUS (Online Registration and Update System)', url: 'https://orus.bir.gov.ph' }],
    bring: ['Your PSA birth certificate', 'A valid ID', 'Proof of employment, if your employer asks for it'],
    steps: [
      'Wait until you’re hired. For a first job, your employer is responsible for registering your TIN using BIR Form 1902.',
      'Give HR the documents they ask for.',
      'Receive your TIN from HR or by email, and keep it safe for life.',
    ],
    tips: [
      'Never get a second TIN. Having more than one is against the law.',
      'If an employer asks for a TIN before hiring you, ask if they can process it for you once you’re hired.',
    ],
    mode: 'employer',
    forms: [
      {
        name: 'BIR Form 1902',
        where: 'Your employer usually gives it to you. The current version is on the BIR website under BIR Forms.',
        url: 'https://www.bir.gov.ph',
      },
    ],
  },
]

export default requirements

// Labels for each `mode`, shared by the cards, filters, and requirement pages
export const modeLabels = {
  online: 'Online',
  visit: 'In person',
  employer: 'Through your employer',
}
