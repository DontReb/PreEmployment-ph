// Small inline icons that inherit the text color (stroke="currentColor").
// They're decorative, so screen readers skip them (aria-hidden).
const paths = {
  chevronRight: 'M8 4l6 6-6 6',
  chevronLeft: 'M12 4l-6 6 6 6',
  external: 'M11 4h5v5 M16 4l-7 7 M14 11v5H4V6h5',
  check: 'M4 10.5l4 4 8-9',
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
