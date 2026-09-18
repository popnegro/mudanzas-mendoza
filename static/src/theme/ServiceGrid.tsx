import type { ServiceItem } from './services.types.ts';
import { ServiceCard } from './ServiceCard.tsx';

export interface ServiceGridProps {
  services: ServiceItem[];
  featuredId?: string;
}

export function ServiceGrid({ services, featuredId }: ServiceGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
          variant={service.id === featuredId ? 'featured' : 'default'}
        />
      ))}
    </div>
  );
}
