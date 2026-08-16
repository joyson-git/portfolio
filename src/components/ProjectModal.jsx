import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="proj-modal-backdrop" onClick={onClose}>
        <motion.div
          className="proj-modal"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="proj-modal-header">
            <div>
              <span className="proj-modal-num mono">{project.num}</span>
              <h3 className="proj-modal-title">{project.title}</h3>
              <span className="proj-modal-cat mono">{project.category}</span>
            </div>
            <button className="proj-modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="proj-modal-body">
            <p className="proj-modal-desc">{project.desc}</p>

            <div className="proj-modal-section">
              <h4 className="proj-modal-subtitle mono">&gt; ARCHITECTURAL HIGHLIGHTS</h4>
              <ul className="proj-modal-list">
                <li>Decoupled microservice architecture with independent scaling and isolated failure boundaries.</li>
                <li>Secure RESTful communication using JWT authentication and Spring Security role-based access control.</li>
                <li>High-throughput data storage with optimized indexing in MongoDB &amp; MySQL.</li>
              </ul>
            </div>

            <div className="proj-modal-section">
              <h4 className="proj-modal-subtitle mono">&gt; TECH STACK</h4>
              <div className="proj-modal-tags">
                {project.tech.map(t => (
                  <span key={t} className="proj-modal-tag mono">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="proj-modal-footer">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="proj-modal-btn proj-modal-btn--live mono"
              >
                Launch Live Demo ⚡
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="proj-modal-btn mono"
            >
              View Repository on GitHub ↗
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
