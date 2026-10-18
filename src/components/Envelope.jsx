import { Link } from 'react-router'
import requirements from '../data/requirements.js'
import useProgress from '../progress/useProgress.js'
import ReadyCheckbox from './ui/ReadyCheckbox.jsx'

// The signature element: the long brown envelope every Filipino applicant
// carries to their first interview, with the documents tucked inside.
// Each paper can be checked off, and progress is saved on this device.
function Envelope() {
  const { isDone, toggle, reset } = useProgress()
  const total = requirements.length
  const readyCount = requirements.filter((item) => isDone(item.id)).length

  function handleClear() {
    // Clearing can't be undone, so ask first
    if (window.confirm(`Clear all ${readyCount} checkmarks? This can’t be undone.`)) {
      reset()
    }
  }

  return (
    <figure
      aria-labelledby="envelope-title"
      className="relative mx-auto w-full max-w-sm rounded-3xl bg-kraft p-5 pb-0 shadow-[0_24px_48px_-24px_rgb(59_42_20/0.45)]"
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

      {/* The papers inside */}
      <ul className="mt-4 space-y-2">
        {requirements.map((item) => (
          <li key={item.id} className="flex items-center rounded-xl bg-slip pr-4 shadow-sm">
            <ReadyCheckbox
              tone="kraft"
              checked={isDone(item.id)}
              onChange={() => toggle(item.id)}
              label={`${item.name}, ready`}
            />
            <Link
              to={`/requirements/${item.id}`}
              className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-0.5 py-2.5 hover:underline"
            >
              <span className="min-w-0 flex-1 font-medium text-slip-ink [overflow-wrap:anywhere]">
                {item.name}
              </span>
              <span className="text-sm text-slip-muted [overflow-wrap:anywhere]">
                {item.agency}
              </span>
            </Link>
          </li>
        ))}
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
    </figure>
  )
}

export default Envelope
