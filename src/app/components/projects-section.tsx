import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "./use-in-view";
import { ProjectCarousel } from "./project-carousel";
import { Loader2, LayoutGrid, Maximize2, ExternalLink } from "lucide-react";
import { usePortfolioProjects } from "../../hooks/usePortfolio";

export function ProjectsSection() {
  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const { projects, loading } = usePortfolioProjects();

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-16">
            <div className="text-center lg:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Projetos
              </h2>
              <p className="text-muted-foreground max-w-2xl lg:max-w-xl">
                Alguns dos projetos que desenvolvi. Cada um representa um desafio único
                e uma oportunidade de criar algo especial.
              </p>
            </div>

            <button
              onClick={() => setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"))}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary hover:text-primary hover:shadow-lg"
              aria-label="Alternar visualização de projetos"
            >
              {viewMode === "carousel" ? (
                <LayoutGrid className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
              {viewMode === "carousel" ? "Ver como grade" : "Ver como carrossel"}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === "carousel" ? (
                <motion.div
                  key="carousel-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCarousel projects={projects} />
                </motion.div>
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                      <motion.a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4 }}
                        className="group block overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary"
                      >
                        <div
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url(${project.image})` }}
                        >
                          <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="mb-3 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="mb-3 text-xl font-semibold text-foreground">
                            {project.title}
                          </h3>
                          <p className="mb-5 text-sm leading-6 text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="inline-flex items-center gap-2 text-primary font-semibold">
                            Ver Projeto <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
