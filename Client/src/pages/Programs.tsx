
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
      <div className="pt-20 md:pb-4 bg-estg-gray-light dark:bg-black">
        <div className="text-center container px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-2 text-black dark:text-white">Academic Programs</h2>
            <p className="text-black max-w-xl mx-auto mb-12 dark:text-white">
              Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
            </p>
        </AnimatedSection>
        </div>
      </div>
      
      {/* Programs Content - Placeholder, will be replaced with actual content */}
      <div className="bg-white lg:ml-[-150px] dark:bg-black">
        <div className="container flex mb-32 px-4">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className='lg:ml-[200px] flex items-center justify-between md:flex-row flex-col gap-4' >
              <div className='flex flex-col gap-5'>
              <img src={Elc} alt="Electrical Technology" className='md:w-[500px] object-fit h-[300px]'/>
              <p className='text-black dark:text-white'>Electrical Technology</p>
              <a href="">About This</a>
              </div>
              <div className='flex flex-col gap-5'>
              <img src={Sod} alt="Software Development" className='md:w-[500px] h-[300px]'/>
              <p className='text-black dark:text-white'>Software Development</p>
              <a href="">About This</a>
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
