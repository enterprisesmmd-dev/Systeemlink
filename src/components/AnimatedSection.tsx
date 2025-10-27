import { motion } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = ''
}: AnimatedSectionProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const animations = {
    'fade-up': {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 }
    },
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    'slide-left': {
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 }
    },
    'slide-right': {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 }
    },
    'scale': {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    }
  };

  const selectedAnimation = animations[animation] || animations['fade-up'];

  return (
    <motion.div
      ref={ref as any}
      initial={selectedAnimation.initial}
      animate={isVisible ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}