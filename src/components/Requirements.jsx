import { useState } from 'react'
import { Link } from 'react-router'
import Section from './Section.jsx'
import Icon from './ui/Icon.jsx'
import ModeTag from './ui/ModeTag.jsx'
import CostBadge from './ui/CostBadge.jsx'
import requirements from '../data/requirements.js'
import useProgress from '../progress/useProgress.js'

// Each filter is a name plus a test that decides if a requirement matches
const filters = [
  { id: 'all', label: 'All', matches: () => true },
  { id: 'not-ready', label: 'Not ready yet', matches: (item, isDone) => !isDone(item.id) },
  { id: 'online', label: 'Online', matches: (item) => item.mode === 'online' },
  { id: 'visit', label: 'In person', matches: (item) => item.mode === 'visit' },
  { id: 'free', label: 'Free for everyone', matches: (item) => item.cost === null },
]

// Lowercase and remove accents/punctuation so "pag ibig" finds "Pag-IBIG"
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function Requirements() {
  const [query, setQuery] = useState('')
  const [filterId, setFilterId] = useState('all')
  const { isDone } = useProgress()

  // Derived values: calculated from state on every render, never stored separately
  const activeFilter = filters.find((filter) => filter.id === filterId)
  const searchWords = normalize(query).split(' ').filter(Boolean)
  const results = requirements.filter((item) => {
    const searchable = normalize(
      [item.name, item.agency, item.agencyName, item.summary].join(' '),
    )
    const compact = searchable.replaceAll(' ', '') // so "pagibig" also finds "pag ibig"
    const matchesSearch = searchWords.every(
      (word) => searchable.includes(word) || compact.includes(word),
    )
    return matchesSearch && activeFilter.matches(item, isDone)
  })

  function clearAll() {
    setQuery('')
    setFilterId('all')
  }

  return (
    <Section id="requirements" title="Requirements">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <p className="max-w-2xl text-pretty">
          Most employers ask for these {requirements.length} documents. They’re listed in the order
          that usually works best. Open one to see the cost, what to bring, and the steps.
        </p>
        <Link
          to="/checklist"
          className="inline-flex min-h-11 items-center gap-1 font-medium text-accent-ink underline decoration-outline underline-offset-4 hover:decoration-2"
        >
          Print checklist
        </Link>
      </div>

      {/* Search and filters */}
      <div className="mt-8 space-y-4">
        <div className="relative max-w-md">
          <label htmlFor="requirement-search" className="sr-only">
            Search documents
          </label>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="9" cy="9" r="5.5" />
            <path d="M13 13l4 4" />
          </svg>
          <input
            id="requirement-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search, for example NBI or clearance"
            className="min-h-11 w-full rounded-full bg-surface-raised py-2 pr-4 pl-11 text-ink ring-1 ring-outline placeholder:text-ink-muted focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>

        <div role="group" aria-label="Filter documents" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter.id === filterId
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilterId(filter.id)}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-on-accent'
                    : 'text-ink-muted ring-1 ring-outline hover:bg-accent-soft hover:text-ink'
                }`}
              >
                {isActive && <Icon name="check" className="size-4" />}
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* aria-live announces the new count to screen readers as people type */}
        <p aria-live="polite" className="text-sm text-ink-muted">
          Showing {results.length} of {requirements.length}
        </p>
      </div>

      {results.length > 0 ? (
        // A queue: the number is each document's place in the recommended order,
        // like the numbered tickets at a government office
        <ol className="mt-4 divide-y divide-separator overflow-hidden rounded-lg bg-surface-raised ring-1 ring-separator">
          {results.map((item) => {
            const queueNumber = requirements.indexOf(item) + 1
            const ready = isDone(item.id)
            return (
              <li key={item.id}>
                <Link
                  to={`/requirements/${item.id}`}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-3 p-4 transition-colors hover:bg-accent-soft/60 active:bg-accent-soft sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:p-5"
                >
                  <span className="flex flex-col items-center border-r border-dashed border-outline/60 pr-3 text-ink-muted">
                    <span className="text-xs">No.</span>
                    <span className="font-display text-2xl font-bold tabular-nums text-ink sm:text-3xl">
                      <span className="sr-only">Step </span>
                      {queueNumber}
                    </span>
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{item.name}</h3>
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
          })}
        </ol>
      ) : (
        // Empty state: say what happened and offer the next action
        <div className="mt-4 rounded-lg bg-surface-raised p-8 text-center ring-1 ring-separator">
          <p className="font-semibold text-ink">No documents match</p>
          <p className="mt-1">Try a different word or filter.</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-full px-5 font-semibold text-accent-ink ring-1 ring-outline hover:bg-accent-soft"
          >
            Show all documents
          </button>
        </div>
      )}
    </Section>
  )
}

export default Requirements
