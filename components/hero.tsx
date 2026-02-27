"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero0.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero6.jpg",
  "/images/hero7.jpg",
]

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-32 pb-20 bg-black">
      {/* Decorative radial gradient - Reduced opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_100%)] opacity-60 z-0" />


      {/* Gold decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Logo or Top Ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-6 flex justify-center"
        >
          {/* Placeholder for Logo - User to replace src if needed or file not found */}
          {/* <Image src="/images/logo.png" alt="Banqueteria Borquez" width={180} height={80} className="h-auto w-32 md:w-48" /> */}
          {/* Fallback text if logo not present, but styled as logo */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-7xl text-gold">B</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80 md:text-xs">Banquetería Borquez</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mb-8 h-px w-24 bg-gold/60"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-3xl leading-tight text-foreground md:text-6xl lg:text-7xl text-balance drop-shadow-2xl"
        >
          {"Un servicio de banqueteria"}
          <br />
          <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            {"integral y profesional"}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-lg"
        >
          {"Creamos experiencias gastronomicas unicas donde la elegancia y la naturaleza se unen para celebrar tus momentos mas especiales."}
        </motion.p>

       

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-12 h-px w-24 bg-gold/60"
        />
      </div>
    </section>
  )
}
