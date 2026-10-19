import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import requirements from '../data/requirements.js'
import useProgress from '../progress/useProgress.js'
import ReadyCheckbox from './ui/ReadyCheckbox.jsx'
import SyncStatus from '../account/SyncStatus.jsx'

// The papers slide into the envelope only the first time it appears after the
// site loads, not every time someone comes back to the home page.
let introPlayed = false

// The signature element: the long brown envelope every Filipino applicant
// carries to their first interview, with the documents tucked inside.
// Ticking a paper stamps it "Ready"; all of them ready stamps the envelope.
function Envelope() {
  const { isDone, toggle, reset } = useProgress()
  const [playIntro] = useState(() => !introPlayed)
  useEffect(() => {
    introPlayed = true
  }, [])

  // Only stamps the person just made get the landing animation,
  // so stamps that were already there don't all thump on page load
  const [justStamped, setJustStamped] = useState(() => new Set())

  const total = requirements.length
  const readyCount = requirements.filter((item) => isDone(item.id)).length
  const complete = readyCount === total

  function handleToggle(id) {
    if (!isDone(id)) {
      setJustStamped((current) => new Set(current).add(id).add('complete'))
    }
    toggle(id)
  }

  function handleClear() {
    // Clearing can't be undone, so ask first
    if (window.confirm(`Clear all ${readyCount} checkmarks? This can’t be undone.`)) {
      reset()
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <figure
        aria-labelledby="envelope-title"
        className="relative w-full rounded-3xl bg-kraft p-5 pb-0 shadow-[0_24px_48px_-24px_rgb(59_42_20/0.45)]"
      >
        <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 px-1 text-kraft-ink">
          <span id="envelope-title" className="font-display font-semibold">
            Your brown envelope
          </span>
          <span className="text-sm">
            {readyCount} of {total} ready
          </span>
        </figcaption>

        <div
          role="progressbar"
          aria-labelledby="envelope-title"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={readyCount}
          aria-valuetext={`${readyCount} of ${total} documents ready`}
          className="mx-1 mt-3 h-1.5 overflow-hidden rounded-full bg-kraft-deep"
        >
          <div
            className="h-full rounded-full bg-kraft-ink motion-safe:transition-[width] motion-safe:duration-300"
            style={{ width: `${(readyCount / total) * 100}%` }}
          />
        </div>

        {/* The papers inside: square-cornered like real paper */}
        <ul className="mt-4 space-y-2">
          {requirements.map((item, index) => {
            const ready = isDone(item.id)
            return (
              <li
                key={item.id}
                className={`flex items-center rounded-[3px] bg-slip pr-4 shadow-[0_1px_2px_rgb(59_42_20/0.25)] ${
                  playIntro ? 'motion-safe:animate-paper-in' : ''
                }`}
                style={playIntro ? { animationDelay: `${120 + index * 45}ms` } : undefined}
              >
                <ReadyCheckbox
                  tone="kraft"
                  checked={ready}
                  onChange={() => handleToggle(item.id)}
                  label={`${item.name}, ready`}
                />
                <Link
                  to={`/requirements/${item.id}`}
                  className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-0.5 py-2.5 hover:underline"
                >
                  <span className="min-w-0 flex-1 font-medium text-slip-ink [overflow-wrap:anywhere]">
                    {item.name}
                  </span>
                  {ready ? (
                    // aria-hidden: the checkbox already tells screen readers it's ready
                    <span
                      aria-hidden="true"
                      className={`stamp text-[0.7rem] text-stamp-paper ${
                        justStamped.has(item.id) ? 'motion-safe:animate-stamp' : ''
                      }`}
                    >
                      Ready
                    </span>
                  ) : (
                    <span className="text-sm text-slip-muted [overflow-wrap:anywhere]">
                      {item.agency}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* The front pocket of the envelope holds the envelope's actions */}
        <div className="relative -mx-5 -mt-1.5 flex min-h-14 flex-wrap items-center justify-between gap-x-4 rounded-b-3xl rounded-t-[2rem] bg-kraft-deep px-6 pt-1.5 text-sm font-medium text-kraft-ink">
          <Link to="/checklist" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
            Print checklist
          </Link>
          {readyCount > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-11 cursor-pointer items-center underline-offset-4 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* All papers ready: the envelope itself gets stamped */}
        {complete && (
          <p className="pointer-events-none absolute inset-x-0 -bottom-5 flex justify-center">
            <span
              className={`stamp bg-kraft/80 text-[min(1.5rem,7vw)] text-stamp-kraft ${
                justStamped.has('complete') ? 'motion-safe:animate-stamp' : ''
              }`}
            >
              Kumpleto!
            </span>
          </p>
        )}
      </figure>

      <p aria-live="polite" className="sr-only">
        {complete ? 'All documents ready. Your envelope is complete.' : ''}
      </p>
      <SyncStatus className="mt-8 px-2 text-center text-ink-muted" />
    </div>
  )
}

export default Envelope
