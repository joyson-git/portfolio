import { useRef } from 'react'

/**
 * SCSButton — O-SCS signature capsule button
 * Props:
 *   label      (string)  — visible text
 *   onClick    (fn)      — click handler
 *   href       (string)  — if set, renders as <a>
 *   variant    ('primary' | 'ghost' | 'teal')
 *   magnetic   (bool)    — cursor-follow nudge on hover
 *   download / target / rel — forwarded to <a>
 */
export default function SCSButton({
  label,
  children,
  onClick,
  href,
  variant = 'primary',
  magnetic = false,
  download,
  target,
  rel,
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  const content = (
    <>
      <span className="scs-btn__label">{children ?? label}</span>
      <span className="scs-btn__circle" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  )

  const cls = `scs-btn scs-btn--${variant}`
  const props = { ref, className: cls, onMouseMove: handleMove, onMouseLeave: handleLeave }

  if (href) {
    return (
      <a {...props} href={href} download={download} target={target} rel={rel}>
        {content}
      </a>
    )
  }

  return (
    <button {...props} type="button" onClick={onClick}>
      {content}
    </button>
  )
}
