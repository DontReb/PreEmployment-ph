import { useCallback, useEffect, useMemo, useState } from 'react'
import ProgressContext from './ProgressContext.js'

const STORAGE_KEY = 'preemployment-ph:done'

// localStorage can be missing or blocked (private browsing, strict settings),
// so every read and write is wrapped in try/catch. The site still works; it
// just won't remember progress.
function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function save(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Saving isn't possible here. Progress lasts until the page is closed.
  }
}

function ProgressProvider({ children }) {
  // Passing a function to useState runs it only once, on the first render
  const [doneIds, setDoneIds] = useState(readSaved)

  // Save whenever the list changes
  useEffect(() => {
    save(doneIds)
  }, [doneIds])

  // Keep other open tabs of the site in sync
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setDoneIds(readSaved())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggle = useCallback((id) => {
    setDoneIds((current) =>
      current.includes(id) ? current.filter((doneId) => doneId !== id) : [...current, id],
    )
  }, [])

  const reset = useCallback(() => setDoneIds([]), [])

  // useMemo keeps the same object between renders unless doneIds changes,
  // so components using this context don't re-render for no reason
  const value = useMemo(
    () => ({
      doneIds,
      isDone: (id) => doneIds.includes(id),
      toggle,
      reset,
    }),
    [doneIds, toggle, reset],
  )

  return <ProgressContext value={value}>{children}</ProgressContext>
}

export default ProgressProvider
