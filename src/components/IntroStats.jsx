import { useRef } from 'react'

export default function IntroStats() {
  const ref = useRef(null)

  return (
    <section className="scs-intro-stats" id="about" ref={ref}>
      {/* Decorative background rings */}
      <div className="scs-intro-stats__rings" aria-hidden="true">
        <div className="scs-intro-stats__ring scs-intro-stats__ring--a" />
        <div className="scs-intro-stats__ring scs-intro-stats__ring--b" />
      </div>

      <div className="scs-container">
        {/* Kinetic statement */}
        <div className="scs-intro-stats__statement">
          <p className="scs-dis2">
            {/* TODO: confirm final copy */}
            <span className="scs-gradient-text">JOYSON PINTO</span> IS A FULL-STACK
            ENGINEER SPECIALISING IN HIGH-SCALE MICROSERVICES, E2E QUALITY
            ENGINEERING &amp; AI-POWERED SYSTEMS — SHIPPED WITH PRECISION.
          </p>
        </div>
      </div>
    </section>
  )
}
