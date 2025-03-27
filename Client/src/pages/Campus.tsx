
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Refe from "../assets/eating.jpg"
import Running from "../assets/PR.jpg"
import Tv from "../assets/gettyimages-1786348765-612x612.jpg"
const Campus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-estg-gray-light dark:bg-black">
        <div className="container px-4">
          <AnimatedSection animation="slide-up" className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              College Life
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Experience our vibrant college community and world-class facilities designed to support your academic journey.
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Campus Content - Placeholder, will be replaced with actual content */}
      <div className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className='lg:ml-20 flex flex-col lg:flex-row gap-10' >
            <img src={Running} alt="activity" className='w-full lg:w-[30%]'/>
            <img src={Refe} alt="activity" className='w-full lg:w-[30%]'/>
            <img src={Tv} alt="activity" className='w-full lg:w-[30%]'/>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Campus;
