import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import requirements, { LAST_CHECKED } from '../data/requirements.js'
import Icon from '../components/ui/Icon.jsx'
import CostBadge from '../components/ui/CostBadge.jsx'
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
    <article className="max-w-2xl py-10 sm:py-14">
      {/* React 19 moves <title> into the page's <head> automatically */}
      <title>{`${requirement.name} · PreEmployment.ph`}</title>

      <Link
        to="/#requirements"
        className="inline-flex min-h-11 items-center gap-1 rounded-full pr-3 font-medium text-accent-ink hover:underline"
      >
        <Icon name="chevronLeft" />
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
      <p className="mt-6 text-lg leading-relaxed text-ink-muted">{requirement.summary}</p>

      {/* Cost and how to get it for free */}
      <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-separator ring-1 ring-separator sm:grid-cols-2">
        <div className="bg-surface-raised p-5">
          <dt className="text-sm font-medium text-ink-muted">Cost</dt>
          <dd className="mt-1 text-ink">{requirement.cost ?? 'Free'}</dd>
        </div>
        <div className="bg-surface-raised p-5">
          <dt className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink-muted">
            Get it free <CostBadge requirement={requirement} />
          </dt>
          <dd className="mt-1 text-ink">{requirement.free}</dd>
        </div>
      </dl>

      {requirement.apply.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Where to apply</h2>
          <ul className="mt-3 space-y-2">
            {requirement.apply.map((site) => (
              <li key={site.url}>
                <a
                  href={site.url}
                  className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-ink underline decoration-outline underline-offset-4 hover:decoration-2"
                >
                  {site.label}
                  <Icon name="external" className="size-4 shrink-0" />
                  <span className="sr-only">(official website)</span>
                </a>
                <p className="text-sm text-ink-muted">{new URL(site.url).hostname}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-ink">What to bring</h2>
        <ul className="mt-3 space-y-2">
          {requirement.bring.map((item) => (
            <li key={item} className="flex gap-3 text-ink-muted">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-ink">How to get it</h2>
        <ol className="mt-4 space-y-4">
          {requirement.steps.map((step, stepIndex) => (
            <li key={step} className="flex gap-4">
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent-ink"
              >
                {stepIndex + 1}
              </span>
              <span className="pt-0.5 text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {requirement.tips.length > 0 && (
        <section className="mt-10 rounded-2xl bg-surface-raised p-6 ring-1 ring-separator">
          <h2 className="text-lg font-semibold text-ink">Tips</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted marker:text-outline">
            {requirement.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 text-sm text-ink-muted">
        Fees and steps last checked {LAST_CHECKED}. They can change, so confirm on the official
        website before you go.
      </p>

      {next && (
        <Link
          to={`/requirements/${next.id}`}
          className="mt-10 flex items-center justify-between gap-4 rounded-2xl p-5 ring-1 ring-separator transition hover:ring-outline active:bg-accent-soft"
        >
          <span>
            <span className="block text-sm text-ink-muted">Next document</span>
            <span className="font-semibold text-ink">{next.name}</span>
          </span>
          <Icon name="chevronRight" className="size-5 shrink-0 text-ink-muted" />
        </Link>
      )}
    </article>
  )
}

export default RequirementPage
