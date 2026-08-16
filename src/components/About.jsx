import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard'
import StatsCounter from './StatsCounter'

const stats = [
  { num: '500+', label: 'LeetCode Solved' },
  { num: '200+', label: 'Coding Ninjas' },
  { num: '7.5', label: 'B.E. CGPA (V.T.U)' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 1.0, ease: [0.16, 1, 0.3, 1] } }),
  }

  return (
    <section className="about section" id="about" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Engineering with <em>Precision</em>.
      </motion.h2>

      <div className="about-grid">
        {/* Text */}
        <div className="about-content">
          {[
            `Full Stack Developer building healthcare web apps with Angular, Node.js, Express.js, and MongoDB.`,
            `Strong backend foundation in Java, Spring Boot microservices, REST APIs, and automated testing with Playwright & WebdriverIO.`,
            `Open to remote & freelance projects — ready to work for free for the first few months to prove my skills and build trust.`,
          ].map((p, i) => (
            <motion.p key={i} className="about-text"
              custom={i} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              {p}
            </motion.p>
          ))}

          {/* Stat grid */}
          <div className="about-stats">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                custom={i + 3} variants={variants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                <TiltCard maxTilt={8}>
                  <div className="about-stat">
                    <motion.span
                      className="about-stat-num"
                      whileHover={{ scale: 1.15, color: '#ffffff' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {s.num}
                    </motion.span>
                    <span className="about-stat-label mono">{s.label}</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Level-2 Metric Counters */}
      <StatsCounter />
    </section>
  )
}
