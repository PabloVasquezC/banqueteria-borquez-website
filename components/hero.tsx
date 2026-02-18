"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const HERO_IMAGES = [
  "/images/hero-slide-6.jpg", // People toasting (Celebration)
  "/images/hero-slide-4.jpg", // Daytime garden (Variety)
  "/images/hero-slide-3.jpg", // Gourmet food (Detail)
  "/images/hero-slide-5.jpg", // Evening cocktail (Modern)
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
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background slideshow with Ken Burns effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : 1.1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5 },
            scale: { duration: 7, ease: "linear" }
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_IMAGES[currentImageIndex]}
            alt="Elegante montaje de banquete y gastronomía"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      {/* Gold decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Small ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mx-auto mb-8 h-px w-24 bg-gold/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-gold/80 md:text-sm"
        >
          {"Banqueteria Borquez"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-4xl leading-tight text-foreground md:text-6xl lg:text-7xl text-balance"
        >
          {"Un servicio de banqueteria"}
          <br />
          <span className="text-gold-metallic">{"integral y profesional"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg"
        >
          {"Creamos experiencias gastronomicas unicas donde la elegancia y la naturaleza se unen para celebrar tus momentos mas especiales."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#cotizar"
            className="inline-block border border-gold bg-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Quiero Cotizar
          </a>
          <a
            href="#centros"
            className="inline-block border border-gold/30 bg-transparent px-10 py-4 text-xs uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            Ver Centros
          </a>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mx-auto mt-12 h-px w-24 bg-gold/60"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gold/50">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
