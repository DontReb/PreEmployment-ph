import { Link, useViewTransitionState } from 'react-router'
import CostBadge from './ui/CostBadge.jsx'
import ModeTag from './ui/ModeTag.jsx'

// One document in the queue. Its ticket number lights up "Now serving" yellow
// when it's the next document to get, and on hover.
function QueueRow({ item, queueNumber, ready, nowServing }) {
  const to = `/requirements/${item.id}`
  // True while the page is animating to this document, so only the clicked
  // title (not every title) morphs into the heading of the next page
  const opening = useViewTransitionState(to)

  return (
    <li>
      <Link
        to={to}
        viewTransition
        className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-3 p-4 transition-colors hover:bg-accent-soft/60 active:bg-accent-soft sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:p-5"
      >
        <span className="flex flex-col items-center border-r border-dashed border-outline/60 pr-3 text-ink-muted">
          <span className="text-xs">No.</span>
          <span
            className={`mt-0.5 grid min-w-10 place-items-center rounded-md px-1.5 font-display text-2xl font-bold tabular-nums transition-colors duration-200 sm:text-3xl ${
              nowServing
                ? 'bg-signal text-on-signal'
                : 'text-ink group-hover:bg-signal group-hover:text-on-signal'
            }`}
          >
            <span className="sr-only">Step </span>
            {queueNumber}
          </span>
        </span>

        <div className="min-w-0">
          {nowServing && (
            <p className="mb-1 text-sm font-semibold text-accent-ink">Now serving: your next document</p>
          )}
          <h3
            className="font-semibold text-ink"
            style={opening ? { viewTransitionName: 'requirement-title' } : undefined}
          >
            {item.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted">{item.agencyName}</p>
          <p className="mt-2 max-w-prose text-ink-muted">{item.summary}</p>
        </div>

        <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-2 sm:col-start-3 sm:flex-col sm:items-end sm:justify-center">
          <ModeTag mode={item.mode} />
          <CostBadge requirement={item} />
          {ready && <span className="stamp text-xs text-stamp">Ready</span>}
        </div>
      </Link>
    </li>
  )
}

export default QueueRow
