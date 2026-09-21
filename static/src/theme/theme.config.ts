export interface ThemeConfig {
  brand: { name: string; tagline: string };
  site: { role: 'informational' | 'informational-conversion' | 'planning' | 'provider'; domain: string; baseUrl: string; locale: string; city: string; province: string; country: string };
  palette: { primary: string; primaryDark: string; accent: string; surface: string; background: string; text: string; textSecondary: string; border: string };
  ecosystem: { informationalUrl?: string; planningUrl?: string; providerUrl?: string };
  brandRelationship?: { type: 'project' | 'platform'; label: string; parentName: string; parentUrl: string; googleRating?: { value: number; label: string } };
};

/** Canonical theme-mudanzas contract. Shared visual primitives; site-specific content and behavior stay local. */
export const themeConfig: ThemeConfig = {
  brand: { name: 'Mudanzas en Mendoza', tagline: 'Información, destinos y servicios para planificar tu mudanza' },
  site: { role: 'informational-conversion', domain: 'mudanzasmendoza.com.ar', baseUrl: 'https://mudanzasmendoza.com.ar', locale: 'es-AR', city: 'Mendoza', province: 'Mendoza', country: 'Argentina' },
  palette: { primary: '#06434A', primaryDark: '#05373D', accent: '#07BE8A', surface: '#FFFFFF', background: '#FAF9F5', text: '#12383A', textSecondary: '#5F6B73', border: '#E2E8F0' },
  ecosystem: { informationalUrl: 'https://mudanzasmendoza.com.ar', planningUrl: 'https://mudanzapro.com.ar', providerUrl: 'https://mudanzasmiranda.com.ar' },
  brandRelationship: { type: 'project', label: 'Un proyecto de', parentName: 'Mudanzas Miranda', parentUrl: 'https://mudanzasmiranda.com.ar', googleRating: { value: 4.9, label: '4.9 estrellas en Google' } },
};
