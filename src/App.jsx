import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import MagicParticleCanvas from './components/MagicParticleCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import AIVoiceAgent from './components/AIVoiceAgent'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)

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
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400)
    }
    window.addEventListener('scroll', checkScroll)
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Cursor />
      <MagicParticleCanvas />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Nav onOpenCmd={() => setCmdOpen(true)} />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Achievements />
            <Contact />
          </main>
          
          {/* Floating Back-to-Top Button */}
          <AnimatePresence>
            {showTopBtn && (
              <button
                className="scroll-to-top-btn mono"
                onClick={scrollToTop}
                title="Back to Top"
              >
                ↑ TOP
              </button>
            )}
          </AnimatePresence>

          <AIVoiceAgent />
          
          {isOffline && (
            <div className="offline-banner mono">
              <span className="dot pulse" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
              <span>OFFLINE MODE ACTIVE · RUNNING FROM CACHE</span>
            </div>
          )}

          <footer className="footer">
            <span className="mono">© 2025 Joyson Pinto. Bangalore, India.</span>
          </footer>
        </>
      )}
    </>
  )
}
