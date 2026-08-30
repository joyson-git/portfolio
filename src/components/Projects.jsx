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
    highlight: 'Decoupled Eureka Gateway & JWT Auth'
  },
  {
    num: '02',
    title: 'AI-Powered Email Auto-Reply Generator',
    desc: 'Chrome extension integrated with Gemini AI & Spring Boot REST API to automatically generate contextual email replies in under 10 seconds, helping users respond 3x faster.',
    tech: ['Java', 'Spring Boot', 'Gemini AI', 'Chrome Extension', 'REST APIs'],
    link: 'https://github.com/joyson-git/Email-auto-reply',
    category: 'AI & Browser Extension',
    badge: 'AI EXTENSION',
    highlight: 'Gemini LLM Integration & Chrome API'
  },
  {
    num: '03',
    title: 'Microservices Fitness Engine',
    desc: 'Decoupled fitness tracking and workout analytics microservices platform built with Java, Spring Boot, and RESTful inter-service communications.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'MongoDB'],
    link: 'https://github.com/joyson-git/MicroServices-fitness',
    category: 'Backend Microservices',
    badge: 'BACKEND ENGINE',
    highlight: 'Inter-service Communication & Analytics'
  },
  {
    num: '04',
    title: 'DPDZero DataOps Metrics Dashboard',
    desc: 'Hackathon project featuring an intelligent DataOps agent & real-time analytics dashboard built using Python, Pandas, and scikit-learn for automated data insights.',
    tech: ['Python', 'Pandas', 'scikit-learn', 'DataOps', 'Analytics'],
    link: 'https://github.com/joyson-git/DPDzero-DataOps-Agent-Metrics-Dashboard-Hackathon-Project',
    category: 'Hackathon & Data Science',
    badge: 'HACKATHON WINNER',
    highlight: 'Automated DataOps Analytics Agent'
  },
  {
    num: '05',
    title: 'Leucine Full-Stack Smart Manufacturing',
    desc: 'Smart manufacturing full-stack application contributed during the Leucine Hackathon, focusing on automated workflow tracking and real-time process monitoring.',
    tech: ['Java', 'Spring Boot', 'Full Stack', 'Smart Manufacturing'],
    link: 'https://github.com/joyson-git/Leucine-Full-Stack-',
    category: 'Hackathon & Full Stack',
    badge: 'FULL STACK APP',
    highlight: 'Real-time Workflow Tracking System'
  },
  {
    num: '06',
    title: 'AI-Powered Documentation Agent',
    desc: 'Autonomous developer tool agent that analyzes, formats, and enriches codebase documentation and Markdown specifications using Python and LLMs.',
    tech: ['Python', 'AI Agent', 'LLM', 'Developer Tools'],
    link: 'https://github.com/joyson-git/I-Powered-Documentation-Improvement-Agent',
    category: 'AI & Developer Tools',
    badge: 'AI DEVELOPER TOOL',
    highlight: 'Autonomous Codebase Doc Analysis'
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
    <section className="projects section" id="projects" ref={ref}>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="projects-header">
        <div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="scs-gradient-text">Featured Projects.</span>
          </motion.h2>
          <p className="projects-subtitle">Explore microservices, AI integrations, and full-stack software systems.</p>
        </div>

        <div className="projects-controls">
          {/* Live Search Bar */}
          <div className="proj-search-wrap">
            <span className="proj-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tech, title, keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="proj-search-input mono"
            />
            {searchQuery && (
              <button className="proj-search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="proj-filter-tabs mono">
            {categories.map(cat => (
              <button
                key={cat}
                className={`proj-filter-tab ${activeFilter === cat ? 'proj-filter-tab--active' : ''}`}
                onMouseEnter={playHover}
                onClick={() => { playClick(); setActiveFilter(cat) }}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div className="proj-filter-indicator" layoutId="filterIndicator" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

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
    </section>
  )
}
