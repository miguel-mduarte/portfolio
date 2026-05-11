# Guia Completo: WordPress para Iniciantes

## 📋 Pré-requisitos

Antes de começar, você precisa de:
- **Hospedagem**: SiteGround, Hostinger, ou qualquer host com cPanel/Plesk
- **Domínio**: Ex: `seunome.com` ou `portfolio.seunome.com`
- **5 minutos** de tempo

---

## 🚀 Método 1: Instalação Automática (Mais Fácil)

### Passo 1: Escolha uma Hospedagem
Recomendo **Hostinger** ou **SiteGround** - custam ~R$ 10-20/mês.

### Passo 2: Instale o WordPress Automaticamente
1. No painel da hospedagem, procure **"Auto Installer"** ou **"WordPress"**
2. Clique em **"Instalar WordPress"**
3. Preencha:
   - **Domínio**: `seuportfolio.com`
   - **Diretório**: deixe vazio (instala na raiz)
   - **Usuário Admin**: `admin` (ou seu nome)
   - **Senha**: algo forte como `MinhaSenh@123`
   - **Email**: seu email

4. Clique em **"Instalar"** ⏳ (leva 2-3 minutos)

### Passo 3: Acesse seu WordPress
- URL: `https://seuportfolio.com/wp-admin`
- Usuário: o que você criou
- Senha: a que você definiu

---

## 🔧 Método 2: Instalação Manual (Se necessário)

### Passo 1: Baixe o WordPress
```bash
# No seu computador
wget https://wordpress.org/latest.zip
unzip latest.zip
```

### Passo 2: Upload para Hospedagem
1. Acesse seu **cPanel/FTP**
2. Upload a pasta `wordpress` para `public_html/`
3. Ou use **File Manager** do cPanel

### Passo 3: Crie o Banco de Dados
1. No cPanel, vá para **"MySQL Databases"**
2. Crie banco: `wp_portfolio`
3. Crie usuário: `wp_user` com senha forte
4. Dê permissões ao usuário no banco

### Passo 4: Instale via Navegador
1. Acesse `https://seuportfolio.com`
2. Selecione idioma: **Português do Brasil**
3. Preencha dados do banco que criou
4. Configure usuário admin e senha

---

## ⚙️ Configuração Inicial do WordPress

### Passo 1: Login no Admin
- Vá para `https://seuportfolio.com/wp-admin`
- Login com suas credenciais

### Passo 2: Configurações Básicas
1. **Configurações > Geral**:
   - Título: "Portfolio - Seu Nome"
   - Descrição: "Portfólio de desenvolvimento web"

2. **Configurações > Links Permanentes**:
   - Selecione: **"Nome do post"**

3. **Configurações > Leitura**:
   - Página inicial: **"Uma página estática"**
   - Página inicial: **"Sample Page"** (vamos mudar depois)

---

## 📦 Instalação dos Plugins Necessários

### Passo 1: Instale o ACF (Advanced Custom Fields)
1. No admin: **Plugins > Adicionar Novo**
2. Pesquise: **"Advanced Custom Fields"**
3. Clique em **"Instalar Agora"** > **"Ativar"**

### Passo 2: Instale o Plugin do Portfólio
1. Baixe o arquivo `portfolio-manager.php` da pasta `wordpress-plugin/`
2. No admin: **Plugins > Adicionar Novo > Upload**
3. Selecione o arquivo `portfolio-manager.php`
4. **"Instalar Agora"** > **"Ativar"**

---

## 🎨 Configuração do Tema e Aparência

### Passo 1: Instale um Tema Básico
1. **Aparência > Temas > Adicionar Novo**
2. Pesquise: **"Twenty Twenty-One"** ou **"Astra"**
3. **Instalar** > **Ativar**

### Passo 2: Configure a Página Inicial
1. **Páginas > Adicionar Nova**
2. Título: **"Portfolio"**
3. Conteúdo: Deixe vazio (não será usado)
4. **Publicar**

5. **Configurações > Leitura**
6. Página inicial: **"Uma página estática"**
7. Página inicial: **"Portfolio"** (a que criou)

---

## 📝 Criando Conteúdo para o Portfólio

### Passo 1: Configure a Seção Hero
1. No admin: **Portfolio > Portfolio Pages**
2. Clique em **"Hero Section"**
3. Preencha os campos ACF:
   - **Hero Title**: "Miguel Duarte"
   - **Hero Subtitle**: "Desenvolvedor Full Stack"
   - **Hero Description**: "Especialista em criar experiências digitais incríveis..."
   - **CTA Text**: "Ver Projetos"
   - **CTA Link**: "#projects"
   - **Social Links**: Adicione GitHub, LinkedIn, etc.
   - **CV URL**: "https://seuportfolio.com/wp-content/uploads/cv.pdf"
4. **Atualizar**

### Passo 2: Adicione Projetos
1. **Portfolio > Portfolio Projects > Add New**
2. Título: **"E-commerce Moderno"**
3. Conteúdo: Descrição detalhada
4. **Imagem Destacada**: Upload uma imagem do projeto
5. Campos ACF:
   - **Project URL**: "https://github.com/seuuser/projeto"
   - **Tags**: "React, Node.js, E-commerce"
   - **Featured**: Marque se é destaque
6. **Publicar**

### Passo 3: Adicione Serviços
1. **Portfolio > Services > Add New**
2. Título: **"Desenvolvimento Web"**
3. Conteúdo: Descrição do serviço
4. Campos ACF:
   - **Icon**: "Code" (nome do ícone Lucide)
   - **Featured**: Marque se é destaque
5. **Publicar**

### Passo 4: Configure About e Contact
1. **Portfolio > Portfolio Pages**
2. Edite **"About Section"** e **"Contact Section"**
3. Preencha todos os campos ACF

---

## 🔗 Conectando com o React

### Passo 1: Configure o .env
No seu projeto React, edite o arquivo `.env`:

```env
VITE_WORDPRESS_URL=https://seuportfolio.com
VITE_WORDPRESS_API_BASE=/wp-json/wp/v2
VITE_WORDPRESS_ACF_BASE=/wp-json/acf/v3
```

### Passo 2: Teste a Conexão
1. Execute `npm run dev`
2. Abra o navegador
3. Verifique se os projetos aparecem

---

## 🛠️ Solução de Problemas

### Erro: "REST API não encontrado"
- Vá para **Configurações > Links Permanentes**
- Clique em **"Salvar alterações"** (sem mudar nada)

### Erro: "ACF campos não aparecem"
- Certifique-se que o plugin ACF está ativado
- Vá para **Custom Fields** no admin para verificar

### Erro: "Conteúdo não carrega no React"
- Verifique se a URL no `.env` está correta
- Abra `https://seuportfolio.com/wp-json/wp/v2/portfolio_projects` no navegador
- Deve retornar JSON com seus projetos

### Erro: "CORS bloqueando requests"
Adicione ao `functions.php` do tema:

```php
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
```

---

## 📞 Precisa de Ajuda?

Se tiver problemas:

1. **Verifique os logs**: No cPanel, veja **"Error Log"**
2. **Teste APIs**: Acesse URLs como `/wp-json/wp/v2/portfolio_projects`
3. **Console do navegador**: Abra DevTools (F12) no React
4. **Plugins conflitantes**: Desative outros plugins para testar

---

## 🎯 Próximos Passos

Após configurar:
1. **Personalize o tema** WordPress (opcional)
2. **Adicione mais projetos** conforme trabalha
3. **Configure backup automático** na hospedagem
4. **Monitore o tráfego** com Google Analytics

**Parabéns!** Agora você tem um portfólio totalmente gerenciável via WordPress! 🚀