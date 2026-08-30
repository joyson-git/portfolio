import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { downloadResumePDF } from '../utils/downloadResume'

const COMMANDS = [
  { id: 'hero', label: 'Go to Top / Hero', category: 'Navigation', action: () => scrollTo('hero') },
  { id: 'projects', label: 'Featured Projects', category: 'Navigation', action: () => scrollTo('projects') },
  { id: 'experience', label: 'Experience & Career', category: 'Navigation', action: () => scrollTo('experience') },
  { id: 'skills', label: 'Tech Stack & Skills', category: 'Navigation', action: () => scrollTo('skills') },
  { id: 'education', label: 'Education & Degrees', category: 'Navigation', action: () => scrollTo('education') },
  { id: 'achievements', label: 'Key Achievements', category: 'Navigation', action: () => scrollTo('achievements') },
  { id: 'contact', label: 'Get in Touch / Contact', category: 'Navigation', action: () => scrollTo('contact') },
  { id: 'copy-email', label: 'Copy Email to Clipboard (joysonpinto77@gmail.com)', category: 'Action', action: () => { navigator.clipboard?.writeText('joysonpinto77@gmail.com'); } },
  { id: 'github', label: 'Open GitHub Profile', category: 'Socials', action: () => window.open('https://github.com/joyson-git', '_blank') },
  { id: 'resume', label: 'Download Resume (PDF)', category: 'Action', action: () => downloadResumePDF() },
  { id: 'email', label: 'Send Email Directly', category: 'Action', action: () => window.open('mailto:joysonpinto77@gmail.com') },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filtered = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const handleKeyDownMenu = (e) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(prev => (prev + 1) % Math.max(1, filtered.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault()
      filtered[selectedIdx].action()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={onClose}>
          <motion.div
            className="cmd-palette"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cmd-header">
              <span className="cmd-icon mono">&gt;_</span>
              <input
                type="text"
                autoFocus
                placeholder="Type a command or section name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDownMenu}
                className="cmd-input"
              />
              <span className="cmd-shortcut mono">ESC</span>
            </div>

            <div className="cmd-list">
              {filtered.length === 0 ? (
                <div className="cmd-empty mono">No commands found matching "{query}"</div>
              ) : (
                filtered.map((cmd, i) => (
                  <div
                    key={cmd.id}
                    className={`cmd-item ${i === selectedIdx ? 'cmd-item--selected' : ''}`}
                    onClick={() => {
                      cmd.action()
                      onClose()
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <span className="cmd-item-label">{cmd.label}</span>
                    <span className="cmd-item-cat mono">{cmd.category}</span>
                  </div>
                ))
              )}
            </div>
            <div className="cmd-footer mono">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
