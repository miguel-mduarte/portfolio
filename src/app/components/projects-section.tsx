import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "./use-in-view";
import { ProjectCarousel } from "./project-carousel";
import { Loader2, LayoutGrid, Maximize2, ExternalLink, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { usePortfolioProjects, PortfolioProject } from "../../hooks/usePortfolio";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

export function ProjectsSection() {
  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  const { projects, loading } = usePortfolioProjects();

  const handleProjectSelect = (project: PortfolioProject) => {
    setSelectedProject(project);
    setSelectedIndex(projects.findIndex((p) => p.id === project.id));
    setSelectedImageIndex(0);
    setIsImageFullscreen(false);
  };

  const handleNextProject = () => {
    const nextIndex = (selectedIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
    setSelectedIndex(nextIndex);
    setSelectedImageIndex(0);
    setIsImageFullscreen(false);
  };

  const handlePrevProject = () => {
    const prevIndex = selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1;
    setSelectedProject(projects[prevIndex]);
    setSelectedIndex(prevIndex);
    setSelectedImageIndex(0);
    setIsImageFullscreen(false);
  };

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
                  <ProjectCarousel projects={projects} onMoreClick={handleProjectSelect} />
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
                      <motion.div
                        key={project.id}
                        whileHover={{ y: -4 }}
                        className="group block overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary cursor-pointer"
                        onClick={() => handleProjectSelect(project)}
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
                            <Eye className="w-4 h-4" /> Mais
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent
          className="max-w-6xl max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(event) => {
            if (isImageFullscreen) {
              event.preventDefault();
              setIsImageFullscreen(false);
            }
          }}
          onEscapeKeyDown={(event) => {
            if (isImageFullscreen) {
              event.preventDefault();
              setIsImageFullscreen(false);
            }
          }}
        >
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Carousel for gallery images */}
                {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 ? (
                  <div className="relative rounded-lg overflow-hidden bg-slate-950/5">
                    <img
                      src={selectedProject.galleryImages[selectedImageIndex]}
                      alt={`${selectedProject.title} imagem ${selectedImageIndex + 1}`}
                      className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setIsImageFullscreen(true)}
                      className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-sm font-medium text-foreground shadow-lg ring-1 ring-border transition hover:bg-background"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Tela cheia
                    </button>

                    {selectedProject.galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg ring-1 ring-border transition hover:bg-background sm:left-4"
                          aria-label="Imagem anterior"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg ring-1 ring-border transition hover:bg-background sm:right-4"
                          aria-label="Próxima imagem"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {selectedProject.galleryImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                        {selectedProject.galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`h-2 w-2 rounded-full ${idx === selectedImageIndex ? 'bg-primary' : 'bg-white/40'} transition`}
                            aria-label={`Ir para imagem ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Longer content */}
                <div className="prose prose-lg max-w-none">
                  {selectedProject.content && selectedProject.content.length > 0 ? (
                    <PortableText value={selectedProject.content} />
                  ) : (
                    <p>{selectedProject.description}</p>
                  )}
                </div>

                {/* Link */}
                {selectedProject.link && selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    Ver Projeto Completo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {isImageFullscreen && selectedProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={() => setIsImageFullscreen(false)}
            className="absolute right-4 top-4 z-[10000] inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg ring-1 ring-border transition hover:bg-background"
            aria-label="Fechar imagem em tela cheia"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedProject.galleryImages[selectedImageIndex] || selectedProject.image}
            alt={`${selectedProject.title} tela cheia`}
            className="max-h-[95vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}

      {/* Floating navigation buttons */}
      {selectedProject && (
        <>
          <button
            onClick={handlePrevProject}
            className="fixed left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg sm:left-4 sm:w-12 sm:h-12"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextProject}
            className="fixed right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg sm:right-4 sm:w-12 sm:h-12"
            aria-label="Próximo projeto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </section>
  );
}
