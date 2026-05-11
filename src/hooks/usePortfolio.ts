import { useSanity } from './useSanity';
import { urlFor } from '../lib/sanity';
import { heroQuery, projectsQuery, servicesQuery, aboutQuery, contactQuery } from '../lib/queries';
import { SanityHero, SanityProject, SanityService, SanityAbout, SanityContact } from '../types/sanity';

export type PortfolioHero = {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  socialLinks?: Record<string, string>;
  cvUrl?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
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
  image?: string;
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
};

export type PortfolioContact = {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Record<string, string>;
};

export const usePortfolioHero = () => {
  const fallback: PortfolioHero = {
    title: import.meta.env.VITE_PORTFOLIO_TITLE || 'Miguel Duarte',
    subtitle: import.meta.env.VITE_PORTFOLIO_SUBTITLE || 'Desenvolvedor Full Stack',
    description: import.meta.env.VITE_PORTFOLIO_DESCRIPTION || 'Especialista em criar experiências digitais incríveis',
    backgroundImage: '',
    ctaText: 'Ver Projetos',
    ctaLink: '#projects',
    socialLinks: {},
    cvUrl: '/cv.pdf',
  };

  const { data, loading, error } = useSanity<SanityHero>(heroQuery, {}, fallback);

  const hero = data
    ? {
        ...data,
        backgroundImage: data.backgroundImage ? urlFor(data.backgroundImage).width(1600).url() : fallback.backgroundImage,
      }
    : fallback;

  return { data: hero, loading, error };
};

export const usePortfolioAbout = () => {
  const fallback: PortfolioAbout = {
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
    image: '',
    skills: [],
    experience: [],
  };

  const { data, loading, error } = useSanity<SanityAbout>(aboutQuery, {}, fallback);

  const about = data
    ? {
        ...data,
        image: data.image ? urlFor(data.image).width(800).url() : '',
      }
    : fallback;

  return { data: about, loading, error };
};

export const usePortfolioContact = () => {
  const fallback: PortfolioContact = {
    title: 'Vamos Conversar',
    description: 'Entre em contato para discutirmos seu próximo projeto.',
    email: 'contato@exemplo.com',
    phone: '',
    location: '',
    socialLinks: {},
  };

  const { data, loading, error } = useSanity<SanityContact>(contactQuery, {}, fallback);

  return { data: data || fallback, loading, error };
};

export const usePortfolioServices = () => {
  const fallback: PortfolioService[] = [
    {
      id: '1',
      title: 'Desenvolvimento Web',
      description: 'Criação de websites modernos e responsivos com as melhores tecnologias.',
      icon: 'Code',
      featured: true,
      order: 1,
    },
    {
      id: '2',
      title: 'Design UI/UX',
      description: 'Design de interfaces intuitivas e experiências de usuário excepcionais.',
      icon: 'Palette',
      featured: true,
      order: 2,
    },
    {
      id: '3',
      title: 'Consultoria',
      description: 'Orientação especializada para projetos digitais e estratégias online.',
      icon: 'Lightbulb',
      featured: false,
      order: 3,
    },
  ];

  const { data, loading, error } = useSanity<SanityService[]>(servicesQuery, {}, fallback);

  const services = data
    ? data.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        icon: item.icon || 'Code',
        featured: item.featured,
        order: item.order,
      }))
    : fallback;

  return { services, loading, error };
};

export const usePortfolioProjects = () => {
  const fallback: PortfolioProject[] = [
    {
      id: '1',
      title: 'E-commerce Moderno',
      description:
        'Plataforma de e-commerce completa com React, Node.js e integração de pagamento. Interface intuitiva e responsiva para melhor experiência do usuário.',
      content: '',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      link: 'https://exemplo.com/projeto1',
      tags: ['React', 'Node.js', 'E-commerce'],
      featured: true,
      order: 1,
    },
    {
      id: '2',
      title: 'Dashboard Analytics',
      description:
        'Dashboard interativo para análise de dados em tempo real com gráficos dinâmicos e visualizações personalizáveis para tomada de decisões.',
      content: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      link: 'https://exemplo.com/projeto2',
      tags: ['TypeScript', 'Charts', 'Data'],
      featured: false,
      order: 2,
    },
    {
      id: '3',
      title: 'App Mobile Fitness',
      description:
        'Aplicativo mobile para acompanhamento de treinos e nutrição com sincronização em nuvem e gamificação para engajamento.',
      content: '',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      link: 'https://exemplo.com/projeto3',
      tags: ['React Native', 'Firebase', 'UX'],
      featured: true,
      order: 3,
    },
  ];

  const { data, loading, error } = useSanity<SanityProject[]>(projectsQuery, {}, fallback);

  const projects = data
    ? data.map((project) => ({
        id: project._id,
        title: project.title,
        description: project.description,
        content: project.content ? String(project.content) : '',
        image: project.mainImage ? urlFor(project.mainImage).width(1600).url() : fallback[0].image,
        link: project.projectUrl || '#',
        tags: project.tags || [],
        featured: project.featured,
        order: project.order,
      }))
    : fallback;

  return { projects, loading, error };
};