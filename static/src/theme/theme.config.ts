/**
 * theme-mudanzas — site-specific configuration contract.
 *
 * Components should consume this object for brand/domain/contact values instead
 * of hard-coding Mudanzas Miranda data. Content datasets remain site-owned.
 */
export interface ThemeConfig {
  brand: {
    name: string;
    legalName?: string;
    tagline: string;
  };
  site: {
    domain: string;
    baseUrl: string;
    locale: string;
    city: string;
    province: string;
    country: string;
  };
  contact: {
    whatsapp: string;
    whatsappUrl: string;
    phone?: string;
    email?: string;
  };
  ecosystem?: {
    informationalUrl?: string;
    planningUrl?: string;
    providerUrl?: string;
  };
  theme: {
    primary: string;
    accent: string;
    surface: string;
    text: string;
  };
}

export const themeConfig: ThemeConfig = {
  brand: {
    name: 'Mudanzas Miranda',
    tagline: 'Mudanzas y fletes profesionales en Mendoza',
  },
  site: {
    domain: 'mudanzasmendoza.com.ar',
    baseUrl: 'https://mudanzasmendoza.com.ar',
    locale: 'es-AR',
    city: 'Mendoza',
    province: 'Mendoza',
    country: 'Argentina',
  },
  contact: {
    whatsapp: '5492615130910',
    whatsappUrl: 'https://wa.me/5492615130910',
  },
  ecosystem: {
    informationalUrl: 'https://mudanzasmendoza.com.ar',
    planningUrl: 'https://mudanzapro.com.ar',
    providerUrl: 'https://mudanzasmiranda.com.ar',
  },
  theme: {
    primary: '#06434A',
    accent: '#07BE8A',
    surface: '#FAF9F5',
    text: '#302D28',
  },
};
