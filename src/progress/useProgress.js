import { useContext } from 'react'
import ProgressContext from './ProgressContext.js'

// Use this in any component: const { isDone, toggle } = useProgress()
function useProgress() {
  const progress = useContext(ProgressContext)
  if (!progress) {
    throw new Error('useProgress must be used inside <ProgressProvider>')
  }
  return progress
}

export default useProgress
