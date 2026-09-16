import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Avatar3D() {
  const containerRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rY = ((mouseX / width) - 0.5) * 18
    const rX = ((mouseY / height) - 0.5) * -18

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      className="avatar-3d-scene"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        padding: '8px'
      }}
    >
      <motion.div
        className="avatar-3d-card"
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          padding: '8px',
          background: 'var(--np-paper)',
          border: '2px solid var(--np-ink)',
          boxShadow: isHovered
            ? '4px 4px 0px var(--np-ink), 0 20px 40px rgba(0,0,0,0.25)'
            : '2px 2px 0px var(--np-ink), 0 10px 25px rgba(0,0,0,0.15)',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        {/* Rotating dashed ink accent ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '1.5px dashed var(--np-border)',
            transform: 'translateZ(10px)',
            pointerEvents: 'none'
          }}
        />

        {/* Inner Frame - Newspaper Portrait */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--np-paper-card)',
            border: '1px solid var(--np-border)',
            transform: 'translateZ(20px)'
          }}
        >
          <motion.img
            src="/joy.png"
            alt="Joyson Pinto"
            animate={{
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'grayscale(80%) contrast(115%) brightness(0.98) sepia(12%)',
              transition: 'filter 0.4s ease'
            }}
          />
          {/* Halftone screen overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(30,20,5,0.25) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
              opacity: isHovered ? 0.25 : 0.6,
              transition: 'opacity 0.4s ease'
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
