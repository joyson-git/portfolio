import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard'

const jobs = [
  {
    title: 'Full Stack Developer',
    company: 'Teslon Technology',
    period: 'June 2025 – Present',
    location: 'Bangalore, India',
    points: [
      'Developed and maintained healthcare web applications using Angular for dynamic UI rendering and state management, serving hospitals and patients.',
      'Built RESTful APIs with Node.js, Express.js, and MongoDB (Mongoose) to handle patient data, hospital operations, and healthcare workflows.',
      'Engineered end-to-end test automation suites using Playwright and WebdriverIO, catching regressions across critical patient-facing flows and improving release confidence.',
      'Conducted load and performance testing using Artillery, identifying API bottlenecks and ensuring system stability under high concurrency.',
      'Used AI-assisted development via MCP (Model Context Protocol) server integration to accelerate automation script generation and speed up delivery.',
    ],
    tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'Playwright', 'WebdriverIO', 'Artillery', 'MCP AI Protocol'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Ekathva Innovations Pvt Ltd',
    period: 'Aug 2022 – Dec 2022',
    location: 'Bangalore, India',
    points: [
      'Built a Student Result Management System using Java Servlets, JSP, JDBC, and MySQL, deployed on AWS.',
      'Improved system performance by 30% through query optimization, enhancing overall user experience.',
      'Followed Agile practices for smooth iterative development and on-time deployment.',
    ],
    tech: ['Java Servlets', 'JSP', 'JDBC', 'MySQL', 'AWS', 'Agile'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="exp section" id="experience" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Work <em>Experience</em>.
      </motion.h2>

      <div className="timeline">
        {jobs.map((job, ji) => (
          <motion.div key={ji}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: ji * 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}>
            <TiltCard maxTilt={5}>
              <div className="timeline-card">
                <div className="tl-header">
                  <div>
                    <div className="tl-title">{job.title}</div>
                    <div className="tl-company">{job.company}</div>
                  </div>
                  <div className="tl-meta mono">
                    <div>{job.period}</div>
                    <div style={{ color: 'var(--fg-dim)', fontSize: '0.8rem' }}>{job.location}</div>
                  </div>
                </div>

                <ul className="tl-points">
                  {job.points.map((p, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                      {p}
                    </motion.li>
                  ))}
                </ul>

                <div className="tl-tech">
                  {job.tech.map(t => (
                    <motion.span
                      key={t}
                      className="tl-tag mono"
                      whileHover={{ scale: 1.08, backgroundColor: '#ffffff', color: '#000000' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
