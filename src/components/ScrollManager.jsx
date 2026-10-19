import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// Where each visited page was scrolled to, so Back returns to the same spot
const savedPositions = new Map()

// The router changes the URL without reloading the page, so the browser no
// longer manages scrolling for us. This:
// - scrolls to #section links, or to the top of a newly opened page
// - restores the previous scroll position when someone presses Back/Forward
// - leaves the page alone for in-place URL updates (like search filters)
// (Keeping keyboard focus clear of the sticky navbar is done in CSS with
// scroll-padding-top, in styles.css.)
function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType() // 'PUSH', 'REPLACE', or 'POP' (Back/Forward)
  const currentKey = useRef(location.key)

  // We restore positions ourselves, so turn off the browser's own attempt
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  // Remember the scroll position of the page being viewed
  useEffect(() => {
    let frame = null
    function remember() {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        savedPositions.set(currentKey.current, window.scrollY)
      })
    }
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', remember)
    }
  }, [])

  // useLayoutEffect runs before the browser paints the new page,
  // so there's no flash of the wrong scroll position
  useLayoutEffect(() => {
    currentKey.current = location.key

    if (navigationType === 'POP' && savedPositions.has(location.key)) {
      window.scrollTo({ top: savedPositions.get(location.key), behavior: 'instant' })
    } else if (!location.state?.keepScroll) {
      const target = location.hash && document.getElementById(location.hash.slice(1))
      if (target) target.scrollIntoView()
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }

    // Record where this entry starts, even if the person never scrolls on it
    savedPositions.set(location.key, window.scrollY)
  }, [location, navigationType])

  return null
}

export default ScrollManager
