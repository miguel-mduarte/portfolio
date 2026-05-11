import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground flex items-center gap-2">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> por
            Desenvolvedor & Designer
          </p>

          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
