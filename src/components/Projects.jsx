import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'
import ProjectModal from './ProjectModal'
import { playHover, playClick } from '../utils/soundEffects'

const projects = [
  {
    num: '01',
    title: 'E-Commerce Spring Boot Microservices',
    desc: 'Full stack e-commerce backend platform built with Java, Spring Boot, Microservices, Spring Security, JWT, MongoDB, Eureka Server, and API Gateway. Features role-based access control and decoupled service architecture.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MongoDB', 'Eureka', 'Microservices'],
    link: 'https://github.com/joyson-git/Ecommer-Spring-boot-backend',
    live: 'http://129.225.69.56/',
    category: 'Backend & Microservices',
    badge: 'MICROSERVICE SYSTEM',
    highlight: 'Decoupled Eureka Gateway & JWT Auth',
    image: '/proj_microservices.webp',
    imageCaption: 'Fig. I — The Distributed Services Architecture, Anno 1893'
  },
  {
    num: '02',
    title: 'AI-Powered Email Auto-Reply Generator',
    desc: 'Chrome extension integrated with Gemini AI & Spring Boot REST API to automatically generate contextual email replies in under 10 seconds, helping users respond 3x faster.',
    tech: ['Java', 'Spring Boot', 'Gemini AI', 'Chrome Extension', 'REST APIs'],
    link: 'https://github.com/joyson-git/Email-auto-reply',
    category: 'AI & Browser Extension',
    badge: 'AI EXTENSION',
    highlight: 'Gemini LLM Integration & Chrome API',
    image: '/proj_ai_email.webp',
    imageCaption: 'Fig. II — The Automated Correspondence Engine, Patented'
  },
  {
    num: '03',
    title: 'Microservices Fitness Engine',
    desc: 'Decoupled fitness tracking and workout analytics microservices platform built with Java, Spring Boot, and RESTful inter-service communications.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'MongoDB'],
    link: 'https://github.com/joyson-git/MicroServices-fitness',
    category: 'Backend Microservices',
    badge: 'BACKEND ENGINE',
    highlight: 'Inter-service Communication & Analytics',
    image: '/proj_fitness.webp',
    imageCaption: 'Fig. III — The Iron Leviathan Hydraulic Dynamometer, 1891'
  },
  {
    num: '04',
    title: 'DPDZero DataOps Metrics Dashboard',
    desc: 'Hackathon project featuring an intelligent DataOps agent & real-time analytics dashboard built using Python, Pandas, and scikit-learn for automated data insights.',
    tech: ['Python', 'Pandas', 'scikit-learn', 'DataOps', 'Analytics'],
    link: 'https://github.com/joyson-git/DPDzero-DataOps-Agent-Metrics-Dashboard-Hackathon-Project',
    category: 'Hackathon & Data Science',
    badge: 'HACKATHON WINNER',
    highlight: 'Automated DataOps Analytics Agent',
    image: '/proj_dataops.webp',
    imageCaption: 'Fig. IV — The Victorian Data Analyst at Work, Estd. 1893'
  },
  {
    num: '05',
    title: 'Leucine Full-Stack Smart Manufacturing',
    desc: 'Smart manufacturing full-stack application contributed during the Leucine Hackathon, focusing on automated workflow tracking and real-time process monitoring.',
    tech: ['Java', 'Spring Boot', 'Full Stack', 'Smart Manufacturing'],
    link: 'https://github.com/joyson-git/Leucine-Full-Stack-',
    category: 'Hackathon & Full Stack',
    badge: 'FULL STACK APP',
    highlight: 'Real-time Workflow Tracking System',
    image: '/proj_manufacturing.webp',
    imageCaption: 'Fig. V — Victorian Mfg. Co. Steam Assembly Line, 1892'
  },
  {
    num: '06',
    title: 'AI-Powered Documentation Agent',
    desc: 'Autonomous developer tool agent that analyzes, formats, and enriches codebase documentation and Markdown specifications using Python and LLMs.',
    tech: ['Python', 'AI Agent', 'LLM', 'Developer Tools'],
    link: 'https://github.com/joyson-git/I-Powered-Documentation-Improvement-Agent',
    category: 'AI & Developer Tools',
    badge: 'AI DEVELOPER TOOL',
    highlight: 'Autonomous Codebase Doc Analysis',
    image: '/proj_doc_agent.webp',
    imageCaption: 'Fig. VI — Automaton Scribe No. IV, Manuscripts 1888–92'
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = ['All', 'Backend & Microservices', 'AI & Tools', 'Hackathons']

  const filteredProjects = projects.filter(p => {
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Backend & Microservices' && (p.category.includes('Backend') || p.category.includes('Microservices'))) ||
      (activeFilter === 'AI & Tools' && (p.category.includes('AI') || p.category.includes('Extension') || p.category.includes('Tools'))) ||
      (activeFilter === 'Hackathons' && (p.category.includes('Hackathon') || p.category.includes('Data Science')))

    const query = searchQuery.toLowerCase()
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query))

    return matchesFilter && matchesSearch
  })

  return (
    <section className="np-page-section" id="projects" ref={ref}>
      <div className="np-broadsheet-wrapper">
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 3 · SPECIAL INVESTIGATIVE DISPATCHES</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', margin: '0.6rem 0 1rem' }}>
          <div>
            <h2 className="np-section-headline font-headline">
              MAJOR SOFTWARE BREAKTHROUGHS &amp; SYSTEMS
            </h2>
            <p className="np-section-deck font-serif">
              An exhaustive review of high-throughput microservices, AI-assisted agents, and full-stack enterprise applications built for mission-critical deployments.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {/* Live Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--np-ink)',
              background: 'var(--np-paper)',
              padding: '0.35rem 0.6rem',
              gap: '0.4rem',
            }}>
              <span style={{ fontSize: '0.8rem' }}>🔍</span>
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="font-mono"
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontFamily: 'var(--np-font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--np-ink)',
                  width: '180px'
                }}
              />
              {searchQuery && (
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--np-font-mono)', color: 'var(--np-ink)' }}
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className="font-mono"
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.68rem',
                    border: '1px solid var(--np-ink)',
                    background: activeFilter === cat ? 'var(--np-ink)' : 'var(--np-paper)',
                    color: activeFilter === cat ? 'var(--np-bg)' : 'var(--np-ink)',
                    cursor: 'pointer',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); setActiveFilter(cat) }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="np-rule-double" />


        {/* Projects Card Grid */}
        <motion.div className="projects-card-grid" layout>
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div
                className="projects-empty-state mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No projects found matching &quot;{searchQuery}&quot;
              </motion.div>
            ) : (
              filteredProjects.map((p, i) => (
                <motion.div
                  key={p.num}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard maxTilt={8}>
                    <div className="project-card">
                      <div className="project-card-top">
                        <span className="project-card-num mono">{p.num}</span>
                        <span className="project-card-badge mono">{p.badge}</span>
                      </div>

                      {p.image && (
                        <figure className="np-wire-figure" style={{ margin: '0.5rem 0 0.8rem', width: '100%' }}>
                          <img
                            src={p.image}
                            alt={p.title}
                            style={{
                              width: '100%',
                              height: '160px',
                              objectFit: 'cover',
                              display: 'block',
                              filter: 'sepia(0.35) grayscale(0.5) contrast(1.05)',
                              borderBottom: '1px solid var(--np-ink)',
                            }}
                          />
                          <figcaption style={{
                            fontFamily: 'var(--np-font-mono)',
                            fontSize: '0.6rem',
                            color: 'var(--np-ink)',
                            opacity: 0.75,
                            padding: '0.25rem 0 0',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            letterSpacing: '0.02em',
                          }}>{p.imageCaption}</figcaption>
                        </figure>
                      )}

                      <h3 className="project-card-title">{p.title}</h3>
                      <p className="project-card-desc">{p.desc}</p>

                      <div className="project-card-highlight mono">
                        <span className="highlight-dot" /> {p.highlight}
                      </div>

                      <div className="project-card-tech">
                        {p.tech.map(t => (
                          <span key={t} className="project-card-tag mono">{t}</span>
                        ))}
                      </div>

                      <div className="project-card-footer">
                        <button
                          className="project-card-inspect-btn mono"
                          onClick={() => setSelectedProject(p)}
                        >
                          Inspect 🔍
                        </button>
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            className="project-card-live-btn mono"
                            title="Live Deployment"
                          >
                            Live ⚡
                          </a>
                        )}
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card-github-btn mono"
                          title="GitHub Repository"
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
