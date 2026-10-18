// Content for the Guides section. Requirement ids link to their own pages.

export const recommendedOrder = [
  {
    title: 'Start at your barangay hall',
    body: 'Ask for your First-Time Jobseeker Certification and your barangay clearance in one visit. The certification is what makes the other documents free.',
    links: ['barangay'],
  },
  {
    title: 'Get your PSA birth certificate',
    body: 'Other offices copy your details from it, so get it early and check that every detail is correct.',
    links: ['psa'],
  },
  {
    title: 'Register your membership numbers online',
    body: 'SSS, Pag-IBIG, and PhilHealth are free and can be done from home. Keep the numbers somewhere safe.',
    links: ['sss', 'pagibig', 'philhealth'],
  },
  {
    title: 'Book your clearances',
    body: 'Book the NBI and police clearance online, then bring your first-time jobseeker certification to your appointments.',
    links: ['nbi', 'police'],
  },
  {
    title: 'Let your employer handle your TIN',
    body: 'For a first job, your employer registers your TIN after you’re hired.',
    links: ['tin'],
  },
]

// First Time Jobseekers Assistance Act (Republic Act No. 11261)
export const freeDocuments = {
  covered: [
    'Barangay clearance',
    'Police clearance',
    'NBI clearance',
    'Birth certificate and marriage certificate',
    'TIN',
    'UMID',
    'Transcript of records from a state university or college',
    'Medical certificate from a public hospital',
  ],
  notCovered: [
    'Lab tests and procedures needed for a medical certificate',
    'Passport fees',
    'Licensure and civil service exam fees',
    'Driver’s license fees',
  ],
  rules: [
    'You can use it only once, and for one copy of each document.',
    'It lasts one year from the day your barangay certification is issued.',
    'You must be a Filipino citizen looking for work for the first time, here or abroad.',
  ],
}
