function Home() {
  return (
    <section id="home" className="scroll-mt-20 py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
        Mabuhay, kababayan!
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Your first job starts with the right papers.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        A step-by-step guide for first-time job seekers in the Philippines. We'll walk together
        through every form, every queue, and every requirement—so you can start your professional
        journey with confidence. Every accomplished worker began with a first step. This is yours.
        Padayon!
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#requirements"
          className="rounded-full bg-brand-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          See the requirements
        </a>
        <a
          href="#guides"
          className="rounded-full px-6 py-3 font-semibold text-brand-700 ring-1 ring-brand-300 transition-colors hover:bg-brand-100"
        >
          Read the guides
        </a>
      </div>
    </section>
  )
}

export default Home
