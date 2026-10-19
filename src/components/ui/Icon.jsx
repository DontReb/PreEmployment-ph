// Small inline icons that inherit the text color (stroke="currentColor").
// They're decorative, so screen readers skip them (aria-hidden).
const paths = {
  chevronRight: 'M8 4l6 6-6 6',
  chevronLeft: 'M12 4l-6 6 6 6',
  external: 'M11 4h5v5 M16 4l-7 7 M14 11v5H4V6h5',
  check: 'M4 10.5l4 4 8-9',
  // How you get a document
  online: 'M3 5.5h14v9H3z M7 17.5h6 M10 14.5v3',
  visit: 'M3 17h14 M4.5 17V9 M8.5 17V9 M11.5 17V9 M15.5 17V9 M2.5 8L10 3.5 17.5 8z',
  employer: 'M3 7h14v9.5H3z M7.5 7V4.5h5V7 M3 11h14',
}

function Icon({ name, className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export default Icon
