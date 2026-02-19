"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { useRef } from "react"
import { staggerContainer, slideUp, fadeIn } from "@/lib/animation-utils"

const venues = [
  {
    name: "Parque Oh",
    location: "Maule",
    image: "/images/parque-oh.jpg",
  },
  {
    name: "Villa Golf",
    location: "Maule",
    image: "/images/villa-golf.jpg",
  },
  {
    name: "Casa Bosque",
    location: "Los Rios",
    image: "/images/casa-bosque.jpg",
  },
  {
    name: "Mirador Las Canas",
    location: "Maule",
    image: "/images/mirador-canas.jpg",
  },
]

export function EventCenters() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="centros" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background texture */}
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
            Nuestros Espacios
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl text-balance">
            {"Elige tu centro de eventos"}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {"Nuestro servicio de banqueteria puede desplegarse en cualquier parte de Chile. Te dejamos nuestros centros de eventos recomendados."}
          </p>
        </motion.div>

        {/* Venues horizontal scroll */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {venues.map((venue, i) => (
            <motion.div
              key={venue.name}
              variants={slideUp}
              className="group relative min-w-[280px] flex-1 snap-center overflow-hidden md:min-w-[320px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={venue.image}
                  alt={`Centro de eventos ${venue.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Hover border */}
                <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-gold/30" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl text-foreground">{venue.name}</h3>
                <div className="mt-2 flex items-center gap-1.5">
                  <MapPin size={14} className="text-gold" />
                  <span className="text-xs uppercase tracking-widest text-gold/80">
                    {venue.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
          {"Desliza para ver mas"}
        </p>
      </div>
    </section>
  )
}
