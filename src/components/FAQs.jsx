import Section from './Section.jsx'
import faqs from '../data/faqs.js'

function FAQs() {
  return (
    <Section id="faqs" title="FAQs">
      {/* <details> is a built-in, accessible accordion: no JavaScript needed */}
      <div className="max-w-3xl divide-y divide-separator rounded-2xl bg-surface-raised ring-1 ring-separator">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 [overflow-wrap:anywhere]">{faq.question}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 8l5 5 5-5" />
              </svg>
            </summary>
            <p className="px-5 pb-5">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

export default FAQs
