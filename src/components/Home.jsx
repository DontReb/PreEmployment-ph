import Envelope from './Envelope.jsx'

function Home() {
  return (
    <section
      id="home"
      className="grid scroll-mt-20 grid-cols-1 items-center gap-12 py-12 sm:py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
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
            className="inline-flex min-h-11 max-w-full items-center rounded-full bg-accent px-6 py-2 text-center [overflow-wrap:anywhere] font-semibold text-on-accent shadow-sm transition hover:brightness-110 active:brightness-95"
          >
            See the requirements
          </a>
          <a
            href="#guides"
            className="inline-flex min-h-11 max-w-full items-center rounded-full px-6 py-2 text-center [overflow-wrap:anywhere] font-semibold text-accent-ink ring-1 ring-outline transition-colors hover:bg-accent-soft active:bg-accent-soft"
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
