import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 700 // Snappy 0.7s loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(100, Math.floor((elapsed / totalDuration) * 100))
      setProgress(pct)

      if (elapsed >= totalDuration) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(onDone, 150)
      }
    }, 20)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(interval)
        onDone()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onDone])

  return (
    <motion.div
      className="np-simple-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={onDone}
      title="Click or press ESC to skip"
    >
      <div className="np-simple-loader-inner">
        <div className="np-simple-loader-spinner" />
        <span className="np-simple-loader-text font-mono">
          Loading {progress}%
        </span>
      </div>
    </motion.div>
  )
}
