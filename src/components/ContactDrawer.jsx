import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick } from '../utils/soundEffects'

const WEB3FORMS_KEY = '5790f33f-ddca-4d8c-9220-e3b6762b28ec'

const SCOPE_OPTIONS = [
  'Full-Stack Web Application',
  'Microservices / Backend API',
  'E2E Test Automation',
  'AI Agent / LLM Integration',
  'Consulting / Code Review',
  'Other',
]

export default function ContactDrawer({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', scope: '', message: '', botcheck: false })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const lastSubmit = useRef(0)

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (form.botcheck) { setStatus('success'); return }
    if (Date.now() - lastSubmit.current < 5000) return
    lastSubmit.current = Date.now()
    playClick()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name.trim().slice(0, 100),
          email: form.email.trim().slice(0, 150),
          message: `[${form.scope}]\n\n${form.message.trim().slice(0, 5000)}`,
          subject: `Portfolio Inquiry from ${form.name.trim()}`,
          from_name: form.name.trim(),
          botcheck: false,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', scope: '', message: '', botcheck: false })
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setStatus('idle'), 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="scs-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
          />

          {/* Drawer panel */}
          <motion.aside
            className="scs-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="scs-drawer__header">
              <div>
                <p className="scs-mono scs-drawer__eyebrow">START A PROJECT</p>
                <h2 className="scs-dis2 scs-drawer__title">Let&rsquo;s Build<br />Something.</h2>
              </div>
              <button className="scs-drawer__close" onClick={handleClose} aria-label="Close drawer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            {status === 'success' ? (
              <motion.div
                className="scs-drawer__success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="scs-drawer__success-icon">✓</div>
                <h3 className="scs-h2">Message Sent.</h3>
                <p>Thanks for reaching out — I&rsquo;ll get back to you within 24 hours.</p>
                <button className="scs-btn scs-btn--ghost" onClick={handleClose}>
                  <span className="scs-btn__label">Close</span>
                  <span className="scs-btn__circle" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            ) : (
              <form className="scs-drawer__form" onSubmit={submit} noValidate>
                {/* Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={form.botcheck}
                  onChange={handle}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <div className="scs-field">
                  <label className="scs-field__label scs-mono" htmlFor="drawer-name">Name</label>
                  <input
                    id="drawer-name"
                    className="scs-field__input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="scs-field">
                  <label className="scs-field__label scs-mono" htmlFor="drawer-email">Email</label>
                  <input
                    id="drawer-email"
                    className="scs-field__input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="scs-field">
                  <label className="scs-field__label scs-mono" htmlFor="drawer-scope">Project Scope</label>
                  <select
                    id="drawer-scope"
                    className="scs-field__input scs-field__select"
                    name="scope"
                    value={form.scope}
                    onChange={handle}
                  >
                    <option value="">Select a scope…</option>
                    {SCOPE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="scs-field">
                  <label className="scs-field__label scs-mono" htmlFor="drawer-msg">Message</label>
                  <textarea
                    id="drawer-msg"
                    className="scs-field__input scs-field__textarea"
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Describe your project or what you're looking for…"
                    rows={5}
                    required
                  />
                </div>

                {status === 'error' && (
                  <p className="scs-drawer__error scs-mono">Send failed — please try again.</p>
                )}

                <button
                  className="scs-btn scs-btn--primary scs-btn--full"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  <span className="scs-btn__label">{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  <span className="scs-btn__circle" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
