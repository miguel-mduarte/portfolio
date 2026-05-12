import { Heart, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useContactSection } from "../../hooks/useContactSection"
import { getIcon } from "../../utils/getIcon"

export function Footer() {
  const year = new Date().getFullYear();
  const { data: contact } = useContactSection()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-primary font-semibold text-lg tracking-wide mb-3">
              PurpleRoot
            </p>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Design e desenvolvimento de experiências digitais com foco em clareza,
              performance e resultados comerciais.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Navegação
            </p>
            <ul className="space-y-3 text-sm text-foreground">
              <li>
                <a href="#home" className="transition hover:text-primary">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-primary">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#projects" className="transition hover:text-primary">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-primary">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Contato
            </p>

            <div className="space-y-4 text-sm text-foreground">

              {/* EMAIL */}
              {contact?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary transition"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {/* PHONE */}
              {contact?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-primary transition"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {/* LOCATION */}
              {contact?.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {contact.location}
                  </span>
                </div>
              )}

            </div>

            {/* CTA (MENOR E MAIS DISCRETO) */}
            {contact?.primaryCta && (
              <a
                href={contact.primaryCta.link}
                target="_blank"
                className="inline-flex mt-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                {contact.primaryCta.label}
              </a>
            )}

            {/* SOCIALS (MENOR E MAIS FOOTER-LIKE) */}
            <div className="flex gap-2 mt-4">
              {contact?.socials?.map((s: any) => {
                const Icon = getIcon(s.icon)

                return (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-muted hover:bg-primary/10 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} PurpleRoot. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2 justify-center md:justify-end">
            Feito com
            <Heart className="w-4 h-4 text-primary fill-primary" />
            por PurpleRoot
          </p>
        </div>
      </div>
    </footer>
  );
}
