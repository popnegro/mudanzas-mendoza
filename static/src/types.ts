export interface Destination {
  slug: string;
  name: string;
  region: "Gran Mendoza" | "Zona Este y Valle de Uco" | "Sur de Mendoza";
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  leadText: string;
  detailText: string;
  isDistrict?: boolean;
  parentDepartment?: string;
}

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
  alt: string;
  ctaText: string;
  longDescription?: string;
  benefits?: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  keywords: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
}

export interface QuoteRequest {
  origin: string;
  destination: string;
  movingDate: string;
  serviceType: string;
  name: string;
  phone: string;
  email: string;
  comments?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
