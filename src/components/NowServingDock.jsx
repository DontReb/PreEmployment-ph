import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import requirements from '../data/requirements.js'
import useProgress from '../progress/useProgress.js'
import RollText from './ui/RollText.jsx'

// A floating "Now serving" display, like the queue screen at a government
// office: your progress, the next document to get, and a button to open it.
// It slides up after the hero scrolls away and steps aside near the footer.
function NowServingDock() {
  const { isDone } = useProgress()
  const [heroVisible, setHeroVisible] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const footer = document.querySelector('footer')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) setHeroVisible(entry.isIntersecting)
          if (entry.target === footer) setFooterVisible(entry.isIntersecting)
        }
      },
      // Ignore the strip under the sticky navbar: hero content there is out of sight
      { rootMargin: '-88px 0px 0px 0px' },
    )
    if (hero) observer.observe(hero)
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const total = requirements.length
  const readyCount = requirements.filter((item) => isDone(item.id)).length
  const nextIndex = requirements.findIndex((item) => !isDone(item.id))
  const next = requirements[nextIndex]
  const shown = !heroVisible && !footerVisible

  // Progress ring: the yellow arc grows as documents are marked ready
  const radius = 15
  const circumference = 2 * Math.PI * radius

  return (
    <aside
      aria-label="Your next document"
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] print:hidden ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[calc(100%+2rem)] opacity-0'
      }`}
    >
      <div className="flex items-center gap-1.5 rounded-2xl bg-dock p-1.5 text-on-dock shadow-[0_18px_40px_-12px_rgb(0_0_0/0.45)] ring-1 ring-black/5 dark:ring-outline">
        {/* Progress */}
        <div className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 sm:px-2.5">
          <svg viewBox="0 0 36 36" className="size-9 shrink-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3.5" />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - readyCount / total)}
              className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-500"
            />
          </svg>
          <span className="text-sm font-semibold tabular-nums whitespace-nowrap">
            {readyCount}/{total}
            <span className="sr-only"> documents ready</span>
          </span>
        </div>

        {/* What's next */}
        <div className="min-w-0 rounded-xl px-1 py-1.5 sm:px-2.5">
          {next ? (
            <>
              <p className="text-xs text-dock-muted">Now serving</p>
              <p className="flex min-w-0 items-center gap-1.5 font-semibold">
                <span className="shrink-0 rounded bg-signal px-1.5 text-sm whitespace-nowrap tabular-nums text-on-signal">
                  No. {nextIndex + 1}
                </span>
                <span className="truncate">{next.name}</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-dock-muted">All {total} documents ready</p>
              <p className="font-display font-bold">Kumpleto!</p>
            </>
          )}
        </div>

        {/* The one bright button */}
        <Link
          to={next ? `/requirements/${next.id}` : '/checklist'}
          viewTransition
          className="group/roll inline-flex min-h-11 shrink-0 items-center rounded-xl bg-signal px-4 font-semibold text-on-signal transition hover:brightness-105 active:scale-[0.97]"
        >
          <RollText>{next ? 'Open' : 'Print checklist'}</RollText>
          {next && <span className="sr-only"> {next.name}</span>}
        </Link>
      </div>
    </aside>
  )
}

export default NowServingDock
