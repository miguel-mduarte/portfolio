# Portfólio Moderno - Desenvolvedor & Designer

Portfólio profissional com design moderno em preto, branco e roxo, com rolagem infinita suave e animações elegantes.

## ✨ Características

- 🎨 **Design Moderno**: Interface limpa com gradientes roxos e animações suaves
- 📱 **Responsivo**: Adaptado para todos os dispositivos
- 🔄 **Carrossel Customizado**: Navegação interativa de projetos com auto-play
- 📥 **Download de CV**: Botão para download do currículo
- 🌐 **Integração Sanity**: Conteúdo gerenciado via CMS headless para projetos, serviços e hero
- 📧 **Formulário de Contato**: Sistema de contato com validação
- ⚡ **Performance**: Otimizado com lazy loading e animações performáticas
- 🎯 **CMS Integrado**: Gerencie conteúdo com Sanity Studio

## 🛠️ Tecnologias

- React 18 + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Sanity CMS (headless)
- @sanity/client
- Lucide Icons
- Sonner (Toast notifications)

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd portfolio
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
VITE_SANITY_PROJECT_ID=seu_projeto_sanity
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_PORTFOLIO_TITLE=Seu Nome
VITE_PORTFOLIO_SUBTITLE=Sua Profissão
```

### 4. Adicione seu CV

Coloque seu arquivo PDF na pasta `public` com o nome `cv.pdf`.

### 5. Execute o projeto

```bash
pnpm dev
# ou
npm run dev
```

## 🌐 Integração Sanity (Recomendado)

Use o Sanity Studio para gerenciar conteúdo de forma dinâmica e abrir mão das dependências de WordPress.

### 1. Configure o Sanity Studio

1. Instale as dependências no diretório `sanity`:

```bash
cd sanity
npm install
```

2. Crie o projeto Sanity ou conecte-se a um projeto existente.
3. Atualize o arquivo `.env` na raiz com `VITE_SANITY_PROJECT_ID`.

### 2. Estrutura de Conteúdo

- **Hero**: Texto, imagem de fundo, links sociais e CTA
- **Serviços**: Título, descrição e ícone
- **Projetos**: Imagem destacada, descrição, tags e link
- **Sobre / Contato**: Dados da página principal

### 📖 Documentação Detalhada

Veja `SANITY_SETUP_GUIA.md` para instruções completas.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── hero-section.tsx      # Seção principal com dados dinâmicos
│   │   ├── projects-section.tsx  # Projetos dinâmicos do Sanity
│   │   ├── services-section.tsx  # Serviços dinâmicos
│   │   ├── about-section.tsx     # Sobre mim
│   │   ├── contact-section.tsx   # Contato
│   │   └── navigation.tsx        # Menu de navegação
│   └── App.tsx                   # Componente principal
├── hooks/
│   ├── useSanity.ts             # Hook para API Sanity
│   └── usePortfolio.ts          # Hooks específicos do portfólio
├── types/
│   └── sanity.ts                # Tipos TypeScript para Sanity
└── config/
    └── portfolio.ts             # Configurações
```

## 🎨 Personalização

### Cores e Tema

Edite `src/styles/theme.css` para personalizar cores:

```css
:root {
  --primary: #8b5cf6;    /* Roxo */
  --accent: #f59e0b;     /* Âmbar */
  --background: #000000; /* Preto */
}
```

### Fontes

As fontes Montserrat e Geist estão configuradas em `src/styles/fonts.css`.

### Animações

As animações são gerenciadas pelo Motion. Edite os componentes para personalizar.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do formulário no site ou abra uma issue no repositório.
  "https://SEU-SITE-WORDPRESS.com/wp-json/wp/v2/posts?per_page=6&_embed"
);
```

### 4. Personalize as cores (Opcional)

As cores roxas podem ser ajustadas em `src/styles/theme.css`:

```css
:root {
  --primary: #7c3aed; /* Roxo principal */
  --accent: #8b5cf6;  /* Roxo secundário */
}
```

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── navigation.tsx        # Barra de navegação
│   │   ├── hero-section.tsx      # Seção inicial
│   │   ├── about-section.tsx     # Sobre mim
│   │   ├── projects-section.tsx  # Projetos
│   │   ├── project-carousel.tsx  # Carrossel customizado
│   │   ├── contact-section.tsx   # Contato
│   │   ├── footer.tsx            # Rodapé
│   │   └── use-in-view.tsx       # Hook para animações
│   └── App.tsx                   # Componente principal
└── styles/
    └── theme.css                 # Temas e cores
```

## 🎨 Seções do Portfólio

1. **Home**: Apresentação inicial com avatar e links sociais
2. **Sobre**: Habilidades e tecnologias
3. **Projetos**: Carrossel de projetos com integração WordPress
4. **Contato**: Formulário e informações de contato

## 🔧 Customização

### Adicionar novos projetos manualmente

Edite a função `getMockProjects()` em `src/app/components/projects-section.tsx`:

```typescript
{
  id: 7,
  title: "Seu Projeto",
  description: "Descrição do projeto",
  image: "URL_DA_IMAGEM",
  link: "URL_DO_PROJETO",
  tags: ["Tag1", "Tag2"],
}
```

### Mudar links sociais

Edite em `src/app/components/hero-section.tsx`:

```typescript
<a href="https://github.com/SEU_USUARIO" ... >
<a href="https://linkedin.com/in/SEU_PERFIL" ... >
```

## 📧 Configurar Formulário de Contato

Por padrão, o formulário simula o envio. Para conectar a um backend real:

1. Edite `handleSubmit` em `src/app/components/contact-section.tsx`
2. Adicione sua lógica de envio (API, EmailJS, Formspree, etc.)

## 🎯 Funcionalidades Extras

- **Auto-play no carrossel**: Muda automaticamente a cada 5 segundos
- **Navegação por arrastar**: Arraste os projetos para navegar
- **Scroll suave**: Clique na navegação para scroll animado
- **Animações on-scroll**: Elementos aparecem ao rolar a página
- **Modo escuro**: Suporte a tema escuro via variáveis CSS

## 📝 Licença

Este projeto é livre para uso pessoal e comercial.
