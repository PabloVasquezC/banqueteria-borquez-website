"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Send, FileDown, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { fadeIn } from "@/lib/animation-utils"
import { generarCotizacionPDF } from "@/lib/generarCotizacionPDF"

const SERVICIOS_DISPONIBLES = [
  { id: "catering", label: "Catering y alimentación" },
  { id: "coordinacion", label: "Coordinación integral del evento" },
  { id: "montaje", label: "Montaje y decoración de salón" },
  { id: "personal", label: "Personal de servicio" },
  { id: "vajilla", label: "Vajilla, cristalería y mantelería" },
  { id: "sonido", label: "Amplificación y sonido" },
  { id: "iluminacion", label: "Iluminación especial" },
  { id: "flores", label: "Flores y centros de mesa" },
  { id: "fotografia", label: "Fotografía y video" },
  { id: "transporte", label: "Transporte y traslados" },
] as const

interface FormData {
  nombre: string
  email: string
  telefono: string
  fecha: string
  tipo: string
  cantidad: string
  consultas: string
  servicios: string[]
}

const initialForm: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  fecha: "",
  tipo: "",
  cantidad: "",
  consultas: "",
  servicios: [],
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [pdfReady, setPdfReady] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendError(null)

    try {
      const res = await fetch("/api/send-cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Error al enviar la cotización")
      }

      setSubmitted(true)
      setPdfReady(true)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Error al enviar")
    } finally {
      setSending(false)
    }
  }

  const handleDescargarPDF = async () => {
    setGeneratingPDF(true)
    try {
      // Convertir IDs a labels legibles para el PDF
      const serviciosConNombre = formData.servicios.map(
        (id) => SERVICIOS_DISPONIBLES.find((s) => s.id === id)?.label ?? id
      )
      await generarCotizacionPDF({ ...formData, servicios: serviciosConNombre })
    } finally {
      setGeneratingPDF(false)
    }
  }

  return (
    <section id="cotizar" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-xm uppercase tracking-widest text-muted-foreground"
              >
                Nombre Titular
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xm uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="telefono"
                className="mb-2 block text-xm uppercase tracking-widest text-muted-foreground"
              >
                Telefono
              </label>
              <input
                id="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="+569 XXXX XXXX"
              />
            </div>
            <div>
              <label
                htmlFor="fecha"
                className="mb-2 block text-xm uppercase tracking-widest text-muted-foreground"
              >
                Fecha Evento
              </label>
              <input
                id="fecha"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                required
                value={formData.fecha}
                onChange={handleChange}
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 focus:border-gold focus:outline-none [color-scheme:dark]"
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
              value={formData.consultas}
              onChange={handleChange}
              className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
              placeholder="Cuentanos sobre tu evento..."
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
            {/* Botón enviar formulario */}
            <button
              type="submit"
              disabled={submitted || sending}
              className="group flex items-center gap-3 border border-gold bg-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:opacity-50"
            >
              {sending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Enviando...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 size={14} />
                  Enviado
                </>
              ) : (
                <>
                  Enviar Cotizacion
                  <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Botón descargar PDF — aparece solo cuando el formulario fue enviado */}
            <AnimatePresence>
              {pdfReady && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleDescargarPDF}
                  disabled={generatingPDF}
                  className="group flex items-center gap-3 border border-gold/60 bg-transparent px-10 py-4 text-xs uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 disabled:opacity-50"
                >
                  {generatingPDF ? (
                    "Generando..."
                  ) : (
                    <>
                      Descargar PDF
                      <FileDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mensajes de estado */}
          <AnimatePresence>
            {pdfReady && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"
              >
                <CheckCircle2 size={13} className="text-green-500" />
                Tu cotización fue enviada y recibirás un correo con el PDF adjunto.
              </motion.p>
            )}
            {sendError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-center text-xs text-red-400"
              >
                <AlertCircle size={13} />
                {sendError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
