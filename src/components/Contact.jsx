import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { playHover, playClick } from '../utils/soundEffects'

const contactMethods = [
  {
    label: 'EMAIL',
    val: 'joysonpinto77@gmail.com',
    href: 'mailto:joysonpinto77@gmail.com',
    icon: '✉️',
  },
  {
    label: 'PHONE',
    val: '+91 9148617356',
    href: 'tel:+919148617356',
    icon: '📞',
  },
  {
    label: 'GITHUB',
    val: 'github.com/joyson-git',
    href: 'https://github.com/joyson-git',
    icon: '📦',
  },
  {
    label: 'LINKEDIN',
    val: 'linkedin.com/in/joyson-pinto',
    href: 'https://www.linkedin.com/in/joyson-pinto/',
    icon: '💼',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', message: '', botcheck: false })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const lastSubmitTime = useRef(0)

  const handle = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async e => {
    e.preventDefault()

    // 1. Honeypot check: If automated bot checked hidden field, drop silently
    if (form.botcheck) {
      setStatus('success')
      setForm({ name: '', email: '', message: '', botcheck: false })
      return
    }

    // 2. Rate-limiting check: Prevent spam submissions within 5 seconds
    const now = Date.now()
    if (now - lastSubmitTime.current < 5000) {
      return
    }
    lastSubmitTime.current = now

    playClick()
    setStatus('sending')

    // 3. Sanitize inputs
    const cleanName = form.name.trim().slice(0, 100)
    const cleanEmail = form.email.trim().slice(0, 150)
    const cleanMessage = form.message.trim().slice(0, 5000)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '5790f33f-ddca-4d8c-9220-e3b6762b28ec',
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          subject: `New Portfolio Message from ${cleanName}`,
          from_name: cleanName,
          botcheck: false,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '', botcheck: false })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        // Fallback: Open mailto if API returned error
        window.location.href = `mailto:joysonpinto77@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(cleanName)}&body=${encodeURIComponent(cleanMessage)}`
        setStatus('success')
        setForm({ name: '', email: '', message: '', botcheck: false })
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      // Fallback: Open mailto if network is offline
      window.location.href = `mailto:joysonpinto77@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(cleanName)}&body=${encodeURIComponent(cleanMessage)}`
      setStatus('success')
      setForm({ name: '', email: '', message: '', botcheck: false })
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="contact section" id="contact" ref={ref}>
      <motion.h2
        className="section-title contact-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="scs-gradient-text">Let&apos;s build something together.</span>
      </motion.h2>

      <div className="contact-grid">
        {/* Left Column: Direct Links */}
        <motion.div
          className="contact-info-col"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="contact-tagline">
            Open to full-time, remote &amp; freelance work — free for the first few months.
          </p>

          <div className="contact-rows-list">
            {contactMethods.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="contact-row"
                onMouseEnter={playHover}
                onClick={playClick}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-row-left">
                  <span className="contact-label mono">{item.label}</span>
                  <span className="contact-val">{item.val}</span>
                </div>
                <span className="contact-arrow mono">↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Message Form */}
        <motion.div
          className="contact-form-col"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className="contact-form" onSubmit={submit}>
            {/* Honeypot Spam Bot Trap */}
            <input
              type="checkbox"
              name="botcheck"
              style={{ display: 'none' }}
              checked={form.botcheck}
              onChange={handle}
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="form-field">
              <label className="form-label mono">YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handle}
                required
                className="form-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-field">
              <label className="form-label mono">YOUR EMAIL</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handle}
                required
                className="form-input"
                placeholder="name@company.com"
              />
            </div>

            <div className="form-field">
              <label className="form-label mono">MESSAGE</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                required
                className="form-input form-textarea"
                placeholder="Tell me about your project, role, or idea..."
                rows={5}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="form-submit"
              whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.99 }}
            >
              {status === 'sending'
                ? 'Sending Message...'
                : status === 'success'
                ? '✓ Message Sent!'
                : 'Send Message →'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
