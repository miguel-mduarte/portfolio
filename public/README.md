# Estrutura de Assets Públicos

## Organização de Pastas

```
public/
├── logo/
│   ├── logo.png          # Logo principal do portfólio (será usado no header)
│   └── logo-dark.png     # Logo para tema escuro (opcional)
│
├── images/
│   ├── projects/         # Screenshots e imagens de projetos
│   ├── about/           # Imagens da seção sobre
│   └── services/        # Imagens dos serviços (opcional)
│
├── documents/
│   └── cv.pdf           # Currículo em PDF (para download)
│
└── favicon.ico          # Ícone do navegador
```

## Como usar

- **Logo**: O arquivo `public/logo/logo.png` é automaticamente carregado no header
- **CV**: Coloque seu currículo em `public/documents/cv.pdf` para que o botão de download funcione
- **Imagens**: Organizadas por seção para melhor manutenção

## Dimensões recomendadas

- **Logo**: 1:1 aspect ratio, mínimo 256x256px
- **Project Images**: 16:9 aspect ratio, mínimo 1200x675px
- **CV**: Qualquer tamanho (recomendado PDF otimizado)
