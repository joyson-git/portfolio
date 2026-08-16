import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '', style = {}, maxTilt = 16, depth = 35 }) {
  const ref = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rY = ((mouseX / width) - 0.5) * (maxTilt * 2)
    const rX = ((mouseY / height) - 0.5) * -(maxTilt * 2)

    setRotateX(rX)
    setRotateY(rY)
    setScale(1.03)

    setSpotlight({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 1
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 800
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      {/* Dynamic 3D Glare Spotlight */}
      <div
        className="tilt-spotlight"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 4,
          transition: 'opacity 0.3s ease',
          opacity: spotlight.opacity,
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255, 255, 255, 0.12), transparent 75%)`
        }}
      />
      {/* 3D Depth Wrapper */}
      <div
        style={{
          transform: `translateZ(${rotateX !== 0 || rotateY !== 0 ? depth : 0}px)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
