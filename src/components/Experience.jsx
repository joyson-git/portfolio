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
      'Implemented Retrieval-Augmented Generation (RAG) pipelines using Ollama for localized LLM interactions and integrated speech-to-text capabilities to enhance user accessibility.',
      'Evaluated and optimized LLM application performance using Ragas framework to measure faithfulness, answer relevance, and context precision.',
      'Used AI-assisted development via MCP (Model Context Protocol) server integration to accelerate automation script generation and speed up delivery.',
    ],
    tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'Playwright', 'WebdriverIO', 'Artillery', 'RAG / Ollama', 'MCP AI Protocol'],
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
    <section className="np-page-section" id="experience" ref={ref}>
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 4 · INDUSTRIAL DISPATCHES &amp; CHRONICLES</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <h2 className="np-section-headline font-headline">
          CAREER CHRONICLES &amp; FIELD BULLETINS
        </h2>
        <p className="np-section-deck font-serif">
          Documenting professional milestones across enterprise software engineering, resilient microservice delivery, and end-to-end automation architecture.
        </p>

        <hr className="np-rule-double" />

        <div className="np-dispatch-timeline">
          {jobs.map((job, ji) => (
            <motion.div
              key={ji}
              className="np-dispatch-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ji * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="np-dispatch-header">
                <div>
                  <div className="np-dispatch-role font-serif">{job.title}</div>
                  <div className="np-dispatch-company font-headline">{job.company}</div>
                </div>
                <div className="np-dispatch-meta font-mono" style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--np-ink)', fontWeight: 700 }}>{job.period}</div>
                  <div style={{ color: 'var(--np-ink-muted)' }}>{job.location}</div>
                </div>
              </div>

              <ul className="np-dispatch-list">
                {job.points.map((p, i) => (
                  <li key={i} className="font-body">
                    {p}
                  </li>
                ))}
              </ul>

              <div className="np-article-card__tags" style={{ marginTop: '0.8rem' }}>
                {job.tech.map(t => (
                  <span key={t} className="np-tag-ink font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
