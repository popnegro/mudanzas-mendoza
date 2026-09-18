import type { ServiceCardProps } from './services.types.ts';

export function ServiceCard({
  title,
  description,
  href,
  eyebrow,
  variant = 'default',
}: ServiceCardProps) {
  const content = (
    <article
      className={`group h-full rounded-2xl border p-6 transition-all duration-200 ${
        variant === 'featured'
          ? 'border-[#06434A]/20 bg-[#06434A] text-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg'
          : 'border-slate-200 bg-white text-[#302D28] hover:-translate-y-0.5 hover:border-[#07BE8A]/50 hover:shadow-lg'
      }`}
    >
      {eyebrow ? (
        <p className={`mb-2 text-xs font-bold uppercase tracking-[0.14em] ${variant === 'featured' ? 'text-[#07BE8A]' : 'text-slate-500'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${variant === 'featured' ? 'text-white/80' : 'text-slate-600'}`}>
        {description}
      </p>
      {href ? (
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${variant === 'featured' ? 'text-white' : 'text-[#06434A] group-hover:text-[#07BE8A]'}`}>
          Ver servicio <span aria-hidden="true">→</span>
        </span>
      ) : null}
    </article>
  );

  return href ? (
    <a href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07BE8A] focus-visible:ring-offset-2">
      {content}
    </a>
  ) : content;
}
