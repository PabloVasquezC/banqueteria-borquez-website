"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import MagicBento from "@/components/MagicBento"

export function HomeGalleryPreview() {
    const previewCards = [
        {
            title: 'Matrimonios',
            description: 'Creamos la boda de tus sueños',
            label: 'Banquetería',
            img: '/images/DSC04862.jpg',
            span: 'md:col-span-2 md:row-span-2'
        },
        {
            title: 'Corporativos',
            description: 'Eventos empresariales de alto nivel',
            label: 'Empresas',
            img: '/images/hero-1.jpg'
        },
        {
            title: 'Cenas Privadas',
            description: 'Experiencias gastronómicas exclusivas',
            label: 'Exclusivo',
            img: '/images/DSC04913.jpg'
        },
        {
            title: 'Graduaciones',
            description: 'Celebra tus logros con estilo',
            label: 'Fiestas',
            img: '/images/DSC04901.jpg'
        },
        {
            title: 'Cumpleaños',
            description: 'Momentos inolvidables con amigos',
            label: 'Celebración',
            img: '/images/DSC04865.jpg'
        }
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-secondary/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
                            Nuestro Portafolio
                        </span>
                        <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl lg:text-6xl text-balance">
                            Momentos que <span className="text-gold">Inspiran</span>
                        </h2>
                        <div className="mt-6 h-px w-24 bg-gold/40" />
                        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                            Cada evento es una obra de arte unica. Te invitamos a recorrer nuestra galeria y descubrir la magia, elegancia y detalle que ponemos en cada celebracion.
                            Desde matrimonios de ensueño hasta eventos corporativos de alto nivel.
                        </p>

                        <a
                            href="/galeria"
                            className="group mt-10 inline-flex items-center gap-2 rounded-none border border-gold px-8 py-3 text-sm uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-white"
                        >
                            Ver Galeria Completa
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full"
                    >
                        <MagicBento
                            cards={previewCards}
                            textAutoHide={false}
                            enableStars
                            enableSpotlight
                            enableBorderGlow={true}
                            enableTilt
                            enableMagnetism={false}
                            clickEffect
                            spotlightRadius={290}
                            particleCount={12}
                            glowColor="234, 179, 8" // Changed to Gold to match theme (original was purple 132, 0, 255)
                            disableAnimations={false}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
