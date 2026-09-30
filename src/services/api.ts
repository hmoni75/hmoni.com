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
  step_num: string;
  title: string;
  desc: string;
  tags: string[];
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
  '/api/manage-hero', // Same-origin proxy (Vercel/Vite rewrite) - Zero CORS issues
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
  '/api/manage-projects', // Same-origin proxy (Vercel/Vite rewrite) - Zero CORS issues
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
const DEFAULT_SERVICES: Service[] = [
  { id: 1, num: '01', title: 'Brand Identity', desc: 'Logo systems, type pairings, color, and visual language.', tags: ['Logo', 'Type system', 'Guidelines'] },
  { id: 2, num: '02', title: 'Web Design', desc: 'Marketing sites, portfolios, and product pages designed in Figma.', tags: ['Landing', 'Portfolio', 'Marketing'] },
  { id: 3, num: '03', title: 'Webflow & Framer', desc: 'Hand-built no-code sites with motion and CMS.', tags: ['Framer', 'Webflow', 'CMS'] },
  { id: 4, num: '04', title: 'Product UI/UX', desc: 'Dashboards, onboarding flows, and product surfaces.', tags: ['Dashboard', 'App UI', 'Flows'] }
];

export async function getServices(): Promise<Service[]> {
  const remote = await fetchApi<Service[]>('services.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_services', JSON.stringify(remote));
    return remote;
  }
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
// 4. PROCESS PHILOSOPHY
// -------------------------------------------------------------
const DEFAULT_PROCESS: ProcessStep[] = [
  { id: 1, step_num: '01', title: 'Discovery & Alignment', desc: 'Uncovering core business goals, target audience, and edge.', tags: ['Strategy', 'Audit', 'Goals'] },
  { id: 2, step_num: '02', title: 'Architecture & UX', desc: 'Building wireframes, content hierarchy, and user journeys.', tags: ['Wireframe', 'UX Research', 'Flows'] },
  { id: 3, step_num: '03', title: 'Visual Direction & UI', desc: 'Crafting elevated UI components and visual systems.', tags: ['Figma', 'Design System', 'Motion'] },
  { id: 4, step_num: '04', title: 'Production Build & Launch', desc: 'Developing clean React/Next.js code and shipping to live production.', tags: ['React', 'Testing', 'Vercel'] }
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const remote = await fetchApi<ProcessStep[]>('process.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_process', JSON.stringify(remote));
    return remote;
  }
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
  const remote = await fetchApi<FaqItem[]>('faqs.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_faqs', JSON.stringify(remote));
    return remote;
  }
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

export async function getSocials(): Promise<SocialLink[]> {
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

// -------------------------------------------------------------
// 11. BLOG & RESOURCES
// -------------------------------------------------------------
const DEFAULT_BLOGS: BlogPost[] = [
  { id: 1, title: 'Designing Digital Experiences That Connect Brands and People', slug: 'designing-digital-experiences', category: 'UI / UX Design', author: 'H Moni', date_str: 'July 3, 2026', img: '/assets/imgs/pages/img-201.webp', excerpt: 'Exploring design principles that build emotional connection and clarity.', content: 'Digital experience design is more than aesthetics...' },
  { id: 2, title: 'From Concept to Launch: Building Products That Truly Matter', slug: 'concept-to-launch', category: 'Product Engineering', author: 'H Moni', date_str: 'July 8, 2026', img: '/assets/imgs/pages/img-202.webp', excerpt: 'A step-by-step roadmap to building scalable digital products.', content: 'Going from idea to live deployment requires strategy...' }
];

export async function getBlogs(): Promise<BlogPost[]> {
  const remote = await fetchApi<BlogPost[]>('blogs.php');
  if (remote && Array.isArray(remote)) {
    localStorage.setItem('hmoni_blogs', JSON.stringify(remote));
    return remote;
  }
  const local = localStorage.getItem('hmoni_blogs');
  return local ? JSON.parse(local) : DEFAULT_BLOGS;
}

export async function saveBlog(blog: Partial<BlogPost>): Promise<boolean> {
  const res = await fetchApi<any>('blogs.php', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
  return !!res;
}

export async function deleteBlog(id: number): Promise<boolean> {
  const res = await fetchApi<any>(`blogs.php?id=${id}`, { method: 'DELETE' });
  return !!res;
}

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

export const fetchBlogsApi = getBlogs;
export const createBlogApi = saveBlog;
export const deleteBlogApi = deleteBlog;

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

