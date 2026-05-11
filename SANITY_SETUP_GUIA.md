# Guia de Configuração do Sanity

Este projeto agora usa Sanity como CMS para gerenciar conteúdo do portfólio.

## 1. Instalar dependências do Sanity

No diretório raiz do projeto:

```bash
npm install @sanity/client @sanity/image-url
```

Opcional: se você quiser usar o estúdio localmente, crie um diretório `sanity` e inicialize o projeto:

```bash
mkdir sanity
cd sanity
npm init -y
npm install @sanity/cli @sanity/base @sanity/core @sanity/default-layout @sanity/default-login @sanity/desk-tool
npx sanity init
```

## 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e ajuste os valores:

```bash
cp .env.example .env
```

Em `.env`:

```env
VITE_SANITY_PROJECT_ID=seu_projeto_sanity
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_PORTFOLIO_TITLE=Seu Nome Completo
VITE_PORTFOLIO_SUBTITLE=Sua Profissão
VITE_PORTFOLIO_DESCRIPTION=Uma breve descrição sobre você e seus serviços
```

## 3. Modelos de conteúdo esperados pelo frontend

### Hero Section

- `_type`: `heroSection`
- `title`: string
- `subtitle`: string
- `description`: string
- `backgroundImage`: image
- `ctaText`: string
- `ctaLink`: string
- `socialLinks`: object com `github`, `linkedin`, `twitter`, `instagram`
- `cvUrl`: string

### Services

- `_type`: `service`
- `title`: string
- `description`: string
- `icon`: string (nome do ícone Lucide)
- `featured`: boolean
- `order`: number

### Projects

- `_type`: `project`
- `title`: string
- `slug`: slug
- `description`: string
- `mainImage`: image
- `projectUrl`: url
- `tags`: array de strings
- `featured`: boolean
- `order`: number

### About / Contact

Os dados de About e Contact podem ser armazenados como documentos tipo `aboutSection` e `contactSection`.

## 4. O que foi alterado no frontend

- `src/hooks/usePortfolio.ts` agora busca conteúdo do Sanity.
- `src/lib/sanity.ts` configura o cliente Sanity e o gerador de URLs de imagem.
- `src/lib/queries.ts` contém as consultas GROQ usadas pelo frontend.
- `src/types/sanity.ts` define os tipos de dados esperados.
- `src/app/components/projects-section.tsx` agora usa `usePortfolioProjects()`.

## 5. Como testar localmente

1. Garanta que `.env` esteja configurado.
2. Execute:

```bash
npm run dev
```

3. Abra `http://localhost:5173` e verifique se as seções carregam o conteúdo de fallback ou do Sanity.

## 6. Próximos passos

- Se desejar, crie um Studio Sanity para editar os documentos visualmente.
- Publique seus dados no dataset `production` ou no dataset usado no `.env`.
- Atualize os campos do Sanity conforme o conteúdo do portfólio.
