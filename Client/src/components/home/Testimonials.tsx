
import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Studying at ESTG was one of the best decisions I've made. The professors are top-notch, and the hands-on experience I gained has been invaluable in my career.",
    name: "Sofia Martins",
    title: "Software Engineer, Tech Innovations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    quote: "The practical approach to learning at ESTG prepared me for the real challenges of the business world. The networking opportunities and internship programs helped me secure my dream job.",
    name: "Miguel Costa",
    title: "Business Development Manager, Global Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    quote: "ESTG's emphasis on innovation and research gave me the skills to solve complex engineering problems. The faculty's support and guidance were instrumental in my academic success.",
    name: "Ana Rodrigues",
    title: "Civil Engineer, Building Futures Inc.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-estg-gray-light dark:bg-black relative overflow-hidden">
      <div className="container px-4">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto mb-12">
          <h5 className="text-estg-blue font-medium mb-3">TESTIMONIALS</h5>
          <h2 className="section-heading mb-6">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground">
            Hear directly from our graduates about their experiences at ESTG and how our programs have helped shape their careers.
          </p>
        </AnimatedSection>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  currentIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 absolute top-0 left-0 right-0 translate-x-8'
                }`}
              >
                {currentIndex === index && (
                  <AnimatedSection animation="fade-in" className="bg-white dark:bg-black border rounded-2xl shadow-soft p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -left-2 bg-estg-blue rounded-full p-2 shadow-md">
                            <Quote size={16} className="text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 text-center md:text-left">
                        <p className="text-lg md:text-xl italic text-foreground mb-6">"{testimonial.quote}"</p>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-estg-blue hover:border-estg-blue hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? 'w-6 bg-estg-blue' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-estg-blue hover:border-estg-blue hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
