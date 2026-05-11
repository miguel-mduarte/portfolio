# Como Continuar o Projeto do Portfólio no Notebook

Para continuar o projeto do portfólio em outro dispositivo (como seu notebook), siga estes passos simples. O projeto está hospedado no GitHub em `https://github.com/miguel-mduarte/portfolio.git`, então você pode cloná-lo e executá-lo localmente.

## Pré-requisitos
- **Git**: Instale o Git se não tiver (baixe de [git-scm.com](https://git-scm.com)).
- **Node.js**: Instale a versão 18 ou superior (baixe de [nodejs.org](https://nodejs.org)). Isso inclui o npm.
- **Editor de código**: Recomendo o VS Code (baixe de [code.visualstudio.com](https://code.visualstudio.com)).

## Passos para configurar no seu notebook

1. **Clone o repositório**:
   Abra o terminal (ou Git Bash) no seu notebook e execute:
   ```bash
   git clone https://github.com/miguel-mduarte/portfolio.git
   cd portfolio
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente** (opcional, mas recomendado para usar o Sanity):
   - Copie o arquivo de exemplo: `cp .env.example .env`
   - Edite o `.env` com suas configurações:
     ```env
     VITE_SANITY_PROJECT_ID=seu_projeto_sanity  # Substitua pelo ID do seu projeto Sanity (se tiver)
     VITE_SANITY_DATASET=production
     VITE_SANITY_API_VERSION=2024-01-01
     VITE_PORTFOLIO_TITLE=Seu Nome Completo
     VITE_PORTFOLIO_SUBTITLE=Sua Profissão
     VITE_PORTFOLIO_DESCRIPTION=Uma breve descrição sobre você
     ```
   - Se não configurar o Sanity, o projeto usará dados de fallback (mock) e ainda funcionará.

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```
   - Abra `http://localhost:5173` no navegador para ver o portfólio rodando.

## Dicas adicionais
- **Se quiser editar conteúdo via Sanity**: Crie um projeto no [sanity.io](https://sanity.io) e configure os schemas conforme descrito em `SANITY_SETUP_GUIA.md`.
- **Para fazer mudanças**: Use `git add .`, `git commit -m "mensagem"`, e `git push` para enviar alterações de volta ao GitHub.
- **Problemas comuns**: Se der erro de build, verifique se o Node.js está atualizado. Se precisar de ajuda com Sanity, posso orientar sobre como configurar os documentos no CMS.

## Arquivos importantes no projeto
- `README.md`: Documentação geral do projeto.
- `SANITY_SETUP_GUIA.md`: Guia específico para configurar o Sanity CMS.
- `.env.example`: Exemplo de variáveis de ambiente.
- `package.json`: Dependências e scripts do projeto.

Se tiver dúvidas em algum passo ou quiser que eu ajude com algo específico (como configurar o Sanity), é só falar! 🚀