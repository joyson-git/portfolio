import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'
import ProjectModal from './ProjectModal'
import { playHover, playClick } from '../utils/soundEffects'

const flagshipProject = {
  num: '01',
  title: 'Gully Store',
  subtitle: 'E-Commerce Spring Boot Microservices',
  desc: 'Enterprise e-commerce platform with 12 Spring Boot microservices behind a Spring Cloud API Gateway, Netflix Eureka discovery, MongoDB-per-service data ownership, and a glassmorphic SPA frontend.',
  tech: [
    'Java 21',
    'Spring Boot 3.2',
    'Spring Cloud Gateway',
    'Netflix Eureka',
    'Spring Security',
    'JWT / RBAC',
    'MongoDB',
    'RestTemplate (lb)',
    'Apache Kafka',
    'ZooKeeper',
    'Docker Compose',
    'Jenkins CI/CD',
    'Nginx',
    'HTML / CSS / JS',
  ],
  link: 'https://github.com/joyson-git/Ecommer-Spring-boot-backend',
  live: 'http://129.225.81.252/',
  category: 'Flagship · Backend & Microservices',
  badge: 'FLAGSHIP BUILD',
  status: 'IN PROGRESS',
  highlight: '12 services · Gateway JWT RBAC · Docker + Jenkins deploy',
  image: '/proj_microservices.webp',
  imageCaption: 'Fig. I — The Distributed Services Architecture, Anno 1893',
  services: [
    'Eureka',
    'API Gateway',
    'Auth',
    'Product',
    'Category',
    'Cart',
    'Order',
    'Payment',
    'Search',
    'Notification',
    'Inventory',
    'Delivery',
  ],
  points: [
    '12-module Maven monorepo of Spring Boot 3 / Spring Cloud services on Java 21.',
    'Eureka discovery + API Gateway with JWT validation and RBAC (CUSTOMER, STORE_ADMIN, ADMIN, DELIVERY_PARTNER).',
    'MongoDB-per-service data ownership for Auth, Catalog, Cart, Order, Payment, Inventory, and Delivery.',
    'Load-balanced RestTemplate calls: Cart → Product, Search → Product, Order → Cart / Product / Payment.',
    'Kafka + ZooKeeper wired for OrderPlacedEvent → Notification (producer path still being completed).',
    'Docker Compose + Jenkins CI/CD deploys MongoDB, Kafka, Eureka, Gateway, services, and Nginx frontend.',
  ],
}

const projects = [
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

        <div className="np-folio-header font-mono">
          <span>PAGE 3 · SPECIAL INVESTIGATIVE DISPATCHES</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        {/* ── FLAGSHIP / IN-PROGRESS FEATURE ── */}
        <motion.article
          className="np-flagship"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="np-flagship__masthead font-mono">
            <span>EXTRA · FLAGSHIP SYSTEM</span>
            <span className="np-flagship__status">{flagshipProject.status}</span>
          </div>

          <div className="np-flagship__hero">
            <div className="np-flagship__intro">
              <p className="np-flagship__kicker font-mono">{flagshipProject.category}</p>
              <h2 className="np-flagship__title font-headline">{flagshipProject.title}</h2>
              {flagshipProject.subtitle && (
                <p className="np-flagship__subtitle font-serif">{flagshipProject.subtitle}</p>
              )}
              <p className="np-flagship__deck font-serif">{flagshipProject.desc}</p>
              <div className="np-flagship__highlight font-mono">
                <span className="highlight-dot" /> {flagshipProject.highlight}
              </div>
              <div className="np-flagship__actions">
                <button
                  className="project-card-inspect-btn mono"
                  onClick={() => { playClick(); setSelectedProject(flagshipProject) }}
                  onMouseEnter={playHover}
                >
                  Inspect 🔍
                </button>
                {flagshipProject.live && (
                  <a
                    href={flagshipProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-live-btn mono"
                    title="Live Deployment"
                  >
                    Live ⚡
                  </a>
                )}
                <a
                  href={flagshipProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card-github-btn mono"
                  title="GitHub Repository"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <figure className="np-flagship__figure">
              <img
                src={flagshipProject.image}
                alt={flagshipProject.title}
              />
              <figcaption className="font-mono">{flagshipProject.imageCaption}</figcaption>
            </figure>
          </div>

          <div className="np-flagship__body">
            <p className="np-flagship__services-label font-mono">Engineering notes</p>
            <ul className="np-flagship__points">
              {flagshipProject.points.map(point => (
                <li key={point} className="font-body">{point}</li>
              ))}
            </ul>

            <div className="np-flagship__meta">
              <div className="np-flagship__meta-block">
                <p className="np-flagship__services-label font-mono">Service map</p>
                <div className="np-flagship__service-row">
                  {flagshipProject.services.map(s => (
                    <span key={s} className="np-flagship__service font-mono">{s}</span>
                  ))}
                </div>
              </div>

              <div className="np-flagship__meta-block">
                <p className="np-flagship__services-label font-mono">Technology</p>
                <div className="np-flagship__service-row">
                  {flagshipProject.tech.map(t => (
                    <span key={t} className="np-flagship__tech font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <hr className="np-rule-double" />

        {/* ── OTHER PROJECTS ARCHIVE ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', margin: '0.6rem 0 1rem' }}>
          <div>
            <h2 className="np-section-headline font-headline">
              FIELD ARCHIVE &amp; OTHER DISPATCHES
            </h2>
            <p className="np-section-deck font-serif">
              Companion builds across AI agents, hackathon systems, and supporting microservices — kept separate from the flagship e-commerce platform.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
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
