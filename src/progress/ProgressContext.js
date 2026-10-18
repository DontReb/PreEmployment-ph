import { createContext } from 'react'

// Context lets any component read the checklist progress without passing
// props through every layer in between ("prop drilling").
const ProgressContext = createContext(null)

export default ProgressContext
