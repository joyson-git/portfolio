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
    <section className="np-page-section" id="achievements" ref={ref}>
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 7B · HONOURS ROLL &amp; CITATIONS</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <h2 className="np-section-headline font-headline">
          HONOURS ROLL &amp; COMPETITIVE AWARDS
        </h2>
        <p className="np-section-deck font-serif">
          Hackathon recognitions, competitive algorithmic challenges, and public open-source contributions.
        </p>

        <hr className="np-rule-double" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {achievementsItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="np-article-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <div className="np-article-card__header font-mono">
                <span>OFFICIAL CITATION</span>
                <span className="np-article-card__stamp font-mono">{item.badge}</span>
              </div>

              <h3 className="np-article-card__title font-serif" style={{ fontSize: '1.25rem' }}>
                {item.title}
              </h3>
              <p className="font-body" style={{ color: 'var(--np-ink-body)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

