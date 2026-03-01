"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useRef, useEffect, useState, useCallback } from "react"
import { fadeIn } from "@/lib/animation-utils"
import TiltedCard from "@/components/ui/tilted-card"
import Image from "next/image"

type Venue = {
  name: string
  location: string
  image: string
  mapsLink: string
  photos: string[]
}

const venues: Venue[] = [
  {
    name: "Parque Oh",
    location: "Maule",
    image: "/images/parque-oh.jpg",
    mapsLink: "https://maps.google.com/?q=Parque+Oh+Maule+Chile",
    photos: [
      "https://parqueoh.cl/wp-content/uploads/2024/10/fondo-parque-oh.webp",
      "https://parqueoh.cl/wp-content/uploads/2024/10/pavo-real-parque-oh.webp",
      "https://parqueoh.cl/wp-content/uploads/2024/10/servicio-banqueteria-480x280.webp",
      "https://parqueoh.cl/wp-content/uploads/2024/10/servicio-decoracion-480x280.webp",
      "https://parqueoh.cl/wp-content/uploads/2024/10/servicio-ambientacion-480x280.webp",
      "https://parqueoh.cl/wp-content/uploads/2024/10/servicio-areas-verdes-480x280.webp",
    ],
  },
  {
    name: "Villa Golf",
    location: "Maule",
    image: "/images/villa-golf.jpg",
    mapsLink: "https://maps.google.com/?q=Villa+Golf+Maule+Chile",
    photos: [
      "https://www.villagolf.cl/wp-content/uploads/2022/03/1-1024x1024.jpg",
      "https://www.villagolf.cl/wp-content/uploads/2022/03/IMG_7107-1024x768.jpg",
      "https://www.villagolf.cl/wp-content/uploads/2023/01/0118-1024x1024.jpg",
      "https://s.ineventos.com/cl/2018/04/123540/centro-de-eventos-villa-golf-255695-i-640w.jpg",
      "https://s.ineventos.com/cl/2018/04/123540/centro-de-eventos-villa-golf-255696-i-640w.jpg",
      "https://s.ineventos.com/cl/2018/04/123540/centro-de-eventos-villa-golf-255697-i-640w.jpg",
      "https://s.ineventos.com/cl/2018/04/123540/centro-de-eventos-villa-golf-255698-i-640w.jpg",
    ],
  },
  {
    name: "Casa Bosque",
    location: "Los Ríos",
    image: "/images/casa-bosque.jpg",
    mapsLink: "https://maps.google.com/?q=Casa+Bosque+Los+Rios+Chile",
    photos: [
      "https://casabosque.cl/wp-content/uploads/2023/06/casa_bosque_fachada_02.jpg",
      "https://casabosque.cl/wp-content/uploads/2023/07/restaurante_casa_bosque_interior.jpg",
      "https://casabosque.cl/wp-content/uploads/2023/07/matrimonios_casa_bosque-1.webp",
      "https://casabosque.cl/wp-content/uploads/2023/07/casa_del_arbol_01.webp",
      "https://casabosque.cl/wp-content/uploads/2023/07/especialidades_restaurante_casa_bosque_10.webp",
      "https://casabosque.cl/wp-content/uploads/2023/07/matrimonios_casa_bosque._03.webp",
    ],
  },
  {
    name: "Mirador Las Cañas",
    location: "Maule",
    image: "/images/mirador-canas.jpg",
    mapsLink: "https://maps.google.com/?q=Mirador+Las+Canas+Maule+Chile",
    photos: [
      "https://static.wixstatic.com/media/3f2bb4_da8d38a0dd8a4535b6404c53c205a630~mv2.jpg/v1/fill/w_1160,h_723,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f2bb4_da8d38a0dd8a4535b6404c53c205a630~mv2.jpg",
      "https://static.wixstatic.com/media/3f2bb4_7ed94012682c46e1a709b9f2b299b011~mv2.jpg/v1/fill/w_1854,h_640,q_90,enc_avif,quality_auto/3f2bb4_7ed94012682c46e1a709b9f2b299b011~mv2.jpg",
      "https://static.wixstatic.com/media/3f2bb4_b701137735c244169a7c50f00995735f~mv2.jpg/v1/fill/w_1854,h_640,q_90,enc_avif,quality_auto/3f2bb4_b701137735c244169a7c50f00995735f~mv2.jpg",
      "https://static.wixstatic.com/media/3f2bb4_c9a6524f9a624a42ad2a5863cbd54c5f~mv2.jpg/v1/fill/w_1854,h_640,q_90,enc_avif,quality_auto/3f2bb4_c9a6524f9a624a42ad2a5863cbd54c5f~mv2.jpg",
      "https://static.wixstatic.com/media/3f2bb4_99f4ae34ddd84d6d9cc0a72ede11d671~mv2.jpg/v1/fill/w_1854,h_640,q_90,enc_avif,quality_auto/3f2bb4_99f4ae34ddd84d6d9cc0a72ede11d671~mv2.jpg",
      "https://static.wixstatic.com/media/3f2bb4_d75ea4f0f18e4e888704c2f63845b01b~mv2.jpg/v1/fill/w_1854,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3f2bb4_d75ea4f0f18e4e888704c2f63845b01b~mv2.jpg",
    ],
  },
]

export function EventCenters() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  // Infinite scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += 1.2
      if (scrollPos >= scrollContainer.scrollWidth / 2) scrollPos = 0
      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    const originalChildren = Array.from(scrollContainer.children)
    originalChildren.forEach(child => {
      scrollContainer.appendChild(child.cloneNode(true))
    })

    animationId = requestAnimationFrame(scroll)

    const pause = () => cancelAnimationFrame(animationId)
    const resume = () => { animationId = requestAnimationFrame(scroll) }

    scrollContainer.addEventListener("mouseenter", pause)
    scrollContainer.addEventListener("mouseleave", resume)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", pause)
      scrollContainer.removeEventListener("mouseleave", resume)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!selectedVenue) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVenue(null)
      if (e.key === "ArrowRight") setCurrentPhoto(p => (p + 1) % selectedVenue.photos.length)
      if (e.key === "ArrowLeft") setCurrentPhoto(p => (p - 1 + selectedVenue.photos.length) % selectedVenue.photos.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedVenue])

  const openVenue = (venue: Venue) => {
    setSelectedVenue(venue)
    setCurrentPhoto(0)
  }

  const prev = useCallback(() => {
    if (!selectedVenue) return
    setCurrentPhoto(p => (p - 1 + selectedVenue.photos.length) % selectedVenue.photos.length)
  }, [selectedVenue])

  const next = useCallback(() => {
    if (!selectedVenue) return
    setCurrentPhoto(p => (p + 1) % selectedVenue.photos.length)
  }, [selectedVenue])

  return (
    <>
      <section id="centros" className="relative overflow-hidden py-24 lg:py-32">
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
                onClick={() => openVenue(venue)}
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
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-[15px]">
                      <p className="text-white font-semibold text-lg leading-tight">{venue.name}</p>
                      <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {venue.location}
                      </p>
                      <p className="text-white/50 text-xs mt-2">
                        Ver {venue.photos.length} fotos →
                      </p>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedVenue(null)}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-[#0e0e0e] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm leading-tight">{selectedVenue.name}</p>
                    <p className="text-white/50 text-xs">{selectedVenue.location} · {currentPhoto + 1} / {selectedVenue.photos.length}</p>
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
                    Ver en Maps
                  </a>
                  <button
                    onClick={() => setSelectedVenue(null)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main photo */}
              <div className="relative w-full bg-black" style={{ height: "420px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedVenue.photos[currentPhoto]}
                      alt={`${selectedVenue.name} foto ${currentPhoto + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next buttons */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 p-3 overflow-x-auto bg-black/40">
                {selectedVenue.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhoto(idx)}
                    className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentPhoto
                        ? "border-gold opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                  >
                    <Image
                      src={photo}
                      alt={`miniatura ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
