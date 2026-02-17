"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Centros de Eventos", href: "#centros" },
  { label: "Nuestros Servicios", href: "#servicios" },
  { label: "Cotizar", href: "#cotizar" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
    </footer>
  )
}
