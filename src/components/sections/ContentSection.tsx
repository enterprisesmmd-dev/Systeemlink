import { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import { AnimatedSection } from '../AnimatedSection';
import { LucideIcon } from 'lucide-react';

export interface ContentSectionProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
    color?: string;
  };
  title: string;
  description?: string;
  children: ReactNode;
  background?: 'white' | 'gray' | 'gradient';
  centered?: boolean;
  maxWidth?: 'default' | 'wide' | 'narrow';
}

export function ContentSection({
  badge,
  title,
  description,
  children,
  background = 'white',
  centered = true,
  maxWidth = 'default'
}: ContentSectionProps) {
  const bgClass = 
    background === 'gray' ? 'bg-gray-50 dark:bg-gray-900/50' :
    background === 'gradient' ? 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900' :
    'bg-white dark:bg-gray-950';
    
  const maxWidthClass = 
    maxWidth === 'wide' ? 'max-w-7xl' :
    maxWidth === 'narrow' ? 'max-w-4xl' :
    'max-w-7xl';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8`}>
        <AnimatedSection animation="fade-up">
          <div className={centered ? 'text-center max-w-3xl mx-auto mb-16' : 'mb-16'}>
            {badge && (
              <div className={centered ? 'flex justify-center mb-4' : 'mb-4'}>
                <Badge className={`${badge.color || 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800'}`}>
                  {badge.icon && (() => {
                    const BadgeIcon = badge.icon;
                    return <BadgeIcon className="w-3 h-3 mr-1" />;
                  })()}
                  {badge.text}
                </Badge>
              </div>
            )}
            
            <h2 className="text-3xl lg:text-5xl mb-6 text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            
            {description && (
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </AnimatedSection>
        
        {children}
      </div>
    </section>
  );
}