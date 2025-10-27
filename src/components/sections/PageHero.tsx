import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LucideIcon } from 'lucide-react';

export interface PageHeroProps {
  breadcrumb?: string; // Simple string like "Oplossingen / Werkplekbeheer"
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string;
  description: string;
  breadcrumbs?: { label: string; path: string }[];
  buttons?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary';
  }[];
  gradient: string;
  backgroundPattern?: boolean;
}

export function PageHero({
  breadcrumb,
  badge,
  title,
  description,
  breadcrumbs,
  buttons = [],
  gradient,
  backgroundPattern = true
}: PageHeroProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient} text-white pb-16 relative overflow-hidden`}>
      {/* Fixed padding to ensure breadcrumb is always 30px below header */}
      {/* Header height: ~100px mobile, ~108px desktop */}
      {/* Adding 30px spacing: 130px mobile, 138px desktop */}
      <div className="pt-[130px] md:pt-[138px]">
        {backgroundPattern && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Simple breadcrumb string */}
            {breadcrumb && (
              <div className="text-sm opacity-90 mb-4 leading-none flex items-center" style={{ marginBottom: '15px', lineHeight: '1.2' }}>
                {breadcrumb}
              </div>
            )}
            
            {/* Advanced breadcrumbs with links */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm leading-none" style={{ lineHeight: '1.2' }}>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {index > 0 && <span className="opacity-60 flex items-center">/</span>}
                      <Link to={crumb.path} className="hover:underline opacity-90 flex items-center">
                        {crumb.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            
            {badge && (
              <div className="mb-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {badge.icon && <badge.icon className="w-3 h-3 mr-1" />}
                  {badge.text}
                </Badge>
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl mb-6">
              {title}
            </h1>
            
            <p className="text-xl opacity-90 mb-8">
              {description}
            </p>
            
            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {buttons.map((button, index) => (
                  <Link key={index} to={button.link}>
                    <Button 
                      size="lg" 
                      className={
                        button.variant === 'primary'
                          ? 'bg-white text-sky-600 hover:bg-gray-100 h-14 px-8'
                          : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 transition-colors h-14 px-8'
                      }
                    >
                      {button.text}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}