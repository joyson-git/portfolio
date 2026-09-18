import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Avatar3D from './Avatar3D'

export default function Hero({ onOpenContact }) {
  const [bangaloreTime, setBangaloreTime] = useState('')
  const [currentDateStr, setCurrentDateStr] = useState('')
  const [showDebugAnswer, setShowDebugAnswer] = useState(false)

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date()
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now)
        setBangaloreTime(timeStr)

        const dateStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }).format(now)
        setCurrentDateStr(dateStr.toUpperCase())
      } catch {
        // Fallback
        setCurrentDateStr('MONDAY, SEPTEMBER 14')
      }
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="np-frontpage" id="hero">
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono" style={{ marginBottom: '0.6rem' }}>
          <span>PAGE 2 · LEAD STORY &amp; BUILDER'S CHRONICLE</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        {/* ── TOP EARS & MASTHEAD ROW (As in The Daily Telegraph) ── */}
        <div className="np-ears-row">

          {/* Left Ear: Bangalore Wire & Contact */}
          <div className="np-ear-box">
            <div className="np-ear-box__header font-headline"> OPEN TO HIRE</div>
            <div className="np-ear-box__content">
              <div style={{
                width: 44,
                height: 44,
                border: '1px solid var(--np-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                background: 'var(--np-paper)',
                flexShrink: 0
              }}>
                ☎
              </div>
              
              <div className="np-ear-box__text font-mono">
                <strong style={{ fontSize: '0.74rem', display: 'block', letterSpacing: '0.02em', color: 'var(--np-ink)' }}>
                  PHONE: +91 91486 17356
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: 'var(--np-ink-body)', fontWeight: 600 }}>
                  BANGALORE, {currentDateStr || 'MONDAY, SEPTEMBER 14'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.62rem', color: 'var(--np-ink-muted)' }}>
                  {bangaloreTime ? `[ ${bangaloreTime} IST ] · ` : ''}LATE CITY EDITION
                </p>
              </div>
            </div>
          </div>

          {/* Center Masthead: GENZ Times & Chronicle */}
          <div className="np-masthead-center">
            <div className="np-masthead-main-title font-masthead">
              GENZ Times
            </div>
            <div className="np-masthead-subtitle font-mono">
              EST. 1890 · &amp; THE PINTO CHRONICLE · INDEPENDENT FULL-STACK JOURNAL
            </div>
          </div>

          {/* Right Ear: Breaking News Vignette */}
          <div className="np-ear-box">
            <div className="np-ear-box__header font-headline">SYSTEM DISPATCH</div>
            <div className="np-ear-box__content">
              <div style={{
                width: 44,
                height: 44,
                border: '1px solid var(--np-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                background: 'var(--np-paper)',
                flexShrink: 0
              }}>
                ⚡
              </div>
              <div className="np-ear-box__text">
                <strong>99.99% UPTIME ACHIEVED</strong>
                <p style={{ margin: 0, fontSize: '0.7rem' }}>
                  Microservices unite with automated E2E test suites for zero downtime.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── DATELINE BAR WITH DOUBLE RULES ── */}
        <hr className="np-rule-double" />
        <div className="np-dateline-bar font-mono">
          <span>VOL. I NO. 142 · PAGE 2</span>
          <span>ESTABLISHED 1890 · LATE CITY EDITION</span>
          <span>SPECIAL DISPATCH · WORLDWIDE CIRCULATION</span>
          <span>PRICE: TWO PENCE · OPEN TO HIRE</span>
        </div>
        <hr className="np-rule-double" />

        {/* ── GIANT SCREAMING LEAD HEADLINE (SYDNEY'S TOP PAPERS UNITE STYLE) ── */}
        <motion.h1
          className="np-screaming-headline font-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           ZERO TO ONE · RESTLESSLY BUILDING SCALED SOFTWARE
        </motion.h1>

        {/* ── 1890 TELEGRAPH WIRE DISPATCH BULLETIN ── */}
        <div className="np-1890-wire-bar font-mono"> <span className="np-1890-badge">1890 TELEGRAPH WIRE</span> <span className="np-1890-text"> <strong>ENGINEERING DISPATCH:</strong> “From telegraphs to AI — technology evolves, but deep engineering endures.” </span> <span className="np-1890-tag">DISPATCH № 1890</span> </div>

        <hr className="np-rule-single" />

        {/* ── 3-COLUMN BROADSHEET EDITORIAL GRID ── */}
        <div className="np-broadsheet-grid">

          {/* ── COLUMN 1: Lead Dispatch ── */}
          <div className="np-col">
            <h3 className="np-article-headline font-serif">
              Turning ideas into reliable software
            </h3>
            <div className="np-byline font-mono">
              JOYSON PINTO · FULL-STACK DEVELOPER
            </div>
            <div className="np-article-body np-dropcap">
              Joyson creates modern web applications, scalable backend systems, and automated testing solutions. His work combines clean code, strong performance, and dependable user experiences.
            </div>

            <div className="np-subhead font-serif">From Code to Impact</div>
            <div className="np-article-body">
              With experience in Java, Spring Boot, Angular, Node.js, AI tools, and test automation, he turns complex requirements into practical software that delivers measurable results.
            </div>

            <div className="np-wire-bulletin" style={{ width: '100%', marginTop: '1rem' }}>
              <div className="np-wire-bulletin-tag">THE DAILY DEBUG · READER CHALLENGE</div>
              <p className="np-article-body" style={{ margin: '0 0 0.55rem', textAlign: 'left' }}>
                Find the bug: Why does this print <strong>undefined</strong>?
              </p>
              <pre style={{
                margin: '0 0 0.65rem',
                padding: '0.65rem',
                overflowX: 'auto',
                border: '1px solid var(--np-ink)',
                background: 'var(--np-paper)',
                fontFamily: 'var(--np-font-mono)',
                fontSize: '0.72rem',
                lineHeight: '1.45',
                textAlign: 'left'
              }}>
{`const users = [{ name: 'Joyson', active: true }]
const active = users.filter(user => user.active)
console.log(active.name)`}
              </pre>
              <button
                type="button"
                className="np-stamp-btn font-mono"
                aria-expanded={showDebugAnswer}
                onClick={() => setShowDebugAnswer(answer => !answer)}
              >
                <span>{showDebugAnswer ? 'Hide Answer ↑' : 'Reveal Answer ↓'}</span>
              </button>
              {showDebugAnswer && (
                <p className="np-article-body" style={{ margin: '0.65rem 0 0', textAlign: 'left' }}>
                  <strong>Answer:</strong> <code>filter()</code> returns an array. Use
                  {' '}<code>active[0].name</code>, or use <code>find()</code> when only one user is needed.
                </p>
              )}
            </div>

            <figure className="np-wire-figure" style={{ marginTop: '1rem' }}>
              <img
                src="/backend_banter_cartoon.webp"
                alt="Three-panel Backend Banter cartoon about tests passing locally before a production failure"
                loading="lazy"
              />
              <figcaption className="np-wire-caption">
                <strong>Backend Banter:</strong> A routine deployment meets the oldest rule in software engineering—production always gets the final word.
              </figcaption>
            </figure>
          </div>

          {/* ── COLUMN 2: Halftone Portrait & Centerpiece ── */}
          <div className="np-col np-center-feature">
            <div className="np-photo-frame">
              <div className="np-photo-inner">
                <Avatar3D />
                <div className="np-halftone-overlay" />
              </div>
              <div className="np-photo-caption font-body">
                Joyson Pinto, full-stack developer and automation engineer, building scalable systems and AI-powered solutions.
              </div>
            </div>

            {/* Secondary Masthead Box: Times Mirror */}
            <div className="np-sub-masthead-box">
              <div className="np-sub-masthead-title font-masthead">
                About Me
              </div>
              <div className="np-sub-masthead-tagline font-mono">
                TWO DISCIPLINES UNDER ONE MASTHEAD: BACKEND ARCHITECTURE &amp; AUTOMATION
              </div>
              <p className="np-article-body" style={{ margin: '0.75rem 0 0', textAlign: 'center' }}>
                Full-stack developer and automation engineer experienced in building scalable
                microservices, responsive web applications, reliable end-to-end test suites,
                and AI-powered tools.
              </p>
            </div>

            {/* Vintage Action Buttons */}
            <div className="np-hero-action-row">
              <a
                href="/Joyson_Pinto_FullStackDeveloper_Resume.pdf"
                download="Joyson_Pinto_FullStackDeveloper_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="np-stamp-btn np-stamp-btn--primary font-mono"
              >
                <span>Download Resume (PDF) ↓</span>
              </a>
              <a
                href="https://github.com/joyson-git"
                target="_blank"
                rel="me noopener noreferrer"
                className="np-stamp-btn font-mono"
              >
                <span>GitHub ↗</span>
              </a>
              <a
                href="https://linkedin.com/in/joyson-pinto"
                target="_blank"
                rel="me noopener noreferrer"
                className="np-stamp-btn font-mono"
              >
                <span>LinkedIn ↗</span>
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="np-stamp-btn font-mono"
              >
                <span>Contact Me ✉</span>
              </button>
              <a href="#projects" className="np-stamp-btn font-mono">
                <span>Investigate Projects →</span>
              </a>
            </div>

            <div className="np-wire-bulletin" style={{ width: '100%', marginTop: '1rem' }}>
              <div className="np-wire-bulletin-tag">AT A GLANCE · PERSONAL FILE</div>
              <div style={{ fontSize: '0.86rem', lineHeight: '1.5', fontFamily: 'var(--np-font-body)', color: 'var(--np-ink-body)' }}>
                <p style={{ margin: '0 0 0.45rem' }}>
                  <strong>Location:</strong> Bangalore, Karnataka, India.
                </p>
                <p style={{ margin: '0 0 0.45rem' }}>
                  <strong>Availability:</strong> Open to full-stack development and automation opportunities.
                </p>
                <p style={{ margin: '0 0 0.45rem' }}>
                  <strong>Education:</strong> BE in Information Science and a Diploma in Computer Science.
                </p>
                <p style={{ margin: '0 0 0.45rem' }}>
                  <strong>Problem Solving:</strong> 700+ coding challenges completed across LeetCode and Coding Ninjas.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Hackathons:</strong> DPDZero data analytics and Leucine smart manufacturing participant.
                </p>
              </div>
            </div>

          </div>

          {/* ── COLUMN 3: Right Column Dispatch ── */}
          <div className="np-col">
            <h3 className="np-article-headline font-serif">
              I built a full-stack e-commerce platform
            </h3>
            <div className="np-byline font-mono">
              BY JOYSON PINTO · BACKEND ENGINEERING DESK
            </div>

            <figure className="np-wire-figure">
              <img
                src="/proj_microservices.webp"
                alt="E-commerce Spring Boot microservices project"
                loading="lazy"
              />
              <figcaption className="np-wire-caption">
                A distributed e-commerce platform connecting secure, independently deployable services through Eureka discovery and an API Gateway.
              </figcaption>
            </figure>

            <div className="np-article-body">
              BANGALORE — I built this e-commerce website as a distributed system with dedicated Product, Category, Cart, Order, Payment, and Search services. Its decoupled architecture keeps each service independently maintainable and ready to scale.
            </div>

            <div className="np-subhead font-serif">Features &amp; Technologies</div>
            <div className="np-byline font-mono">
              CURRENT PROJECT · ENGINEERING REPORT
            </div>

            <div className="np-wire-bulletin">
              <div className="np-wire-bulletin-tag">E-COMMERCE PLATFORM · TECHNICAL DOSSIER</div>
              <div style={{ fontSize: '0.8rem', lineHeight: '1.45', fontFamily: 'var(--np-font-body)', color: 'var(--np-ink-body)' }}>
                <p style={{ margin: '0 0 0.35rem' }}>
                  <strong>Features:</strong> Product catalogue, categories, shopping cart, orders, payments, search, secure login, and role-based authorization.
                </p>
                <p style={{ margin: '0 0 0.35rem' }}>
                  <strong>Backend:</strong> Java, Spring Boot, REST APIs, Spring Security, and JWT authentication.
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Infrastructure:</strong> MongoDB, Eureka Server service discovery, and a centralized API Gateway.
                </p>
              </div>
            </div>

            <div className="np-hero-action-row">
              <a
                href="http://129.225.69.56/"
                target="_blank"
                rel="noopener noreferrer"
                className="np-stamp-btn np-stamp-btn--primary font-mono"
              >
                <span>Visit Website ↗</span>
              </a>
              <a
                href="https://github.com/joyson-git/Ecommer-Spring-boot-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="np-stamp-btn font-mono"
              >
                <span>View Source ↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── FRONT PAGE FOOTER HOME DELIVERY STRIP ── */}
        <div className="np-front-footer-strip font-mono">
          <div>
            <strong>HOME DELIVERY &amp; HIRING</strong>
            <span>Want Joyson on your engineering squad? Call (+91) 91486 17356</span>
          </div>
          <div>
            <span>EMAIL: joysonpinto77@gmail.com · BANGALORE, INDIA </span>
          </div>
        </div>

      </div>
    </section>
  )
}

