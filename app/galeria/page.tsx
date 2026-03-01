"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import MagicBento, { BentoCardProps } from "@/components/MagicBento"
import Image from "next/image"

// Full list of high‑res gallery images that actually exist in public/images
// (any filenames removed from the repo were deleted from the array)
const galleryImages = [
    { src: "/images/DSC04852.jpg", alt: "Evento Borquez 1", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04856.jpg", alt: "Evento Borquez 2", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04860.jpg", alt: "Evento Borquez 3", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04862.jpg", alt: "Evento Borquez 4", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04864.jpg", alt: "Evento Borquez 5", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04865.jpg", alt: "Evento Borquez 6", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04872.jpg", alt: "Evento Borquez 7", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04876.jpg", alt: "Evento Borquez 8", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC04879.jpg", alt: "Evento Borquez 9", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/DSC05002.jpg", alt: "Evento Borquez 10", span: "md:col-span-1 md:row-span-1" },
]

export default function GalleryPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        // Simulate loading delay for skeleton effect
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Map existing images to MagicBento format
    // (galleryImages has already been pruned of deleted files above)
    const galleryCards: BentoCardProps[] = galleryImages.map((img, index) => ({
        title: `Evento ${index + 1}`,
        description: 'Banquetería y Eventos Borquez',
        label: 'Galería',
        img: img.src,
        span: img.span,
        textAutoHide: true,
    }))

    return (
        <main className="min-h-screen bg-background">
            {/* Floating back button */}
            <button
                onClick={() => router.back()}
                className="fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full bg-black/90 border border-yellow-600/70 px-5 py-3 text-sm font-semibold text-yellow-500 shadow-[0_0_20px_rgba(161,122,40,0.3)] hover:shadow-[0_0_28px_rgba(161,122,40,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 group backdrop-blur-sm"
                aria-label="Volver atrás"
            >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                Volver
            </button>
            {/* Header */}
            <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
                <Image
                    src={galleryImages[0]?.src || "/images/hero0.jpg"}
                    alt="Galeria portada"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
                <div className="relative z-10 text-center px-6">

                    <h1 className="font-serif text-5xl md:text-7xl text-foreground text-balance drop-shadow-xl">
                        Nuestra Galeria
                    </h1>
                </div>
            </section>

            <section className="py-24 px-4 lg:px-8">
                <MagicBento
                    cards={galleryCards}
                    textAutoHide={true}
                    enableStars={true} // Enabled stars as requested
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={false} // Click effect can stay
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={6}
                    glowColor="234, 179, 8" // Gold
                    disableAnimations={false}
                    isLoading={isLoading} // Pass loading state
                    hideText={true} // Hide text as requested
                    onCardClick={(index) => setSelectedImage(galleryImages[index].src)}
                    enableEntrance={false} // Disable entrance animation as requested
                />
            </section>

            <Footer />


            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50 bg-black/20 rounded-full hover:bg-black/40"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            layoutId={selectedImage}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Galeria full screen"
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
