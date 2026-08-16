import { useEffect, useRef } from 'react'

export default function MagicParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouse = { x: -1000, y: -1000, active: false }
    let mouseTrail = []

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true

      // Spawn subtle high-contrast white stardust sparkles
      for (let i = 0; i < 2; i++) {
        mouseTrail.push({
          x: mouse.x + (Math.random() - 0.5) * 12,
          y: mouse.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.5,
          size: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.035 + 0.02,
          color: Math.random() > 0.4 ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
        })
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Ambient Stardust Constellation
    const starCount = Math.min(Math.floor(width / 22), 65)
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.6,
      baseAlpha: Math.random() * 0.35 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isSparkle: Math.random() > 0.8
    }))

    // Draw 4-pointed star sparkle
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
      let rot = (Math.PI / 2) * 3
      let x = cx
      let y = cy
      let step = Math.PI / spikes

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy - outerRadius)
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius
        y = cy + Math.sin(rot) * outerRadius
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius
        y = cy + Math.sin(rot) * innerRadius
        ctx.lineTo(x, y)
        rot += step
      }
      ctx.lineTo(cx, cy - outerRadius)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha
      ctx.shadowBlur = 8
      ctx.shadowColor = '#ffffff'
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw Mouse Cursor Spotlight Glow
      if (mouse.active) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 220
        )
        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)')
        auraGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)')
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = auraGrad
        ctx.fillRect(0, 0, width, height)
      }

      // 2. Render & Update Constellation Particles
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.pulse += s.pulseSpeed
        const currentAlpha = s.baseAlpha + Math.sin(s.pulse) * 0.15

        s.x += s.vx
        s.y += s.vy

        if (s.x < 0) s.x = width
        if (s.x > width) s.x = 0
        if (s.y < 0) s.y = height
        if (s.y > height) s.y = 0

        // Cursor Repulsion Physics
        if (mouse.active) {
          const dx = s.x - mouse.x
          const dy = s.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const angle = Math.atan2(dy, dx)
            const force = (130 - dist) * 0.02
            s.x += Math.cos(angle) * force
            s.y += Math.sin(angle) * force
          }
        }

        // Draw star point
        if (s.isSparkle && currentAlpha > 0.25) {
          drawStar(s.x, s.y, 4, s.radius * 2.5, s.radius * 0.8, '#ffffff', Math.max(0, currentAlpha))
        } else {
          ctx.beginPath()
          ctx.arc(s.x, s.y, Math.max(0.5, s.radius), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, currentAlpha)})`
          ctx.fill()
        }

        // Connect nearby stars with fine lines
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j]
          const dx = s.x - s2.x
          const dy = s.y - s2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(s2.x, s2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 120) * 0.06})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }

        // Connect particles to mouse cursor when close
        if (mouse.active) {
          const mdx = s.x - mouse.x
          const mdy = s.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < 160) {
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - mdist / 160) * 0.15})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // 3. Render Cursor Stardust Sparkles Trail
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const p = mouseTrail[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          mouseTrail.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.shadowBlur = 6
        ctx.shadowColor = '#ffffff'
        ctx.fill()
        ctx.globalAlpha = 1.0
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95
      }}
    />
  )
}
