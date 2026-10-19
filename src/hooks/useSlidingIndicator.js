import { useLayoutEffect, useRef, useState } from 'react'

// Measures where the active item sits inside a container, so a highlight pill
// can slide to it. Mark items with data-indicator-key="..." and give the
// container position: relative. Re-measures when the container resizes.
function useSlidingIndicator(activeKey) {
  const containerRef = useRef(null)
  const [box, setBox] = useState(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    function measure() {
      const item = activeKey && container.querySelector(`[data-indicator-key="${activeKey}"]`)
      setBox(
        item
          ? { x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight }
          : null,
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [activeKey])

  return { containerRef, box }
}

export default useSlidingIndicator
