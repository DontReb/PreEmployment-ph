import { Link } from 'react-router'
import Section from './Section.jsx'
import requirements from '../data/requirements.js'
import { freeDocuments, recommendedOrder } from '../data/guides.js'

const nameById = Object.fromEntries(requirements.map((item) => [item.id, item.name]))

function Guides() {
  return (
    <Section id="guides" title="Guides">
      {/* Guide 1: the free documents law, as the page's one bold color panel */}
      <div className="rounded-[2rem] bg-accent p-6 text-on-accent-muted sm:p-10">
        <h3 className="text-2xl font-bold tracking-tight text-on-accent sm:text-4xl">
          Get most documents free with RA 11261
        </h3>
        <p className="mt-4 max-w-2xl text-lg">
          The First Time Jobseekers Assistance Act removes government fees for first-time job
          seekers. Get a First-Time Jobseeker Certification from your barangay, then show it at
          each office.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-on-accent">Free with your certification</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-on-accent-muted">
              {freeDocuments.covered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-on-accent">Not covered</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-on-accent-muted">
              {freeDocuments.notCovered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h4 className="mt-6 font-semibold text-on-accent">Rules</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-on-accent-muted">
          {freeDocuments.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>

      {/* Guide 2: the recommended order */}
      <h3 className="mt-12 text-xl font-bold tracking-tight text-ink sm:text-2xl">
        The order that saves the most time
      </h3>
      <ol className="mt-6 space-y-6">
        {recommendedOrder.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-on-accent"
            >
              {index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <h4 className="font-semibold text-ink">{step.title}</h4>
              <p className="mt-1 max-w-2xl">{step.body}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {step.links.map((id) => (
                  <Link
                    key={id}
                    to={`/requirements/${id}`}
                    className="inline-flex min-h-11 max-w-full items-center font-medium text-accent-ink underline decoration-outline underline-offset-4 [overflow-wrap:anywhere] hover:decoration-2 sm:min-h-0"
                  >
                    {nameById[id]}
                  </Link>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Guides
