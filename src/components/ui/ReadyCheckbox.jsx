// A real <input type="checkbox"> (so keyboards and screen readers work out of
// the box), restyled with Tailwind. The invisible input covers the whole
// 44x44 area, so the full square is tappable, not just the small box drawn in it.
// `peer` lets the drawn box and check icon react to the input's state.
function ReadyCheckbox({ checked, onChange, label, tone = 'accent' }) {
  const box =
    tone === 'kraft'
      ? 'border-slip-muted peer-checked:border-kraft-ink peer-checked:bg-kraft-ink'
      : 'border-outline peer-checked:border-accent peer-checked:bg-accent'
  const checkColor = tone === 'kraft' ? 'text-slip' : 'text-on-accent'

  return (
    <span className="relative grid size-11 shrink-0 place-items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-lg focus-visible:outline-offset-[-4px]"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none size-5 rounded-md border-2 bg-transparent transition-colors ${box}`}
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
