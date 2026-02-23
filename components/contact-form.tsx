"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Send, FileDown, CheckCircle2 } from "lucide-react"
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
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [pdfReady, setPdfReady] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setPdfReady(true)
    setTimeout(() => setSubmitted(false), 4000)
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
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
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
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
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
                className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
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
                value={formData.fecha}
                onChange={handleChange}
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
                value={formData.tipo}
                onChange={handleChange}
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
                value={formData.cantidad}
                onChange={handleChange}
                className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
                placeholder="80"
              />
            </div>
          </div>

          {/* Servicios requeridos */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              Servicios Requeridos
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICIOS_DISPONIBLES.map((srv) => (
                <label
                  key={srv.id}
                  className="flex cursor-pointer items-center gap-3 group"
                >
                  <input
                    type="checkbox"
                    value={srv.id}
                    checked={formData.servicios.includes(srv.id)}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        servicios: e.target.checked
                          ? [...prev.servicios, srv.id]
                          : prev.servicios.filter((s) => s !== srv.id),
                      }))
                    }}
                    className="h-4 w-4 shrink-0 accent-[hsl(var(--gold,_38_61%_50%))] cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {srv.label}
                  </span>
                </label>
              ))}
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
              disabled={submitted}
              className="group flex items-center gap-3 border border-gold bg-gold px-10 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:opacity-50"
            >
              {submitted ? (
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

          {/* Nota informativa sobre el PDF */}
          <AnimatePresence>
            {pdfReady && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-muted-foreground"
              >
                ✓ Tu cotización fue enviada. También puedes descargar una copia en PDF.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
