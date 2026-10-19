import { useEffect, useState } from 'react'

// The highlight that slides between tabs. It jumps into place the first time
// (no flying in from the corner), then glides on every change after that.
function SlidingPill({ box, className }) {
  const [canGlide, setCanGlide] = useState(false)

  useEffect(() => {
    if (!box || canGlide) return
    const frame = requestAnimationFrame(() => setCanGlide(true))
    return () => cancelAnimationFrame(frame)
  }, [box, canGlide])

  if (!box) return null

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 rounded-full ${
        canGlide ? 'motion-safe:transition-[translate,width,height] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)]' : ''
      } ${className}`}
      style={{ translate: `${box.x}px ${box.y}px`, width: box.width, height: box.height }}
    />
  )
}

export default SlidingPill
