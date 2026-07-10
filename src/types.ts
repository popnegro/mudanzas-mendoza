export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  slug: string;
  seo: SEOData;
  description: string;
  content: string;
  highlightItems: string[];
  faqs: { question: string; answer: string }[];
  localFrecuentes: string[];
}

export interface ServiceInfo {
  id: string;
  name: string;
  slug: string;
  seo: SEOData;
  description: string;
  longDescription: string;
  benefits: string[];
  iconName: string;
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
  image?: string;
}

export interface CotizacionState {
  origen: string;
  destino: string;
  tipoVivienda: 'casa' | 'departamento' | 'oficina' | 'local';
  ambientes: string;
  piso: string;
  ascensor: 'si' | 'no' | 'no-aplica';
  servicios: string[]; // 'embalaje', 'desembalaje', 'desarme', 'armado', 'guardamuebles'
  objetosEspeciales: string[]; // 'piano', 'caja_fuerte', 'heladera', 'mesa_pool', 'vidrios'
  fecha: string;
  horario: 'manana' | 'tarde' | 'todo-dia';
  nombre: string;
  telefono: string;
  email: string;
  observaciones: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
