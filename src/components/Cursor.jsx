import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Fluid, responsive spring physics
  const springX = useSpring(cursorX, { stiffness: 450, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 450, damping: 30 })

  const trailX = useSpring(cursorX, { stiffness: 140, damping: 22 })
  const trailY = useSpring(cursorY, { stiffness: 140, damping: 22 })

  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e) => {
      const target = e.target
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hover]') ||
        target.closest('.project-card') ||
        target.closest('.timeline-card')
      ) {
        setIsHover(true)
      } else {
        setIsHover(false)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHover ? 0.4 : 1,
          opacity: isHover ? 0.8 : 1,
          backgroundColor: '#ffffff'
        }}
        transition={{ duration: 0.2 }}
        className="cursor-dot"
      />
      {/* Smooth Liquid Ring */}
      <motion.div
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHover ? 2.4 : 1,
          borderColor: isHover ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isHover ? 'rgba(255, 255, 255, 0.08)' : 'transparent'
        }}
        transition={{ duration: 0.25 }}
        className="cursor-ring"
      />
    </>
  )
}
