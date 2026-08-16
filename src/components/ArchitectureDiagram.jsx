import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playHover, playClick } from '../utils/soundEffects'

const systemNodes = [
  {
    id: 'frontend',
    title: 'Client Layer',
    badge: 'FRONTEND',
    icon: '🅰️',
    tech: 'Angular 18 & React',
    latency: '< 10ms',
    desc: 'Responsive healthcare web applications & dynamic dashboards built with Angular state management.',
  },
  {
    id: 'gateway',
    title: 'API Gateway & Eureka',
    badge: 'GATEWAY',
    icon: '⚙️',
    tech: 'Spring Cloud & JWT',
    latency: '14ms',
    desc: 'Decoupled service registry, Spring Security authentication, and automated routing gateway.',
  },
  {
    id: 'microservices',
    title: 'REST Microservices',
    badge: 'BACKEND',
    icon: '☕',
    tech: 'Spring Boot & Node.js',
    latency: '18ms',
    desc: 'Scalable Spring Boot & Express.js APIs serving patient data, hospital workflows, and analytics.',
  },
  {
    id: 'ai-agents',
    title: 'AI & MCP Protocol',
    badge: 'AI ENGINE',
    icon: '🤖',
    tech: 'Gemini LLM & MCP',
    latency: '120ms',
    desc: 'Chrome AI extensions, Model Context Protocol server automation, and smart doc agents.',
  },
  {
    id: 'database',
    title: 'Data & Storage',
    badge: 'DATABASE',
    icon: '🍃',
    tech: 'MongoDB & AWS MySQL',
    latency: '8ms',
    desc: 'Optimized MongoDB collections, Mongoose schemas, and AWS relational databases with indexing.',
  },
  {
    id: 'automation',
    title: 'E2E Testing Suite',
    badge: 'AUTOMATION',
    icon: '🎭',
    tech: 'Playwright & WebdriverIO',
    latency: '99.9% Pass',
    desc: 'Automated Playwright and WebdriverIO test suites integrated with Artillery load testing.',
  },
]

export default function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState(systemNodes[1])

  return (
    <div className="arch-diagram-wrap">
      <div className="arch-header">
        <div className="arch-header-left">
          <span className="dot pulse" />
          <h3 className="arch-title mono">SYSTEM ARCHITECTURE &amp; TELEMETRY VISUALIZER</h3>
        </div>
        <span className="arch-badge mono">INTERACTIVE NODE INSPECTOR</span>
      </div>

      <div className="arch-interactive-grid">
        {/* Nodes Column */}
        <div className="arch-nodes-list">
          {systemNodes.map((node) => {
            const isSelected = selectedNode.id === node.id
            return (
              <motion.button
                key={node.id}
                className={`arch-node-btn ${isSelected ? 'arch-node-btn--active' : ''}`}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick()
                  setSelectedNode(node)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="arch-node-icon">{node.icon}</div>
                <div className="arch-node-info">
                  <div className="arch-node-title">{node.title}</div>
                  <div className="arch-node-tech mono">{node.tech}</div>
                </div>
                <span className="arch-node-latency mono">{node.latency}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="arch-inspector-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="arch-inspector-content"
            >
              <div className="arch-inspector-top">
                <span className="arch-inspector-badge mono">{selectedNode.badge}</span>
                <span className="arch-inspector-metric mono">LATENCY: {selectedNode.latency}</span>
              </div>

              <h4 className="arch-inspector-title">
                {selectedNode.icon} {selectedNode.title}
              </h4>
              <div className="arch-inspector-tech mono">{selectedNode.tech}</div>
              <p className="arch-inspector-desc">{selectedNode.desc}</p>

              <div className="arch-inspector-dataflow">
                <div className="dataflow-label mono">DATAFLOW ROUTE:</div>
                <div className="dataflow-route mono">
                  <code>Client ➔ API Gateway ➔ {selectedNode.title} ➔ DB</code>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
