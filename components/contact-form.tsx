"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="cotizar" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
            Contacto
          </span>
          <h2 className="mt-4 font-serif text-3xl text-foreground md:text-5xl">
            Cotiza tu Evento
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {"Seras contactado por nuestro equipo dentro de las proximas 24 horas"}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Nombre Titular
              </label>
              <input
                id="nombre"
                type="text"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="telefono"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Telefono
              </label>
              <input
                id="telefono"
                type="tel"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="9 digitos"
              />
            </div>
            <div>
              <label
                htmlFor="fecha"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Fecha Evento
              </label>
              <input
                id="fecha"
                type="date"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 focus:border-gold focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="tipo"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Tipo de Evento
              </label>
              <select
                id="tipo"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 focus:border-gold focus:outline-none"
              >
                <option value="" className="bg-background text-foreground">Selecciona...</option>
                <option value="matrimonio" className="bg-background text-foreground">Matrimonio</option>
                <option value="empresa" className="bg-background text-foreground">Evento Corporativo</option>
                <option value="aniversario" className="bg-background text-foreground">Aniversario</option>
                <option value="otro" className="bg-background text-foreground">Otro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="cantidad"
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                {"Cantidad de Invitados (min 80)"}
              </label>
              <input
                id="cantidad"
                type="number"
                min={80}
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="80"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="consultas"
              className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
            >
              Consultas u Observaciones
            </label>
            <textarea
              id="consultas"
              rows={4}
              className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
              placeholder="Cuentanos sobre tu evento..."
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={submitted}
              className="group flex items-center gap-3 border border-gold bg-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:opacity-50"
            >
              {submitted ? "Enviado" : "Enviar Cotizacion"}
              <Send
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
