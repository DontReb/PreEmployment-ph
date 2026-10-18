import requirements from '../data/requirements.js'

// The signature element: the long brown envelope every Filipino applicant
// carries to their first interview, with the documents tucked inside.
function Envelope() {
  return (
    <figure
      aria-labelledby="envelope-title"
      className="relative mx-auto w-full max-w-sm rounded-3xl bg-kraft p-5 pb-0 shadow-[0_24px_48px_-24px_rgb(59_42_20/0.45)]"
    >
      <figcaption className="flex items-baseline justify-between px-1 text-kraft-ink">
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
            className="flex items-center gap-3 rounded-xl bg-slip px-4 py-2.5 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="size-4 shrink-0 rounded-full border-2 border-slip-muted"
            />
            <span className="flex-1 font-medium text-slip-ink">{item.name}</span>
            <span className="text-sm text-slip-muted">{item.agency}</span>
          </li>
        ))}
      </ul>

      {/* The front pocket of the envelope, tucked just under the last paper */}
      <div className="relative -mx-5 -mt-1.5 h-12 rounded-b-3xl rounded-t-[2rem] bg-kraft-deep" />
    </figure>
  )
}

export default Envelope
