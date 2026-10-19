import { Link } from 'react-router'
import Envelope from './Envelope.jsx'
import RollText from './ui/RollText.jsx'
import useIntroOnce from '../hooks/useIntroOnce.js'

const HEADLINE = 'Your first job starts with the right papers.'

function Home() {
  const playIntro = useIntroOnce()

  return (
    <section
      id="home"
      className="grid grid-cols-1 items-center gap-12 py-12 sm:py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
    >
      <div>
        <p className="font-semibold text-accent-ink">Mabuhay, kababayan!</p>
        {/* The opening moment: each word rises into place, once per visit.
            Each word sits in a clipping box, so it appears to come up from a line. */}
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
          {HEADLINE.split(' ').map((word, index) => (
            <span key={index}>
              <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span
                  className={`inline-block ${playIntro ? 'motion-safe:animate-rise-in' : ''}`}
                  style={playIntro ? { animationDelay: `${index * 55}ms` } : undefined}
                >
                  {word}
                </span>
              </span>{' '}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          A step-by-step guide for first-time job seekers in the Philippines: every form, every
          queue, and every requirement, so you can start your career with confidence. Every
          accomplished worker began with a first step. This is yours. Padayon!
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/#requirements"
            className="group/roll inline-flex min-h-11 max-w-full items-center rounded-full bg-accent px-6 py-2 text-center [overflow-wrap:anywhere] font-semibold text-on-accent shadow-sm transition hover:brightness-110 active:scale-[0.97] active:brightness-95"
          >
            <RollText>See the requirements</RollText>
          </Link>
          <Link
            to="/#guides"
            className="group/roll inline-flex min-h-11 max-w-full items-center rounded-full px-6 py-2 text-center [overflow-wrap:anywhere] font-semibold text-accent-ink ring-1 ring-outline transition hover:bg-accent-soft active:scale-[0.97] active:bg-accent-soft"
          >
            <RollText>Read the guides</RollText>
          </Link>
        </div>
      </div>

      <Envelope />
    </section>
  )
}

export default Home
