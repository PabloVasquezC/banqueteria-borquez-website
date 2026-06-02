"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { staggerContainer, slideUp } from "@/lib/animation-utils"
import { TiltCard } from "./tilt-card"

export const services = [
  {
    title: "Matrimonios y Celebraciones de Amor",
    description:
      `Haz realidad uno de los momentos más importantes de tu vida en un entorno natural, elegante y exclusivo. Contamos con espacios especialmente diseñados para ceremonias al aire libre, cócteles, cenas y celebraciones, combinando infraestructura de primer nivel, gastronomía de excelencia y una atención cuidadosamente planificada.

Incluye espacios para ceremonia, cóctel y recepción, banquetería personalizada, montaje, decoración, estacionamiento privado, coordinación integral del evento y todo lo necesario para que tú y tus invitados disfruten una experiencia inolvidable.`,
    image: "/images/DSC04879.jpg",
  },
  {
    title: "Celebraciones Familiares",
    description:
      `Celebra los momentos más importantes junto a quienes más quieres en un entorno acogedor, seguro y lleno de encanto. Esta experiencia es ideal para cumpleaños, bautizos, aniversarios, fiestas de quince años, reuniones familiares y cualquier ocasión especial que merezca ser recordada.

Incluye salón equipado, mobiliario, áreas verdes, banquetería personalizada, servicio de bar, decoración según la temática elegida, personal de apoyo y coordinación para que cada detalle contribuya a una celebración única.`,
    image: "/images/DSC04969.jpg",
  },
  {
    title: "Galas y Licenciaturas",
    description:
      `Reconoce y celebra el cierre de una etapa significativa con una experiencia elegante y memorable. Diseñado especialmente para galas de Octavo Básico, Cuarto Medio, titulaciones y ceremonias de reconocimiento institucional.

Incluye salón elegantemente ambientado, montaje para estudiantes, familias e invitados, servicio de banquetería, pista de baile, espacios para fotografías, producción técnica y coordinación integral del evento.`,
    image: "/images/DSC04968.jpg",
  },
  {
    title: "Eventos Corporativos y Empresariales",
    description:
      `Espacios diseñados para potenciar la imagen y los objetivos de tu organización. Ideal para aniversarios de empresa, lanzamientos de productos, reuniones estratégicas, celebraciones institucionales, premiaciones, seminarios y encuentros corporativos.

Incluye salones equipados, mobiliario, apoyo logístico, equipamiento audiovisual según requerimientos, servicio de alimentación, coffee break, cócteles o cenas corporativas, además de acompañamiento profesional durante toda la actividad.`,
    image: "/images/hero3.jpg",
  },
  {
    title: "Jornadas de Capacitación y Seminarios",
    description:
      `Ambientes especialmente preparados para el aprendizaje, la formación y el desarrollo de equipos de trabajo. Una alternativa ideal para capacitaciones, talleres, cursos, jornadas estratégicas y actividades de integración empresarial.

Incluye salón equipado, mobiliario, apoyo técnico y logístico, conectividad, coffee break y opciones de desayuno, almuerzo, cena o servicios gastronómicos adaptados a la duración de la actividad.`,
    image: "/images/DSC04928.jpg",
  },
  {
    title: "Servicios Gastronómicos Corporativos",
    description:
      `Complementa tus reuniones y eventos con propuestas gastronómicas diseñadas para sorprender a tus invitados y potenciar la experiencia de los asistentes.

Coffee Break Gourmet
Selección de café, té, infusiones, jugos, bebidas, pastelería artesanal y bocados dulces y salados, presentados con una propuesta elegante y profesional.

Desayunos Ejecutivos
Una alternativa ideal para reuniones matinales, encuentros empresariales o celebraciones especiales. Incluye variedad de preparaciones dulces y saladas, café, té, jugos naturales y atención personalizada en un entorno cómodo y acogedor.`,
    image: "/images/DSC04913.jpg",
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
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 whitespace-pre-line">
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
