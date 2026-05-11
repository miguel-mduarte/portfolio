# Portfólio WordPress Integration

Este projeto permite que você gerencie todo o conteúdo do seu portfólio através de um painel WordPress, mantendo o frontend em React moderno.

## 🚀 Funcionalidades

- **CRUD completo** de projetos
- **Gerenciamento de serviços** oferecidos
- **Seções dinâmicas**: Hero, About, Contact
- **Links e documentos**: CV, redes sociais, etc.
- **Interface amigável** no WordPress admin
- **API REST** para integração com React

## 📋 Pré-requisitos

- WordPress 5.0+
- PHP 7.4+
- Plugin Advanced Custom Fields (ACF) PRO ou FREE
- Site React configurado

## 🛠️ Instalação e Configuração

### 1. Instalar o Plugin no WordPress

1. Baixe o arquivo `portfolio-manager.php` da pasta `wordpress-plugin/`
2. No painel WordPress, vá em **Plugins > Adicionar Novo > Upload**
3. Faça upload do arquivo `portfolio-manager.php`
4. Ative o plugin

### 2. Instalar o ACF (Advanced Custom Fields)

1. Instale o plugin **Advanced Custom Fields** (gratuito ou PRO)
2. Ative o plugin

### 3. Configurar o Site React

1. Copie o arquivo `.env` para a raiz do seu projeto React
2. Atualize as variáveis de ambiente:

```env
# Substitua pela URL do seu site WordPress
VITE_WORDPRESS_URL=https://seusite.com

# URLs da API (geralmente não precisam mudar)
VITE_WORDPRESS_API_BASE=/wp-json/wp/v2
VITE_WORDPRESS_ACF_BASE=/wp-json/acf/v3

# Configurações padrão do portfólio
VITE_PORTFOLIO_TITLE=Seu Nome
VITE_PORTFOLIO_SUBTITLE=Desenvolvedor Full Stack
VITE_PORTFOLIO_DESCRIPTION=Sua descrição aqui
```

## 📝 Como Usar

### Gerenciando Projetos

1. No painel WordPress, vá para **Portfolio > Portfolio Projects**
2. Clique em **Add New** para criar um novo projeto
3. Preencha os campos:
   - **Title**: Nome do projeto
   - **Content**: Descrição completa
   - **Featured Image**: Imagem do projeto
   - **Project URL**: Link para o projeto
   - **Tags**: Tecnologias usadas (separadas por vírgula)
   - **Featured Project**: Marque se é um projeto destacado
   - **Order**: Ordem de exibição (número menor aparece primeiro)

### Gerenciando Serviços

1. Vá para **Portfolio > Services**
2. Adicione serviços que você oferece
3. Configure ícone (nome do Lucide icon) e se é destacado

### Configurando Seções da Página

#### Hero Section
1. Vá para **Portfolio > Portfolio Pages**
2. Edite a página "Hero Section"
3. Configure:
   - Título principal
   - Subtítulo
   - Descrição
   - Imagem de fundo
   - Texto e link do botão CTA
   - Links das redes sociais
   - URL do CV para download

#### About Section
1. Edite a página "About Section"
2. Configure:
   - Título da seção
   - Conteúdo (biografia)
   - Foto do perfil
   - Lista de habilidades
   - Experiência profissional

#### Contact Section
1. Edite a página "Contact Section"
2. Configure:
   - Título da seção
   - Descrição
   - Email de contato
   - Telefone (opcional)
   - Localização (opcional)
   - Links das redes sociais

## 🔧 Estrutura da API

### Endpoints Disponíveis

#### Projetos
```
GET /wp-json/wp/v2/portfolio_projects
```
Retorna todos os projetos com campos ACF.

#### Serviços
```
GET /wp-json/wp/v2/portfolio_services
```
Retorna todos os serviços.

#### Páginas do Portfólio
```
GET /wp-json/wp/v2/portfolio_pages?slug=hero
GET /wp-json/wp/v2/portfolio_pages?slug=about
GET /wp-json/wp/v2/portfolio_pages?slug=contact
```
Retorna o conteúdo das seções específicas.

## 🎨 Campos ACF Disponíveis

### Projeto
- `project_url`: URL do projeto
- `image`: Imagem do projeto
- `tags`: Tags separadas por vírgula
- `featured`: Boolean para projeto destacado

### Serviço
- `icon`: Nome do ícone (Lucide)
- `featured`: Boolean para serviço destacado

### Hero
- `title`: Título principal
- `subtitle`: Subtítulo
- `description`: Descrição
- `background_image`: Imagem de fundo
- `cta_text`: Texto do botão
- `cta_link`: Link do botão
- `social_github`: URL do GitHub
- `social_linkedin`: URL do LinkedIn
- `social_twitter`: URL do Twitter
- `social_instagram`: URL do Instagram
- `cv_url`: URL do CV

### About
- `title`: Título da seção
- `content`: Conteúdo HTML
- `image`: Foto do perfil
- `skills`: Array de habilidades
- `experience`: Array de experiências

### Contact
- `title`: Título da seção
- `description`: Descrição
- `email`: Email de contato
- `phone`: Telefone
- `location`: Localização
- `social_links`: Array de links sociais

## 🚀 Fazendo Deploy

### Opção 1: WordPress Hospedado
1. Hospede seu WordPress em qualquer provedor (Hostinger, SiteGround, etc.)
2. Instale o plugin conforme as instruções acima
3. Configure o `.env` do React com a URL do WordPress
4. Faça deploy do React (Vercel, Netlify, etc.)

### Opção 2: WordPress Local com Proxy
1. Rode WordPress localmente (XAMPP, MAMP, Local by Flywheel)
2. Configure CORS no WordPress para permitir requests do seu domínio React
3. Use ngrok ou similar para expor localmente

### Opção 3: Headless WordPress
1. Use serviços como WP Engine ou Kinsta para WordPress headless
2. Configure as APIs conforme documentação do provedor

## 🔒 Segurança

- O plugin cria apenas os tipos de post personalizados necessários
- Todas as APIs seguem as permissões padrão do WordPress
- Dados sensíveis são protegidos pelas configurações do WordPress
- Recomenda-se usar HTTPS em produção

## 🐛 Troubleshooting

### Erro de CORS
Adicione ao `functions.php` do seu tema:
```php
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
```

### Dados não aparecem no React
1. Verifique se a URL no `.env` está correta
2. Confirme que o plugin está ativado
3. Verifique o console do navegador para erros de rede
4. Certifique-se que os posts estão publicados

### ACF não salva campos
1. Confirme que o ACF está instalado e ativado
2. Verifique se os campos foram criados corretamente
3. Tente salvar novamente a página/post

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console do navegador
2. Confirme que todas as dependências estão instaladas
3. Teste os endpoints da API diretamente no navegador

## 📄 Licença

Este projeto é open source e pode ser usado livremente.