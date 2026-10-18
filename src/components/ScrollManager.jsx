import { useEffect } from 'react'
import { useLocation } from 'react-router'

// The router changes the URL without reloading the page, so the browser no
// longer scrolls for us. This scrolls to #section links, or to the top of a new page.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}

export default ScrollManager
