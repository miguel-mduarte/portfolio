import { Download, Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { motion } from "motion/react";
import { usePortfolioHero } from "../../hooks/usePortfolio";

export function HeroSection() {
  const { data: heroData, loading } = usePortfolioHero();

  const handleDownloadCV = () => {
    const cvUrl = heroData?.cvUrl || "/cv.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV.pdf";
    link.click();
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-16 bg-muted rounded mb-4"></div>
          <div className="h-8 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      style={{
        backgroundImage: heroData?.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-black/20">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="absolute inset-0 -z-10 mx-auto max-w-3xl"
            >
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight text-primary"
            >
              {heroData?.title || "Miguel Duarte"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-accent mb-6"
            >
              {heroData?.subtitle || "Desenvolvedor & Designer"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {heroData?.description || "Criando experiências digitais incríveis com código limpo e design intuitivo."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-semibold text-lg"
              >
                <Download className="w-5 h-5" />
                Baixar CV
              </button>

              <a
                href={heroData?.ctaLink || "#contact"}
                className="inline-flex items-center gap-2 px-8 py-4 border border-primary rounded-lg hover:bg-primary/10 transition-all hover:scale-105 font-semibold text-lg"
              >
                <Mail className="w-5 h-5" />
                {heroData?.ctaText || "Entre em Contato"}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-6 mt-12"
            >
              {heroData?.socialLinks?.github && (
                <a
                  href={heroData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 flex items-center justify-center hover:border-primary hover:scale-110 transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {heroData?.socialLinks?.linkedin && (
                <a
                  href={heroData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 flex items-center justify-center hover:border-primary hover:scale-110 transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {heroData?.socialLinks?.twitter && (
                <a
                  href={heroData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 flex items-center justify-center hover:border-primary hover:scale-110 transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {heroData?.socialLinks?.instagram && (
                <a
                  href={heroData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 flex items-center justify-center hover:border-primary hover:scale-110 transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
