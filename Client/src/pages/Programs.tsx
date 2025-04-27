
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import Elc from "../assets/electrical2022.jpg"
import Elc2 from "../assets/students-during-electrical-installation-practicals-at-musanze-polytechnic.jpg"
import Sod from "../assets/computer-lab-class.png"
import Sod2 from "../assets/Computer-Lab-02-q59alxkw3d4s38f3mk860lgxajiebl1sxa0uxckqzk.jpg"

const Programs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-estg-gray-light dark:bg-black">
        <div className="lg:ml-[250px] container px-4">
          <AnimatedSection animation="slide-up" className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
              Academic Programs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-2 text-black dark:text-white">Academic Programs</h2>
            <p className="text-black max-w-xl mx-auto mb-12 dark:text-white">
              Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
            </p>
        </AnimatedSection>
        </div>
      </div>
      
      {/* Programs Content - Placeholder, will be replaced with actual content */}
      <div className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className='lg:ml-[200px] flex flex-col md:flex-row gap-10' >
              <div className='flex flex-col gap-10'>
              <img src={Elc} alt="Images" className='w-70% md:w-[90%] h-[300px]'/>
              <p className='text-black dark:text-white'>Electrical Technology</p>
              </div>
              <div className='flex flex-col gap-10'>
              <img src={Sod} alt="Images" className='w-70% md:w-[90%] h-[300px]'/>
              <p className='text-black dark:text-white'>Software Development</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Programs;
