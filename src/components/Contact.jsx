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
    if(form.botcheck) {
      setStatus('success')
      setForm({ name: '', email: '', message: '', botcheck: false })
      return
    }

    // 2. Rate-limiting check: Prevent spam submissions within 5 seconds
    const now = Date.now()
    if(now - lastSubmitTime.current < 5000) {
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

      if(data.success) {
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
    <section className="np-page-section" id="contact" ref={ref}>
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 6 · THE CLASSIFIEDS &amp; LETTERS TO THE EDITOR</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <h2 className="np-section-headline font-headline">
          CLASSIFIEDS &amp; LETTERS TO THE EDITOR
        </h2>
        <p className="np-section-deck font-serif">
          Direct wire transmission, official classified inquiries, and urgent correspondence with the engineering newsroom.
        </p>

        <hr className="np-rule-double" />

        <div className="np-classifieds-layout">
          {/* Left: The Classifieds Coupon Box */}
          <div className="np-classified-coupon">
            <span className="np-coupon-cutout-tag font-mono">✂ CUT OUT &amp; KEEP</span>

            <h3 className="font-headline" style={{ fontSize: '1.25rem', marginTop: '0.4rem', borderBottom: '2px solid var(--np-ink)', paddingBottom: '0.3rem', color: 'var(--np-ink)' }}>
              SITUATIONS WANTED &amp; NOTICES
            </h3>

            <p className="font-body" style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: '0.8rem 0', color: 'var(--np-ink-body)' }}>
              <strong>SOFTWARE ARCHITECT &amp; AUTOMATION SPECIALIST</strong> available for high-throughput enterprise engagements, distributed microservices, and end-to-end quality assurance. Ready for immediate deployment.
            </p>

            <div className="np-classified-ad-grid">
              {contactMethods.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="np-classified-ad"
                  style={{ textDecoration: 'none', display: 'block' }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>{item.icon}</span>
                    <h4 style={{ margin: 0 }}>{item.label}</h4>
                  </div>
                  <p style={{ marginTop: '0.4rem' }}>{item.val}</p>
                </a>
              ))}
            </div>

            <div style={{ marginTop: '1.2rem', padding: '0.6rem', border: '1px solid var(--np-border)', background: 'var(--np-paper)', fontSize: '0.72rem', fontFamily: 'var(--np-font-mono)' }}>
              <strong>HOME DELIVERY HOTLINE:</strong> (+91) 91486 17356<br />
              <strong>LOCATION BUREAU:</strong> Bangalore, Karnataka, India
            </div>
          </div>

          {/* Right: Telegram Dispatch Form */}
          <div className="np-telegram-box">
            <div className="np-telegram-header">
              <div>
                <h3 className="font-headline" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--np-ink)' }}>
                  LETTER TO THE EDITOR
                </h3>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--np-ink-muted)' }}>
                  DIRECT CORRESPONDENCE TO JOYSON PINTO
                </span>
              </div>
              <div className="np-telegram-stamp">
                EDITORIAL DESK<br />BANGALORE
              </div>
            </div>

            <form onSubmit={submit}>
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

              <div className="np-form-group">
                <label className="np-form-label">SENDER NAME / TITLE</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  required
                  className="np-input font-mono"
                  placeholder="Enter full name or newsroom title"
                />
              </div>

              <div className="np-form-group">
                <label className="np-form-label">RETURN WIRE / EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  required
                  className="np-input font-mono"
                  placeholder="name@company.com"
                />
              </div>

              <div className="np-form-group">
                <label className="np-form-label">YOUR LETTER / CORRESPONDENCE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  className="np-textarea font-mono"
                  placeholder="State your proposition, project specs, or engineering role..."
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="np-transmit-btn font-headline"
              >
                {status === 'sending'
                  ? 'DELIVERING LETTER...'
                  : status === 'success'
                    ? '✓ LETTER DELIVERED TO EDITOR'
                    : 'SEND LETTER ➔'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

