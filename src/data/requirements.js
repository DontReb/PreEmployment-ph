// The documents a first-time job seeker usually needs.
// Components read from this list, so adding a document here updates the site.
// Steps, fees, and official links get added in the content phase.
const requirements = [
  {
    id: 'psa',
    name: 'PSA birth certificate',
    agency: 'PSA',
    agencyName: 'Philippine Statistics Authority',
    summary: 'Your official birth record. Many other offices ask for it, so it usually comes first.',
  },
  {
    id: 'nbi',
    name: 'NBI clearance',
    agency: 'NBI',
    agencyName: 'National Bureau of Investigation',
    summary: 'Shows whether you have a criminal record anywhere in the country.',
  },
  {
    id: 'police',
    name: 'Police clearance',
    agency: 'PNP',
    agencyName: 'Philippine National Police',
    summary: 'Shows whether you have a record with the police where you live.',
  },
  {
    id: 'barangay',
    name: 'Barangay clearance',
    agency: 'Your barangay',
    agencyName: 'Your barangay hall',
    summary: 'Confirms that you live in your barangay and are in good standing there.',
  },
  {
    id: 'tin',
    name: 'TIN',
    agency: 'BIR',
    agencyName: 'Bureau of Internal Revenue',
    summary: 'Your Taxpayer Identification Number, used to file and pay your income tax.',
  },
  {
    id: 'sss',
    name: 'SSS number',
    agency: 'SSS',
    agencyName: 'Social Security System',
    summary: 'Your membership number for social security benefits like sickness, maternity, and retirement.',
  },
  {
    id: 'philhealth',
    name: 'PhilHealth number',
    agency: 'PhilHealth',
    agencyName: 'Philippine Health Insurance Corporation',
    summary: 'Your national health insurance number.',
  },
  {
    id: 'pagibig',
    name: 'Pag-IBIG MID number',
    agency: 'Pag-IBIG Fund',
    agencyName: 'Home Development Mutual Fund',
    summary: 'Your membership number for the Pag-IBIG savings and housing loan program.',
  },
]

export default requirements
