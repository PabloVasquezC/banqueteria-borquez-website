"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const services = [
  {
    title: "Matrimonios",
    description:
      "Creamos la atmosfera perfecta para el dia mas importante de tu vida, cuidando cada detalle con elegancia natural.",
    image: "/images/matrimonios.jpg",
  },
  {
    title: "Empresas",
    description:
      "Servicios corporativos de alto nivel. Lanzamientos, cenas de gala y eventos institucionales con un sello de distincion.",
    image: "/images/empresas.jpg",
  },
  {
    title: "Otros Eventos",
    description:
      "Celebraciones privadas, aniversarios y encuentros exclusivos. Transformamos cualquier ocasion en un recuerdo inolvidable.",
    image: "/images/otros.jpg",
  },
]

export function ServiceTypes() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="font-serif text-2xl text-foreground md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    {service.description}
                  </p>
                  <a
                    href="#cotizar"
                    className="mt-6 inline-flex w-fit items-center border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold-light hover:text-gold-light"
                  >
                    Quiero Cotizar
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
