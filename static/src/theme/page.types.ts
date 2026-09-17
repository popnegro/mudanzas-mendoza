/**
 * Page-level composition contract.
 *
 * The shell/layout is shared; each page declares its own content modules.
 * A consuming site may register as many page definitions as it needs without
 * duplicating Header, Navigation or Footer.
 */
export type PageLayout = 'default' | 'wide' | 'article' | 'landing';

export interface PageModule {
  id: string;
  component: string;
  order?: number;
  props?: Record<string, unknown>;
}

export interface PageDefinition {
  id: string;
  path: string;
  title: string;
  description?: string;
  layout?: PageLayout;
  modules: PageModule[];
}

export type PageRegistry = Record<string, PageDefinition>;
