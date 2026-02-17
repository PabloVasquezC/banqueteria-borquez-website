import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EventCenters } from "@/components/event-centers"
import { ServiceTypes } from "@/components/service-types"
import { ServicesGrid } from "@/components/services-grid"
import { NatureBanner } from "@/components/nature-banner"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EventCenters />
      <ServiceTypes />
      <ServicesGrid />
      <NatureBanner />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}
