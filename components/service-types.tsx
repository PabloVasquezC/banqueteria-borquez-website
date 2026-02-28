"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { staggerContainer, slideUp } from "@/lib/animation-utils"
import { TiltCard } from "./tilt-card"

const services = [
  {
    title: "Matrimonios",
    description:
      "Creamos la atmosfera perfecta para el dia mas importante de tu vida, cuidando cada detalle con elegancia natural.",
    image: "/images/DSC04986.jpg",
  },
  {
    title: "Empresas",
    description:
      "Servicios corporativos de alto nivel. Lanzamientos, cenas de gala y eventos institucionales con un sello de distincion.",
    image: "/images/hero4.jpg",
  },
  {
    title: "Otros Eventos",
    description:
      "Celebraciones privadas, aniversarios y encuentros exclusivos. Transformamos cualquier ocasion en un recuerdo inolvidable.",
    image: "/images/DSC05145.jpg",
  },
]

export function ServiceTypes() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={slideUp}
              className="group relative overflow-hidden rounded-sm shadow-md transition-shadow hover:shadow-xl hover:shadow-gold/10"
            >
              <TiltCard>
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-2xl text-foreground md:text-3xl translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.description}
                    </p>
                    <a
                      href="/#cotizar"
                      className="mt-6 inline-flex w-fit items-center border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold-light hover:text-gold-light opacity-0 transform translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      Quiero Cotizar
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
