import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { playHover, playClick } from '../utils/soundEffects'
import { downloadResumePDF } from '../utils/downloadResume'

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ onOpenCmd, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['projects', 'experience', 'skills', 'contact']
      const pos = window.scrollY + 160
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop <= pos) { setActiveSection(ids[i]); break }
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--scs-light-orange), var(--scs-dark-teal))',
          zIndex: 9999,
        }}
      />

      <motion.header
        className={`scs-header${scrolled ? ' scs-header--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Progressive blur layers */}
        <div className="scs-header__blur-l1" />
        <div className="scs-header__blur-l2" />
        <div className="scs-header__blur-l3" />
        <div className="scs-header__blur-l4" />

        {/* Logo */}
        <a href="#hero" className="scs-header__logo" onMouseEnter={playHover} onClick={playClick} aria-label="Home">
          {/* Geometric monogram SVG */}
          <svg className="scs-header__monogram" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 24L14 4L24 24" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M8 17h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="11" y="20" width="6" height="4" fill="white" opacity="0.7" />
          </svg>
          <span className="scs-header__logo-text scs-mono">JOYSON PINTO</span>
        </a>

        {/* Center pill nav */}
        <nav className="scs-header__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link, i) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <span key={link.href} className="scs-header__nav-item">
                {i > 0 && <span className="scs-header__nav-sep" aria-hidden="true">/</span>}
                <a
                  href={link.href}
                  className={`scs-header__nav-link scs-mono${isActive ? ' scs-header__nav-link--active' : ''}`}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  {link.label}
                </a>
              </span>
            )
          })}
        </nav>

          {/* Right actions */}
        <div className="scs-header__actions">
          <a
            href="/Joyson_Pinto_FullStackDeveloper_Resume.pdf"
            download="Joyson_Pinto_FullStackDeveloper_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="scs-header__cv scs-mono"
            title="Download Joyson Pinto Resume (PDF)"
          >
            CV <span style={{ opacity: 0.6 }}>↓</span>
          </a>

          <button
            className="scs-btn scs-btn--primary"
            onClick={() => { playClick(); onOpenContact() }}
          >
            <span className="scs-btn__label">Work With Us</span>
            <span className="scs-btn__circle" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Mobile burger */}
          <button
            className="scs-header__burger"
            onClick={() => { playClick(); setMenuOpen((v) => !v) }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </motion.header>

      {/* Mobile slide menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="scs-mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="scs-mobile-menu__link scs-dis2"
                onClick={() => setMenuOpen(false)}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              className="scs-btn scs-btn--primary"
              onClick={() => { setMenuOpen(false); onOpenContact() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2rem', alignSelf: 'flex-start' }}
            >
              <span className="scs-btn__label">Start a Project</span>
              <span className="scs-btn__circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
