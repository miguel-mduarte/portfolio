<?php
/**
 * Portfolio Manager - Security & Testing Functions
 * Adicione este código ao final do portfolio-manager.php
 */

// Security: Disable XML-RPC if not needed
add_filter('xmlrpc_enabled', '__return_false');

// Security: Remove WordPress version from head
remove_action('wp_head', 'wp_generator');

// Security: Disable file editing from admin
define('DISALLOW_FILE_EDIT', true);

// Testing function to verify API endpoints
function portfolio_test_api_endpoints() {
    $endpoints = array(
        '/wp/v2/portfolio_projects' => 'Portfolio Projects',
        '/wp/v2/portfolio_services' => 'Services',
        '/wp/v2/portfolio_pages?slug=hero' => 'Hero Page',
        '/wp/v2/portfolio_pages?slug=about' => 'About Page',
        '/wp/v2/portfolio_pages?slug=contact' => 'Contact Page',
    );

    $results = array();

    foreach ($endpoints as $endpoint => $name) {
        $url = get_site_url() . '/wp-json' . $endpoint;
        $response = wp_remote_get($url);

        if (is_wp_error($response)) {
            $results[$name] = 'ERROR: ' . $response->get_error_message();
        } else {
            $code = wp_remote_retrieve_response_code($response);
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);

            if ($code === 200) {
                $count = is_array($data) ? count($data) : (isset($data['id']) ? 1 : 0);
                $results[$name] = "✅ OK - {$count} items found";
            } else {
                $results[$name] = "❌ HTTP {$code}";
            }
        }
    }

    return $results;
}

// Add testing page to admin
add_action('admin_menu', 'portfolio_add_test_page');
function portfolio_add_test_page() {
    add_submenu_page(
        'portfolio-manager',
        'API Test',
        'API Test',
        'manage_options',
        'portfolio-api-test',
        'portfolio_api_test_page'
    );
}

function portfolio_api_test_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have sufficient permissions to access this page.'));
    }

    $results = portfolio_test_api_endpoints();

    ?>
    <div class="wrap">
        <h1>Portfolio API Test</h1>
        <p>Teste se todas as APIs estão funcionando corretamente.</p>

        <div class="portfolio-api-test-results">
            <h3>Resultados do Teste:</h3>
            <ul>
                <?php foreach ($results as $endpoint => $result): ?>
                    <li><strong><?php echo esc_html($endpoint); ?>:</strong> <?php echo esc_html($result); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>

        <div class="portfolio-api-test-urls">
            <h3>URLs de Teste Direto:</h3>
            <ul>
                <li><a href="<?php echo get_site_url(); ?>/wp-json/wp/v2/portfolio_projects" target="_blank">Projetos API</a></li>
                <li><a href="<?php echo get_site_url(); ?>/wp-json/wp/v2/portfolio_services" target="_blank">Serviços API</a></li>
                <li><a href="<?php echo get_site_url(); ?>/wp-json/wp/v2/portfolio_pages?slug=hero" target="_blank">Hero Page API</a></li>
                <li><a href="<?php echo get_site_url(); ?>/wp-json/acf/v3/options/portfolio_settings" target="_blank">ACF Options API</a></li>
            </ul>
        </div>

        <style>
            .portfolio-api-test-results {
                background: #f9f9f9;
                border: 1px solid #ddd;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
            }
            .portfolio-api-test-results ul {
                list-style: none;
                padding: 0;
            }
            .portfolio-api-test-results li {
                padding: 5px 0;
                border-bottom: 1px solid #eee;
            }
            .portfolio-api-test-results li:last-child {
                border-bottom: none;
            }
            .portfolio-api-test-urls {
                background: #fff;
                border: 1px solid #007cba;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
            }
            .portfolio-api-test-urls a {
                color: #007cba;
                text-decoration: none;
            }
            .portfolio-api-test-urls a:hover {
                text-decoration: underline;
            }
        </style>
    </div>
    <?php
}

// Add CORS headers for API requests
add_action('rest_api_init', 'portfolio_add_cors_headers');
function portfolio_add_cors_headers() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
        return $value;
    });
}

// Handle preflight OPTIONS requests
add_action('init', 'portfolio_handle_preflight');
function portfolio_handle_preflight() {
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
        exit(0);
    }
}

// Add portfolio settings to options
add_action('acf/init', 'portfolio_register_options_page');
function portfolio_register_options_page() {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    acf_add_options_page(array(
        'page_title' => 'Portfolio Settings',
        'menu_title' => 'Portfolio Settings',
        'menu_slug' => 'portfolio-settings',
        'capability' => 'manage_options',
        'redirect' => false,
        'parent_slug' => 'portfolio-manager',
    ));

    acf_add_local_field_group(array(
        'key' => 'group_portfolio_settings',
        'title' => 'Portfolio Settings',
        'fields' => array(
            array(
                'key' => 'field_portfolio_main_color',
                'label' => 'Main Color',
                'name' => 'main_color',
                'type' => 'color_picker',
                'default_value' => '#8b5cf6',
            ),
            array(
                'key' => 'field_portfolio_accent_color',
                'label' => 'Accent Color',
                'name' => 'accent_color',
                'type' => 'color_picker',
                'default_value' => '#f59e0b',
            ),
            array(
                'key' => 'field_portfolio_google_analytics',
                'label' => 'Google Analytics ID',
                'name' => 'google_analytics_id',
                'type' => 'text',
                'instructions' => 'Ex: G-XXXXXXXXXX',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'portfolio-settings',
                ),
            ),
        ),
    ));
}