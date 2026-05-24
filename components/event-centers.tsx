"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { fadeIn } from "@/lib/animation-utils"
import TiltedCard from "@/components/ui/tilted-card"
import { services } from "@/components/service-types"

export function EventCenters() {
  const scrollRef = useRef<HTMLDivElement>(null)

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

  return (
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
              Nuestros Eventos
            </span>
            <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl text-balance">
              {"Tipos de Eventos"}
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {"Creamos la atmósfera perfecta para cada celebración. Descubre los distintos tipos de eventos que podemos realizar para ti."}
            </p>
          </motion.div>
        </div>

        {/* Services horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pb-12 px-8 whitespace-nowrap"
        >
          {services.map((service, i) => (
            <div
              key={`${service.title}-${i}`}
              className="group relative shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] inline-block cursor-pointer"
              onClick={() => {
                const element = document.getElementById("cotizar")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <TiltedCard
                imageSrc={service.image}
                altText={service.title}
                captionText={service.title}
                containerHeight="380px"
                containerWidth="100%"
                imageHeight="380px"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
              <div className="mt-4 px-2 whitespace-normal text-left">
                <h3 className="font-serif text-xl text-foreground group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-3">
                  <span className="inline-flex w-fit items-center border-b border-gold pb-0.5 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 group-hover:border-gold-light group-hover:text-gold-light">
                    Quiero Cotizar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
