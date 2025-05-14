import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Refe from "../assets/eating.jpg"
import Running from "../assets/elysee.jpg"
import Tv from "../assets/gettyimages-1786348765-612x612.jpg"

const Campus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-estg-gray-light dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black dark:text-white">Administrative</h2>
            <p className="text-black max-w-xl mx-auto mb-8 md:mb-12 dark:text-white px-4">
              Experience our vibrant college community and world-class facilities designed to support your academic journey.
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Campus Content */}
      <div className="py-4 bg-white dark:bg-black">
<<<<<<< HEAD
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-in">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* First Card */}
              <div className="flex flex-col md:flex-row gap-4 shadow-lg rounded-md p-4 border-b-2 border-gray">
                <img src={Running} alt="activity" className="w-full md:w-1/2 h-[250px] md:h-[300px] object-cover rounded-md"/>
                <div className="flex-1 p-2">
                  <h1 className="text-xl md:text-2xl font-semibold p-2 md:p-4">Dr. John Smith 1</h1>
                  <p className="text-start">At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                  <div className="p-1">
=======
        <div className="container px-4">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className='lg:ml-20 w-[1100px]'>
            <div className='w-full flex gap-5 shadow-lg rounded-md p-2 border-b-2 border-gray'>

              <img src={Running} alt="activity" className='w-[50%] p-2 h-[300px] rounded-2xl'/>
              <div className='p-2'>
                <h1 className='p-4'>Dr. John Smith 1</h1>
                <p className='text-start justify-start'>At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                 <div className="p-1">
                   

                    {/* Hidden checkbox with peer class */}
>>>>>>> 8423ed8dccc12d488f5368c3a660fcb71d2c16d3
                    <input type="checkbox" id="toggle" className="peer hidden" />
                    <div className="hidden peer-checked:block">
<<<<<<< HEAD
                      <div className="flex flex-col">
                        <p className="text-start">With over 20 years of experience in the field, Dr. Smith has dedicated his career to fostering environments where students can excel academically, socially, and emotionally.</p>
                        <label htmlFor="toggle" className="cursor-pointer text-blue-500 hover:text-blue-600 mt-2">
=======
                      <div className='flex'>
                        <p className='text-start'> With over 20 years of experience in the field, Dr. Smith has dedicated his career to fostering environments where students can excel academically, socially, and emotionally. 
                          <label htmlFor="toggle" className="cursor-pointer w-28 pl-2 text-blue-500 rounded-2xl">
                            See Less
                          </label>
                        </p>
                      </div>
                    </div>

                     {/* Label acts as a clickable button */}
                    <label htmlFor="toggle" className="cursor-pointer w-28 peer-checked:hidden text-blue-500 p-2 rounded">
                      <p className='absolute mt-[-28px] ml-[99px] cursor-defau text-white'>..</p>
                      See More
                    </label>
                  </div>
              </div>
            </div>

            <div className='w-full flex gap-5 shadow-lg mt-4 border-opacity-5 rounded-md p-2 border-b-2 border-gray'>

              
              <div className='p-2'>
              <h1 className='p-4'>Dr. John Smith 2</h1>
                <p className='text-start justify-start'>At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                 <div className="p-1">

                    {/* Hidden checkbox with peer class */}
                    <input type="checkbox" id="toggle2" className="peer hidden" />

                    {/* Content that appears when checkbox is checked */}
                    <div className="hidden peer-checked:block">
                      <p className='text-start'> With over 20 years of experience in the field, Dr. Smith has dedicated his career to fostering environments where students can excel academically, socially, and emotionally.
                        <label htmlFor="toggle2" className="cursor-pointer w-28 pl-2 text-blue-500 rounded">
>>>>>>> 8423ed8dccc12d488f5368c3a660fcb71d2c16d3
                          See Less
                        </label>
                      </div>
                    </div>
                    <label htmlFor="toggle" className="cursor-pointer text-blue-500 hover:text-blue-600 peer-checked:hidden mt-2 inline-block">
                      See More
                    </label>
                  </div>
                </div>
              </div>
<<<<<<< HEAD

              {/* Second Card */}
              <div className="flex flex-col md:flex-row-reverse gap-4 shadow-lg rounded-md p-4 border-b-2 border-gray">
                <img src={Running} alt="activity" className="w-full md:w-1/2 h-[250px] md:h-[300px] object-cover rounded-md"/>
                <div className="flex-1 p-2">
                  <h1 className="text-xl md:text-2xl font-semibold p-2 md:p-4">Dr. John Smith 2</h1>
                  <p className="text-start">At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                  <div className="p-1">
                    <input type="checkbox" id="toggle2" className="peer hidden" />
=======
              <img src={Running} alt="activity" className='w-[50%] p-2 h-[300px] rounded-2xl'/>
            </div>
            <div className='w-full flex gap-5 shadow-lg mt-4 border-opacity-5 rounded-md p-2 border-gray'>

              <img src={Running} alt="activity" className='w-[50%] p-2 h-[300px] rounded-2xl'/>
              <div className='p-2'>
                <h2 className='p-4'>Dr. John Smith 3</h2>
                <p className='text-start justify-start'>At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                 <div className="p-1">
                   

                    {/* Hidden checkbox with peer class */}
                    <input type="checkbox" id="toggle3" className="peer hidden" />

                    {/* Content that appears when checkbox is checked */}
>>>>>>> 8423ed8dccc12d488f5368c3a660fcb71d2c16d3
                    <div className="hidden peer-checked:block">
                      <p className="text-start">With over 20 years of experience in the field, Dr. Smith has dedicated his career to fostering environments where students can excel academically, socially, and emotionally.</p>
                      <label htmlFor="toggle2" className="cursor-pointer text-blue-500 hover:text-blue-600 mt-2 inline-block">
                        See Less
                      </label>
                    </div>
                    <label htmlFor="toggle2" className="cursor-pointer text-blue-500 hover:text-blue-600 peer-checked:hidden mt-2 inline-block">
                      See More
                    </label>
                  </div>
                </div>
              </div>

              {/* Third Card */}
              <div className="flex flex-col md:flex-row gap-4 shadow-lg rounded-md p-4 border-b-2 border-gray">
                <img src={Running} alt="activity" className="w-full md:w-1/2 h-[250px] md:h-[300px] object-cover rounded-md"/>
                <div className="flex-1 p-2">
                  <h2 className="text-xl md:text-2xl font-semibold p-2 md:p-4">Dr. John Smith 3</h2>
                  <p className="text-start">At the helm of ESTG is our esteemed principal, Dr. John Smith, a visionary leader with a deep passion for education and student development.</p> 
                  <div className="p-1">
                    <input type="checkbox" id="toggle3" className="peer hidden" />
                    <div className="hidden peer-checked:block">
                      <p className="text-start">With over 20 years of experience in the field, Dr. Smith has dedicated his career to fostering environments where students can excel academically, socially, and emotionally.</p>
                      <label htmlFor="toggle3" className="cursor-pointer text-blue-500 hover:text-blue-600 mt-2 inline-block">
                        See Less
                      </label>
                    </div>
                    <label htmlFor="toggle3" className="cursor-pointer text-blue-500 hover:text-blue-600 peer-checked:hidden mt-2 inline-block">
                      See More
                    </label>
                  </div>
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

export default Campus;
