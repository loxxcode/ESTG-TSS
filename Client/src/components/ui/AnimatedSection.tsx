
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in'
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0 transition-all duration-700',
        {
          'opacity-100': isVisible,
          'animate-fade-in': isVisible && animation === 'fade-in',
          'animate-slide-up': isVisible && animation === 'slide-up',
          'animate-slide-down': isVisible && animation === 'slide-down',
          'animate-scale-in': isVisible && animation === 'scale-in',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
