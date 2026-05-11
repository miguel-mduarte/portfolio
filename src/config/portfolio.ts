// Portfolio Configuration
export const portfolioConfig = {
  // WordPress API Configuration
  wordpress: {
    baseUrl: import.meta.env.VITE_WORDPRESS_URL || 'https://your-wordpress-site.com',
    apiBase: import.meta.env.VITE_WORDPRESS_API_BASE || '/wp-json/wp/v2',
    acfBase: import.meta.env.VITE_WORDPRESS_ACF_BASE || '/wp-json/acf/v3',
  },

  // Default Portfolio Settings
  defaults: {
    title: import.meta.env.VITE_PORTFOLIO_TITLE || 'Miguel Duarte',
    subtitle: import.meta.env.VITE_PORTFOLIO_SUBTITLE || 'Desenvolvedor Full Stack',
    description: import.meta.env.VITE_PORTFOLIO_DESCRIPTION || 'Especialista em criar experiências digitais incríveis',
  },

  // API Endpoints
  endpoints: {
    projects: '/portfolio_projects',
    services: '/portfolio_services',
    pages: '/portfolio_pages',
  },

  // Query Parameters
  queryParams: {
    projects: '?per_page=12&_embed&orderby=menu_order&order=asc',
    services: '?per_page=12&_embed&orderby=menu_order&order=asc',
    pages: '?_embed',
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params: string = '') => {
  return `${portfolioConfig.wordpress.baseUrl}${portfolioConfig.wordpress.apiBase}${endpoint}${params}`;
};

// Helper function to build ACF API URLs
export const buildAcfUrl = (endpoint: string, params: string = '') => {
  return `${portfolioConfig.wordpress.baseUrl}${portfolioConfig.wordpress.acfBase}${endpoint}${params}`;
};

// Social media platforms mapping
export const socialPlatforms = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  dribbble: 'Dribbble',
  behance: 'Behance',
} as const;

export type SocialPlatform = keyof typeof socialPlatforms;