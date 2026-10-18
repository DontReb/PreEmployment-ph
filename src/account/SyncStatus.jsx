import { Link } from 'react-router'
import useAuth from './useAuth.js'
import useProgress from '../progress/useProgress.js'

const messages = {
  loading: 'Loading your saved progress…',
  saving: 'Saving…',
  saved: 'Saved to your account',
}

// One line that tells people where their progress lives right now.
// aria-live lets screen readers hear "Saved" without moving focus.
function SyncStatus({ className = '' }) {
  const { enabled, ready, user } = useAuth()
  const { syncStatus, retrySync } = useProgress()

  if (!enabled || !ready) return null

  return (
    <p aria-live="polite" className={`text-sm ${className}`}>
      {!user && (
        <>
          Saved on this device only.{' '}
          <Link to="/account" className="font-medium underline underline-offset-4">
            Sign in
          </Link>{' '}
          to keep it on any device.
        </>
      )}
      {user && syncStatus === 'error' && (
        <>
          Couldn’t reach your account. Your progress is still on this device.{' '}
          <button
            type="button"
            onClick={retrySync}
            className="cursor-pointer font-medium underline underline-offset-4"
          >
            Try again
          </button>
        </>
      )}
      {user && messages[syncStatus]}
    </p>
  )
}

export default SyncStatus
