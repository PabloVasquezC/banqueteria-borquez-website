"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Centros de Eventos", href: "/#centros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Galeria", href: "/galeria" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Cotizar", href: "/#cotizar" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-gold/20 shadow-lg shadow-background/10 py-2 lg:py-4"
          : "bg-transparent py-4 lg:py-6"
          }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2 group z-50 relative">
            {/* Logo Placeholder */}
            {/* <div className="h-10 w-10 relative">
               <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
             </div> */}
            <div className="flex flex-col items-start transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif text-xl tracking-wider text-gold lg:text-2xl font-bold">
                B<span className="text-gold/80 font-normal">orquez</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-gold-light/70 lg:text-[10px]">
                Banquetería
              </span>
            </div>
          </a>

          {/* Desktop */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative group">
                <a
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-foreground/80 transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          <a
            href="#cotizar"
            className="hidden rounded-none border border-gold bg-transparent px-6 py-2.5 text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground lg:inline-block"
          >
            Cotizar Evento
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gold lg:hidden z-50 relative p-2"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="absolute inset-0 bg-gold/5 pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-gold transition-colors hover:text-gold-light relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/50 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              href="#cotizar"
              onClick={() => setMobileOpen(false)}
              className="mt-8 rounded-none border border-gold bg-transparent px-8 py-3 text-sm uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-primary-foreground"
            >
              Cotizar Ahora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
