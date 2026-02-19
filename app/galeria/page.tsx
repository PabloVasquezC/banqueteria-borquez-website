"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import MagicBento, { BentoCardProps } from "@/components/MagicBento"
import Image from "next/image"

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
    // Map existing images to MagicBento format
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

            <section className="py-24 px-4 lg:px-8">
                <MagicBento
                    cards={galleryCards}
                    textAutoHide={true}
                    enableStars={false} // Disable stars for cleaner gallery look
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={false} // Click effect can stay
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={6}
                    glowColor="234, 179, 8" // Gold
                    disableAnimations={false}
                />
            </section>

            <Footer />
        </main>
    )
}
