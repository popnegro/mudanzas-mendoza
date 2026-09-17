import type { ComponentType, ReactNode } from 'react';
import type { PageDefinition, PageModule, PageRegistry } from './page.types.ts';

export type PageComponentResolver = (
  module: PageModule,
  page: PageDefinition,
) => ComponentType<Record<string, unknown>> | null;

export interface PageRendererProps {
  page: PageDefinition;
  registry: PageRegistry;
  resolve: PageComponentResolver;
  fallback?: ReactNode;
}

/**
 * Resolves page modules independently while the parent layout stays shared.
 * Missing modules fail soft so one optional page block cannot break the shell.
 */
export function PageRenderer({
  page,
  registry,
  resolve,
  fallback = null,
}: PageRendererProps) {
  const registeredPage = registry[page.id] ?? page;

  return (
    <>
      {registeredPage.modules
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((module) => {
          const Component = resolve(module, registeredPage);
          if (!Component) return fallback;

          return <Component key={module.id} {...(module.props ?? {})} />;
        })}
    </>
  );
}
