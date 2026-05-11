# Quick Start - Guia Rápido

Este guia vai te ajudar a começar com seu portfólio em poucos minutos!

## 🚀 Início Rápido (5 minutos)

### 1. Adicione seu CV
Coloque seu arquivo PDF em `/public/cv.pdf`

### 2. Atualize suas informações

Abra `/src/app/components/hero-section.tsx` e edite:

```typescript
// Linha 47 - Seu título/nome
<h1>Seu Nome Aqui</h1>

// Linha 55 - Sua descrição
<p>Sua descrição profissional...</p>

// Linha 76-86 - Seus links sociais
<a href="https://github.com/SEU_USUARIO" ...>
<a href="https://linkedin.com/in/SEU_PERFIL" ...>
```

### 3. Adicione seus projetos

Opção A - Edição rápida (5 projetos em 3 minutos):

Abra `/src/app/components/projects-section.tsx` e edite a função `getMockProjects()`:

```typescript
{
  id: 1,
  title: "Seu Projeto",
  description: "Descrição do projeto...",
  image: "URL_da_imagem",
  link: "https://link-do-projeto.com",
  tags: ["React", "Node"],
}
```

Opção B - WordPress (requer configuração):
Veja `WORDPRESS_INTEGRATION.md`

### 4. Atualize seus contatos

Abra `/src/app/components/contact-section.tsx` e edite:

```typescript
// Linha 67+
<a href="mailto:seu@email.com">seu@email.com</a>
<a href="tel:+5511999999999">+55 11 99999-9999</a>
<p>Sua Cidade, País</p>
```

### 5. Pronto! 🎉

Seu portfólio está configurado! 

## 🎨 Personalização Rápida de Cores

Para mudar a cor roxa para outra cor, edite `/src/styles/theme.css`:

```css
:root {
  --primary: #7c3aed;  /* Mude esta cor */
  --accent: #8b5cf6;   /* E esta também */
}
```

Sugestões de cores:

| Cor | Primary | Accent |
|-----|---------|--------|
| 🔵 Azul | #3b82f6 | #60a5fa |
| 🟢 Verde | #10b981 | #34d399 |
| 🔴 Vermelho | #ef4444 | #f87171 |
| 🟡 Amarelo | #f59e0b | #fbbf24 |
| 🟣 Roxo (atual) | #7c3aed | #8b5cf6 |

## 📸 Adicionar Foto de Perfil

Substitua o emoji em `/src/app/components/hero-section.tsx` (linha 38):

```typescript
// Remova:
<span className="text-5xl">👨‍💻</span>

// Adicione:
<img 
  src="/avatar.jpg" 
  alt="Seu Nome" 
  className="w-full h-full rounded-full object-cover"
/>
```

E coloque sua foto em `/public/avatar.jpg`

## ⚙️ Configuração Avançada

Para configurações mais detalhadas, veja:
- `CUSTOMIZATION_GUIDE.md` - Guia completo de personalização
- `WORDPRESS_INTEGRATION.md` - Integração com WordPress
- `FEATURES.md` - Todas as funcionalidades
- `README.md` - Documentação completa

## 🌐 Deploy

### Vercel (Recomendado)
1. Faça push para GitHub
2. Conecte no Vercel
3. Deploy automático!

### Netlify
1. Arraste a pasta `dist` após build
2. Pronto!

## 💡 Dicas

✅ **Teste em mobile** - Sempre verifique no celular  
✅ **Comprima imagens** - Use TinyPNG antes de adicionar  
✅ **Mantenha simples** - Menos é mais  
✅ **Use imagens de qualidade** - Primeira impressão importa  

## ❓ Problemas Comuns

**Carrossel não funciona?**
- Verifique se as imagens carregam (URLs válidas)

**Animações lentas?**
- Desabilite ou ajuste a duração

**Formulário não envia?**
- É normal! Configure um backend (veja CUSTOMIZATION_GUIDE.md)

## 📞 Precisa de Ajuda?

Veja os arquivos de documentação:
- `README.md` - Visão geral
- `CUSTOMIZATION_GUIDE.md` - Personalização detalhada
- `FEATURES.md` - Lista de funcionalidades

Boa sorte com seu portfólio! 🚀
