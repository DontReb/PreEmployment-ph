import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import useActiveSection from '../hooks/useActiveSection.js'
import useAuth from '../account/useAuth.js'
import useSlidingIndicator from '../hooks/useSlidingIndicator.js'
import SlidingPill from './ui/SlidingPill.jsx'
import RollText from './ui/RollText.jsx'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'guides', label: 'Guides' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
]
const sectionIds = links.map((link) => link.id)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const sectionOnHomePage = useActiveSection(sectionIds)

  // On the home page, highlight the section being read.
  // On a requirement's own page, highlight "Requirements".
  let activeId = null
  if (pathname === '/') activeId = sectionOnHomePage
  else if (pathname.startsWith('/requirements/')) activeId = 'requirements'
  const menuButtonRef = useRef(null)
  const { enabled: accountsEnabled, user } = useAuth()
  const accountLabel = user ? 'Account' : 'Sign in'
  const onAccountPage = pathname === '/account'
  // The highlight pill slides to whichever section is active
  const { containerRef: navRef, box: activeBox } = useSlidingIndicator(activeId)

  // Escape closes the phone menu and puts keyboard focus back on the button
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 print:hidden border-b border-separator bg-surface-raised/80 backdrop-blur-lg reduce-transparency:bg-surface-raised reduce-transparency:backdrop-blur-none">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-2"
      >
        <Link to="/" className="min-w-0 font-display text-lg font-bold tracking-tight text-ink [overflow-wrap:anywhere]">
          PreEmployment<span className="text-accent-ink">.ph</span>
        </Link>

        {/* Desktop links: hidden on small screens, shown from md (768px) up */}
        <ul ref={navRef} className="relative hidden gap-1 md:ml-auto md:flex">
          <SlidingPill box={activeBox} className="bg-accent-soft" />
          {links.map((link) => {
            const isActive = link.id === activeId
            return (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  data-indicator-key={link.id}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group/roll relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 active:bg-accent-soft ${
                    isActive ? 'text-accent-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <RollText>{link.label}</RollText>
                </Link>
              </li>
            )
          })}
        </ul>

        {accountsEnabled && (
          <Link
            to="/account"
            aria-current={onAccountPage ? 'page' : undefined}
            className="group/roll hidden min-h-9 items-center rounded-full px-4 text-sm font-semibold text-accent-ink ring-1 ring-outline transition-colors hover:bg-accent-soft active:bg-accent-soft md:ml-2 md:inline-flex"
          >
            <RollText>{accountLabel}</RollText>
          </Link>
        )}

        {/* Mobile menu button: 44x44, only visible below md */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-ink hover:bg-accent-soft active:bg-accent-soft md:hidden"
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <ul id="mobile-menu" className="border-t border-separator px-4 py-2 md:hidden">
          {links.map((link) => {
            const isActive = link.id === activeId
            return (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-xl px-3 py-3 font-medium active:bg-accent-soft ${
                    isActive ? 'bg-accent-soft text-accent-ink' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          {accountsEnabled && (
            <li className="mt-1 border-t border-separator pt-1">
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                aria-current={onAccountPage ? 'page' : undefined}
                className={`block rounded-xl px-3 py-3 font-semibold active:bg-accent-soft ${
                  onAccountPage ? 'bg-accent-soft text-accent-ink' : 'text-accent-ink'
                }`}
              >
                {accountLabel}
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  )
}

export default Navbar
