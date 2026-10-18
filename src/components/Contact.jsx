import Section from './Section.jsx'

const EMAIL = 'preemploymentph@gmail.com'
const ISSUES_URL = 'https://github.com/DontReb/PreEmployment-ph/issues'

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl">
        Found a fee or step that changed? Have a question this guide doesn’t answer? Send a
        message. Updates from job seekers keep this guide accurate for everyone.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${EMAIL}?subject=PreEmployment.ph`}
          className="inline-flex min-h-11 max-w-full items-center rounded-full bg-accent px-6 py-2 font-semibold text-on-accent shadow-sm transition [overflow-wrap:anywhere] hover:brightness-110 active:brightness-95"
        >
          Email {EMAIL}
        </a>
        <a
          href={ISSUES_URL}
          className="inline-flex min-h-11 items-center rounded-full px-6 py-2 font-semibold text-accent-ink ring-1 ring-outline transition-colors hover:bg-accent-soft active:bg-accent-soft"
        >
          Report on GitHub
        </a>
      </div>
    </Section>
  )
}

export default Contact
