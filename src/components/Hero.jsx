import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Avatar3D from './Avatar3D'

const ROLES = ['Full Stack Developer', 'Spring Boot Engineer', 'E2E Automation Expert', 'AI Integration Builder']

function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = ROLES[idx]
    const speed = del ? 40 : 90
    const timeout = setTimeout(() => {
      if(!del) {
        setTxt(word.slice(0, txt.length + 1))
        if(txt.length + 1 === word.length) setTimeout(() => setDel(true), 1800)
      } else {
        setTxt(word.slice(0, txt.length - 1))
        if(txt.length === 0) { setDel(false); setIdx(i => (i + 1) % ROLES.length) }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [txt, del, idx])

  return (
    <span className="hero-typewriter">
      {txt}<span className="hero-cursor">|</span>
    </span>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }
})

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <motion.div className="hero-eyebrow" {...fadeUp(0.1)}>
          <span className="hero-status-pill mono">
            <span className="dot pulse" /> AVAILABLE FOR FULL-TIME, REMOTE &amp; FREELANCE
          </span>
          <span className="hero-location mono">BANGALORE, INDIA</span>
        </motion.div>

        <div className="hero-title-wrap">
          <motion.h1 className="hero-title" {...fadeUp(0.2)}>
            JOYSON<br />PINTO<span className="hero-period">.</span>
          </motion.h1>
        </div>

        <motion.div className="hero-role" {...fadeUp(0.35)}>
          <span className="hero-role-prefix mono">&gt; ROLE:</span>
          <Typewriter />
        </motion.div>

        <motion.p className="hero-lede" {...fadeUp(0.45)}>
          Building scalable web apps &amp; microservices with{' '}
          <em>Spring Boot, Node.js </em>.
        </motion.p>

        <motion.div className="hero-offer-badge mono" {...fadeUp(0.5)}>
          <span className="offer-tag">⚡ OPEN TO WORK</span>
          <span>Freelance &amp; Remote Work — Free for the first few months.</span>
        </motion.div>

        <motion.div className="hero-actions" {...fadeUp(0.55)}>
          <MagButton href="#projects" primary>Explore Work</MagButton>
          <MagButton href="#contact">Start a Project</MagButton>
          <MagButton
            href="/Joyson_Pinto_Resume.pdf"
            download="Joyson_Pinto_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            arrow="↓"
          >
            Resume PDF
          </MagButton>
        </motion.div>

        <motion.div className="hero-social" {...fadeUp(0.65)}>
          {[
            {
              label: 'GitHub',
              href: 'https://github.com/joyson-git',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              ),
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/joyson-pinto/',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ),
            },
            {
              label: 'Email',
              href: 'mailto:joysonpinto77@gmail.com',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
            },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="hero-social-icon">{s.icon}</span>
              <span>{s.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div className="hero-right"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
        <Avatar3D />
      </motion.div>
    </section>
  )
}

function MagButton({ children, href, primary, download, target, rel, arrow = '→' }) {
  const ref = useRef(null)
  const x = useRef(0); const y = useRef(0)

  const handleMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.current = e.clientX - r.left - r.width / 2
    y.current = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${x.current * 0.25}px, ${y.current * 0.25}px)`
  }
  const handleLeave = () => { ref.current.style.transform = '' }

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={`mag-btn ${primary ? 'mag-btn--primary' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="mag-btn-fill" />
      <span className="mag-btn-label">{children}</span>
      <span className="mag-btn-arrow">{arrow}</span>
    </a>
  )
}
