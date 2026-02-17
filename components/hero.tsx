"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-banquet.jpg"
        alt="Elegante montaje de banquete"
        fill
        className="object-cover"
        priority
        quality={90}
      />

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
          <span className="text-gold">{"integral y profesional"}</span>
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
