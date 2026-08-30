import { useState } from 'react'

/**
 * Honest global presence — only real / meaningful locations.
 * Bangalore is Joyson's base. The rest represent remote client
 * time-zones or key tech-hub markets he's open to work with.
 */
const LOCATIONS = [
  { id: 'blr', city: 'Bangalore', role: 'Home Base · HQ', lat: '12.9716° N', lng: '77.5946° E', status: 'online' },
  { id: 'mum', city: 'Mumbai', role: 'Remote — Finance Clients', lat: '19.0760° N', lng: '72.8777° E', status: 'online' },
  { id: 'del', city: 'Delhi NCR', role: 'Remote — Enterprise Clients', lat: '28.7041° N', lng: '77.1025° E', status: 'online' },
  { id: 'lon', city: 'London', role: 'Remote — EU / UK Markets', lat: '51.5074° N', lng: '0.1278° W', status: 'open' },
  { id: 'sfo', city: 'San Francisco', role: 'Remote — US West Coast', lat: '37.7749° N', lng: '122.4194° W', status: 'open' },
  { id: 'sgp', city: 'Singapore', role: 'Remote — SEA Markets', lat: '1.3521° N', lng: '103.8198° E', status: 'open' },
]

const STATUS_COLOR = { online: 'var(--scs-light-orange)', open: 'var(--scs-dark-teal)' }
const STATUS_LABEL = { online: 'ACTIVE', open: 'OPEN TO WORK' }

export default function GlobalPresence() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="scs-global" id="global">
      <div className="scs-container scs-global__inner">

        {/* Left: coordinate list */}
        <div className="scs-global__list">
          <p className="scs-global__label scs-mono">GLOBAL PRESENCE</p>
          <h2 className="scs-h2 scs-global__heading">
            Building Remotely.<br />
            <span className="scs-gradient-text">Delivering Globally.</span>
          </h2>

          <ul className="scs-global__locations" role="list">
            {LOCATIONS.map((loc) => {
              const isActive = hovered === loc.id
              return (
                <li
                  key={loc.id}
                  className={`scs-global__loc${isActive ? ' scs-global__loc--active' : ''}`}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(loc.id)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <span
                    className="scs-global__dot"
                    style={{ background: STATUS_COLOR[loc.status], boxShadow: `0 0 8px ${STATUS_COLOR[loc.status]}` }}
                  />
                  <div className="scs-global__loc-info">
                    <span className="scs-global__city">{loc.city}</span>
                    <span className="scs-global__role scs-mono">{loc.role}</span>
                  </div>
                  <div className="scs-global__coords scs-mono">
                    <span>{loc.lat}</span>
                    <span>{loc.lng}</span>
                    <span
                      className="scs-global__status-badge"
                      style={{ color: STATUS_COLOR[loc.status] }}
                    >
                      {STATUS_LABEL[loc.status]}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right: radar graphic */}
        <div className="scs-global__radar" aria-hidden="true">
          <svg className="scs-global__radar-svg" viewBox="0 0 300 300" fill="none">
            {/* Concentric rings */}
            {[130, 100, 70, 40].map((r) => (
              <circle key={r} cx="150" cy="150" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            ))}
            {/* Cross-hairs */}
            <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* Rotating sweep line */}
            <line
              x1="150" y1="150" x2="150" y2="22"
              stroke="url(#scs-radar-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transformOrigin: '150px 150px', animation: 'scs-rotation 4s linear infinite' }}
            />
            {/* Center dot */}
            <circle cx="150" cy="150" r="5" fill="var(--scs-light-orange)" opacity="0.9" />
            {/* Location blips */}
            {LOCATIONS.map((loc, i) => {
              const angle = (i / LOCATIONS.length) * 2 * Math.PI - Math.PI / 2
              const dist = i === 0 ? 0 : 55 + (i * 13)
              const x = 150 + dist * Math.cos(angle)
              const y = 150 + dist * Math.sin(angle)
              const isActive = hovered === loc.id
              return (
                <circle
                  key={loc.id}
                  cx={x} cy={y} r={isActive ? 5 : 3}
                  fill={isActive ? STATUS_COLOR[loc.status] : 'rgba(255,255,255,0.4)'}
                  style={{ transition: 'all 0.3s ease', filter: isActive ? `drop-shadow(0 0 6px ${STATUS_COLOR[loc.status]})` : 'none' }}
                />
              )
            })}
            <defs>
              <linearGradient id="scs-radar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--scs-light-orange)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--scs-light-orange)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}
