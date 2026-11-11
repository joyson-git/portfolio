import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard'

const jobs = [
  {
    title: 'QA Automation Engineer ',
    company: 'Teslon Technology',
    period: 'Feb 2026 – Present',
    location: 'Bangalore, India',
    points: [
      'Built end-to-end and mobile test automation frameworks from scratch using WebdriverIO and Playwright, increasing test coverage by 40% and cutting manual QA effort by 60%.',
      'Designed load testing pipelines with Artillery and performed security testing with Burp Suite Professional, identifying API bottlenecks and vulnerabilities while validating stability under a 30% increase in concurrent users.',
      'Deployed and maintained applications on AWS and Oracle Cloud (OCI) using Linux (Ubuntu) servers, with Nginx as web server and reverse proxy including SSL/TLS setup.',
      'Built CI/CD pipelines with Jenkins, automating build, test, and deployment with automated test suites as quality gates before release.',
      'Containerized applications with Docker to keep environments consistent across development, testing, and production, simplifying deployments and rollbacks.',
      'Handled server administration and monitoring, including shell scripting, log analysis, firewall and security group configuration, and production troubleshooting.',
      'Used Model Context Protocol (MCP) servers with AI-assisted coding to speed up automation script delivery by over 50%.',
    ],
    tech: ['WebdriverIO', 'Playwright', 'Artillery', 'Burp Suite', 'AWS', 'Oracle Cloud (OCI)', 'Linux', 'Nginx', 'Jenkins', 'Docker', 'MCP'],
  },
  {
    title: 'Software Developer',
    company: 'Teslon Technology',
    period: 'Jun 2025 – Jan 2026',
    location: 'Bangalore, India',
    points: [
      'Owned end-to-end feature delivery for hospital administration workflows — from requirements to production — writing new Vue 3 UI features and supporting REST APIs.',
      'Designed and implemented Node.js, Express.js, and MongoDB REST APIs for patient data, hospital operations, and admin workflows.',
      'Debugged and fixed production issues across frontend and backend, improving reliability and reducing recurring defects.',
      'Built responsive Vue 3 interfaces that improved page load speed and usability for hospital staff.',
    ],
    tech: ['Vue 3', 'Node.js', 'Express.js', 'MongoDB'],
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
          <span>PAGE 2 · INDUSTRIAL DISPATCHES &amp; CHRONICLES</span>
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
