import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { AnimatedSection } from '../AnimatedSection';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface GridItem {
  icon?: LucideIcon;
  title: string;
  description: string;
  link?: string;
  features?: string[];
  color?: string | { bg: string; hover?: string; shadow?: string };
  image?: string;
}

export interface GridSectionProps {
  items: GridItem[];
  columns?: 2 | 3 | 4;
  variant?: 'card' | 'icon' | 'image';
}

export function GridSection({
  items,
  columns = 3,
  variant = 'card'
}: GridSectionProps) {
  const gridCols = 
    columns === 2 ? 'md:grid-cols-2' :
    columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
    'md:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
      {items.map((item, index) => (
        <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
          {item.link ? (
            <Link to={item.link} className="block h-full">
              <GridCard item={item} variant={variant} />
            </Link>
          ) : (
            <GridCard item={item} variant={variant} />
          )}
        </AnimatedSection>
      ))}
    </div>
  );
}

function GridCard({ item, variant }: { item: GridItem; variant: 'card' | 'icon' | 'image' }) {
  const Icon = item.icon;
  
  // Determine color classes
  const colorBg = typeof item.color === 'string' 
    ? item.color 
    : item.color?.bg || 'bg-sky-100 dark:bg-sky-900/30';
  
  const isGradient = typeof item.color === 'object' || (typeof item.color === 'string' && item.color.includes('gradient'));

  if (variant === 'image' && item.image) {
    return (
      <Card className="group overflow-hidden h-full hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl mb-3 text-gray-900 dark:text-gray-100">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
          {item.features && (
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {item.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
          {item.link && (
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mt-4 group-hover:gap-3 transition-all">
              <span>Meer informatie</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`group p-6 h-full hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${item.link ? 'cursor-pointer' : ''}`}>
      {Icon && (
        <div className={`w-14 h-14 rounded-xl ${colorBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-7 h-7 ${isGradient ? 'text-white' : 'text-sky-600 dark:text-sky-400'}`} />
        </div>
      )}
      <h3 className="text-xl mb-3 text-gray-900 dark:text-gray-100">{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
      {item.features && (
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400"></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {item.link && (
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mt-4 group-hover:gap-3 transition-all">
          <span>Meer informatie</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </Card>
  );
}