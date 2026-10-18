import Envelope from './Envelope.jsx'

function Home() {
  return (
    <section
      id="home"
      className="grid scroll-mt-20 items-center gap-12 py-12 sm:py-20 md:grid-cols-[1.15fr_1fr]"
    >
      <div>
        <p className="font-semibold text-accent-ink">Mabuhay, kababayan!</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
          Your first job starts with the right papers.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          A step-by-step guide for first-time job seekers in the Philippines: every form, every
          queue, and every requirement, so you can start your career with confidence. Every
          accomplished worker began with a first step. This is yours. Padayon!
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#requirements"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-semibold text-on-accent shadow-sm transition hover:brightness-110 active:brightness-95"
          >
            See the requirements
          </a>
          <a
            href="#guides"
            className="inline-flex min-h-11 items-center rounded-full px-6 font-semibold text-accent-ink ring-1 ring-outline transition-colors hover:bg-accent-soft active:bg-accent-soft"
          >
            Read the guides
          </a>
        </div>
      </div>

      <Envelope />
    </section>
  )
}

export default Home
