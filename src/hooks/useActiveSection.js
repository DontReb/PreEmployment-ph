import { useEffect, useState } from 'react'

// Returns the id of the section currently being read, so the navbar
// can show people where they are on the page.
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let followingLink = false
    let idleTimer

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

    // When someone clicks a nav link, trust the link they chose instead of
    // guessing from the scroll position (short sections may never reach the top).
    function handleHashChange() {
      const id = window.location.hash.slice(1)
      if (ids.includes(id)) {
        setActiveId(id)
        followingLink = true
      }
    }

    function handleScroll() {
      if (followingLink) {
        // Wait until the jump to the clicked section has finished
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
          followingLink = false
        }, 150)
        return
      }
      updateFromScroll()
    }

    updateFromScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    window.addEventListener('hashchange', handleHashChange)

    // Cleanup: stop listening when the component goes away
    return () => {
      clearTimeout(idleTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateFromScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [ids])

  return activeId
}

export default useActiveSection
