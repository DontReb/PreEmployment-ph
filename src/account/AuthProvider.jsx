import { useCallback, useEffect, useMemo, useState } from 'react'
import AuthContext from './AuthContext.js'
import { accountsEnabled, supabase } from '../lib/supabase.js'

// Keeps track of who is signed in, and offers the sign-in actions.
// Sign-in uses a one-time code sent by email, so there's no password to forget.
function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // "ready" turns true once we know whether someone is signed in
  const [ready, setReady] = useState(!accountsEnabled)

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })

    // Keep this callback short and synchronous: Supabase's docs warn that
    // slow work inside it can freeze sign-in. Loading data happens elsewhere.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const sendCode = useCallback(async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) throw error
  }, [])

  const verifyCode = useCallback(async (email, token) => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const deleteAccount = useCallback(async () => {
    const { error } = await supabase.rpc('delete_own_account')
    if (error) throw error
    // The account is gone, so just forget the session on this device
    await supabase.auth.signOut({ scope: 'local' })
  }, [])

  const value = useMemo(
    () => ({
      enabled: accountsEnabled,
      ready,
      user: session?.user ?? null,
      sendCode,
      verifyCode,
      signOut,
      deleteAccount,
    }),
    [ready, session, sendCode, verifyCode, signOut, deleteAccount],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
