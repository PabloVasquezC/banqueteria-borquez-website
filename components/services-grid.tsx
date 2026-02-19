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
import { staggerContainer, slideUp, fadeIn } from "@/lib/animation-utils"

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
    <section id="servicios" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-secondary/20" />
      {/* Subtle animated background element */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {serviceItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={slideUp}
              className="group relative border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:bg-card hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
            >
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />

              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                <item.icon size={24} strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 font-serif text-xl text-foreground group-hover:text-gold transition-colors">
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
