import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StatsCounter({ stats = [] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  if (!stats || stats.length === 0) return null

  return (
    <div className="stats-container" ref={ref}>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label || i}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stat-val">{stat.value || stat.num}</div>
            <div className="stat-label mono">{stat.label}</div>
            {stat.desc && <div className="stat-desc">{stat.desc}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
