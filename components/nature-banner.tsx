"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function NatureBanner() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/images/nature-surprise.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-background/60" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />
        <h2 className="font-serif text-4xl leading-tight text-foreground md:text-6xl text-balance">
          <span className="text-gold">Naturalmente</span>
          <br />
          Sorprendente
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
      </motion.div>
    </section>
  )
}
