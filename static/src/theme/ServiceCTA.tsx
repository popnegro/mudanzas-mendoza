export interface ServiceCTAProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function ServiceCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ServiceCTAProps) {
  return (
    <section className="rounded-3xl bg-[#06434A] px-6 py-10 text-white sm:px-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={primaryHref} className="inline-flex items-center justify-center rounded-xl bg-[#07BE8A] px-5 py-3 text-sm font-bold text-[#06434A] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06434A]">
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref ? (
            <a href={secondaryHref} className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07BE8A]">
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
