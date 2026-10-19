import { Link } from 'react-router'
import requirements, { LAST_CHECKED, modeLabels } from '../data/requirements.js'
import useProgress from '../progress/useProgress.js'
import Icon from '../components/ui/Icon.jsx'

// A one-page summary made for printing (or saving as PDF).
// Classes starting with print: only apply on paper; print:hidden hides
// things like buttons that make no sense on paper.
function ChecklistPage() {
  const { isDone } = useProgress()
  const readyCount = requirements.filter((item) => isDone(item.id)).length

  return (
    <article className="py-10 sm:py-14 print:py-0">
      <title>Checklist · PreEmployment.ph</title>

      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to="/#requirements"
          className="inline-flex min-h-11 items-center gap-1 rounded-full pr-3 font-medium text-accent-ink hover:underline"
        >
          <Icon name="chevronLeft" />
          All requirements
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-6 font-semibold text-on-accent shadow-sm transition hover:brightness-110 active:brightness-95"
        >
          Print checklist
        </button>
      </div>

      <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink print:mt-0 print:text-2xl">
        Pre-employment checklist
      </h1>
      <p className="mt-3 text-ink-muted">
        {readyCount} of {requirements.length} ready. Fees last checked {LAST_CHECKED}; confirm on
        each official website before you go.
      </p>

      <p className="mt-4 rounded-lg bg-accent-soft p-4 text-ink print:bg-transparent print:p-0">
        <span className="font-semibold">First job?</span> Get a First-Time Jobseeker Certification
        from your barangay first. Under RA 11261 it makes most of these documents free, once, within
        one year.
      </p>

      <ol className="mt-8 divide-y divide-separator border-y border-separator">
        {requirements.map((item) => {
          const ready = isDone(item.id)
          return (
            <li key={item.id} className="flex gap-4 py-5 break-inside-avoid print:py-3">
              {/* A box people can tick with a pen on paper */}
              <span
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 ${
                  ready ? 'border-accent bg-accent text-on-accent' : 'border-outline'
                }`}
              >
                {ready && <Icon name="check" className="size-4" />}
                <span className="sr-only">{ready ? 'Ready' : 'Not ready yet'}</span>
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-ink">{item.name}</h2>
                <p className="text-sm text-ink-muted">Issued by {item.agencyName}</p>
                <dl className="mt-1 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-ink-muted sm:grid-cols-[4.5rem_1fr] print:grid-cols-[4.5rem_1fr]">
                  <dt className="font-medium text-ink">Cost</dt>
                  <dd>{item.cost ?? 'Free'}</dd>
                  <dt className="font-medium text-ink">How</dt>
                  <dd>
                    {modeLabels[item.mode]}
                    {item.apply[0] && `, at ${new URL(item.apply[0].url).hostname}`}
                  </dd>
                  <dt className="font-medium text-ink">Bring</dt>
                  <dd>{item.bring.join('; ')}</dd>
                  {item.forms.length > 0 && (
                    <>
                      <dt className="font-medium text-ink">Forms</dt>
                      <dd>{item.forms.map((form) => form.name).join('; ')}</dd>
                    </>
                  )}
                </dl>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 hidden text-sm text-ink-muted print:block">
        Printed from {window.location.origin}
      </p>
    </article>
  )
}

export default ChecklistPage
