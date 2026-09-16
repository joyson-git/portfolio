import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { playHover, playClick } from '../utils/soundEffects'

const NAV_LINKS = [
  { label: 'P1. Market Report', href: '#market-report', isPage1: true },
  { label: 'P2. Lead Story', href: '#hero' },
  { label: 'P3. Investigations', href: '#projects' },
  { label: 'P4. Chronicles', href: '#experience' },
  { label: 'P5. Commodities', href: '#skills' },
  { label: 'P6. Classifieds', href: '#contact' },
]

export default function Nav({ onOpenCmd, onOpenContact, onOpenPage1, edition = 'morning', onToggleEdition }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['hero', 'projects', 'experience', 'skills', 'contact']
      const pos = window.scrollY + 180
      for(let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if(el && el.offsetTop <= pos) { setActiveSection(ids[i]); break }
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Newspaper Ink Scroll Line */}
      <motion.div
        className="np-scroll-progress"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0, left: 0, width: '100%',
          height: '3px',
          background: 'var(--np-ink)',
          zIndex: 9999,
        }}
      />

      <header className={`np-running-header${scrolled ? ' np-running-header--scrolled' : ''}`}>
        <div className="np-running-header__inner">

          {/* Left: Newspaper brand & Edition badge */}
          <div className="np-running-header__left">
            <a href="#hero" className="np-running-header__logo font-masthead" onClick={playClick}>
              <span>GENZ Times</span>
            </a>
            <span className="np-running-header__edition-badge font-mono">
              {edition === 'morning' ? 'MORNING PRINT' : 'MIDNIGHT PRESS'}
            </span>
          </div>

          {/* Center: Broadsheet Page Index Links */}
          <nav className="np-running-header__nav" aria-label="Newspaper sections">
            {NAV_LINKS.map((link) => {
              if (link.isPage1) {
                return (
                  <button
                    key={link.label}
                    type="button"
                    className="np-running-header__link font-mono"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={playHover}
                    onClick={() => { playClick(); onOpenPage1?.() }}
                    title="Open Page 1 Special Report (Job Market 2022–2026)"
                  >
                    {link.label}
                  </button>
                )
              }
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`np-running-header__link font-mono${isActive ? ' active' : ''}`}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right: Edition Switcher and Resume PDF */}
          <div className="np-running-header__actions">
            <button
              type="button"
              className="np-toggle-edition-btn font-mono"
              onClick={() => { playClick(); onToggleEdition?.() }}
              aria-label={edition === 'morning' ? 'Switch to Midnight Edition' : 'Switch to Morning Broadsheet'}
              title="Switch between Morning Broadsheet and Midnight Press editions"
            >
              <span className="np-edition-label-full">
                {edition === 'morning' ? '🗞️ Midnight Edition' : '📰 Morning Broadsheet'}
              </span>
              <span className="np-edition-label-short" aria-hidden="true">
                {edition === 'morning' ? '🗞️ Edition' : '📰 Edition'}
              </span>
            </button>

            <a
              href="/Joyson_Pinto_FullStackDeveloper_Resume.pdf"
              download="Joyson_Pinto_FullStackDeveloper_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="np-stamp-btn np-stamp-btn--primary font-mono"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.68rem' }}
            >
              <span>PDF ↓</span>
            </a>
          </div>

        </div>
      </header>
    </>
  )
}

