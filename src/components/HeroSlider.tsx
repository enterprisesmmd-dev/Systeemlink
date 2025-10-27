import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const defaultSlides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1599580546605-a86af98dbdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTM4MzI1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Uw betrouwbare partner in IT-beheer',
    subtitle: 'Volledig ontzorgd',
    description: 'Wij nemen het volledige beheer van uw IT-infrastructuur uit handen. Van werkplekken tot cloud-omgevingen, zodat u zich kunt focussen op uw bedrijf.',
    ctaText: 'Vraag gratis IT-check aan',
    ctaLink: '/it-check'
  },
  {
    image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGElMjBjZW50ZXJ8ZW58MXx8fHwxNzYxNDQyMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Proactive IT-oplossingen voor uw bedrijf',
    subtitle: '24/7 Monitoring & Support',
    description: 'Voorkom downtime met onze proactieve monitoring. Wij detecteren en verhelpen problemen voordat ze impact hebben op uw bedrijfsvoering.',
    ctaText: 'Ontdek onze oplossingen',
    ctaLink: '/oplossingen'
  },
  {
    image: 'https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEzODAwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Microsoft 365 & Cloud transformatie',
    subtitle: 'Modern werken',
    description: 'Verhoog uw productiviteit met Microsoft 365. Wij helpen u met migratie, implementatie en volledig cloudbeheer voor veilig samenwerken overal.',
    ctaText: 'Naar Cloud oplossingen',
    ctaLink: '/oplossingen/cloud-microsoft-365'
  },
  {
    image: 'https://images.unsplash.com/photo-1746893737268-81fe686e6a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VydmVyJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzYxNDQyMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Cybersecurity voor het MKB',
    subtitle: 'Bescherm wat belangrijk is',
    description: 'In een digitale wereld vol dreigingen beschermen wij uw bedrijfsgegevens met enterprise-level beveiliging. Van firewalls tot 24/7 security monitoring.',
    ctaText: 'Beveilig uw bedrijf',
    ctaLink: '/oplossingen/netwerk-beveiliging'
  }
];

export function HeroSlider({ slides: customSlides }: { slides?: Slide[] } = {}) {
  const slides = customSlides || defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Content */}
          {/* Header height: ~100px mobile, ~108px desktop */}
          {/* Adding 30px spacing: 130px mobile, 138px desktop */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start pt-[130px] md:pt-[138px] lg:items-center lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-white w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0ea5e9]/20 backdrop-blur-sm rounded-full border border-[#0ea5e9]/30"
              >
                <span className="text-[#0ea5e9] text-sm sm:text-base">{slide.subtitle}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-3 sm:mb-4 md:mb-6 leading-tight break-words"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none"
              >
                {slide.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to={slide.ctaLink}>
                  <Button size="lg" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto">
                    <span className="truncate">{slide.ctaText}</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-[#0ea5e9] w-8' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}