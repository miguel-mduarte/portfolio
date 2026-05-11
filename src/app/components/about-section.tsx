import React from "react"
import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"
import { motion } from "motion/react"
import { PortableText } from "@portabletext/react"

import { useInView } from "./use-in-view"
import { usePortfolioAbout } from "../../hooks/usePortfolio"

type IconComponent = React.ComponentType<LucideProps>

function getIcon(name: string): IconComponent {
  return (Icons as any)[name] ?? Icons.Code2
}

export function AboutSection() {
  const { ref, inView } = useInView()
  const { data: aboutData, loading } = usePortfolioAbout()

  if (loading) {
    return (
      <section
        id="about"
        className="py-20 bg-muted/30 flex items-center justify-center"
      >
        <div className="animate-pulse text-center">
          <div className="h-10 w-64 bg-muted rounded mb-4 mx-auto" />
          <div className="h-4 w-96 bg-muted rounded mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
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
              {aboutData?.title || "Sobre Mim"}
            </h2>

            <div className="text-muted-foreground max-w-2xl mx-auto prose prose-invert">
              {aboutData?.content && (
                <PortableText value={aboutData.content} />
              )}
            </div>
          </div>

          {/* SKILLS */}
          {!!aboutData?.skills?.length && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.skills.map((skill: any, index: number) => {
                const Icon = getIcon(skill.icon)

                return (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                    </div>

                    <h3 className="mb-2">
                      {skill.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {skill.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* TECHNOLOGIES */}
          {!!aboutData?.technologies?.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8"
            >
              <h3 className="mb-4">
                Tecnologias
              </h3>

              <div className="flex flex-wrap gap-3">
                {aboutData.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}