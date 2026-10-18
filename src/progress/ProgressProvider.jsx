import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProgressContext from './ProgressContext.js'
import useAuth from '../account/useAuth.js'
import { supabase } from '../lib/supabase.js'

const STORAGE_KEY = 'preemployment-ph:done'
const SAVE_DELAY_MS = 600

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

// Everything checked on this device OR in the account, with no duplicates
function combine(a, b) {
  return [...new Set([...a, ...b])]
}

function ProgressProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null

  // Passing a function to useState runs it only once, on the first render
  const [doneIds, setDoneIds] = useState(readSaved)

  // Account sync status: 'device' (not signed in), 'loading', 'saving', 'saved', or 'error'
  const [syncStatus, setSyncStatus] = useState('device')

  // Refs remember values between renders without causing re-renders
  const latestDoneIds = useRef(doneIds)
  const loadedForUser = useRef(null) // whose account data we've loaded
  const previousUserId = useRef(userId)
  // Changing these numbers re-runs the load or save effects ("Try again")
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [saveAttempt, setSaveAttempt] = useState(0)

  // Always keep a copy on this device
  useEffect(() => {
    latestDoneIds.current = doneIds
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

  // When someone signs in: load their account's progress and combine it with
  // what's on this device, so nothing checked in either place is lost.
  // When someone signs out: clear this device, in case it's shared.
  useEffect(() => {
    const signedOut = previousUserId.current && !userId
    previousUserId.current = userId

    if (signedOut) {
      loadedForUser.current = null
      setDoneIds([])
      setSyncStatus('device')
      return
    }
    if (!userId || !supabase) {
      setSyncStatus('device')
      return
    }

    let cancelled = false
    setSyncStatus('loading')
    supabase
      .from('progress')
      .select('done_ids')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setSyncStatus('error')
          return
        }
        const combined = combine(latestDoneIds.current, data?.done_ids ?? [])
        loadedForUser.current = userId
        setDoneIds(combined)
        // Save the combined list right away (the save effect below handles it)
        setSaveAttempt((attempt) => attempt + 1)
      })

    return () => {
      cancelled = true
    }
  }, [userId, loadAttempt])

  // Save to the account shortly after each change. Waiting a moment means
  // ticking several boxes quickly sends one request instead of many.
  useEffect(() => {
    if (!supabase || !userId || loadedForUser.current !== userId) return

    setSyncStatus('saving')
    const timer = setTimeout(async () => {
      const { error } = await supabase.from('progress').upsert({
        user_id: userId,
        done_ids: doneIds,
        updated_at: new Date().toISOString(),
      })
      setSyncStatus(error ? 'error' : 'saved')
    }, SAVE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [doneIds, userId, saveAttempt])

  const toggle = useCallback((id) => {
    setDoneIds((current) =>
      current.includes(id) ? current.filter((doneId) => doneId !== id) : [...current, id],
    )
  }, [])

  const reset = useCallback(() => setDoneIds([]), [])

  // If loading failed, try loading again; if saving failed, save again
  const retrySync = useCallback(() => {
    if (loadedForUser.current === userId) {
      setSaveAttempt((attempt) => attempt + 1)
    } else {
      setLoadAttempt((attempt) => attempt + 1)
    }
  }, [userId])

  // useMemo keeps the same object between renders unless something changes,
  // so components using this context don't re-render for no reason
  const value = useMemo(
    () => ({
      doneIds,
      isDone: (id) => doneIds.includes(id),
      toggle,
      reset,
      syncStatus,
      retrySync,
    }),
    [doneIds, toggle, reset, syncStatus, retrySync],
  )

  return <ProgressContext value={value}>{children}</ProgressContext>
}

export default ProgressProvider
