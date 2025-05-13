
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import AnimatedSection from '../ui/AnimatedSection';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80';
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          <AnimatedSection animation="fade-in" delay={300}>
            <h5 className="text-estg-blue font-medium mb-3 text-sm md:text-base">Ecole Secondaire Technique Gisenyi</h5>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={500}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              Shaping Tomorrows Digital Engineers
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={700}>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Join a community dedicated to academic excellence, innovation, and professional success. Discover your potential at ESTG.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={900}>
            <div className="flex flex-wrap gap-4">
              <a href="/programs"><Button size="lg">
                Explore Programs
                <ArrowRight size={18} />
              </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-pulse-subtle">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to discover</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
