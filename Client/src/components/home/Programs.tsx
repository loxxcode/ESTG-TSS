import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: 'Computer Science',
    description: 'Develop cutting-edge software and systems with our comprehensive computer science program.',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    icon: '💻'
  },
  {
    id: 2,
    title: 'Business Administration',
    description: 'Master the fundamentals of business management and leadership for the modern corporate world.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    icon: '📊'
  },
  {
    id: 3,
    title: 'Civil Engineering',
    description: 'Design and build sustainable infrastructure and structures that shape our communities.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    icon: '🏗️'
  },
  {
    id: 4,
    title: 'Electrical Engineering',
    description: 'Innovate in electronics, power systems, and communications technology for a connected world.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    icon: '⚡'
  },
];

const Programs = () => {
  return (
    <section className="py-16 md:py-24 bg-estg-gray dark:bg-black">
      <div className="container px-4">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto mb-12">
          <h5 className="text-estg-blue font-medium mb-3">OUR PROGRAMS</h5>
          <h2 className="section-heading mb-6">Discover Your Path to Success</h2>
          <p className="text-lg text-muted-foreground">
            We offer a diverse range of undergraduate and graduate programs designed to prepare students for successful careers in technology, engineering, and management.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => (
            <AnimatedSection 
              key={program.id} 
              animation="fade-in" 
              delay={index * 150}
              className="card-hover bg-white dark:bg-black rounded-xl overflow-hidden shadow-soft"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-2xl mb-3">{program.icon}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{program.title}</h3>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <Link 
                  to="/programs" 
                  className="text-estg-blue font-medium inline-flex items-center hover:text-estg-blue-dark"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection animation="fade-in" className="text-center">
          <Button size="lg">
            View All Programs
            <ArrowRight size={18} />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Programs;
