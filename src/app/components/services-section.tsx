import { motion } from "motion/react";
import { usePortfolioServices } from "../../hooks/usePortfolio";
import * as LucideIcons from "lucide-react";

export function ServicesSection() {
  const { services, loading } = usePortfolioServices();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Code2;
  };

  if (loading) {
    return (
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-background to-primary/5"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
        
          <h2 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Serviços
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ofereço uma gama completa de serviços para transformar suas ideias em realidade digital.
          </p>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 flex items-center justify-center mb-4"
                  >
                    <IconComponent className="w-7 h-7 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-xl"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
