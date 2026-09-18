export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
  icon?: string;
}

export interface ServiceCardProps extends ServiceItem {
  variant?: 'default' | 'featured';
}
