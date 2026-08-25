import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { isMuted, toggleMute, playHover, playClick } from '../utils/soundEffects'

const links = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Experience', href: '#experience', num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Skills', href: '#skills', num: '04' },
  { label: 'Education', href: '#education', num: '05' },
  { label: 'Achievements', href: '#achievements', num: '06' },
  { label: 'Contact', href: '#contact', num: '07' },
]

export default function Nav({ onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [audioState, setAudioState] = useState(isMuted())
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)

      const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact']
      const scrollPos = window.scrollY + 200

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleAudioToggle = () => {
    const muted = toggleMute()
    setAudioState(muted)
    if (!muted) playClick()
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#ffffff',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          zIndex: 9999
        }}
      />

      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#hero" className="nav-logo" onMouseEnter={playHover} onClick={playClick}>
          JOYSON PINTO<span>.</span>
        </a>

        <nav className="nav-links">
          {links.map(l => {
            const isActive = activeSection === l.href.replace('#', '')
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                onMouseEnter={playHover}
                onClick={playClick}
              >

                {l.label}
              </a>
            )
          })}
        </nav>

        <div className="nav-actions">
          <a
            href="/Joyson_Pinto_Resume.pdf"
            download="Joyson_Pinto_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume-btn mono"
            onMouseEnter={playHover}
            onClick={playClick}
            title="Download Joyson Pinto's Resume (PDF)"
          >
            CV 📄
          </a>
          <a href="#contact" className="nav-cta" onMouseEnter={playHover} onClick={playClick}>Hire Me →</a>
        </div>

        <button className="nav-burger" onClick={() => { playClick(); setMenuOpen(v => !v) }} aria-label="menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}>
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mobile-link">
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/Joyson_Pinto_Resume.pdf"
              download="Joyson_Pinto_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mobile-link"
              style={{ color: '#ffffff', borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '1rem', paddingTop: '1rem' }}
            >
              <span>📄</span>Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
