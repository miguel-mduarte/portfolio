# Guia de Personalização do Portfólio

Este guia fornece instruções detalhadas sobre como personalizar cada aspecto do seu portfólio.

## 🎨 Cores e Tema

### Alterar as cores principais

Edite `/src/styles/theme.css`:

```css
:root {
  /* Cor primária (roxo) */
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
  
  /* Cor de acento (roxo claro) */
  --accent: #8b5cf6;
  --accent-foreground: #ffffff;
  
  /* Outras cores podem ser ajustadas conforme necessário */
}
```

### Cores sugeridas por paleta:

**Azul profissional:**
```css
--primary: #3b82f6;
--accent: #60a5fa;
```

**Verde moderno:**
```css
--primary: #10b981;
--accent: #34d399;
```

**Rosa criativo:**
```css
--primary: #ec4899;
--accent: #f472b6;
```

## 👤 Informações Pessoais

### Hero Section (Apresentação Inicial)

Edite `/src/app/components/hero-section.tsx`:

```typescript
// Linha ~47 - Título
<h1>Seu Nome ou Profissão</h1>

// Linha ~55 - Descrição
<p>Sua descrição profissional personalizada aqui...</p>

// Linha ~76 - Links Sociais
<a href="https://github.com/SEU_USUARIO" ...>
<a href="https://linkedin.com/in/SEU_PERFIL" ...>
```

### Adicionar mais redes sociais:

```typescript
import { Instagram, Twitter } from "lucide-react";

// Adicione no retorno do componente
<a
  href="https://instagram.com/seu_usuario"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
  aria-label="Instagram"
>
  <Instagram className="w-5 h-5" />
</a>
```

### Mudar o avatar

Substitua o emoji (linha ~38):
```typescript
<span className="text-5xl">👨‍💻</span>
```

Por uma imagem real:
```typescript
<img 
  src="/avatar.jpg" 
  alt="Seu Nome" 
  className="w-full h-full rounded-full object-cover"
/>
```

## 💼 Seção Sobre

Edite `/src/app/components/about-section.tsx`:

### Mudar habilidades (linha ~11):

```typescript
const skills = [
  {
    icon: SeuIcone, // Importe de lucide-react
    title: "Sua Habilidade",
    description: "Descrição da habilidade",
  },
  // Adicione mais...
];
```

### Adicionar/remover tecnologias (linha ~56):

```typescript
{["React", "TypeScript", "Sua Tech"].map((tech) => (
  <span key={tech}>...</span>
))}
```

## 🚀 Projetos

### Opção 1: Projetos Manuais

Edite `/src/app/components/projects-section.tsx`, função `getMockProjects()`:

```typescript
{
  id: 1,
  title: "Nome do Projeto",
  description: "Descrição detalhada do projeto...",
  image: "URL_DA_IMAGEM", // Pode ser URL externa ou local
  link: "https://link-do-projeto.com",
  tags: ["React", "Node.js", "MongoDB"],
}
```

### Opção 2: WordPress

1. Configure um site WordPress
2. Crie posts para cada projeto
3. Adicione imagem destacada
4. Atualize a URL da API (linha ~23):

```typescript
const response = await fetch(
  "https://SEU-SITE.com/wp-json/wp/v2/posts?per_page=6&_embed"
);
```

### Usar imagens locais:

1. Coloque imagens em `/public/projects/`
2. Referencie assim:

```typescript
image: "/projects/projeto1.jpg"
```

### Desabilitar auto-play do carrossel:

Em `/src/app/components/project-carousel.tsx`, comente as linhas 41-48:

```typescript
// useEffect(() => {
//   autoPlayRef.current = setInterval(() => {
//     paginate(1);
//   }, 5000);
//   return () => {
//     if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//   };
// }, [currentIndex]);
```

## 📧 Contato

Edite `/src/app/components/contact-section.tsx`:

### Informações de contato (linha ~67):

```typescript
<a href="mailto:seu@email.com">
  seu@email.com
</a>

<a href="tel:+5511999999999">
  +55 11 99999-9999
</a>

<p>Sua Cidade, País</p>
```

### Conectar formulário a serviço de email:

#### Usando EmailJS:

1. Crie conta em emailjs.com
2. Instale: `pnpm add @emailjs/browser`
3. Atualize a função `handleSubmit`:

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    );

    toast.success("Mensagem enviada com sucesso!");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    toast.error("Erro ao enviar mensagem.");
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Usando Formspree:

1. Crie conta em formspree.io
2. Atualize:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

if (response.ok) {
  toast.success("Mensagem enviada!");
  setFormData({ name: "", email: "", message: "" });
}
```

## 📥 Download do CV

1. Coloque seu CV em `/public/cv.pdf`
2. Para mudar o nome do arquivo ou formato:

Edite `/src/app/components/hero-section.tsx` (linha ~8):

```typescript
const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = "/meu-curriculo.pdf"; // Seu arquivo
  link.download = "Seu_Nome_CV.pdf"; // Nome do download
  link.click();
};
```

## 🎭 Animações

### Desabilitar animações:

Remova os componentes `motion` e substitua por `div`:

```typescript
// De:
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// Para:
<div>
```

### Ajustar velocidade das animações:

Em qualquer componente Motion, ajuste `duration`:

```typescript
transition={{ duration: 0.6 }} // Mais lento
transition={{ duration: 0.3 }} // Mais rápido
```

### Mudar intervalo do carrossel:

Em `/src/app/components/project-carousel.tsx` (linha 44):

```typescript
}, 5000); // 5 segundos - ajuste conforme desejado
```

## 📱 Responsividade

As classes do Tailwind CSS já tornam o site responsivo, mas você pode ajustar:

```typescript
// Ocultar em mobile:
className="hidden md:block"

// Mostrar apenas em mobile:
className="block md:hidden"

// Layouts diferentes:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 🔧 SEO (Meta Tags)

Adicione meta tags criando `/public/index.html` ou usando React Helmet:

```bash
pnpm add react-helmet-async
```

Em `App.tsx`:

```typescript
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Seu Nome - Desenvolvedor & Designer</title>
  <meta name="description" content="Sua descrição para SEO" />
  <meta property="og:title" content="Seu Nome - Portfolio" />
  <meta property="og:description" content="Sua descrição" />
  <meta property="og:image" content="URL_DA_IMAGEM" />
</Helmet>
```

## 📊 Analytics

### Google Analytics:

1. Instale: `pnpm add react-ga4`
2. Em `App.tsx`:

```typescript
import ReactGA from 'react-ga4';

useEffect(() => {
  ReactGA.initialize('G-XXXXXXXXXX');
  ReactGA.send("pageview");
}, []);
```

## 🌐 Deploy

### Vercel:
```bash
pnpm add -D vercel
pnpm vercel
```

### Netlify:
Arraste a pasta `dist` após build no netlify.com

### GitHub Pages:
Configure no `vite.config.ts`:
```typescript
base: '/nome-do-repo/'
```

## 💡 Dicas

1. **Backup**: Faça backup antes de mudanças grandes
2. **Teste**: Sempre teste em diferentes dispositivos
3. **Otimização**: Comprima imagens antes de usar
4. **Consistência**: Mantenha o mesmo estilo visual
5. **Acessibilidade**: Sempre use `aria-label` em botões sem texto
