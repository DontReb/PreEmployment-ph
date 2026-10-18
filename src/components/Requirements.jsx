import { Link } from 'react-router'
import Section from './Section.jsx'
import requirements from '../data/requirements.js'

function Requirements() {
  return (
    <Section id="requirements" title="Requirements">
      <p className="max-w-2xl text-pretty">
        Most employers ask for these {requirements.length} documents. Open one to see what it is
        and where to get it.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {requirements.map((item) => (
          <li key={item.id}>
            <Link
              to={`/requirements/${item.id}`}
              className="group flex h-full items-start gap-4 rounded-2xl bg-surface-raised p-5 ring-1 ring-separator transition hover:ring-outline active:bg-accent-soft"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-ink">{item.name}</h3>
                <p className="mt-0.5 text-sm text-ink-muted">{item.agencyName}</p>
                <p className="mt-3 text-ink-muted">{item.summary}</p>
              </div>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-1 size-5 shrink-0 text-ink-muted transition-transform motion-safe:group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 4l6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Requirements
