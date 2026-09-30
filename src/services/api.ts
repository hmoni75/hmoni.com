// Centralized API Service for hmoni.com
// Syncs with cPanel MySQL database backend (/api/*.php) with automatic localStorage fallback

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname.includes('hmoni.com')
  ? 'https://hmoni.com/api'
  : '/api';

// Interfaces
export interface HeroTile {
  id: number;
  title: string;
  img: string;
  mod: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  location?: string;
  size?: string;
  service?: string;
  link?: string;
  img: string;
  status?: string;
  featured?: boolean;
  description?: string;
  tags?: string[];
  client?: string;
  release_date?: string;
  role?: string;
  duration?: string;
  intro?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  images?: string[];
}

export function getImgSrc(img?: string): string {
  if (!img) return "/assets/imgs/pages/home-13/sec-3-img-1.webp";
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("data:")
  ) {
    return img;
  }
  if (img.startsWith("/")) {
    return img;
  }
  if (img.startsWith("uploads/") || img.startsWith("storage/")) {
    return `https://manage.hmoni.com/${img}`;
  }
  return `/assets/imgs/pages/home-13/${img}`;
}

export interface Service {
  id: number;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  delay?: string;
}

export interface ProcessStep {
  id: number;
  step_num?: string;
  step_number?: number | string;
  title: string;
  desc?: string;
  description?: string;
  icon?: string;
  image_url?: string;
  img?: string;
  tags?: string[];
  delay?: string;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  stars: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  title: string;
  plan_key: string;
  price: string;
  price_numeric?: string;
  billing_period?: string;
  description: string;
  badge?: string;
  is_popular: boolean;
  button_text?: string;
  button_link?: string;
  features: string[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  handle: string;
}

export interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface StatItem {
  id: number;
  stat_key: string;
  label: string;
  number_value: string;
  suffix: string;
}

export interface TechStackItem {
  id: number;
  name: string;
  category: string;
  icon_url: string;
  proficiency: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  date_str: string;
  img: string;
  excerpt: string;
  content: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date_str: string;
  is_read?: boolean;
  location?: string;
}

export interface SiteSettings {
  brandName?: string;
  contactEmail?: string;
  officeAddress?: string;
  studioAddress?: string;
  workingHours?: string;
  metaTitle?: string;
  metaKeywords?: string;
  [key: string]: any;
}

// Generic Fetch helper
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`API call to ${endpoint} failed, falling back to local storage:`, err);
    return null;
  }
}

// -------------------------------------------------------------
// 1. HERO CAROUSEL TILES
// -------------------------------------------------------------
const MANAGE_HERO_API_ENDPOINTS = [
  '/api/manage-hero', // Same-origin proxy (Vercel/Vite rewrite)
  '/api/manage-hero.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/hero',
];

const DEFAULT_HERO_TILES: HeroTile[] = [
  { id: 1, title: 'Brand Identity 1', img: 'sec-1-tile-1.webp', mod: 'brand-1' },
  { id: 2, title: 'Digital Product 2', img: 'sec-1-tile-2.webp', mod: 'neutral-100' },
  { id: 3, title: 'Creative Layout 3', img: 'sec-1-tile-3.webp', mod: 'neutral-800' },
  { id: 4, title: 'UIUX Showcase 4', img: 'sec-1-tile-4.webp', mod: 'brand-2' },
  { id: 5, title: 'Visual Story 5', img: 'sec-1-tile-5.webp', mod: 'neutral-300' },
  { id: 6, title: 'Mobile App 6', img: 'sec-1-tile-6.webp', mod: 'brand-1' }
];

export async function getHeroTiles(): Promise<HeroTile[]> {
  // 1. Try Manage Project Endpoints (proxy first to avoid CORS)
  for (const url of MANAGE_HERO_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : (json.data || json.hero || json.tiles || json.slides || json.images || []);

        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedTiles: HeroTile[] = rawList.map((item: any, idx: number) => {
            if (typeof item === 'string') {
              return { id: idx + 1, title: `Slide ${idx + 1}`, img: item, mod: 'brand-1' };
            }
            return {
              id: item.id || idx + 1,
              title: item.title || item.name || `Slide ${idx + 1}`,
              img: item.img || item.image || item.url || item.src || item.image_url || item.path || '',
              mod: item.mod || item.style || 'brand-1',
            };
          }).filter((t: HeroTile) => !!t.img);

          if (mappedTiles.length > 0) {
            localStorage.setItem('hmoni_hero_tiles', JSON.stringify(mappedTiles));
            return mappedTiles;
          }
        }
      }
    } catch (err) {
      // ignore CORS/network error and try next endpoint
    }
  }

  // 2. Secondary fallback: /api/hero.php
  const remote = await fetchApi<HeroTile[]>('hero.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_hero_tiles', JSON.stringify(remote));
    return remote;
  }

  // 3. Tertiary fallback: LocalStorage or Default Tiles
  const local = localStorage.getItem('hmoni_hero_tiles');
  return local ? JSON.parse(local) : DEFAULT_HERO_TILES;
}

export async function saveHeroTile(tile: Partial<HeroTile>): Promise<boolean> {
  const res = await fetchApi<any>('hero.php', {
    method: 'POST',
    body: JSON.stringify(tile),
  });
  return !!res;
}

export async function deleteHeroTile(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`hero.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

export async function resetHeroTiles(): Promise<boolean> {
  const res = await fetchApi<any>('hero.php', {
    method: 'POST',
    body: JSON.stringify({ action: 'reset' }),
  });
  return !!res;
}

// -------------------------------------------------------------
// 2. PROJECTS
// -------------------------------------------------------------
const MANAGE_PROJECTS_API_ENDPOINTS = [
  '/api/manage-projects', // Same-origin proxy (Vercel/Vite rewrite)
  '/api/manage-projects.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/projects',
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'The Obsidian Coastal Villa',
    category: 'Residential & Architecture',
    location: 'Oslo, Norway',
    size: '12,400 Sq Ft',
    service: 'Architecture & Interior',
    link: '/portfolio-details-1',
    img: '/assets/imgs/pages/home-13/sec-3-img-1.webp',
    status: 'Published',
    featured: true,
    description: 'Luxurious coastal residence with obsidian stone finishes.',
    tags: ['Architecture', 'Interior', 'Luxury']
  },
  {
    id: 2,
    title: 'Atrium of Quiet Light',
    category: 'Hospitality & Wellness',
    location: 'Kyoto, Japan',
    size: '44,200 Sq Ft',
    service: 'Master Planning',
    link: '/portfolio-details-1',
    img: '/assets/imgs/pages/home-13/sec-3-img-2.webp',
    status: 'Published',
    featured: true,
    description: 'Peaceful atrium hotel designed around natural daylight.',
    tags: ['Wellness', 'Hotel', 'Kyoto']
  },
  {
    id: 3,
    title: 'Stratum Cultural Pavilion',
    category: 'Cultural & Civic',
    location: 'Milan, Italy',
    size: '118,300 Sq Ft',
    service: 'Architecture & Engineering',
    link: '/portfolio-details-1',
    img: '/assets/imgs/pages/home-13/sec-3-img-3.webp',
    status: 'Published',
    featured: true,
    description: 'Multi-tier cultural space built for exhibitions.',
    tags: ['Milan', 'Exhibition', 'Civil']
  }
];

export async function getProjects(): Promise<Project[]> {
  for (const url of MANAGE_PROJECTS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : (json.data || json.projects || json.items || []);

        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedProjects: Project[] = rawList.map((p: any, idx: number) => {
            return {
              id: p.id || idx + 1,
              title: p.title || `Project ${idx + 1}`,
              category: p.category || 'Architecture',
              location: p.location || p.loc || '',
              size: p.size || '',
              service: p.service || '',
              link: p.link || `/portfolio-details-1?id=${p.id || idx + 1}`,
              img: p.img || p.image || p.url || p.src || p.image_url || p.path || '',
              status: p.status || 'Published',
              featured: p.featured !== undefined ? !!p.featured : true,
              description: p.description || p.desc || '',
              tags: Array.isArray(p.tags) ? p.tags : (p.tags_json ? JSON.parse(p.tags_json) : []),
              client: p.client || p.client_name || '',
              release_date: p.release_date || p.year || p.date || '',
              role: p.role || p.service || p.category || '',
              duration: p.duration || '',
              intro: p.intro || p.description || p.desc || '',
              challenge: p.challenge || '',
              solution: p.solution || '',
              outcome: p.outcome || '',
              images: Array.isArray(p.images) ? p.images : (p.images_json ? JSON.parse(p.images_json) : [])
            };
          }).filter((p: Project) => !!p.title);

          if (mappedProjects.length > 0) {
            localStorage.setItem('hmoni_projects', JSON.stringify(mappedProjects));
            return mappedProjects;
          }
        }
      }
    } catch (err) {
      // ignore and try next fallback endpoint
    }
  }

  // Secondary fallback: /api/projects.php
  const remote = await fetchApi<Project[]>('projects.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_projects', JSON.stringify(remote));
    return remote;
  }

  // Tertiary fallback: LocalStorage or Default Projects
  const local = localStorage.getItem('hmoni_projects');
  return local ? JSON.parse(local) : DEFAULT_PROJECTS;
}

export async function saveProject(project: Partial<Project>): Promise<boolean> {
  const res = await fetchApi<any>('projects.php', {
    method: 'POST',
    body: JSON.stringify(project),
  });
  return !!res;
}

export async function deleteProject(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`projects.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 3. SERVICES
// -------------------------------------------------------------
const MANAGE_SERVICES_API_ENDPOINTS = [
  '/api/manage-services', // Same-origin proxy (Vercel/Vite rewrite)
  '/api/manage-services.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/services',
];

const DEFAULT_SERVICES: Service[] = [
  { id: 1, num: '01', title: 'Brand Identity', desc: 'Logo systems, type pairings, color, and visual language that travels across every touchpoint.', tags: ['Logo', 'Type system', 'Guidelines'], delay: '0.05' },
  { id: 2, num: '02', title: 'Web Design', desc: 'Marketing sites, portfolios, and product pages designed in Figma and ready for development.', tags: ['Landing', 'Portfolio', 'Marketing'], delay: '0.1' },
  { id: 3, num: '03', title: 'Webflow & Framer', desc: 'Hand-built no-code sites with motion, CMS, and clean structure you can actually maintain.', tags: ['Framer', 'Webflow', 'CMS'], delay: '0.15' },
  { id: 4, num: '04', title: 'Product UI/UX', desc: 'Dashboards, onboarding flows, and product surfaces — clear, considered, ready for engineering.', tags: ['Dashboard', 'App UI', 'Flows'], delay: '0.2' },
  { id: 5, num: '05', title: 'Art Direction', desc: 'Visual systems, photography direction, and editorial layouts for brands that need a point of view.', tags: ['Editorial', 'Photography', 'Style'], delay: '0.25' },
  { id: 6, num: '06', title: 'Front-End Build', desc: 'Pixel-perfect React or Next.js builds, accessible by default and shipped with care.', tags: ['React', 'Next.js', 'Tailwind'], delay: '0.3' }
];

export async function getServices(): Promise<Service[]> {
  for (const url of MANAGE_SERVICES_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : (json.data || json.services || json.items || []);

        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedServices: Service[] = rawList.map((s: any, idx: number) => {
            const numVal = s.num || s.step_num || String(idx + 1).padStart(2, '0');
            const tagsArr = Array.isArray(s.tags)
              ? s.tags
              : (s.tags_json ? JSON.parse(s.tags_json) : (typeof s.tags === 'string' ? s.tags.split(',').map((t: string) => t.trim()) : []));
            return {
              id: s.id || idx + 1,
              num: numVal,
              title: s.title || s.name || `Service ${idx + 1}`,
              desc: s.desc || s.description || s.summary || '',
              tags: tagsArr.length > 0 ? tagsArr : ['Design', 'Development'],
              delay: s.delay || `${(0.05 * (idx + 1)).toFixed(2)}`,
            };
          }).filter((s: Service) => !!s.title);

          if (mappedServices.length > 0) {
            localStorage.setItem('hmoni_services', JSON.stringify(mappedServices));
            return mappedServices;
          }
        }
      }
    } catch (err) {
      // ignore network/CORS error and try next endpoint
    }
  }

  // Secondary fallback: /api/services.php
  const remote = await fetchApi<Service[]>('services.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_services', JSON.stringify(remote));
    return remote;
  }

  // Tertiary fallback: LocalStorage or DEFAULT_SERVICES
  const local = localStorage.getItem('hmoni_services');
  return local ? JSON.parse(local) : DEFAULT_SERVICES;
}

export async function saveService(service: Partial<Service>): Promise<boolean> {
  const res = await fetchApi<any>('services.php', {
    method: 'POST',
    body: JSON.stringify(service),
  });
  return !!res;
}

export async function deleteService(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`services.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 3.5. PRICING PLANS
// -------------------------------------------------------------
const MANAGE_PRICING_API_ENDPOINTS = [
  '/api/manage-pricing', // Same-origin proxy (Vercel/Vite rewrite)
  '/api/manage-pricing.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/pricing',
];

const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: 1,
    name: 'Starter',
    title: 'Starter',
    plan_key: 'starter',
    price: '$1,200',
    billing_period: '/monthly',
    description: 'A solid digital foundation focused on clarity, usability, and performance essentials.',
    badge: '',
    is_popular: false,
    button_text: 'Get Started',
    button_link: '#contact',
    features: [
      'Digital strategy setup',
      'Digital audit & Insights',
      'Positioning & Messaging',
      'SEO & Technical setup',
      'Analytics tracking',
    ],
  },
  {
    id: 2,
    name: 'Growth',
    title: 'Growth',
    plan_key: 'growth',
    price: '$2,800',
    billing_period: '/monthly',
    description: 'A performance-driven plan to accelerate acquisition and conversion.',
    badge: 'MOST POPULAR',
    is_popular: true,
    button_text: 'Choose Growth',
    button_link: '#contact',
    features: [
      'Growth strategy',
      'Conversion optimization',
      'SEO & Content performance',
      'Campaign setup & Reporting',
      'Advance analytics tracking',
    ],
  },
  {
    id: 3,
    name: 'Scale',
    title: 'Scale',
    plan_key: 'scale',
    price: '$3,600',
    billing_period: '/monthly',
    description: 'A long-term digital partnership for sustainable growth at scale.',
    badge: '',
    is_popular: false,
    button_text: 'Scale Your Business',
    button_link: '#contact',
    features: [
      'Full strategy & execution',
      'Dedicated success manager',
      'Advanced SEO & content',
      'Multi-channel campaigns',
      'Custom reporting & insights',
    ],
  },
];

export async function getPricingPlans(): Promise<PricingPlan[]> {
  for (const url of MANAGE_PRICING_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : json.data || json.plans || json.pricing || [];

        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedPlans: PricingPlan[] = rawList
            .map((p: any, idx: number) => {
              let featuresArr: string[] = [];
              if (Array.isArray(p.features)) {
                featuresArr = p.features;
              } else if (p.features_json) {
                try {
                  featuresArr = JSON.parse(p.features_json);
                } catch {}
              } else if (typeof p.features === 'string') {
                featuresArr = p.features
                  .split('\n')
                  .map((f: string) => f.trim())
                  .filter(Boolean);
              }

              const isPop =
                p.is_popular === true ||
                p.is_popular === 1 ||
                (p.badge && p.badge.toLowerCase().includes('popular'));

              return {
                id: p.id || idx + 1,
                name: p.name || p.title || `Plan ${idx + 1}`,
                title: p.title || p.name || `Plan ${idx + 1}`,
                plan_key:
                  p.plan_key ||
                  p.key ||
                  (p.title || '').toLowerCase() ||
                  `plan-${idx + 1}`,
                price: p.price || `$${p.price_numeric || '1,200'}`,
                price_numeric: p.price_numeric || '',
                billing_period: p.billing_period || '/monthly',
                description: p.description || p.desc || '',
                badge: p.badge || (isPop ? 'MOST POPULAR' : ''),
                is_popular: isPop,
                button_text: p.button_text
                  ? p.button_text.replace(/[^\x20-\x7E]/g, '').trim()
                  : 'Get Started',
                button_link: p.button_link || '#contact',
                features:
                  featuresArr.length > 0
                    ? featuresArr
                    : ['Digital strategy setup', 'SEO & Technical setup'],
              };
            })
            .filter((p: PricingPlan) => !!p.title);

          if (mappedPlans.length > 0) {
            localStorage.setItem(
              'hmoni_pricing_plans',
              JSON.stringify(mappedPlans)
            );
            return mappedPlans;
          }
        }
      }
    } catch (err) {
      // ignore network/CORS error and try next endpoint
    }
  }

  // Secondary fallback: /api/pricing.php
  const remote = await fetchApi<PricingPlan[]>('pricing.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_pricing_plans', JSON.stringify(remote));
    return remote;
  }

  // Tertiary fallback: LocalStorage or DEFAULT_PRICING_PLANS
  const local = localStorage.getItem('hmoni_pricing_plans');
  return local ? JSON.parse(local) : DEFAULT_PRICING_PLANS;
}

// -------------------------------------------------------------
// 4. PROCESS PHILOSOPHY
// -------------------------------------------------------------
const MANAGE_PROCESS_API_ENDPOINTS = [
  '/api/manage-process', // Same-origin proxy (Vercel/Vite rewrite)
  '/api/manage-process.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/process',
];

const MANAGE_FAQS_API_ENDPOINTS = [
  '/api/manage-faqs',
  '/api/manage-faqs.php',
  'https://manage.hmoni.com/api/faqs',
];

const DEFAULT_PROCESS: ProcessStep[] = [
  { id: 1, step_num: '01', step_number: 1, title: 'Discovery & Alignment', desc: 'We start by uncovering the core business goals, target audience, and competitive edge.', tags: ['Strategy', 'Audit', 'Goals'], img: 'sec-4-process-10.png', delay: '0.05' },
  { id: 2, step_num: '02', step_number: 2, title: 'Architecture & UX', desc: 'Building wireframes, content hierarchy, and intuitive user journeys.', tags: ['Wireframe', 'UX Research', 'Flows'], img: 'sec-4-process-12.png', delay: '0.15' },
  { id: 3, step_num: '03', step_number: 3, title: 'Visual Direction & UI', desc: 'Crafting elevated UI components, micro-animations, and visual systems.', tags: ['Figma', 'Design System', 'Motion'], img: 'sec-4-process-11.png', delay: '0.25' },
  { id: 4, step_num: '04', step_number: 4, title: 'Production Build & Launch', desc: 'Developing clean React/Next.js code, performing QA tests, and shipping to live production.', tags: ['React', 'Testing', 'Vercel'], img: 'sec-4-process-10.png', delay: '0.35' }
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  for (const url of MANAGE_PROCESS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : json.data || json.process || json.steps || [];

        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedSteps: ProcessStep[] = rawList
            .map((p: any, idx: number) => {
              const numVal =
                p.step_number || p.step_num || String(idx + 1).padStart(2, '0');
              const defaultImgs = [
                'sec-4-process-10.png',
                'sec-4-process-12.png',
                'sec-4-process-11.png',
              ];
              const imgVal =
                p.img || p.image || p.image_url || defaultImgs[idx % defaultImgs.length];

              return {
                id: p.id || idx + 1,
                step_num: String(numVal).padStart(2, '0'),
                step_number: numVal,
                title: p.title || p.name || `Step ${idx + 1}`,
                desc: p.desc || p.description || p.summary || '',
                description: p.description || p.desc || '',
                icon: p.icon || '',
                image_url: p.image_url || '',
                img: imgVal,
                tags: Array.isArray(p.tags) ? p.tags : [],
                delay: p.delay || `${(0.05 + idx * 0.1).toFixed(2)}`,
              };
            })
            .filter((p: ProcessStep) => !!p.title);

          if (mappedSteps.length > 0) {
            localStorage.setItem(
              'hmoni_process',
              JSON.stringify(mappedSteps)
            );
            return mappedSteps;
          }
        }
      }
    } catch (err) {
      // ignore network/CORS error and try next endpoint
    }
  }

  // Secondary fallback: /api/process.php
  const remote = await fetchApi<ProcessStep[]>('process.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_process', JSON.stringify(remote));
    return remote;
  }

  // Tertiary fallback: LocalStorage or DEFAULT_PROCESS
  const local = localStorage.getItem('hmoni_process');
  return local ? JSON.parse(local) : DEFAULT_PROCESS;
}

export async function saveProcessStep(step: Partial<ProcessStep>): Promise<boolean> {
  const res = await fetchApi<any>('process.php', {
    method: 'POST',
    body: JSON.stringify(step),
  });
  return !!res;
}

export async function deleteProcessStep(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`process.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 5. TESTIMONIALS
// -------------------------------------------------------------
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, author: 'Alexander Wright', role: 'Founder & CEO', company: 'Obsidian Group', content: 'H Moni delivered an exceptional digital platform that elevated our entire brand identity.', avatar: '/assets/imgs/template/avatar/avatar-10.webp', stars: 5 },
  { id: 2, author: 'Elena Rostova', role: 'Design Director', company: 'Kyoto Wellness Retreat', content: 'The attention to typography, micro-interactions, and responsive layout is world-class.', avatar: '/assets/imgs/template/avatar/avatar-11.webp', stars: 5 }
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const remote = await fetchApi<Testimonial[]>('testimonials.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_testimonials', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_testimonials');
  return local ? JSON.parse(local) : DEFAULT_TESTIMONIALS;
}

export async function saveTestimonial(t: Partial<Testimonial>): Promise<boolean> {
  const res = await fetchApi<any>('testimonials.php', {
    method: 'POST',
    body: JSON.stringify(t),
  });
  return !!res;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`testimonials.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 6. FAQS
// -------------------------------------------------------------
const DEFAULT_FAQS: FaqItem[] = [
  { id: 1, question: 'What services do you provide?', answer: 'We offer full-stack web development, UI/UX design, and custom React/Next.js applications.', category: 'Services' },
  { id: 2, question: 'How long does a typical project take?', answer: 'Design projects take 1-2 weeks. Custom web apps take 3-6 weeks.', category: 'Timeline' }
];

export async function getFaqs(): Promise<FaqItem[]> {
  for (const url of MANAGE_FAQS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json) ? json : json.data || json.faqs || json.items || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedFaqs: FaqItem[] = rawList
            .map((f: any, idx: number) => {
              return {
                id: f.id || idx + 1,
                question: f.question || f.q || `Question ${idx + 1}`,
                answer: f.answer || f.a || '',
                category: f.category || f.type || 'General',
              };
            })
            .filter((f: FaqItem) => !!f.question);
          if (mappedFaqs.length > 0) {
            localStorage.setItem('hmoni_faqs', JSON.stringify(mappedFaqs));
            return mappedFaqs;
          }
        }
      }
    } catch (err) {
      // ignore and try next endpoint
    }
  }

  // Secondary fallback: PHP proxy
  const remote = await fetchApi<FaqItem[]>('faqs.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_faqs', JSON.stringify(remote));
    return remote;
  }

  // Tertiary fallback: LocalStorage or defaults
  const local = localStorage.getItem('hmoni_faqs');
  return local ? JSON.parse(local) : DEFAULT_FAQS;
}

export async function saveFaq(faq: Partial<FaqItem>): Promise<boolean> {
  const res = await fetchApi<any>('faqs.php', {
    method: 'POST',
    body: JSON.stringify(faq),
  });
  return !!res;
}

export async function deleteFaq(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`faqs.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 7. SOCIAL LINKS
// -------------------------------------------------------------
const DEFAULT_SOCIALS: SocialLink[] = [
  { id: 1, platform: 'Twitter', url: 'https://twitter.com/hmoni', handle: '@hmoni' },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/hmoni', handle: 'H Moni' },
  { id: 3, platform: 'GitHub', url: 'https://github.com/hmoni', handle: '@hmoni' }
];

const MANAGE_SOCIALS_API_ENDPOINTS = [
  '/api/manage-socials', // Same-origin proxy (Vite/Vercel rewrite)
  '/api/manage-socials.php', // cPanel / PHP server proxy
  'https://manage.hmoni.com/api/socials',
];

export async function getSocials(): Promise<SocialLink[]> {
  // Try managed endpoints first
  for (const url of MANAGE_SOCIALS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json) ? json : json.data || json.socials || json.items || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          const mappedSocials: SocialLink[] = rawList.map((s: any, idx: number) => ({
            id: s.id || idx + 1,
            platform: s.platform || s.label || s.name || `Social ${idx + 1}`,
            url: s.url || s.href || s.link || '#',
            handle: s.handle || s.username || ''
          })).filter((s) => !!s.platform && !!s.url);
          if (mappedSocials.length > 0) {
            localStorage.setItem('hmoni_socials', JSON.stringify(mappedSocials));
            return mappedSocials;
          }
        }
      }
    } catch (err) {
      // ignore error and continue
    }
  }
  // Secondary fallback: PHP proxy
  const remote = await fetchApi<SocialLink[]>('socials.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_socials', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_socials');
  return local ? JSON.parse(local) : DEFAULT_SOCIALS;
}

export async function saveSocial(social: Partial<SocialLink>): Promise<boolean> {
  const res = await fetchApi<any>('socials.php', {
    method: 'POST',
    body: JSON.stringify(social),
  });
  return !!res;
}

export async function deleteSocial(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`socials.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 8. EXPERIENCE / CAREER TIMELINE
// -------------------------------------------------------------
const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  { id: 1, period: '2022 — Present', role: 'Lead Full-Stack Engineer & Designer', company: 'H Moni Digital Studio', description: 'Leading digital product design, web engineering, and client projects.' },
  { id: 2, period: '2020 — 2022', role: 'Senior UI/UX Specialist', company: 'IT Incubation Center KUET', description: 'Designed incubator SaaS tools and mentored startup tech teams.' }
];

export async function getExperience(): Promise<ExperienceItem[]> {
  const remote = await fetchApi<ExperienceItem[]>('experience.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_experience', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_experience');
  return local ? JSON.parse(local) : DEFAULT_EXPERIENCE;
}

export async function saveExperience(exp: Partial<ExperienceItem>): Promise<boolean> {
  const res = await fetchApi<any>('experience.php', {
    method: 'POST',
    body: JSON.stringify(exp),
  });
  return !!res;
}

export async function deleteExperience(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`experience.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 9. STATS / HAPPY CUSTOMERS
// -------------------------------------------------------------
const DEFAULT_STATS: StatItem[] = [
  { id: 1, stat_key: 'happy_clients', label: 'Happy Global Clients', number_value: '120', suffix: '+' },
  { id: 2, stat_key: 'completed_projects', label: 'Completed Projects', number_value: '300', suffix: '+' },
  { id: 3, stat_key: 'experience_years', label: 'Years of Experience', number_value: '6', suffix: '+' },
  { id: 4, stat_key: 'awards_won', label: 'Design & Tech Recognition', number_value: '15', suffix: '+' }
];

export async function getStats(): Promise<StatItem[]> {
  const remote = await fetchApi<StatItem[]>('stats.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_stats', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_stats');
  return local ? JSON.parse(local) : DEFAULT_STATS;
}

export async function saveStat(stat: Partial<StatItem>): Promise<boolean> {
  const res = await fetchApi<any>('stats.php', {
    method: 'POST',
    body: JSON.stringify(stat),
  });
  return !!res;
}

export async function deleteStat(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`stats.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// -------------------------------------------------------------
// 10. TECH STACK & TOOLS
// -------------------------------------------------------------
const DEFAULT_TECH_STACK: TechStackItem[] = [
  { id: 1, name: 'React & Next.js', category: 'Development', icon_url: '/assets/imgs/icons/tech-react.svg', proficiency: 'Expert' },
  { id: 2, name: 'TypeScript', category: 'Development', icon_url: '/assets/imgs/icons/tech-ts.svg', proficiency: 'Expert' },
  { id: 3, name: 'Tailwind CSS', category: 'Styling', icon_url: '/assets/imgs/icons/tech-css.svg', proficiency: 'Expert' },
  { id: 4, name: 'Figma', category: 'UI/UX Design', icon_url: '/assets/imgs/icons/tech-figma.svg', proficiency: 'Expert' }
];

export async function getTechStack(): Promise<TechStackItem[]> {
  const remote = await fetchApi<TechStackItem[]>('techstack.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_techstack', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_techstack');
  return local ? JSON.parse(local) : DEFAULT_TECH_STACK;
}

export async function saveTechStack(tech: Partial<TechStackItem>): Promise<boolean> {
  const res = await fetchApi<any>('techstack.php', {
    method: 'POST',
    body: JSON.stringify(tech),
  });
  return !!res;
}

export async function deleteTechStack(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`techstack.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// Duplicate blog definitions removed - using BlogItem implementation above

// -------------------------------------------------------------
// 12. MESSAGES & INQUIRIES
// -------------------------------------------------------------
export async function getMessages(): Promise<ContactMessage[]> {
  const remote = await fetchApi<ContactMessage[]>('messages.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_messages', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_messages');
  return local ? JSON.parse(local) : [];
}

export async function saveMessage(msg: Partial<ContactMessage>): Promise<boolean> {
  const res = await fetchApi<any>('messages.php', {
    method: 'POST',
    body: JSON.stringify(msg),
  });
  return !!res;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`messages.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

// Save contact form data to manage.hmoni.com/api/contacts
const MANAGE_CONTACTS_API_ENDPOINTS = [
  '/api/manage-contacts',           // Same-origin proxy (Vite/Vercel rewrite)
  '/api/manage-contacts.php',       // PHP proxy fallback
  'https://manage.hmoni.com/api/contacts', // Direct remote API
];

export async function saveContact(data: { name: string; email: string; phone?: string; message: string }): Promise<boolean> {
  for (const url of MANAGE_CONTACTS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return true;
    } catch (err) {
      // ignore and try next endpoint
    }
  }
  return false;
}

// -------------------------------------------------------------
// 13. SITE SETTINGS & METADATA
// -------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await fetchApi<SiteSettings>('settings.php');
  if (remote && typeof remote === 'object') {
    localStorage.setItem('hmoni_site_settings', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_site_settings');
  return local ? JSON.parse(local) : {
    brandName: 'H Moni',
    contactEmail: 'hello@hmoni.com',
    officeAddress: 'IT Incubation & Training Center KUET, Khulna - 9203, Bangladesh',
    studioAddress: 'H Moni Digital Studio, Khulna - 9203, Bangladesh',
    workingHours: 'Mo - Sa (9am - 5pm)',
    metaTitle: 'H Moni — Creative Designer, Full-Stack Engineer & Digital Studio',
    metaKeywords: 'H Moni, H Moni Portfolio, H Moni UI UX Designer, H Moni Full Stack Developer'
  };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  const res = await fetchApi<any>('settings.php', {
    method: 'POST',
    body: JSON.stringify(settings),
  });
  return !!res;
}

// -------------------------------------------------------------
// BACKWARD COMPATIBILITY ALIASES
// -------------------------------------------------------------
export const fetchHeroTilesApi = getHeroTiles;
export const saveHeroTileApi = saveHeroTile;
export const deleteHeroTileApi = deleteHeroTile;
export const resetHeroTilesApi = resetHeroTiles;

export const fetchProjectsApi = getProjects;
export const createProjectApi = saveProject;
export const deleteProjectApi = deleteProject;

export const fetchServicesApi = getServices;
export const createServiceApi = saveService;
export const deleteServiceApi = deleteService;

export const fetchProcessApi = getProcessSteps;
export const createProcessApi = saveProcessStep;
export const deleteProcessApi = deleteProcessStep;

export const fetchTestimonialsApi = getTestimonials;
export const createTestimonialApi = saveTestimonial;
export const deleteTestimonialApi = deleteTestimonial;

export const fetchFaqsApi = getFaqs;
export const createFaqApi = saveFaq;
export const deleteFaqApi = deleteFaq;

export const fetchSocialsApi = getSocials;
export const createSocialApi = saveSocial;
export const deleteSocialApi = deleteSocial;

export const fetchExperienceApi = getExperience;
export const createExperienceApi = saveExperience;
export const deleteExperienceApi = deleteExperience;

export const fetchStatsApi = getStats;
export const createStatApi = saveStat;
export const deleteStatApi = deleteStat;

export const fetchTechStackApi = getTechStack;
export const createTechStackApi = saveTechStack;
export const deleteTechStackApi = deleteTechStack;

// Blog aliases moved to after new getBlogs definition below

export const fetchMessagesApi = getMessages;
export const deleteMessageApi = deleteMessage;

export const fetchSettingsApi = getSiteSettings;
export const updateSettingsApi = saveSiteSettings;

// -------------------------------------------------------------
// IMAGE UPLOAD HELPER
// -------------------------------------------------------------
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    if (json.status === 'success' && json.url) {
      return json.url;
    }
  } catch (err) {
    console.warn('Image upload failed:', err);
  }
  return null;
}


// -------------------------------------------------------------
// 9. BLOGS
// -------------------------------------------------------------
interface BlogItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  date?: string;
  image?: string;
}

const DEFAULT_BLOGS: BlogItem[] = [];

const MANAGE_BLOGS_API_ENDPOINTS = [
  '/api/manage-blogs', // Same-origin proxy (Vite/Vercel rewrite)
  '/api/manage-blogs.php', // PHP proxy fallback
  'https://manage.hmoni.com/api/blogs', // Direct remote API
];

export async function getBlogs(): Promise<BlogItem[]> {
  for (const url of MANAGE_BLOGS_API_ENDPOINTS) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        const rawList = Array.isArray(json) ? json : json.data || json.blogs || json.items || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          const mapped: BlogItem[] = rawList.map((b: any, idx: number) => ({
            id: b.id || idx + 1,
            title: b.title || b.name || b.heading || `Blog ${idx + 1}`,
            slug: b.slug || b.id?.toString() || `${idx + 1}`,
            excerpt: b.excerpt || b.summary || b.description || '',
            content: b.content || b.body || '',
            author: b.author || b.author_name || '',
            date: b.date || b.published_at || '',
            image: b.image || b.thumbnail || '',
          }));
          localStorage.setItem('hmoni_blogs', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (err) {
      // ignore and try next endpoint
    }
  }
  // Secondary fallback: PHP proxy
  const remote = await fetchApi<BlogItem[]>('blogs.php');
  if (remote && Array.isArray(remote) && remote.length > 0) {
    localStorage.setItem('hmoni_blogs', JSON.stringify(remote));
    return remote;
  }
  // Tertiary fallback: LocalStorage or defaults
  const local = localStorage.getItem('hmoni_blogs');
  return local ? JSON.parse(local) : DEFAULT_BLOGS;
}

// Blog backward compatibility alias
export const fetchBlogsApi = getBlogs;

// -------------------------------------------------------------
// 14. CV DOWNLOAD
// -------------------------------------------------------------
export interface CvMetadata {
  id?: number;
  filename?: string;
  file_size?: number;
  title?: string;
}

export const MANAGE_CV_DOWNLOAD_ENDPOINTS = [
  '/api/manage-cv/download',
  '/api/manage-cv.php',
  'https://manage.hmoni.com/api/cv/download',
  'https://manage.hmoni.com/api/cv',
  '/assets/cv.pdf',
];

export async function downloadCv(): Promise<void> {
  // First try fetching the file blob through the endpoint hierarchy
  for (const url of MANAGE_CV_DOWNLOAD_ENDPOINTS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';

      // If the endpoint directly returns the PDF
      if (contentType.includes('application/pdf') || contentType.includes('octet-stream')) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'H_Moni_CV.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
        return;
      }

      // If the endpoint returns JSON metadata containing a download URL
      if (contentType.includes('application/json')) {
        const json = await res.json();
        const fileUrl = json?.data?.url || json?.url || json?.data?.file_url;
        if (fileUrl) {
          window.open(fileUrl, '_blank');
          return;
        }
      }
    } catch {
      // try next endpoint
    }
  }

  // Fallback: direct browser navigation to download URL
  const link = document.createElement('a');
  link.href = 'https://manage.hmoni.com/api/cv/download';
  link.download = 'H_Moni_CV.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
