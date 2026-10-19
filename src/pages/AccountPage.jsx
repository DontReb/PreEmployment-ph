import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../account/useAuth.js'
import useProgress from '../progress/useProgress.js'
import SyncStatus from '../account/SyncStatus.jsx'
import requirements from '../data/requirements.js'

const RESEND_WAIT_SECONDS = 60

// Turn technical errors into messages that say what to do next
function friendlyError(error) {
  if (error?.status === 429) return 'Too many tries. Wait a minute, then try again.'
  if (error?.status === 403 || /expired|invalid/i.test(error?.message ?? '')) {
    return 'That code didn’t work. Use the code from the newest email, or send a new code.'
  }
  if (error?.name === 'AuthRetryableFetchError' || error instanceof TypeError) {
    return 'Couldn’t connect. Check your internet connection and try again.'
  }
  return 'Something went wrong. Please try again.'
}

const inputClass =
  'mt-2 min-h-11 w-full rounded-xl bg-surface-raised px-4 py-2 text-ink ring-1 ring-outline placeholder:text-ink-muted focus:ring-2 focus:ring-accent focus:outline-none'
const primaryButton =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-accent px-6 font-semibold text-on-accent shadow-sm transition hover:brightness-110 active:brightness-95 disabled:cursor-wait disabled:opacity-60'
const quietButton =
  'inline-flex min-h-11 cursor-pointer items-center font-medium text-accent-ink underline decoration-outline underline-offset-4 hover:decoration-2 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60'

function SignInForm() {
  const { sendCode, verifyCode } = useAuth()
  const [step, setStep] = useState('email') // 'email', then 'code'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const codeInput = useRef(null)

  // Count down until another code can be sent
  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  useEffect(() => {
    if (step === 'code') codeInput.current?.focus()
  }, [step])

  async function handleSendCode(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await sendCode(email.trim())
      setStep('code')
      setCode('')
      setSecondsLeft(RESEND_WAIT_SECONDS)
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleVerify(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await verifyCode(email.trim(), code.trim())
      // Success: AuthProvider sees the new session and the page switches view
    } catch (err) {
      setError(friendlyError(err))
      setBusy(false)
    }
  }

  if (step === 'email') {
    return (
      <form onSubmit={handleSendCode} className="mt-8 max-w-md">
        <label htmlFor="email" className="font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'email-error' : 'email-hint'}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className={inputClass}
        />
        {error && (
          <p id="email-error" role="alert" className="mt-3 text-ink">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className={`${primaryButton} mt-5`}>
          {busy ? 'Sending…' : 'Send code'}
        </button>
        <p id="email-hint" className="mt-4 text-sm">
          No password needed. Each time you sign in, a 6-digit code is sent to your email.
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerify} className="mt-8 max-w-md">
      <p className="text-ink">
        A code was sent to <span className="font-semibold [overflow-wrap:anywhere]">{email}</span>.
        It may take a minute, and it might be in your spam folder.
      </p>
      <label htmlFor="code" className="mt-5 block font-semibold text-ink">
        Code from the email
      </label>
      <input
        id="code"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'code-error' : undefined}
        ref={codeInput}
        type="text"
        required
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]{6,10}"
        maxLength={10}
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
        placeholder="123456"
        className={`${inputClass} font-mono text-lg tracking-[0.3em]`}
      />
      {error && (
        <p id="code-error" role="alert" className="mt-3 text-ink">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy || code.length < 6} className={`${primaryButton} mt-5`}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
      <div className="mt-4 flex flex-wrap gap-x-6">
        <button
          type="button"
          disabled={busy || secondsLeft > 0}
          onClick={handleSendCode}
          className={quietButton}
        >
          {secondsLeft > 0 ? `Send a new code (${secondsLeft}s)` : 'Send a new code'}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep('email')
            setError('')
          }}
          className={quietButton}
        >
          Use a different email
        </button>
      </div>
    </form>
  )
}

function SignedIn() {
  const { user, signOut, deleteAccount } = useAuth()
  const { doneIds } = useProgress()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const readyCount = requirements.filter((item) => doneIds.includes(item.id)).length

  async function handleSignOut() {
    setBusy(true)
    await signOut()
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Delete your account and your saved progress? This can’t be undone.',
    )
    if (!confirmed) return
    setBusy(true)
    setError('')
    try {
      await deleteAccount()
    } catch (err) {
      setError(friendlyError(err))
      setBusy(false)
    }
  }

  return (
    <div className="mt-8 max-w-md space-y-6">
      <div className="rounded-2xl bg-surface-raised p-5 ring-1 ring-separator">
        <p className="text-sm text-ink-muted">Signed in as</p>
        <p className="font-semibold text-ink [overflow-wrap:anywhere]">{user.email}</p>
        <p className="mt-3 text-ink">
          {readyCount} of {requirements.length} documents ready
        </p>
        <SyncStatus className="mt-1 text-ink-muted" />
      </div>

      <Link to="/" className={primaryButton}>
        Go to your envelope
      </Link>

      <div className="border-t border-separator pt-6">
        <button type="button" disabled={busy} onClick={handleSignOut} className={quietButton}>
          Sign out
        </button>
        <p className="text-sm">
          Signing out also clears your checklist from this device, in case others use it. It stays
          in your account.
        </p>
      </div>

      <div className="border-t border-separator pt-6">
        <button type="button" disabled={busy} onClick={handleDelete} className={quietButton}>
          Delete account
        </button>
        <p className="text-sm">Permanently deletes your account and saved progress.</p>
        {error && (
          <p role="alert" className="mt-2 text-ink">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

function AccountPage() {
  const { enabled, ready, user } = useAuth()
  const headingRef = useRef(null)

  // Move focus to the heading when the view changes (signed in or out)
  useEffect(() => {
    headingRef.current?.focus()
  }, [user])

  return (
    <article className="py-10 sm:py-14">
      <title>Account · PreEmployment.ph</title>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-4xl font-bold tracking-tight text-ink focus:outline-none sm:text-5xl"
      >
        {user ? 'Your account' : 'Sign in'}
      </h1>

      {!enabled && (
        <p className="mt-6 max-w-xl text-lg text-ink-muted">
          Accounts aren’t available yet. Your checklist is saved on this device.
        </p>
      )}

      {enabled && !ready && <p className="mt-6 text-ink-muted">Loading…</p>}

      {enabled && ready && !user && (
        <>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Keep your checklist on any phone or computer, and pick up where you left off. Anything
            you’ve already checked on this device is kept.
          </p>
          <SignInForm />
        </>
      )}

      {enabled && ready && user && <SignedIn />}

      {enabled && (
        <section className="mt-12 max-w-xl border-t border-separator pt-6 text-sm text-ink-muted">
          <h2 className="font-semibold text-ink">Your privacy</h2>
          <p className="mt-2">
            PreEmployment.ph saves only your email address and which documents you’ve marked
            ready. It’s used only to keep your checklist, never shared or sold, and you can delete
            it anytime from this page. Visits to the site are counted anonymously, without
            cookies.
          </p>
        </section>
      )}
    </article>
  )
}

export default AccountPage
