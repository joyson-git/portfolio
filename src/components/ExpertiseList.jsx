import { useState } from 'react'

const EXPERTISE = [
  {
    num: '01',
    title: 'Full-Stack Architecture',
    desc: 'End-to-end web applications with Java / Spring Boot backends and Angular / React frontends — built to scale and easy to maintain.',
    tags: ['Java', 'Spring Boot', 'Angular', 'Node.js'],
  },
  {
    num: '02',
    title: 'Microservices & Cloud Systems',
    desc: 'Distributed service design, containerised deployments on AWS / Docker / Kubernetes, message queues with Kafka & Redis.',
    tags: ['AWS', 'Docker', 'Kafka', 'Redis', 'Kubernetes'],
  },
  {
    num: '03',
    title: 'E2E Test Automation & Quality',
    desc: 'Zero-flakiness Playwright & WebdriverIO test suites integrated into CI pipelines — shift-left quality engineering.',
    tags: ['Playwright', 'WebdriverIO', 'CI/CD', 'Jest'],
  },
  {
    num: '04',
    title: 'High-Throughput APIs & Real-time',
    desc: 'REST & GraphQL APIs designed for millions of requests; WebSocket and event-driven real-time data flows.',
    tags: ['GraphQL', 'REST', 'WebSocket', 'FastAPI'],
  },
  {
    num: '05',
    title: 'AI Agents & LLM Integration',
    desc: 'Embedding large-language models into production systems — retrieval-augmented generation, tool-use agents, and custom AI assistants.',
    tags: ['OpenAI', 'LangChain', 'RAG', 'Python'],
  },
]

export default function ExpertiseList({ onOpenContact }) {
  const [active, setActive] = useState(null)

  return (
    <section className="scs-expertise" id="expertise">
      <div className="scs-container">
        {/* Section label */}
    

        <ul className="scs-expertise__list" role="list">
          {EXPERTISE.map((item) => {
            const isActive = active === item.num
            const isDimmed = active !== null && !isActive

            return (
              <li
                key={item.num}
                className={`scs-expertise__item${isActive ? ' scs-expertise__item--active' : ''}${isDimmed ? ' scs-expertise__item--dim' : ''}`}
                onMouseEnter={() => setActive(item.num)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(item.num)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="listitem"
              >
                <div className="scs-expertise__row">
                  <span className="scs-expertise__num scs-mono">{item.num}</span>
                  <h3 className="scs-expertise__title scs-h2">{item.title}</h3>
                  {/* Sliding arrow */}
                  <span className="scs-expertise__arrow" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {/* Reveal on active */}
                <div className="scs-expertise__reveal">
                  <p className="scs-expertise__desc">{item.desc}</p>
                  <div className="scs-expertise__tags">
                    {item.tags.map((t) => (
                      <span key={t} className="scs-expertise__tag scs-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="scs-expertise__cta">
          <button className="scs-btn scs-btn--primary" type="button" onClick={onOpenContact}>
            <span className="scs-btn__label">Start a Project</span>
            <span className="scs-btn__circle" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
