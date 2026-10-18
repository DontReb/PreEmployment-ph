import { useContext } from 'react'
import AuthContext from './AuthContext.js'

// Use this in any component: const { user, sendCode } = useAuth()
function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return auth
}

export default useAuth
