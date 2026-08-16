import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [lightsOut, setLightsOut] = useState(false)
  const [launchTrace, setLaunchTrace] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 1400 // 1.4s for 0->100% red lights sequence

    const id = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(p)

      if (p >= 100) {
        clearInterval(id)

        // Trigger LIGHTS OUT & trace beam launch at 1.5s
        setTimeout(() => {
          setLightsOut(true)
          setLaunchTrace(true)
        }, 100)

        // Finish loader at exactly 2.0s
        setTimeout(onDone, 600)
      }
    }, 16)

    return () => clearInterval(id)
  }, [onDone])

  // F1 Gantry Red Lights (5 columns, 2 lights each)
  const litCount = Math.min(5, Math.floor(progress / 20))
  const rpmPercent = Math.min(100, (progress / 100) * 100)

  return (
    <AnimatePresence>
      <motion.div
        key="f1-loader"
        className="f1-loader"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* F1 Carbon Fiber Background Grid */}
        <div className="f1-carbon-bg" />

        {/* F1 Car Trace Light Trail Launch Overlay */}
        {launchTrace && (
          <motion.div
            className="f1-trace-beam"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <div className="f1-loader-content">
          {/* F1 Brand Badge */}
          <div className="f1-badge mono">
            <span className="f1-badge-red">F1</span> JOYSON PINTO
          </div>

          {/* F1 5-LIGHT STARTING GANTRY */}
          <div className="f1-gantry-frame">
            <div className="f1-gantry-top-bar" />
            <div className="f1-gantry">
              {[1, 2, 3, 4, 5].map((colIndex) => {
                const isLit = !lightsOut && colIndex <= litCount
                return (
                  <div key={colIndex} className="f1-light-column">
                    <div className={`f1-light ${isLit ? 'f1-light--red' : ''} ${lightsOut ? 'f1-light--green' : ''}`}>
                      <div className="f1-light-glow" />
                    </div>
                    <div className={`f1-light ${isLit ? 'f1-light--red' : ''} ${lightsOut ? 'f1-light--green' : ''}`}>
                      <div className="f1-light-glow" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RPM LED Shift Bar */}
          <div className="f1-rpm-bar">
            {[...Array(12)].map((_, i) => {
              const active = (i / 12) * 100 <= rpmPercent
              let colorClass = 'f1-rpm-green'
              if (i >= 5 && i < 9) colorClass = 'f1-rpm-yellow'
              if (i >= 9) colorClass = 'f1-rpm-red'
              return (
                <div
                  key={i}
                  className={`f1-rpm-led ${active ? colorClass : ''}`}
                />
              )
            })}
          </div>

          {/* Gear Display */}
          <div className="f1-telemetry">
            <div className="f1-gear-box mono">
              <span className="f1-gear-label">GEAR</span>
              <span className="f1-gear-val">{progress === 100 ? '8' : Math.min(7, Math.floor((progress / 100) * 7) + 1)}</span>
            </div>
          </div>

          {/* Status Message */}
          <div className="f1-status mono">
            {lightsOut ? (
              <span className="f1-status-green">LIGHTS OUT AND AWAY WE GO! 🏎️💨</span>
            ) : progress < 30 ? (
              <span>FORMATION LAP // WARMING TIRES...</span>
            ) : progress < 70 ? (
              <span>GRID FORMING // REV UP 12,000 RPM</span>
            ) : (
              <span className="f1-status-red">READY FOR LAUNCH...</span>
            )}
          </div>
        </div>

        {/* Trace Light Streak at Footer */}
        <div className="f1-bottom-line">
          <motion.div
            className="f1-bottom-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
