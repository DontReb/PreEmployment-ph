function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between">
        <p>© {year} PreEmployment.ph</p>
        <p>Always double-check fees and steps with the issuing agency.</p>
      </div>
    </footer>
  )
}

export default Footer
