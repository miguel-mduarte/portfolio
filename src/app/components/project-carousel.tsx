import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Project {
  id: string;
  title: string;
  description: string;
  content: any[];
  image: string;
  galleryImages: string[];
  link: string;
  tags: string[];
  featured?: boolean;
  order?: number;
}

interface ProjectCarouselProps {
  projects: Project[];
  onMoreClick: (project: Project) => void;
}

export function ProjectCarousel({ projects, onMoreClick }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 5000);
  };

  const handlePrevious = () => {
    paginate(-1);
    resetAutoPlay();
  };

  const handleNext = () => {
    paginate(1);
    resetAutoPlay();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative h-[500px] overflow-hidden rounded-2xl bg-card border border-border">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
                resetAutoPlay();
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
                resetAutoPlay();
              }
            }}
            className="absolute w-full h-full"
          >
            <div className="grid md:grid-cols-2 h-full">
              <div
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${projects[currentIndex].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12 bg-card">
                <h3 className="mb-4">{projects[currentIndex].title}</h3>
                <p className="text-muted-foreground mb-6">
                  {projects[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onMoreClick(projects[currentIndex])}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Detalhes <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Projeto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Próximo projeto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              resetAutoPlay();
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-border hover:bg-muted-foreground"
            }`}
            aria-label={`Ir para projeto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
