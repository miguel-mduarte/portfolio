import { Code2, Palette, Rocket, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "./use-in-view";

export function AboutSection() {
  const { ref, inView } = useInView();

  const skills = [
    {
      icon: Code2,
      title: "Desenvolvimento",
      description: "React, TypeScript, Node.js, e tecnologias web modernas",
    },
    {
      icon: Palette,
      title: "Design",
      description: "UI/UX, Figma, design systems e interfaces responsivas",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Otimização, SEO e melhores práticas de desenvolvimento",
    },
    {
      icon: Zap,
      title: "Agilidade",
      description: "Metodologias ágeis, entrega contínua e qualidade",
    },
  ];

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
          <div className="text-center mb-16">
            <h2 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sou um profissional apaixonado por transformar ideias em realidade
              através do código e do design. Com experiência em desenvolvimento
              full-stack e design de interfaces, crio soluções completas e inovadoras.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <skill.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8"
          >
            <h3 className="mb-4">Tecnologias</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "Next.js",
                "Figma",
                "Git",
                "WordPress",
                "MongoDB",
                "PostgreSQL",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
