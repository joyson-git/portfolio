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

  return (
    <section className="skills section" id="skills" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="scs-gradient-text">Technical Skills.</span>
      </motion.h2>

      <div className="skills-grid">
        {skillCategories.map((catGroup, ci) => (
          <motion.div
            key={catGroup.cat}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: ci * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard maxTilt={6}>
              <div className="skill-category">
                <div className="skill-cat-title mono">
                  <span className="skill-cat-icon">{catGroup.icon}</span> {catGroup.cat}
                </div>
                <div className="skill-tags">
                  {catGroup.items.map((item, ii) => (
                    <motion.span
                      key={item.name}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        borderColor: '#ffffff',
                      }}
                      transition={{ delay: ci * 0.08 + ii * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="skill-tag-icon">{item.icon}</span> {item.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
