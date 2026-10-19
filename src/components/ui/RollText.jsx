// Hover effect: the label rolls up and an identical copy rolls in from below.
// The parent link or button needs the class "group/roll". The copy is hidden
// from screen readers, and the effect is off when someone prefers less motion.
function RollText({ children }) {
  const roll =
    'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:group-hover/roll:-translate-y-full motion-safe:group-focus-visible/roll:-translate-y-full'

  return (
    <span className="relative inline-flex overflow-hidden">
      <span className={roll}>{children}</span>
      <span aria-hidden="true" className={`absolute inset-x-0 top-full ${roll}`}>
        {children}
      </span>
    </span>
  )
}

export default RollText
