/**
 * theme-mudanzas — shared visual configuration.
 *
 * Site identity, contact data, SEO and ecosystem URLs belong to each
 * consuming site. This module contains only reusable UI tokens.
 */
export interface ThemeConfig {
  primary: string;
  accent: string;
  surface: string;
  text: string;
}

export const themeConfig: ThemeConfig = {
  primary: '#06434A',
  accent: '#07BE8A',
  surface: '#FAF9F5',
  text: '#302D28',
};
