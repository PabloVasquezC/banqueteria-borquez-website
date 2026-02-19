"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HomeGalleryPreview() {
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
                        className="relative grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4 pt-12">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-lg">
                                <Image src="/images/DSC04862.jpg" alt="Preview 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg">
                                <Image src="/images/DSC04913.jpg" alt="Preview 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg">
                                <Image src="/images/DSC04901.jpg" alt="Preview 3" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-lg">
                                <Image src="/images/DSC04865.jpg" alt="Preview 4" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>

                        {/* Decorative circle */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 rounded-full blur-3xl" />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
