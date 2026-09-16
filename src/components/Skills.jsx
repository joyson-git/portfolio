import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard'

const skillCategories = [
  {
    cat: 'LANGUAGES',
    icon: '💻',
    items: [
      { name: 'Java', icon: '☕' },
      { name: 'JavaScript', icon: '🟨' },
    ],
  },
  {
    cat: 'BACKEND',
    icon: '⚙️',
    items: [
      { name: 'Spring Boot', icon: '🌱' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '⚡' },
      { name: 'Microservices', icon: '🛠️' },
      { name: 'REST APIs', icon: '🔗' },
      { name: 'Spring Security', icon: '🛡️' },
      { name: 'JWT', icon: '🔑' },
    ],
  },
  {
    cat: 'FRONTEND',
    icon: '🎨',
    items: [
      { name: 'Angular', icon: '🅰️' },
      { name: 'HTML', icon: '🌐' },
      { name: 'CSS', icon: '🎨' },
      { name: 'State Management', icon: '🔄' },
    ],
  },
  {
    cat: 'DATABASES',
    icon: '🗄️',
    items: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'Mongoose', icon: '🦦' },
      { name: 'JDBC', icon: '🔌' },
    ],
  },
  {
    cat: 'TESTING & PERFORMANCE',
    icon: '🧪',
    items: [
      { name: 'Playwright (E2E)', icon: '🎭' },
      { name: 'WebdriverIO', icon: '🤖' },
      { name: 'Artillery (Load Testing)', icon: '🚀' },
    ],
  },
  {
    cat: 'TOOLS & TECHNOLOGIES',
    icon: '🛠️',
    items: [
      { name: 'Git', icon: '📦' },
      { name: 'SourceTree', icon: '🌳' },
      { name: 'Postman', icon: '📮' },
      { name: 'Swagger', icon: '📜' },
      { name: 'AWS', icon: '☁️' },
      { name: 'MCP (AI-assisted coding)', icon: '🤖' },
      { name: 'Linux/Unix', icon: '🐧' },
      { name: 'OOP', icon: '🏗️' },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const TICKER_ITEMS = [
    { sym: 'JAVA', val: '▲ +5.8%', desc: 'HIGH GAIN' },
    { sym: 'SPRING_BOOT', val: '▲ +7.2%', desc: 'STRONG BUY' },
    { sym: 'PLAYWRIGHT', val: '▲ +9.4%', desc: 'RECORD HIGH' },
    { sym: 'ANGULAR', val: '▲ +3.6%', desc: 'STEADY' },
    { sym: 'NODE_JS', val: '▲ +6.1%', desc: 'EXPANDING' },
    { sym: 'MONGODB', val: '▲ +4.5%', desc: 'ROBUST' },
    { sym: 'RAG_LLM', val: '▲ +14.8%', desc: 'BREAKTHROUGH' },
    { sym: 'DOCKER', val: '▲ +5.0%', desc: 'DEPLOYED' },
    { sym: 'ARTILLERY', val: '▲ +8.2%', desc: 'STRESS TESTED' },
  ]

  return (
    <section className="np-page-section" id="skills" ref={ref}>
      <div className="np-broadsheet-wrapper">

        {/* ── Broadsheet Folio Header ── */}
        <div className="np-folio-header font-mono">
          <span>PAGE 5 · TECHNICAL COMMODITIES &amp; FINANCIAL TELETYPE</span>
          <span>GENZ TIMES · PINTO EDITION</span>
        </div>

        <hr className="np-rule-thick" />

        <h2 className="np-section-headline font-headline">
          THE TECHNICAL COMMODITY EXCHANGE
        </h2>
        <p className="np-section-deck font-serif">
          Official quotations, index ratings, and technical depth across languages, distributed backends, testing frameworks, and databases.
        </p>

        {/* ── Running Stock Ticker Tape ── */}
        <div className="np-ticker-tape" aria-hidden="true">
          <div className="np-ticker-tape__track font-mono">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} className="np-ticker-item">
                <strong>{t.sym}</strong> <span className="up">{t.val}</span> ({t.desc}) ·
              </span>
            ))}
          </div>
        </div>

        <hr className="np-rule-double" />

        <div className="np-commodity-grid">
          {skillCategories.map((catGroup, ci) => (
            <motion.div
              key={catGroup.cat}
              className="np-commodity-box"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="np-commodity-box__head font-headline">
                <span>{catGroup.icon} {catGroup.cat}</span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--np-font-mono)' }}>IDX {ci + 1}00</span>
              </div>

              <table className="np-commodity-table font-mono">
                <tbody>
                  {catGroup.items.map((item) => (
                    <tr key={item.name}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0' }}>
                        <span>{item.icon}</span>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

