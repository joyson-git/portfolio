import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

import Loader from './components/Loader'
import Cursor from './components/Cursor'
import MagicParticleCanvas from './components/MagicParticleCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import ContactDrawer from './components/ContactDrawer'
import CommandPalette from './components/CommandPalette'
import AIVoiceAgent from './components/AIVoiceAgent'

import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showPage1, setShowPage1] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [newspaperEdition, setNewspaperEdition] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('newspaper_edition') || 'morning'
    }
    return 'morning'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-newspaper-edition', newspaperEdition)
    try {
      localStorage.setItem('newspaper_edition', newspaperEdition)
    } catch {}
  }, [newspaperEdition])

  const toggleEdition = () => {
    setNewspaperEdition(e => (e === 'morning' ? 'late' : 'morning'))
  }

  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  )

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const checkScroll = () => setShowTopBtn(window.scrollY > 400)
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loaded])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <Cursor />
      <MagicParticleCanvas />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Slide-in contact drawer */}
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <AnimatePresence mode="wait">
        {(!loaded || showPage1) && (
          <Loader
            key={showPage1 ? 'page1-manual' : 'loader-initial'}
            autoAdvance={!showPage1}
            onDone={() => {
              setLoaded(true)
              setShowPage1(false)
            }}
          />
        )}
      </AnimatePresence>

      <Nav
            onOpenCmd={() => setCmdOpen(true)}
            onOpenContact={() => setContactOpen(true)}
            onOpenPage1={() => setShowPage1(true)}
            edition={newspaperEdition}
            onToggleEdition={toggleEdition}
          />

          <main>
            {/* Front Page and inner newspaper pages */}
            <Hero onOpenContact={() => setContactOpen(true)} />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Achievements />
            <Contact />
          </main>

          {/* Floating Back-to-Top styled as newspaper folio */}
          <AnimatePresence>
            {showTopBtn && (
              <button
                className="scroll-to-top-btn font-mono"
                onClick={scrollToTop}
                title="Return to Page 1 Top"
              >
                ↑ PAGE 1
              </button>
            )}
          </AnimatePresence>

          <AIVoiceAgent />

          {isOffline && (
            <div className="offline-banner font-mono">
              <span className="dot pulse" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
              <span>GENZ TIMES WIRE: OFFLINE DISPATCH ACTIVE · RUNNING FROM CACHE</span>
            </div>
          )}

          <footer className="np-imprint-footer font-mono">
            <div>PRINTED &amp; PUBLISHED BY JOYSON PINTO · BANGALORE PRESS HOUSE, KARNATAKA, INDIA</div>
            <div style={{ marginTop: '0.4rem', opacity: 0.7 }}>
              GENZ TIMES &amp; PINTO CHRONICLE · FOUNDED 1890 · LATE CITY EDITION · ALL RIGHTS RESERVED © 1890–{new Date().getFullYear()}
            </div>
          </footer>
    </>
  )
}
