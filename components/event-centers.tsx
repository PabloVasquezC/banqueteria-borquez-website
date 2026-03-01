"use client"

import { motion } from "framer-motion"
import { MapPin, X, ExternalLink } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { fadeIn } from "@/lib/animation-utils"
import TiltedCard from "@/components/ui/tilted-card"

type Venue = {
  name: string
  location: string
  image: string
  mapUrl: string
  mapsLink: string
}

const venues: Venue[] = [
  {
    name: "Parque Oh",
    location: "Maule",
    image: "/images/parque-oh.jpg",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Parque+Oh+Maule+Chile",
    mapsLink: "https://maps.google.com/?q=Parque+Oh+Maule+Chile",
  },
  {
    name: "Villa Golf",
    location: "Maule",
    image: "/images/villa-golf.jpg",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Villa+Golf+Maule+Chile",
    mapsLink: "https://maps.google.com/?q=Villa+Golf+Maule+Chile",
  },
  {
    name: "Casa Bosque",
    location: "Los Ríos",
    image: "/images/casa-bosque.jpg",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Casa+Bosque+Los+Rios+Chile",
    mapsLink: "https://maps.google.com/?q=Casa+Bosque+Los+Rios+Chile",
  },
  {
    name: "Mirador Las Canas",
    location: "Maule",
    image: "/images/mirador-canas.jpg",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Mirador+Las+Canas+Maule+Chile",
    mapsLink: "https://maps.google.com/?q=Mirador+Las+Canas+Maule+Chile",
  },
]

export function EventCenters() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += 1.2
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
      }
      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    const originalChildren = Array.from(scrollContainer.children)
    originalChildren.forEach(child => {
      const clone = child.cloneNode(true)
      scrollContainer.appendChild(clone)
    })

    animationId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(scroll) }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
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
                className="group relative shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] inline-block cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <TiltedCard
                  imageSrc={venue.image}
                  altText={venue.name}
                  captionText={`${venue.name} — ${venue.location}`}
                  containerHeight="440px"
                  containerWidth="100%"
                  imageHeight="440px"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip
                  displayOverlayContent
                  overlayContent={
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent rounded-b-[15px]">
                      <p className="text-white font-semibold text-lg leading-tight">{venue.name}</p>
                      <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {venue.location}
                      </p>
                      <p className="text-white/50 text-xs mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Ver en Google Maps
                      </p>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps Modal */}
      {selectedVenue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedVenue(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-background border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{selectedVenue.name}</p>
                  <p className="text-muted-foreground text-xs">{selectedVenue.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedVenue.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors px-3 py-1.5 rounded-lg border border-gold/30 hover:border-gold/60"
                >
                  <ExternalLink className="w-3 h-3" />
                  Abrir en Maps
                </a>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Map iframe */}
            <div className="relative w-full" style={{ height: "420px" }}>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedVenue.name + " " + selectedVenue.location + " Chile")}&output=embed&z=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${selectedVenue.name}`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
