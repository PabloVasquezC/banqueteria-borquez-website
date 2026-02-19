"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { fadeIn } from "@/lib/animation-utils"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Centros de Eventos", href: "#centros" },
  { label: "Nuestros Servicios", href: "#servicios" },
  { label: "Cotizar", href: "#cotizar" },
]

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="mb-4">
              <span className="font-serif text-2xl tracking-wider text-gold">
                Borquez
              </span>
              <br />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light/70">
                Banqueteria
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"Creamos experiencias gastronomicas unicas donde la elegancia y la naturaleza se unen para celebrar tus momentos mas especiales."}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
              Navegacion
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
              Contacto
            </h4>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold/60" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {"Ruta K-620 km 3 Camino Viejo Maule, Unihue, 3530000 Maule"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border/30 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground/60">
            {"© 2026 Banqueteria Borquez. Todos los derechos reservados."}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground/60 transition-colors hover:text-gold"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground/60 transition-colors hover:text-gold"
            >
              {"Terminos y Condiciones"}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-40 rounded-full border border-gold/30 bg-background/80 p-3 text-gold shadow-lg backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary-foreground md:bottom-12 md:left-12"
            aria-label="Volver arriba"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
