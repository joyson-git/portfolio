import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRINT_STAGES = [
  { threshold: 0, text: 'FEEDING ROLLS OF FLEET STREET NEWSPRINT...' },
  { threshold: 20, text: 'TYPESETTING LEAD SLUGS: JOYSON PINTO · FULL-STACK DEVELOPER...' },
  { threshold: 45, text: 'ENGAGING INK CYLINDERS & STEAM ROTARY PRESS [300 DPI]...' },
  { threshold: 70, text: 'COMPOSING PAGE 2: LEAD STORY & BUILDER’S CHRONICLE...' },
  { threshold: 90, text: 'CALIBRATING DENSITY & MULTI-COLUMN INK RULES...' },
  { threshold: 100, text: 'PRINT RUN APPROVED · FRESH OFF THE PRESS!' }
]

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(PRINT_STAGES[0].text)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 2400 // Fast, punchy 2.4 second print run

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(100, Math.floor((elapsed / totalDuration) * 100))
      setProgress(pct)

      // Find corresponding stage
      for (let i = PRINT_STAGES.length - 1; i >= 0; i--) {
        if (pct >= PRINT_STAGES[i].threshold) {
          setCurrentStage(PRINT_STAGES[i].text)
          break
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 650)
        }, 250)
      }
    }, 25)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(interval)
        setExiting(true)
        setTimeout(onDone, 300)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onDone])

  const handleSkip = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(onDone, 400)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="np-press-loader"
        className="np-press-loader"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%', opacity: 0.9 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Newsprint Tactile Grain Texture Overlay */}
        <div className="np-press-paper-texture" />

        {/* Ink Roller Wipe Effect on Finish */}
        {exiting && (
          <motion.div
            className="np-loader-roller"
            initial={{ x: '-100%' }}
            animate={{ x: '110%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Vintage Registration Marks in 4 corners */}
        <div className="np-reg-mark np-reg-top-left" aria-hidden="true">✛</div>
        <div className="np-reg-mark np-reg-top-right" aria-hidden="true">✛</div>
        <div className="np-reg-mark np-reg-bottom-left" aria-hidden="true">✛</div>
        <div className="np-reg-mark np-reg-bottom-right" aria-hidden="true">✛</div>

        {/* Inner Framed Container */}
        <div className="np-press-container">

          {/* ── TOP PRESSROOM CONTROL BAR ── */}
          <div className="np-press-topbar font-mono">
            <div className="np-press-topbar-left">
              <span className="np-press-gear-spin">⚙</span>
              <span>FLEET STREET ROTARY PRESS · PRESSROOM № 4</span>
              <span className="np-press-pipe">|</span>
              <span className="np-press-tag">LATE CITY WIRE EDITION</span>
            </div>

            <div className="np-press-topbar-right">
              <button
                type="button"
                className="np-press-skip-btn font-mono"
                onClick={handleSkip}
                title="Skip directly into portfolio [ESC]"
              >
                <span>SKIP TO EDITION ➔</span>
                <span className="np-press-key-badge">ESC</span>
              </button>
            </div>
          </div>

          <hr className="np-rule-double" style={{ margin: '0.4rem 0 1.2rem' }} />

          {/* ── CENTER MECHANICAL ROTARY PRESS ANIMATION ── */}
          <div className="np-press-visualizer">
            {/* Top Feeding Roller Cylinders with Gears */}
            <div className="np-roller-assembly">
              <div className="np-roller-gear np-roller-gear--left">
                <svg viewBox="0 0 100 100" className="np-gear-svg">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 6" />
                  <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="3" />
                  <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="3" />
                  <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="3" />
                  <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>

              {/* Central Heavy Steel & Ink Cylinder */}
              <div className="np-cylinder-drum">
                <div className="np-cylinder-body">
                  <div className="np-cylinder-ink-glaze" />
                  <div className="np-cylinder-label font-mono">
                    INKING CYLINDER · 300 DPI · STEAM DRIVEN
                  </div>
                </div>
              </div>

              <div className="np-roller-gear np-roller-gear--right">
                <svg viewBox="0 0 100 100" className="np-gear-svg np-gear-svg--reverse">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 6" />
                  <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="3" />
                  <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="3" />
                  <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="3" />
                  <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>

            {/* Continuous Fresh Newsprint Sheet Flowing Down */}
            <div className="np-paper-feed-sheet">
              <div className="np-feed-registration-strip font-mono">
                <span>▲ FEED DIRECTION ▲</span>
                <span>CYLINDER PASS: #{Math.floor(progress * 4.2)}</span>
                <span>INK VISCOSITY: 98.4%</span>
                <span>SPEED: 3,600 SPH</span>
              </div>

              {/* Freshly Inked Headline: Keep the old headline "JOYSON PINTO: FULL-STACK DEVELOPER BUILDING FROM ZERO TO ONE" */}
              <div className="np-sheet-printed-sample">
                <div className="np-sheet-watermark font-masthead">
                  GENZ TIMES
                </div>
                <div className="np-sheet-lines">
                  <div className="np-sheet-lead font-headline">
                    JOYSON PINTO: ZERO TO ONE · RESTLESSLY BUILDING SCALED SOFTWARE
                  </div>
                  <div className="np-sheet-sub font-serif">
                    “Restlessly building scaled software, distributed architectures &amp; automated test engineering.”
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── GRAND MASTHEAD & EDITION TITLE ── */}
          <div className="np-press-masthead">
            <div className="np-press-est font-mono">
              ESTABLISHED 1890 · STEAM ROTARY PRESS EDITION · VOL. I NO. 142
            </div>
            <h1 className="np-press-title font-masthead">
              GENZ Times
            </h1>
            <div className="np-press-subtitle font-mono">
              SPECIAL MORNING BROADSHEET FOR JOYSON PINTO
            </div>
          </div>

          {/* ── REAL-TIME LINOTYPE STATUS TELEGRAPH ── */}
          <div className="np-linotype-box">
            <div className="np-linotype-badge font-mono">
              <span className="np-press-dot-pulse" />
              PRESS DISPATCH
            </div>
            <div className="np-linotype-text font-mono">
              {currentStage}
            </div>
          </div>

          {/* ── MECHANICAL INK GAUGE & PROGRESS HUD ── */}
          <div className="np-press-gauge-wrap">
            <div className="np-press-gauge-header font-mono">
              <span>PRINT RUN IMPRESSIONS</span>
              <span className="np-press-pct">{progress}%</span>
            </div>

            <div className="np-press-gauge-track">
              <div
                className="np-press-gauge-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="np-press-gauge-roller-head"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="np-press-gauge-footer font-mono">
              <span>ROLL № 24-B · 60LB NEWSPRINT</span>
              <span>BANGALORE WIRE · 1890 ARCHIVE</span>
              <span>STATUS: {progress >= 100 ? 'HOT OFF THE PRESS' : 'PRESSING...'}</span>
            </div>
          </div>

          <hr className="np-rule-double" style={{ margin: '1.2rem 0 0.5rem' }} />

          {/* ── FOOTER REGISTER NOTE ── */}
          <div className="np-press-bottom-folio font-mono">
            <span>© 1890–2026 GENZ TIMES PRESS CORP.</span>
            <span>·</span>
            <span>ALL SLUGS CAST IN LEAD</span>
            <span>·</span>
            <span>TURNING PAGE TO LEAD STORY AUTOMATICALLY</span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
