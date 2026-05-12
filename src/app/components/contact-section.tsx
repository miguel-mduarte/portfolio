import { useState } from "react"
import { motion } from "motion/react"
import { useInView } from "./use-in-view"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"

import { useContactSection } from "../../hooks/useContactSection"
import { getIcon } from "../../utils/getIcon"

export function ContactSection() {
  const { ref, inView } = useInView()
  const { data: contact, loading } = useContactSection()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) throw new Error()

    toast.success("Mensagem enviada com sucesso!")
    setFormData({ name: "", email: "", message: "" })
  } catch {
    toast.error("Erro ao enviar mensagem.")
  } finally {
    setIsSubmitting(false)
  }
}

  if (loading) return null

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {contact?.title}
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              {contact?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* INFO */}
            <div>
              <h3 className="mb-6">Informações de Contato</h3>

              <div className="space-y-6">
                {/* EMAIL */}
                <div className="flex gap-4">
                  <Mail className="text-primary" />
                  <a href={`mailto:${contact?.email}`}>
                    {contact?.email}
                  </a>
                </div>

                {/* PHONE */}
                <div className="flex gap-4">
                  <Phone className="text-primary" />
                  <a href={`tel:${contact?.phone}`}>
                    {contact?.phone}
                  </a>
                </div>

                {/* LOCATION */}
                <div className="flex gap-4">
                  <MapPin className="text-primary" />
                  <p>{contact?.location}</p>
                </div>
              </div>

              {/* CTA */}
              {contact?.primaryCta && (
                <a
                  href={contact.primaryCta.link}
                  target="_blank"
                  className="inline-flex mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  {contact.primaryCta.label}
                </a>
              )}

              {/* SOCIALS */}
              <div className="flex gap-3 mt-6">
                {contact?.socials?.map((s: any) => {
                  const Icon = getIcon(s.icon)

                  return (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-primary/10"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>

              {/* TEXT */}
              <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
                <p className="text-muted-foreground">
                  {contact?.availabilityText}
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
                className="w-full p-3 bg-background border rounded-lg"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 bg-background border rounded-lg"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mensagem"
                rows={6}
                className="w-full p-3 bg-background border rounded-lg"
              />

              <button
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}