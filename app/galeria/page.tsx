"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"

// Full list of new high-res images
const galleryImages = [
    { src: "/images/DSC04852.jpg", alt: "Evento Borquez 1", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04856.jpg", alt: "Evento Borquez 2", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04860.jpg", alt: "Evento Borquez 3", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04862.jpg", alt: "Evento Borquez 4", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/DSC04864.jpg", alt: "Evento Borquez 5", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04865.jpg", alt: "Evento Borquez 6", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04867.jpg", alt: "Evento Borquez 7", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04869.jpg", alt: "Evento Borquez 8", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04872.jpg", alt: "Evento Borquez 9", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04873.jpg", alt: "Evento Borquez 10", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04876.jpg", alt: "Evento Borquez 11", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04879.jpg", alt: "Evento Borquez 12", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04882.jpg", alt: "Evento Borquez 13", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04901.jpg", alt: "Evento Borquez 14", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04904.jpg", alt: "Evento Borquez 15", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/DSC04908.jpg", alt: "Evento Borquez 16", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04910.jpg", alt: "Evento Borquez 17", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04911.jpg", alt: "Evento Borquez 18", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04913.jpg", alt: "Evento Borquez 19", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04916.jpg", alt: "Evento Borquez 20", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04923.jpg", alt: "Evento Borquez 21", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04928.jpg", alt: "Evento Borquez 22", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04943.jpg", alt: "Evento Borquez 23", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/DSC04945.jpg", alt: "Evento Borquez 24", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04948.jpg", alt: "Evento Borquez 25", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04960.jpg", alt: "Evento Borquez 26", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04966.jpg", alt: "Evento Borquez 27", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04968.jpg", alt: "Evento Borquez 28", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04969.jpg", alt: "Evento Borquez 29", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04978.jpg", alt: "Evento Borquez 30", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04984.jpg", alt: "Evento Borquez 31", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04986.jpg", alt: "Evento Borquez 32", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05002.jpg", alt: "Evento Borquez 33", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05056.jpg", alt: "Evento Borquez 34", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/DSC05074.jpg", alt: "Evento Borquez 35", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05107.jpg", alt: "Evento Borquez 36", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05124.jpg", alt: "Evento Borquez 37", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05134.jpg", alt: "Evento Borquez 38", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05145.jpg", alt: "Evento Borquez 39", span: "md:col-span-1 md:row-span-1" },
]

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
                <Image
                    src="/images/DSC05134.jpg"
                    alt="Galeria portada"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
                <div className="relative z-10 text-center px-6">
                    <span className="text-xs uppercase tracking-[0.4em] text-gold/80 block mb-4">
                        Portafolio
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl text-foreground text-balance drop-shadow-xl">
                        Nuestra Galeria
                    </h1>
                </div>
            </section>

            <section className="py-24 px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[250px]"
                >
                    {galleryImages.map((image, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${image.span} shadow-md`}
                            onClick={() => setSelectedImage(image.src)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm border border-white/20">
                                    <ZoomIn className="text-white" size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <Footer />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Galeria full screen"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
