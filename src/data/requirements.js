// The documents a first-time job seeker usually needs.
// Components read from this list, so adding a document here updates the site.
// More details (steps, fees, links) get added in the next step.
const requirements = [
  { id: 'psa', name: 'PSA birth certificate', agency: 'PSA' },
  { id: 'nbi', name: 'NBI clearance', agency: 'NBI' },
  { id: 'police', name: 'Police clearance', agency: 'PNP' },
  { id: 'barangay', name: 'Barangay clearance', agency: 'Your barangay' },
  { id: 'tin', name: 'TIN', agency: 'BIR' },
  { id: 'sss', name: 'SSS number', agency: 'SSS' },
  { id: 'philhealth', name: 'PhilHealth number', agency: 'PhilHealth' },
  { id: 'pagibig', name: 'Pag-IBIG MID number', agency: 'Pag-IBIG Fund' },
]

export default requirements
