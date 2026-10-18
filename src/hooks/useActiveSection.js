import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

// Returns the id of the section currently being read, so the navbar
// can show people where they are on the page.
function useActiveSection(ids) {
  const { pathname, hash, key } = useLocation()
  const [activeId, setActiveId] = useState(ids[0])

  // useRef keeps a value between renders WITHOUT causing a re-render when it changes
  const followingLink = useRef(false)
  const idleTimer = useRef(null)

  // Stop trusting the clicked link once scrolling has been quiet for a moment
  function finishFollowingLinkSoon(delay) {
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      followingLink.current = false
    }, delay)
  }

  // When someone clicks a nav link (e.g. /#faqs), trust the link they chose instead
  // of guessing from the scroll position (short sections may never reach the top).
  useEffect(() => {
    const id = hash.slice(1)
    if (ids.includes(id)) {
      setActiveId(id)
      followingLink.current = true
      finishFollowingLinkSoon(300)
    }
  }, [ids, hash, key])

  useEffect(() => {
    function updateFromScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveId(ids[ids.length - 1])
        return
      }

      // The active section is the last one whose top has scrolled past 30% of the screen
      let current = ids[0]
      for (const id of ids) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.3) {
          current = id
        }
      }
      setActiveId(current)
    }

    // Scroll events fire many times per frame. requestAnimationFrame measures
    // the page at most once per frame, which keeps scrolling smooth.
    let frame = null
    function handleScroll() {
      if (followingLink.current) {
        finishFollowingLinkSoon(150)
        return
      }
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          frame = null
          updateFromScroll()
        })
      }
    }

    if (!followingLink.current) updateFromScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    // Cleanup: stop listening when the component goes away
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [ids, pathname])

  // Clear any pending timer when the component goes away
  useEffect(() => () => clearTimeout(idleTimer.current), [])

  return activeId
}

export default useActiveSection
