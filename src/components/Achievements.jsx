import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const achievementsItems = [
  {
    title: 'DPDZero Data Analyst Hackathon',
    badge: 'Hackathon',
    desc: 'Built an analytics dashboard using Python, Pandas, and scikit-learn.',
  },
  {
    title: 'Leucine Hackathon',
    badge: 'Hackathon',
    desc: 'Contributed to a smart manufacturing project.',
  },
  {
    title: 'LeetCode',
    badge: '500+ Problems',
    desc: 'Solved 500+ algorithmic problems across Data Structures & Algorithms.',
  },
  {
    title: 'Coding Ninjas',
    badge: '200+ Problems',
    desc: 'Solved 200+ competitive programming challenges.',
  },
]

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="achievements section" id="achievements" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="scs-gradient-text">Key Achievements.</span>
      </motion.h2>

      <div className="achieve-clean-list">
        {achievementsItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="achieve-clean-item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="achieve-clean-title">{item.title}</h3>
            <div className="achieve-clean-badge mono">{item.badge}</div>
            <p className="achieve-clean-desc">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
