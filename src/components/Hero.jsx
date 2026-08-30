import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Avatar3D from './Avatar3D'
import { downloadResumePDF } from '../utils/downloadResume'

const TECH = [
  'JAVA', 'SPRING BOOT', 'NODE.JS', 'EXPRESS', 'ANGULAR', 'REACT',
  'PLAYWRIGHT', 'DOCKER', 'MONGODB', 'POSTGRESQL', 'KAFKA', 'REDIS',
  'AWS', 'REST APIs', 'FASTAPI', 'TYPESCRIPT', 'GRAPHQL', 'KUBERNETES',
]
const TICKER = [...TECH, ...TECH, ...TECH]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero({ onOpenContact }) {
  const [bangaloreTime, setBangaloreTime] = useState('')

  useEffect(() => {
    const update = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
        setBangaloreTime(timeStr)
      } catch {
        // Fallback
      }
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="scs-hero" id="hero">

      {/* ── Main two-column layout ── */}
      <div className="scs-container scs-hero__body">

        {/* LEFT — text content */}
        <div className="scs-hero__text">

          {/* Eyebrow */}
          <motion.div className="scs-hero__eyebrow" {...fadeUp(0.05)}>
            <span className="scs-hero__status-pill scs-mono">
              <span className="dot pulse" style={{ background: 'var(--scs-light-orange)', boxShadow: '0 0 8px var(--scs-light-orange)' }} />
              AVAILABLE FOR FULL-TIME &amp; REMOTE ROLES
            </span>
            <span className="scs-hero__location scs-mono">
              BANGALORE, IN {bangaloreTime && `[ ${bangaloreTime} IST ]`}
            </span>
          </motion.div>

          {/* Display headline */}
          <div className="scs-hero__headline">
            <motion.h1 className="scs-dis1" {...fadeUp(0.12)}>
              FULL-STACK<br />ARCHITECT.
            </motion.h1>
            <motion.div className="scs-dis1 scs-gradient-text" {...fadeUp(0.2)}>
              QUIETLY AHEAD.
            </motion.div>
          </div>

          {/* Lede */}
          <motion.p className="scs-hero__lede" {...fadeUp(0.3)}>
            From resilient Java &amp; Spring Boot microservices to reactive web frontends
            and zero-flakiness E2E test automation — engineering scalable systems with
            relentless precision.
          </motion.p>

          {/* Actions */}
          <motion.div className="scs-hero__actions" {...fadeUp(0.38)}>
            <a href="#projects" className="scs-btn scs-btn--primary">
              <span className="scs-btn__label">Explore Work</span>
              <span className="scs-btn__circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <button className="scs-btn scs-btn--ghost" type="button" onClick={onOpenContact}>
              <span className="scs-btn__label">Start a Project</span>
              <span className="scs-btn__circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <a
              href="/Joyson_Pinto_FullStackDeveloper_Resume.pdf"
              download="Joyson_Pinto_FullStackDeveloper_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="scs-btn scs-btn--teal"
              title="Download Joyson Pinto Resume (PDF)"
            >
              <span className="scs-btn__label">Resume PDF ↓</span>
              <span className="scs-btn__circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — orbital graphic with avatar */}
        <motion.div
          className="scs-hero__orbital"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {/* Rotating spokes */}
          <div className="scs-hero__spokes">
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <div
                key={deg}
                className="scs-hero__spoke"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Concentric rings */}
          <div className="scs-hero__ring scs-hero__ring--outer" />
          <div className="scs-hero__ring scs-hero__ring--mid" />
          <div className="scs-hero__ring scs-hero__ring--inner" />

          {/* Glowing core behind avatar */}
          <div className="scs-hero__core" />

          {/* Avatar — full opacity, prominent */}
          <div className="scs-hero__avatar">
            <Avatar3D />
          </div>

          {/* HUD labels */}
        </motion.div>
      </div>

      {/* ── Infinite marquee ticker ── */}
      <div className="scs-ticker" aria-hidden="true">
        <div className="scs-ticker__fade scs-ticker__fade--left" />
        <div className="scs-ticker__fade scs-ticker__fade--right" />
        <div className="scs-ticker__track">
          {TICKER.map((item, i) => (
            <span key={i} className="scs-ticker__item scs-mono">
              <span className="scs-ticker__dot">·</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
