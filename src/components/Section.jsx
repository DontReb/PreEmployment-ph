// A reusable wrapper so every section has the same spacing and heading style.
// `children` is whatever you put between <Section> and </Section>.
function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-brand-100 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      <div className="mt-4 leading-relaxed text-ink-muted">{children}</div>
    </section>
  )
}

export default Section
