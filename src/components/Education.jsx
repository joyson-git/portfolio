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
    <section className="education section" id="education" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="scs-gradient-text">Education &amp; Degrees.</span>
      </motion.h2>

      <motion.div
        className="edu-boxed-container"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {educationItems.map((edu, idx) => (
          <div key={idx} className="edu-boxed-item">
            <h3 className="edu-boxed-degree">{edu.degree}</h3>

            {edu.score ? (
              <div className="edu-boxed-score-badge mono">{edu.score}</div>
            ) : (
              <div className="edu-boxed-bar-dash" />
            )}

            <div className="edu-boxed-inst">{edu.institution}</div>
            <div className="edu-boxed-meta mono">
              {edu.period} · {edu.location}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
