# Integração com WordPress

Este portfólio está preparado para integração com WordPress através da API REST.

## Configuração

### 1. Configure seu site WordPress

No arquivo `src/app/components/projects-section.tsx`, atualize a URL da API:

```typescript
const response = await fetch(
  "https://SEU-SITE-WORDPRESS.com/wp-json/wp/v2/posts?per_page=6&_embed"
);
```

Substitua `SEU-SITE-WORDPRESS.com` pela URL do seu site WordPress.

### 2. Estrutura dos Posts

Os posts do WordPress devem ter:
- **Título**: Nome do projeto
- **Excerpt**: Descrição curta do projeto
- **Featured Image**: Imagem de destaque do projeto
- **Link**: URL do projeto (pode ser um Custom Field)

### 3. Custom Fields (Opcional)

Para adicionar tags aos projetos, você pode usar o plugin ACF (Advanced Custom Fields):

1. Instale o ACF no WordPress
2. Crie um campo chamado `tags` do tipo "Text"
3. O campo deve retornar um array de strings

### 4. Habilitando CORS

Se você encontrar erros de CORS, adicione este código no `functions.php` do seu tema WordPress:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

### 5. Fallback

Se a conexão com WordPress falhar, o portfólio automaticamente usará projetos de exemplo mockados.

## Formulário de Contato

Para conectar o formulário de contato ao WordPress, você pode:

1. Usar o plugin Contact Form 7 com API REST
2. Criar um endpoint customizado no WordPress
3. Usar um serviço de terceiros como Formspree ou EmailJS

### Exemplo com endpoint customizado:

No `functions.php`:

```php
add_action('rest_api_init', function () {
    register_rest_route('portfolio/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form',
    ));
});

function handle_contact_form($request) {
    $params = $request->get_json_params();
    
    $to = 'seu@email.com';
    $subject = 'Novo contato do portfólio';
    $message = "Nome: {$params['name']}\nEmail: {$params['email']}\nMensagem: {$params['message']}";
    
    wp_mail($to, $subject, $message);
    
    return new WP_REST_Response(array('success' => true), 200);
}
```

No arquivo de contato React, atualize a função `handleSubmit`:

```typescript
const response = await fetch(
  "https://SEU-SITE-WORDPRESS.com/wp-json/portfolio/v1/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);
```

## Download do CV

Coloque seu arquivo CV (PDF) na pasta `public` do projeto com o nome `cv.pdf`.
