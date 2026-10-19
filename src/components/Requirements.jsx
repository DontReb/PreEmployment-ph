import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import Section from './Section.jsx'
import Icon from './ui/Icon.jsx'
import QueueRow from './QueueRow.jsx'
import SlidingPill from './ui/SlidingPill.jsx'
import useSlidingIndicator from '../hooks/useSlidingIndicator.js'
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
  // Search and filter live in the web address (?q=nbi&show=online), so pressing
  // Back from a document returns to the same list, and the list can be shared
  const [params, setParams] = useSearchParams()
  // Local state updates instantly as people type; the address follows along.
  // (Reading the input straight from the address could drop fast keystrokes,
  // because the router applies address changes a moment later.)
  const [query, setQueryState] = useState(() => params.get('q') ?? '')
  const [filterId, setFilterState] = useState(() =>
    filters.some((filter) => filter.id === params.get('show')) ? params.get('show') : 'all',
  )
  const { isDone } = useProgress()
  const { containerRef: filterRef, box: filterBox } = useSlidingIndicator(filterId)
  // The first document in the recommended order that isn't ready yet
  const nowServingId = requirements.find((item) => !isDone(item.id))?.id

  function updateParams(changes) {
    const next = new URLSearchParams(params)
    for (const [name, value] of Object.entries(changes)) {
      if (value && value !== 'all') next.set(name, value)
      else next.delete(name)
    }
    // replace: typing shouldn't add a Back step per letter
    // keepScroll: tells ScrollManager not to jump while filtering
    setParams(next, { replace: true, preventScrollReset: true, state: { keepScroll: true } })
  }

  function setQuery(value) {
    setQueryState(value)
    updateParams({ q: value })
  }

  function setFilterId(value) {
    setFilterState(value)
    updateParams({ show: value })
  }

  // Derived values: calculated from state on every render, never stored separately
  const activeFilter = filters.find((filter) => filter.id === filterId)
  const searchWords = normalize(query).split(' ').filter(Boolean)
  const results = requirements.filter((item) => {
    const text = [item.name, item.agency, item.agencyName, item.summary].join(' ')
    // Also search a copy where hyphens are removed instead of becoming spaces,
    // so "pagibig" finds "Pag-IBIG" (without gluing separate words together)
    const searchable = `${normalize(text)} ${normalize(text.replaceAll('-', ''))}`
    const matchesSearch = searchWords.every((word) => searchable.includes(word))
    return matchesSearch && activeFilter.matches(item, isDone)
  })

  function clearAll() {
    setQueryState('')
    setFilterState('all')
    updateParams({ q: '', show: 'all' })
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

        <div
          ref={filterRef}
          role="group"
          aria-label="Filter documents"
          className="relative flex flex-wrap gap-2"
        >
          {/* The filled pill slides to the chosen filter */}
          <SlidingPill box={filterBox} className="bg-accent" />
          {filters.map((filter) => {
            const isActive = filter.id === filterId
            return (
              <button
                key={filter.id}
                type="button"
                data-indicator-key={filter.id}
                aria-pressed={isActive}
                onClick={() => setFilterId(filter.id)}
                className={`relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-on-accent ring-1 ring-transparent'
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
          {results.map((item) => (
            <QueueRow
              key={item.id}
              item={item}
              queueNumber={requirements.indexOf(item) + 1}
              ready={isDone(item.id)}
              nowServing={item.id === nowServingId}
            />
          ))}
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
