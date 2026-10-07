import { useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#requirements', label: 'Requirements' },
  { href: '#guides', label: 'Guides' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/80 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
      >
        <a href="#home" className="text-lg font-bold tracking-tight text-ink">
          PreEmployment<span className="text-brand-600">.ph</span>
        </a>

        {/* Desktop links: hidden on small screens, shown from md (768px) up */}
        <ul className="hidden gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button: only visible below md */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="rounded-lg p-2 text-ink hover:bg-brand-50 md:hidden"
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <ul id="mobile-menu" className="border-t border-brand-100 px-4 py-2 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-3 font-medium text-ink hover:bg-brand-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar
