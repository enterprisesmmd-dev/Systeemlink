import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { AnimatedSection } from '../AnimatedSection';
import { CheckCircle2, LucideIcon } from 'lucide-react';

export interface FeatureItem {
  icon?: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

export interface FeatureSectionProps {
  items: FeatureItem[];
  variant?: 'list' | 'grid' | 'checklist';
  columns?: 2 | 3 | 4;
}

export function FeatureSection({
  items,
  variant = 'grid',
  columns = 3
}: FeatureSectionProps) {
  if (variant === 'checklist') {
    return (
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon || CheckCircle2;
          return (
            <AnimatedSection key={index} animation="slide-right" delay={index * 0.05}>
              <div className="flex gap-4">
                <Icon className={`w-6 h-6 ${item.color || 'text-sky-600 dark:text-sky-400'} flex-shrink-0 mt-1`} />
                <div>
                  <h4 className="mb-1 text-gray-900 dark:text-gray-100">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    );
  }

  const gridCols = 
    columns === 2 ? 'md:grid-cols-2' :
    columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
    'md:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <AnimatedSection key={index} animation="fade-up" delay={index * 0.1}>
            <Card className="p-6 h-full hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {Icon && (
                <div className={`w-12 h-12 rounded-xl ${item.color || 'bg-sky-100 dark:bg-sky-900/30'} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${item.color?.includes('bg-') ? 'text-white' : 'text-sky-600 dark:text-sky-400'}`} />
                </div>
              )}
              <h3 className="text-lg mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
            </Card>
          </AnimatedSection>
        );
      })}
    </div>
  );
}