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

    // Smooth 3D tilt calculation
    const rY = ((mouseX / width) - 0.5) * 26
    const rX = ((mouseY / height) - 0.5) * -26

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
        padding: '10px'
      }}
    >
      <motion.div
        className="avatar-3d-card"
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.04 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          padding: '10px',
          background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.4), rgba(255, 255, 255, 0.1))',
          boxShadow: isHovered
            ? '0 30px 60px rgba(0,0,0,0.85), 0 0 50px rgba(230, 57, 70, 0.5)'
            : '0 20px 40px rgba(0,0,0,0.65), 0 0 25px rgba(230, 57, 70, 0.25)',
          transition: 'box-shadow 0.4s ease'
        }}
      >
        {/* Ambient Crimson Glow Backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: '-15px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, rgba(230,57,70,0.38), transparent 70%)',
            transform: 'translateZ(-25px)',
            filter: 'blur(22px)',
            pointerEvents: 'none'
          }}
        />

        {/* Rotating Crimson Dashed Accent Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '1.5px dashed rgba(230, 57, 70, 0.5)',
            transform: 'translateZ(10px)',
            pointerEvents: 'none'
          }}
        />

        {/* Inner Frame Clipping Image Perfectly */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--bg2)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 255, 255, 0.15)',
            transform: 'translateZ(25px)'
          }}
        >
          <motion.img
            src="/joy.png"
            alt="Joyson Pinto"
            animate={{
              scale: isHovered ? 1.06 : 1
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
