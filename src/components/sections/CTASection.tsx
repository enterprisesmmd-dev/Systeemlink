import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { AnimatedSection } from '../AnimatedSection';
import { LucideIcon } from 'lucide-react';

export interface CTASectionProps {
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string;
  description: string;
  buttons: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary';
    icon?: LucideIcon;
  }[];
  gradient?: string;
  variant?: 'gradient' | 'card';
}

export function CTASection({
  badge,
  title,
  description,
  buttons,
  gradient = 'from-sky-600 via-blue-700 to-indigo-900',
  variant = 'gradient'
}: CTASectionProps) {
  if (variant === 'card') {
    return (
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="scale">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white">
              <div className="p-6 sm:p-8 md:p-12 lg:p-16 text-center relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-300 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {badge && (
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                        {badge.icon && (() => {
                          const BadgeIcon = badge.icon;
                          return <BadgeIcon className="w-3 h-3 mr-1" />;
                        })()}
                        {badge.text}
                      </Badge>
                    </div>
                  )}
                  <h2 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight break-words px-2"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                    {description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                    {buttons.map((button, index) => {
                      const Icon = button.icon;
                      return (
                        <Link key={index} to={button.link} className="w-full sm:w-auto">
                          <Button 
                            size="lg" 
                            className={`w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 ${
                              button.variant === 'primary'
                                ? 'bg-white text-sky-600 hover:bg-gray-100 shadow-xl'
                                : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 transition-colors'
                            }`}
                          >
                            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                            <span className="truncate">{button.text}</span>
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <AnimatedSection animation="fade-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {badge && (
            <div className="flex justify-center mb-4 sm:mb-6">
              <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                {badge.icon && (() => {
                  const BadgeIcon = badge.icon;
                  return <BadgeIcon className="w-3 h-3 mr-1" />;
                })()}
                {badge.text}
              </Badge>
            </div>
          )}
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight break-words px-2"
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto'
            }}
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            {buttons.map((button, index) => {
              const Icon = button.icon;
              return (
                <Link key={index} to={button.link} className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className={`w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 ${
                      button.variant === 'primary'
                        ? 'bg-white text-sky-600 hover:bg-gray-100'
                        : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                    <span className="truncate">{button.text}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}