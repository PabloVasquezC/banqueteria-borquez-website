"use client"

import { motion, useInView, UseInViewOptions, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
    children: ReactNode
    className?: string
    variants?: Variants
    delay?: number
    threshold?: number
    once?: boolean
}

export function ScrollAnimation({
    children,
    className,
    variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    },
    delay = 0,
    threshold = 0.1,
    once = true,
}: ScrollAnimationProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once,
        amount: threshold,
        margin: "0px 0px -50px 0px"
    } as UseInViewOptions)

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ delay }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
