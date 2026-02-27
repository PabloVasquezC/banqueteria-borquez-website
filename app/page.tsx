

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EventCenters } from "@/components/event-centers"
import { ServiceTypes } from "@/components/service-types"
import { ServicesGrid } from "@/components/services-grid"
import { NatureBanner } from "@/components/nature-banner"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { N8nChat } from "@/components/N8n"
import { HomeGalleryPreview } from "@/components/home-gallery-preview"

export default function Home() {
  return (
    <main>
      <Hero />
      <EventCenters />
      <ServiceTypes />
      <ServicesGrid />
      <NatureBanner />
      <HomeGalleryPreview />
      <Testimonials />
      <Footer />
      <N8nChat />
    </main>
  )
}

