"use client"

import MagicBento from "@/components/MagicBento"

const serviceCards = [
  {
    title: "Matrimonios",
    description: "Creamos la atmosfera perfecta para el dia mas importante de tu vida, cuidando cada detalle con elegancia natural.",
    label: "Banquetería",
    img: "/images/DSC04986.jpg",
  },
  {
    title: "Empresas",
    description: "Servicios corporativos de alto nivel. Lanzamientos, cenas de gala y eventos institucionales con un sello de distincion.",
    label: "Corporativo",
    img: "/images/hero4.jpg",
  },
  {
    title: "Otros Eventos",
    description: "Celebraciones privadas, aniversarios y encuentros exclusivos. Transformamos cualquier ocasion en un recuerdo inolvidable.",
    label: "Celebración",
    img: "/images/DSC05145.jpg",
  },
]

export function ServiceTypes() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MagicBento
          cards={serviceCards}
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={290}
          particleCount={12}
          glowColor="234, 179, 8"
          disableAnimations={false}
        />
      </div>
    </section>
  )
}
