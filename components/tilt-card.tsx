"use client"

import type { SpringOptions } from 'motion/react'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2,
}

interface TiltCardProps {
    children: React.ReactNode
    rotateAmplitude?: number
    scaleOnHover?: number
    className?: string
}

export function TiltCard({
    children,
    rotateAmplitude = 10,
    scaleOnHover = 1.03,
    className,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const rotateX = useSpring(useMotionValue(0), springValues)
    const rotateY = useSpring(useMotionValue(0), springValues)
    const scale = useSpring(1, springValues)

    const [, setLastY] = useState(0)

    function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2
        rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
        rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
        setLastY(offsetY)
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover)
    }

    function handleMouseLeave() {
        scale.set(1)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{ perspective: '800px' }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: 'preserve-3d',
                    width: '100%',
                    height: '100%',
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}
