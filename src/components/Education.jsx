import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const educationItems = [
  {
    degree: 'Bachelor of Engineering in Information Science and Engineering',
    score: 'CGPA: 7.5/10',
    institution: 'Jawaharlal Nehru New College of Engineering (V.T.U)',
    period: 'Nov 2020 – Jun 2023',
    location: 'Shimoga, Karnataka',
  },
  {
    degree: 'Diploma in Computer Science',
    score: null,
    institution: 'M.E.S.R.N. Shetty Polytechnic',
    period: 'Aug 2017 – Sep 2020',
    location: 'Sirsi, Karnataka',
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="np-page-section" id="education" ref={ref}>
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 7A · ACADEMIC ARCHIVES &amp; CREDENTIALS</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <h2 className="np-section-headline font-headline">
          ACADEMIC GAZETTE &amp; DEGREES
        </h2>
        <p className="np-section-deck font-serif">
          Official engineering certifications and academic records in Information Science &amp; Computer Engineering.
        </p>

        <hr className="np-rule-double" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem' }}>
          {educationItems.map((edu, idx) => (
            <motion.div
              key={idx}
              className="np-article-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <div className="np-article-card__header font-mono">
                <span>DEGREE RECORD</span>
                {edu.score && <span className="np-article-card__stamp font-mono">{edu.score}</span>}
              </div>

              <h3 className="np-article-card__title font-serif">{edu.degree}</h3>
              <div className="font-headline" style={{ color: 'var(--np-ink-muted)', fontSize: '1rem', marginBottom: '0.4rem' }}>
                {edu.institution}
              </div>
              <div className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--np-ink-muted)' }}>
                {edu.period} · {edu.location}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

