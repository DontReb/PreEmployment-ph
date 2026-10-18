// A real <input type="checkbox"> (so keyboards and screen readers work out of
// the box), restyled with Tailwind. `peer` lets the check icon react to it.
function ReadyCheckbox({ checked, onChange, label, tone = 'accent' }) {
  const colors =
    tone === 'kraft'
      ? 'border-slip-muted checked:border-kraft-ink checked:bg-kraft-ink'
      : 'border-outline checked:border-accent checked:bg-accent'
  const checkColor = tone === 'kraft' ? 'text-slip' : 'text-on-accent'

  return (
    <span className="relative grid size-11 shrink-0 place-items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className={`peer size-5 cursor-pointer appearance-none rounded-md border-2 bg-transparent transition-colors ${colors}`}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={`pointer-events-none absolute size-3.5 opacity-0 peer-checked:opacity-100 ${checkColor}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5l4 4 8-9" />
      </svg>
    </span>
  )
}

export default ReadyCheckbox
