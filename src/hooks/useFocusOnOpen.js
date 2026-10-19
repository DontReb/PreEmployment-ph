import { useEffect, useRef } from 'react'

// After moving to a new page, put keyboard and screen reader focus on its
// main heading, so people start reading there instead of being left on the
// link they clicked. Returns a ref to attach to the heading (with tabIndex={-1}).
function useFocusOnOpen(dependency) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [dependency])
  return ref
}

export default useFocusOnOpen
