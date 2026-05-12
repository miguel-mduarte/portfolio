import { useSanity } from './useSanity';
import { urlFor } from '../lib/sanity';

import {
  heroQuery,
  projectsQuery,
  servicesQuery,
  aboutQuery,
  contactQuery,
} from '../lib/queries';

import {
  SanityHero,
  SanityProject,
  SanityService,
  SanityAbout,
  SanityContact,
  SanitySocialLinks,
} from '../types/sanity';

export type PortfolioHero = {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  socialLinks?: SanitySocialLinks;
  cvUrl?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  content: any[];
  image: string;
  galleryImages: string[];
  link: string;
  tags: string[];
  featured?: boolean;
  order?: number;
};

export type PortfolioService = {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
  order?: number;
};

export type PortfolioAbout = {
  title: string;
  content?: any[];
  skills?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  technologies?: string[];
};

export type PortfolioContact = {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: SanitySocialLinks;
};

export const usePortfolioHero = () => {
  const fallback: SanityHero = {
    title:
      import.meta.env.VITE_PORTFOLIO_TITLE ||
      'Miguel Duarte',

    subtitle:
      import.meta.env.VITE_PORTFOLIO_SUBTITLE ||
      'Desenvolvedor Full Stack',

    description:
      import.meta.env.VITE_PORTFOLIO_DESCRIPTION ||
      'Especialista em criar experiências digitais incríveis',

    backgroundImage: undefined,

    ctaText: 'Ver Projetos',

    ctaLink: '#projects',

    socialLinks: {},

    cvUrl: '/cv.pdf',
  };

  const { data, loading, error } =
    useSanity<SanityHero>(
      heroQuery,
      {},
      fallback
    );

  const hero: PortfolioHero = data
    ? {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,

        backgroundImage: data.backgroundImage
          ? urlFor(data.backgroundImage)
              .width(1600)
              .url()
          : '',

        ctaText: data.ctaText,

        ctaLink: data.ctaLink,

        socialLinks: data.socialLinks,

        cvUrl: data.cvUrl,
      }
    : {
        title: fallback.title,
        subtitle: fallback.subtitle,
        description: fallback.description,
        backgroundImage: '',
        ctaText: fallback.ctaText,
        ctaLink: fallback.ctaLink,
        socialLinks: fallback.socialLinks,
        cvUrl: fallback.cvUrl,
      };

  return {
    data: hero,
    loading,
    error,
  };
};

export const usePortfolioAbout = () => {
  const fallback: SanityAbout = {
    title: 'Sobre Mim',

    content: [
      {
        _type: 'block',

        children: [
          {
            _type: 'span',
            text: 'Conteúdo sobre mim...',
          },
        ],
      },
    ],

    skills: [
      {
        title: 'Desenvolvimento',
        description:
          'React, TypeScript, Node.js e tecnologias web modernas',
        icon: 'Code2',
      },

      {
        title: 'Design',
        description:
          'UI/UX, Figma e interfaces responsivas',
        icon: 'Palette',
      },

      {
        title: 'Performance',
        description:
          'SEO, otimização e boas práticas',
        icon: 'Rocket',
      },

      {
        title: 'Agilidade',
        description:
          'Metodologias ágeis e entrega contínua',
        icon: 'Zap',
      },
    ],

    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'Next.js',
      'PostgreSQL',
    ],
  };

  const { data, loading, error } =
    useSanity<SanityAbout>(
      aboutQuery,
      {},
      fallback
    );

  const about: PortfolioAbout = data
    ? {
        title: data.title,

        content: data.content,

        skills:
          data.skills || fallback.skills,

        technologies:
          data.technologies ||
          fallback.technologies,
      }
    : {
        title: fallback.title,

        content: fallback.content,

        skills: fallback.skills,

        technologies:
          fallback.technologies,
      };

  return {
    data: about,
    loading,
    error,
  };
};

export const usePortfolioContact = () => {
  const fallback: SanityContact = {
    title: 'Vamos Conversar',

    description:
      'Entre em contato para discutirmos seu próximo projeto.',

    email: 'contato@exemplo.com',

    phone: '',

    location: '',

    socialLinks: {},
  };

  const { data, loading, error } =
    useSanity<SanityContact>(
      contactQuery,
      {},
      fallback
    );

  const contact: PortfolioContact = data
    ? {
        title: data.title,

        description: data.description,

        email: data.email,

        phone: data.phone,

        location: data.location,

        socialLinks: data.socialLinks,
      }
    : fallback;

  return {
    data: contact,
    loading,
    error,
  };
};

export const usePortfolioServices = () => {
  const fallback: SanityService[] = [
    {
      _id: '1',

      title: 'Desenvolvimento Web',

      description:
        'Criação de websites modernos e responsivos com as melhores tecnologias.',

      icon: 'Code',

      featured: true,

      order: 1,
    },

    {
      _id: '2',

      title: 'Design UI/UX',

      description:
        'Design de interfaces intuitivas e experiências de usuário excepcionais.',

      icon: 'Palette',

      featured: true,

      order: 2,
    },

    {
      _id: '3',

      title: 'Consultoria',

      description:
        'Orientação especializada para projetos digitais e estratégias online.',

      icon: 'Lightbulb',

      featured: false,

      order: 3,
    },
  ];

  const { data, loading, error } =
    useSanity<SanityService[]>(
      servicesQuery,
      {},
      fallback
    );

  const services: PortfolioService[] =
    (data || fallback).map((item) => ({
      id: item._id,

      title: item.title,

      description: item.description,

      icon: item.icon || 'Code',

      featured: item.featured,

      order: item.order,
    }));

  return {
    services,
    loading,
    error,
  };
};

export const usePortfolioProjects = () => {
  const fallback: SanityProject[] = [
    {
      _id: '1',

      title: 'E-commerce Moderno',

      description:
        'Plataforma de e-commerce completa com React, Node.js e integração de pagamento. Interface intuitiva e responsiva para melhor experiência do usuário.',

      content: [],

      mainImage: undefined,

      galleryImages: [],

      projectUrl:
        'https://exemplo.com/projeto1',

      tags: [
        'React',
        'Node.js',
        'E-commerce',
      ],

      featured: true,

      order: 1,
    },

    {
      _id: '2',

      title: 'Dashboard Analytics',

      description:
        'Dashboard interativo para análise de dados em tempo real com gráficos dinâmicos e visualizações personalizáveis para tomada de decisões.',

      content: [],

      mainImage: undefined,

      galleryImages: [],

      projectUrl:
        'https://exemplo.com/projeto2',

      tags: [
        'TypeScript',
        'Charts',
        'Data',
      ],

      featured: false,

      order: 2,
    },

    {
      _id: '3',

      title: 'App Mobile Fitness',

      description:
        'Aplicativo mobile para acompanhamento de treinos e nutrição com sincronização em nuvem e gamificação para engajamento.',

      content: [],

      mainImage: undefined,

      galleryImages: [],

      projectUrl:
        'https://exemplo.com/projeto3',

      tags: [
        'React Native',
        'Firebase',
        'UX',
      ],

      featured: true,

      order: 3,
    },
  ];

  const { data, loading, error } =
    useSanity<SanityProject[]>(
      projectsQuery,
      {},
      fallback
    );

  const projects: PortfolioProject[] =
    (data || fallback).map((project) => ({
      id: project._id,

      title: project.title,

      description: project.description,

      content: project.content || [],

      image: project.mainImage
        ? urlFor(project.mainImage)
            .width(1600)
            .url()
        : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',

      galleryImages: project.galleryImages
        ? project.galleryImages.map(img => urlFor(img).width(1600).url())
        : [],

      link: project.projectUrl || '#',

      tags: project.tags || [],

      featured: project.featured,

      order: project.order,
    }));

  return {
    projects,
    loading,
    error,
  };
};