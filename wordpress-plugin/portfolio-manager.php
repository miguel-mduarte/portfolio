<?php
/**
 * Plugin Name: Portfolio Manager
 * Description: Custom plugin to manage portfolio content via REST API
 * Version: 1.0.0
 * Author: Miguel Duarte
 */

if (!defined('ABSPATH')) {
    exit;
}

class PortfolioManager {

    public function __construct() {
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('rest_api_init', array($this, 'register_rest_fields'));
        add_action('acf/init', array($this, 'register_acf_fields'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }

    /**
     * Register custom post types
     */
    public function register_post_types() {
        // Portfolio Projects
        register_post_type('portfolio_project', array(
            'labels' => array(
                'name' => 'Portfolio Projects',
                'singular_name' => 'Portfolio Project',
                'add_new' => 'Add New Project',
                'add_new_item' => 'Add New Portfolio Project',
                'edit_item' => 'Edit Portfolio Project',
                'new_item' => 'New Portfolio Project',
                'view_item' => 'View Portfolio Project',
                'search_items' => 'Search Portfolio Projects',
                'not_found' => 'No portfolio projects found',
                'not_found_in_trash' => 'No portfolio projects found in trash',
            ),
            'public' => true,
            'show_in_rest' => true,
            'rest_base' => 'portfolio_projects',
            'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
            'menu_icon' => 'dashicons-portfolio',
            'show_in_menu' => true,
        ));

        // Portfolio Services
        register_post_type('portfolio_service', array(
            'labels' => array(
                'name' => 'Services',
                'singular_name' => 'Service',
                'add_new' => 'Add New Service',
                'add_new_item' => 'Add New Service',
                'edit_item' => 'Edit Service',
                'new_item' => 'New Service',
                'view_item' => 'View Service',
                'search_items' => 'Search Services',
                'not_found' => 'No services found',
                'not_found_in_trash' => 'No services found in trash',
            ),
            'public' => true,
            'show_in_rest' => true,
            'rest_base' => 'portfolio_services',
            'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
            'menu_icon' => 'dashicons-admin-tools',
            'show_in_menu' => true,
        ));

        // Portfolio Pages (Hero, About, Contact)
        register_post_type('portfolio_page', array(
            'labels' => array(
                'name' => 'Portfolio Pages',
                'singular_name' => 'Portfolio Page',
                'add_new' => 'Add New Page',
                'add_new_item' => 'Add New Portfolio Page',
                'edit_item' => 'Edit Portfolio Page',
                'new_item' => 'New Portfolio Page',
                'view_item' => 'View Portfolio Page',
                'search_items' => 'Search Portfolio Pages',
                'not_found' => 'No portfolio pages found',
                'not_found_in_trash' => 'No portfolio pages found in trash',
            ),
            'public' => false,
            'show_in_rest' => true,
            'rest_base' => 'portfolio_pages',
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-admin-page',
            'show_in_menu' => true,
        ));
    }

    /**
     * Register taxonomies
     */
    public function register_taxonomies() {
        // Project Tags
        register_taxonomy('project_tag', 'portfolio_project', array(
            'labels' => array(
                'name' => 'Project Tags',
                'singular_name' => 'Project Tag',
            ),
            'hierarchical' => false,
            'show_in_rest' => true,
            'public' => true,
        ));

        // Service Categories
        register_taxonomy('service_category', 'portfolio_service', array(
            'labels' => array(
                'name' => 'Service Categories',
                'singular_name' => 'Service Category',
            ),
            'hierarchical' => true,
            'show_in_rest' => true,
            'public' => true,
        ));
    }

    /**
     * Register ACF fields if ACF is available
     */
    public function register_acf_fields() {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }

        // Project Fields
        acf_add_local_field_group(array(
            'key' => 'group_portfolio_project',
            'title' => 'Project Details',
            'fields' => array(
                array(
                    'key' => 'field_project_url',
                    'label' => 'Project URL',
                    'name' => 'project_url',
                    'type' => 'url',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_project_image',
                    'label' => 'Project Image',
                    'name' => 'image',
                    'type' => 'image',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_project_tags',
                    'label' => 'Tags',
                    'name' => 'tags',
                    'type' => 'text',
                    'instructions' => 'Comma-separated tags',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_project_featured',
                    'label' => 'Featured Project',
                    'name' => 'featured',
                    'type' => 'true_false',
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'portfolio_project',
                    ),
                ),
            ),
        ));

        // Service Fields
        acf_add_local_field_group(array(
            'key' => 'group_portfolio_service',
            'title' => 'Service Details',
            'fields' => array(
                array(
                    'key' => 'field_service_icon',
                    'label' => 'Service Icon',
                    'name' => 'icon',
                    'type' => 'text',
                    'instructions' => 'Lucide icon name (e.g., "Code", "Palette")',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_service_featured',
                    'label' => 'Featured Service',
                    'name' => 'featured',
                    'type' => 'true_false',
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'portfolio_service',
                    ),
                ),
            ),
        ));

        // Hero Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_portfolio_hero',
            'title' => 'Hero Section',
            'fields' => array(
                array(
                    'key' => 'field_hero_title',
                    'label' => 'Hero Title',
                    'name' => 'title',
                    'type' => 'text',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_hero_subtitle',
                    'label' => 'Hero Subtitle',
                    'name' => 'subtitle',
                    'type' => 'text',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_description',
                    'label' => 'Hero Description',
                    'name' => 'description',
                    'type' => 'textarea',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_background',
                    'label' => 'Background Image',
                    'name' => 'background_image',
                    'type' => 'image',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_cta_text',
                    'label' => 'CTA Button Text',
                    'name' => 'cta_text',
                    'type' => 'text',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_cta_link',
                    'label' => 'CTA Button Link',
                    'name' => 'cta_link',
                    'type' => 'text',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_social_github',
                    'label' => 'GitHub URL',
                    'name' => 'social_github',
                    'type' => 'url',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_social_linkedin',
                    'label' => 'LinkedIn URL',
                    'name' => 'social_linkedin',
                    'type' => 'url',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_social_twitter',
                    'label' => 'Twitter URL',
                    'name' => 'social_twitter',
                    'type' => 'url',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_social_instagram',
                    'label' => 'Instagram URL',
                    'name' => 'social_instagram',
                    'type' => 'url',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_hero_cv_url',
                    'label' => 'CV Download URL',
                    'name' => 'cv_url',
                    'type' => 'url',
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'portfolio_page',
                    ),
                    array(
                        'param' => 'post_name',
                        'operator' => '==',
                        'value' => 'hero',
                    ),
                ),
            ),
        ));

        // About Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_portfolio_about',
            'title' => 'About Section',
            'fields' => array(
                array(
                    'key' => 'field_about_title',
                    'label' => 'About Title',
                    'name' => 'title',
                    'type' => 'text',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_about_content',
                    'label' => 'About Content',
                    'name' => 'content',
                    'type' => 'wysiwyg',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_about_image',
                    'label' => 'Profile Image',
                    'name' => 'image',
                    'type' => 'image',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_about_skills',
                    'label' => 'Skills',
                    'name' => 'skills',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_skill_name',
                            'label' => 'Skill Name',
                            'name' => 'name',
                            'type' => 'text',
                            'required' => 1,
                        ),
                    ),
                    'required' => 0,
                ),
                array(
                    'key' => 'field_about_experience',
                    'label' => 'Experience',
                    'name' => 'experience',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_exp_title',
                            'label' => 'Job Title',
                            'name' => 'title',
                            'type' => 'text',
                            'required' => 1,
                        ),
                        array(
                            'key' => 'field_exp_company',
                            'label' => 'Company',
                            'name' => 'company',
                            'type' => 'text',
                            'required' => 1,
                        ),
                        array(
                            'key' => 'field_exp_period',
                            'label' => 'Period',
                            'name' => 'period',
                            'type' => 'text',
                            'required' => 1,
                        ),
                        array(
                            'key' => 'field_exp_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                            'required' => 0,
                        ),
                    ),
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'portfolio_page',
                    ),
                    array(
                        'param' => 'post_name',
                        'operator' => '==',
                        'value' => 'about',
                    ),
                ),
            ),
        ));

        // Contact Page Fields
        acf_add_local_field_group(array(
            'key' => 'group_portfolio_contact',
            'title' => 'Contact Section',
            'fields' => array(
                array(
                    'key' => 'field_contact_title',
                    'label' => 'Contact Title',
                    'name' => 'title',
                    'type' => 'text',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_contact_description',
                    'label' => 'Contact Description',
                    'name' => 'description',
                    'type' => 'textarea',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_contact_email',
                    'label' => 'Email',
                    'name' => 'email',
                    'type' => 'email',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_contact_phone',
                    'label' => 'Phone',
                    'name' => 'phone',
                    'type' => 'text',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_contact_location',
                    'label' => 'Location',
                    'name' => 'location',
                    'type' => 'text',
                    'required' => 0,
                ),
                array(
                    'key' => 'field_contact_social_links',
                    'label' => 'Social Links',
                    'name' => 'social_links',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_social_platform',
                            'label' => 'Platform',
                            'name' => 'platform',
                            'type' => 'select',
                            'choices' => array(
                                'linkedin' => 'LinkedIn',
                                'github' => 'GitHub',
                                'twitter' => 'Twitter',
                                'instagram' => 'Instagram',
                                'facebook' => 'Facebook',
                                'youtube' => 'YouTube',
                            ),
                            'required' => 1,
                        ),
                        array(
                            'key' => 'field_social_url',
                            'label' => 'URL',
                            'name' => 'url',
                            'type' => 'url',
                            'required' => 1,
                        ),
                    ),
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'portfolio_page',
                    ),
                    array(
                        'param' => 'post_name',
                        'operator' => '==',
                        'value' => 'contact',
                    ),
                ),
            ),
        ));
    }

    /**
     * Register REST API fields
     */
    public function register_rest_fields() {
        // Add ACF fields to REST API responses
        register_rest_field('portfolio_project', 'acf', array(
            'get_callback' => function($post) {
                return get_fields($post['id']);
            },
            'schema' => null,
        ));

        register_rest_field('portfolio_service', 'acf', array(
            'get_callback' => function($post) {
                return get_fields($post['id']);
            },
            'schema' => null,
        ));

        register_rest_field('portfolio_page', 'acf', array(
            'get_callback' => function($post) {
                return get_fields($post['id']);
            },
            'schema' => null,
        ));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Portfolio Manager',
            'Portfolio',
            'manage_options',
            'portfolio-manager',
            array($this, 'admin_page'),
            'dashicons-portfolio',
            30
        );
    }

    /**
     * Admin page content
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Portfolio Manager</h1>
            <p>Gerencie o conteúdo do seu portfólio através do WordPress.</p>

            <div class="portfolio-admin-grid">
                <div class="portfolio-admin-card">
                    <h3>Projetos</h3>
                    <p>Adicione e gerencie seus projetos de portfólio.</p>
                    <a href="<?php echo admin_url('edit.php?post_type=portfolio_project'); ?>" class="button button-primary">Gerenciar Projetos</a>
                </div>

                <div class="portfolio-admin-card">
                    <h3>Serviços</h3>
                    <p>Defina os serviços que você oferece.</p>
                    <a href="<?php echo admin_url('edit.php?post_type=portfolio_service'); ?>" class="button button-primary">Gerenciar Serviços</a>
                </div>

                <div class="portfolio-admin-card">
                    <h3>Páginas do Portfólio</h3>
                    <p>Configure as seções Hero, About e Contact.</p>
                    <a href="<?php echo admin_url('edit.php?post_type=portfolio_page'); ?>" class="button button-primary">Gerenciar Páginas</a>
                </div>

                <div class="portfolio-admin-card">
                    <h3>Documentação</h3>
                    <p>Veja como conectar seu site React ao WordPress.</p>
                    <a href="#" class="button" onclick="alert('Documentação em desenvolvimento')">Ver Documentação</a>
                </div>
            </div>

            <style>
                .portfolio-admin-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                .portfolio-admin-card {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                }
                .portfolio-admin-card h3 {
                    margin-top: 0;
                    color: #23282d;
                }
                .portfolio-admin-card p {
                    color: #666;
                    margin-bottom: 15px;
                }
            </style>
        </div>
        <?php
    }
}

// Initialize the plugin
new PortfolioManager();

// Create default pages on activation
register_activation_hook(__FILE__, 'portfolio_manager_activate');
function portfolio_manager_activate() {
    // Create default portfolio pages
    $pages = array(
        'hero' => array(
            'post_title' => 'Hero Section',
            'post_content' => 'Configure your hero section content here.',
            'post_name' => 'hero',
        ),
        'about' => array(
            'post_title' => 'About Section',
            'post_content' => 'Configure your about section content here.',
            'post_name' => 'about',
        ),
        'contact' => array(
            'post_title' => 'Contact Section',
            'post_content' => 'Configure your contact section content here.',
            'post_name' => 'contact',
        ),
    );

    foreach ($pages as $slug => $page_data) {
        if (!get_page_by_path($slug, OBJECT, 'portfolio_page')) {
            wp_insert_post(array_merge($page_data, array(
                'post_type' => 'portfolio_page',
                'post_status' => 'publish',
            )));
        }
    }

    flush_rewrite_rules();
}

// Flush rewrite rules on deactivation
register_deactivation_hook(__FILE__, 'portfolio_manager_deactivate');
function portfolio_manager_deactivate() {
    flush_rewrite_rules();
}