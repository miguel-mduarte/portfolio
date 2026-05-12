export interface SanitySocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface SanityHero {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: any;
  ctaText?: string;
  ctaLink?: string;
  socialLinks?: SanitySocialLinks;
  cvUrl?: string;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  content?: any[];
  mainImage?: any;
  galleryImages?: any[];
  projectUrl?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
}

export interface SanityService {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  featured?: boolean;
  order?: number;
}

export interface SanityAbout {
  title: string;

  content?: any[];

  image?: any;

  skills?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  technologies?: string[];

  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
}

export interface SanityContact {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Record<string, string>;
}
