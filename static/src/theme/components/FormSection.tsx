import type { ReactNode } from 'react';

export interface FormSectionProps {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  compact?: boolean;
}

export default function FormSection({
  id = 'form',
  title,
  description,
  children,
  compact = false,
}: FormSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={['border-t border-line bg-background', compact ? 'py-16' : 'py-20'].join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <h2 id={`${id}-title`} className="text-3xl font-serif font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
          {description && <div className="text-sm leading-relaxed text-ink-secondary sm:text-base">{description}</div>}
        </header>
        {children}
      </div>
    </section>
  );
}
