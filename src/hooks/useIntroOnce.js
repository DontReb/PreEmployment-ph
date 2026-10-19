import { useEffect, useState } from 'react'

// The home page's opening moment (headline rising in, papers sliding into the
// envelope) plays only the first time it appears after the site loads, not
// every time someone comes back to the home page.
const intro = { played: false }

function useIntroOnce() {
  const [play] = useState(() => !intro.played)
  useEffect(() => {
    intro.played = true
  }, [])
  return play
}

export default useIntroOnce
