// WordPress API Types
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
  meta: any[];
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: any[];
    'wp:featuredmedia'?: any[];
    'wp:term'?: any[][];
  };
  acf?: Record<string, any>;
}

export interface WordPressPage extends Omit<WordPressPost, 'categories' | 'tags' | 'format'> {
  parent: number;
  menu_order: number;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: 'image' | 'file';
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      width: number;
      height: number;
      file: string;
      mime_type: string;
      source_url: string;
    }>;
  };
  source_url: string;
  _embedded?: any;
}

// Portfolio-specific types
export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  link: string;
  tags: string[];
  featured: boolean;
  order: number;
}

export interface PortfolioService {
  id: number;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  order: number;
}

export interface PortfolioHero {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface PortfolioAbout {
  title: string;
  content: string;
  image: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}

export interface PortfolioContact {
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: Record<string, string>;
}

export interface PortfolioSettings {
  siteTitle: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  cvUrl: string;
  resumeUrl: string;
}