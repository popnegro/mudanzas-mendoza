import type { ReactNode } from 'react';

export interface SharedLayoutProps {
  header: ReactNode;
  navigation?: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  mainClassName?: string;
}

/**
 * Shared application shell. Page-specific content belongs in children.
 *
 * This component deliberately knows nothing about a site's brand, services,
 * SEO copy or business role.
 */
export function SharedLayout({
  header,
  navigation,
  footer,
  children,
  mainClassName,
}: SharedLayoutProps) {
  return (
    <div className="min-h-screen">
      <header>{header}</header>
      {navigation ? <nav aria-label="Navegación principal">{navigation}</nav> : null}
      <main className={mainClassName}>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
