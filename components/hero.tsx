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
    <section id="inicio" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-32 pb-20">
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

      {/* Dark overlay with grain/texture if possible (using gradient for now) */}
      <div className="absolute inset-0 from-background/90 via-background/60 to-background bg-gradient-to-b z-0" />

      {/* Decorative radial gradient for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-90 z-0" />

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#cotizar"
            className="inline-block border border-gold bg-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
          >
            Quiero Cotizar
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#centros"
            className="inline-block border border-gold/30 bg-transparent px-10 py-4 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            Ver Centros
          </motion.a>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-12 h-px w-24 bg-gold/60"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gold/50">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
