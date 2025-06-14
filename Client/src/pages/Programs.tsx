import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Elc from "../assets/electrical2022.jpg";
import Sod from "../assets/estg_image_5.jpg";
import { Helmet } from "react-helmet";

const Programs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
       {/* 🔍 SEO + Social Media Meta Tags */}
            <Helmet>
        <title>Programs | ESTG-TSS</title>
        <meta key="description" name="description" content="Explore the academic programs offered at ESTG-TSS, including Electrical Technology and Software Development. Find the right program to launch your career." />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="Programs | ESTG-TSS" />
        <meta key="og:description" property="og:description" content="Discover a range of academic programs at ESTG-TSS designed to prepare students for success in engineering and technology fields." />
        <meta key="og:url" property="og:url" content="https://estg-tss.vercel.app/programs" />
        <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="Programs | ESTG-TSS" />
        <meta key="twitter:description" name="twitter:description" content="Learn about the academic programs at ESTG-TSS, including hands-on training and industry-relevant coursework." />
        <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
      </Helmet>
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 md:pb-4 bg-estg-gray-light dark:bg-black">
        <div className="text-center container px-4">

          <AnimatedSection>
  <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Academic Programs</h1>
  <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
  Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
  </p>
</AnimatedSection>
        </div>
      </div>
      
      {/* Programs Content */}
      <div className="flex-grow bg-white lg:ml-[-150px] dark:bg-black">
        <div className="container flex mb-32 px-4">
          <AnimatedSection animation="fade-in" className="text-center w-full">
            <div className='lg:ml-[200px] grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
              <div className='group relative min-h-[600px]'>
                <div className='flex flex-col gap-5 w-full bg-red-white dark:bg-white-900 rounded-lg shadow-md p-6'>
                  <img src={Elc} alt="Electrical Technology" className='w-full h-[300px] object-cover rounded-lg'/>
                  <p className='text-black dark:text-white font-semibold text-xl'>Electrical Technology</p>
                  <p className='text-gray-600 dark:text-gray-300 text-sm'>
                    Master the fundamentals of electrical systems and renewable energy technologies through hands-on training and industry-relevant coursework.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="electrical" className="border-none">
                      <AccordionTrigger className="text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:no-underline">
                        View More Details
                      </AccordionTrigger>
                      <AccordionContent className="text-left bg-white dark:bg-black rounded-b-lg shadow-lg mt-2">
                        <div className="space-y-4 p-6">
                          <h3 className="font-semibold text-black dark:text-white">Program Overview:</h3>
                          <p className="text-gray-700 dark:text-gray-300">Our Electrical Technology program offers comprehensive training in:</p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Electrical circuit design and analysis</li>
                            <li>Power systems and distribution</li>
                            <li>Industrial automation and control</li>
                            <li>Renewable energy systems</li>
                            <li>Practical hands-on laboratory training</li>
                          </ul>
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">Duration: 3 years</p>
                            <p className="text-gray-700 dark:text-gray-300">Qualification: Advanced Diploma in Electrical Technology</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              <div className='group relative min-h-[600px]'>
                <div className='flex flex-col gap-5 w-full bg-red-white dark:bg-white-900 rounded-lg shadow-md p-6'>
                  <img src={Sod} alt="Software Development" className='w-full h-[300px] object-cover rounded-lg'/>
                  <p className='text-black dark:text-white font-semibold text-xl'>Software Development</p>
                  <p className='text-gray-600 dark:text-gray-300 text-sm'>
                    Develop cutting-edge software applications and learn modern programming practices in our comprehensive development program.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="software" className="border-none">
                      <AccordionTrigger className="text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:no-underline">
                        View More Details
                      </AccordionTrigger>
                      <AccordionContent className="text-left bg-white dark:bg-black rounded-b-lg shadow-lg mt-2">
                        <div className="space-y-4 p-6">
                          <h3 className="font-semibold text-black dark:text-white">Program Overview:</h3>
                          <p className="text-gray-700 dark:text-gray-300">Our Software Development program focuses on:</p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Web and mobile application development</li>
                            <li>Database management systems</li>
                            <li>Programming fundamentals and advanced concepts</li>
                            <li>Software testing and quality assurance</li>
                            <li>Project management and agile methodologies</li>
                          </ul>
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">Duration: 3 years</p>
                            <p className="text-gray-700 dark:text-gray-300">Qualification: Advanced Diploma in Software Development</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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

export default Programs;