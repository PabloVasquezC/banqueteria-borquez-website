"use client"

import { motion } from "framer-motion"
import {
  UtensilsCrossed,
  Flower2,
  Lamp,
  Speaker,
  Trees,
  Lightbulb,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServiceItem {
  icon: LucideIcon
  label: string
  description: string
}

const serviceItems: ServiceItem[] = [
  {
    icon: UtensilsCrossed,
    label: "Banqueteria",
    description: "Menu gourmet y servicio de primer nivel",
  },
  {
    icon: Flower2,
    label: "Decoracion",
    description: "Ambientes unicos con detalles florales",
  },
  {
    icon: Lamp,
    label: "Ambientacion",
    description: "Atmosferas memorables para cada evento",
  },
  {
    icon: Speaker,
    label: "Amplificacion",
    description: "Sonido profesional de alta fidelidad",
  },
  {
    icon: Trees,
    label: "Areas Verdes",
    description: "Espacios naturales cuidados al detalle",
  },
  {
    icon: Lightbulb,
    label: "Iluminacion",
    description: "Luces que transforman cada rincon",
  },
]

export function ServicesGrid() {
  return (
    <section id="servicios" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
            Todo incluido
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl">
            Nuestros Servicios
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:bg-card"
            >
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />

              <item.icon
                size={32}
                strokeWidth={1}
                className="text-gold transition-transform duration-500 group-hover:scale-110"
              />
              <h3 className="mt-4 font-serif text-lg text-foreground">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
