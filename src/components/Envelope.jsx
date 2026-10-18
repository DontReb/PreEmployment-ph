import requirements from '../data/requirements.js'

// The signature element: the long brown envelope every Filipino applicant
// carries to their first interview, with the documents tucked inside.
function Envelope() {
  return (
    <figure
      aria-labelledby="envelope-title"
      className="relative mx-auto w-full max-w-sm rounded-3xl bg-kraft p-5 pb-0 shadow-[0_24px_48px_-24px_rgb(59_42_20/0.45)]"
    >
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 px-1 text-kraft-ink">
        <span id="envelope-title" className="font-display font-semibold">
          Your brown envelope
        </span>
        <span className="text-sm">{requirements.length} documents</span>
      </figcaption>

      {/* The papers inside */}
      <ul className="mt-4 space-y-2">
        {requirements.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-0.5 rounded-xl bg-slip px-4 py-2.5 shadow-sm"
          >
            {/* A small paper icon. Plain circles looked like checkboxes people could tap. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 shrink-0 text-slip-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M4 1.75h5.5L12.25 4.5v9.75H4z M9.25 1.75V4.75h3 M6 8h4.25 M6 10.75h4.25" />
            </svg>
            <span className="min-w-0 flex-1 font-medium text-slip-ink [overflow-wrap:anywhere]">{item.name}</span>
            <span className="text-sm text-slip-muted [overflow-wrap:anywhere]">{item.agency}</span>
          </li>
        ))}
      </ul>

      {/* The front pocket of the envelope, tucked just under the last paper */}
      <div className="relative -mx-5 -mt-1.5 h-12 rounded-b-3xl rounded-t-[2rem] bg-kraft-deep" />
    </figure>
  )
}

export default Envelope
