import Icon from './Icon.jsx'
import { modeLabels } from '../../data/requirements.js'

// How you get a document: online, in person, or through your employer
function ModeTag({ mode, className = '' }) {
  return (
    <span className={`inline-flex max-w-full items-center gap-1.5 text-sm text-ink-muted ${className}`}>
      <Icon name={mode} className="size-4 shrink-0" />
      <span className="min-w-0 [overflow-wrap:anywhere]">{modeLabels[mode]}</span>
    </span>
  )
}

export default ModeTag
