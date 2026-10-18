import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import requirements from '../data/requirements.js'
import NotFoundPage from './NotFoundPage.jsx'

function RequirementPage() {
  // The :id part of the URL, e.g. "nbi" in /requirements/nbi
  const { id } = useParams()
  const index = requirements.findIndex((item) => item.id === id)
  const requirement = requirements[index]
  const next = requirements[index + 1]
  const headingRef = useRef(null)

  // Move focus to the new page's heading, so screen reader and keyboard
  // users start reading here instead of being left on the old link
  useEffect(() => {
    headingRef.current?.focus()
  }, [id])

  if (!requirement) {
    return <NotFoundPage />
  }

  return (
    <article className="py-10 sm:py-14">
      {/* React 19 moves <title> into the page's <head> automatically */}
      <title>{`${requirement.name} · PreEmployment.ph`}</title>

      <Link
        to="/#requirements"
        className="inline-flex min-h-11 items-center gap-1 rounded-full pr-3 font-medium text-accent-ink hover:underline"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4l-6 6 6 6" />
        </svg>
        All requirements
      </Link>

      <p className="mt-8 font-semibold text-accent-ink">{requirement.agencyName}</p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-4xl font-bold tracking-tight text-ink focus:outline-none sm:text-5xl"
      >
        {requirement.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{requirement.summary}</p>

      <div className="mt-10 max-w-2xl rounded-2xl bg-surface-raised p-6 ring-1 ring-separator">
        <h2 className="text-lg font-semibold text-ink">How to get it</h2>
        <p className="mt-2 text-ink-muted">
          Step-by-step instructions, fees, and official links are being added. Until then, check
          the {requirement.agencyName} website for the latest process.
        </p>
      </div>

      {next && (
        <Link
          to={`/requirements/${next.id}`}
          className="mt-10 flex max-w-2xl items-center justify-between gap-4 rounded-2xl p-5 ring-1 ring-separator transition hover:ring-outline active:bg-accent-soft"
        >
          <span>
            <span className="block text-sm text-ink-muted">Next document</span>
            <span className="font-semibold text-ink">{next.name}</span>
          </span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </Link>
      )}
    </article>
  )
}

export default RequirementPage
