"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rosario C.",
    role: "Novia - Parque Oh",
    text: "Hicieron que nuestra noche fuera mas que perfecta, no dejaron ningun detalle al azar e incluso, hicieron muchisimo mas de lo que esperabamos.",
  },
  {
    name: "Katherine H.",
    role: "Novia - Parque Oh",
    text: "El servicio era de primera calidad 1000 de 10. Vale cien por ciento la pena, es espectacular con una decoracion maravillosa y comida exquisita y muy preocupados y atentos.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
            Experiencias
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl">
            Algunos Testimonios
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative border border-border/50 bg-card/40 p-8 backdrop-blur-sm lg:p-10"
            >
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 h-8 w-px bg-gold/40" />
              <div className="absolute top-0 left-0 h-px w-8 bg-gold/40" />
              <div className="absolute right-0 bottom-0 h-8 w-px bg-gold/40" />
              <div className="absolute right-0 bottom-0 h-px w-8 bg-gold/40" />

              <Quote size={32} strokeWidth={1} className="mb-6 text-gold/40" />

              <p className="font-serif text-lg leading-relaxed text-foreground/90 italic">
                {`"${item.text}"`}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gold/20" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
