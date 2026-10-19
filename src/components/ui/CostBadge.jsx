// "Free" or "Free for first-timers": text plus a check, so it never relies on color alone
function CostBadge({ requirement }) {
  const label = requirement.cost === null ? 'Free' : 'Free for first-timers'

  return (
    <span className="inline-flex max-w-full items-center gap-1.5 [overflow-wrap:anywhere] text-sm font-medium text-accent-ink">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10.5l4 4 8-9" />
      </svg>
      {label}
    </span>
  )
}

export default CostBadge
