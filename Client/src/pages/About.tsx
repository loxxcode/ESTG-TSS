
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Future from "../assets/future.png"
import Future2 from "../assets/goal.png"
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Page Header */}
      <div className="md:pt-10 text-center bg-estg-gray-light dark:bg-black">
        <div className="py-8 text-center">
        <AnimatedSection>
            <h2 className="text-4xl font-bold mb-2 text-black dark:text-white">About Our School</h2>
            <p className="text-black max-w-xl mx-auto mb-12 dark:text-white">
              Learn about our history, mission, values, and the dedicated team that makes ESTG a leading educational institution.
            </p>
        </AnimatedSection>
        </div>
      </div>
      
      {/* About Content - Placeholder, will be replaced with actual content */}
      <div className="bg-white dark:bg-black mb-32">
        <div className="container ml-11 px-4">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className='lg:ml-20 ml-10 mr-28 flex flex-col lg:flex-row gap-7' >
              <div>
                <img src={Future2} alt="leaders" className='h-[400px] w-[50rem] '/>
              </div>
              <div>
                <div className='w-[500px] justify-start text-start mt-1'>
                  <h1 className='text-black dark:text-white text-3xl font-bold'>Shaping tomorrow Engineers</h1>
                  <p className='mt-4'>At ESTG, we are committed to creating a vibrant and welcoming environment where every student can thrive. Our mission is to deliver a top-notch education that fosters academic excellence while encouraging creativity, critical thinking, and personal development. </p>
                  <h1 className='text-black dark:text-white text-3xl font-bold mt-5'> Mission and Motto</h1>
                  <p>To provide a comprehensive and inclusive education that fosters academic excellence, critical thinking, and personal growth.</p>
                  <h1 className='text-black dark:text-white text-3xl font-bold mt-5'>Vision of Core values</h1>
                  <p>Conscience , Science and Work to enreach capability of our success</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
