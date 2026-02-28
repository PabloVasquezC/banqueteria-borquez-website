"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { useRef, useEffect } from "react"
import { staggerContainer, slideUp, fadeIn } from "@/lib/animation-utils"
import { TiltCard } from "./tilt-card"

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

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += 1.2 // Adjust speed here
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
      }
      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    // Clone items for infinite effect
    const originalChildren = Array.from(scrollContainer.children)
    originalChildren.forEach(child => {
      const clone = child.cloneNode(true)
      scrollContainer.appendChild(clone)
    })

    animationId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => animationId = requestAnimationFrame(scroll)

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="centros" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background texture */}
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        </div>

        {/* Venues horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pb-12 px-8 whitespace-nowrap"
        >
          {venues.map((venue, i) => (
            <div
              key={`${venue.name}-${i}`}
              className="group relative shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] overflow-hidden rounded-2xl inline-block"
            >
              <TiltCard>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={venue.image}
                    alt={`Centro de eventos ${venue.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover border */}
                  <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-gold/30 rounded-xl" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 whitespace-normal">
                  <h3 className="font-serif text-2xl text-white">{venue.name}</h3>
                  <div className="mt-2 flex items-center gap-1.5">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-xs uppercase tracking-widest text-gold/90 font-medium">
                      {venue.location}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
