import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Future2 from "../assets/event_2.jfif";
import { Helmet } from 'react-helmet';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 🔍 SEO + Social Media Meta Tags */}
      <Helmet>
        <title>About | ESTG-TSS</title>
        <meta key="description" name="description" content="Discover the history, mission, vision, and values of ESTG-TSS. Learn how we shape tomorrow’s engineers and empower students for success." />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="About | ESTG-TSS" />
        <meta key="og:description" property="og:description" content="Learn about ESTG-TSS, our mission, vision, and commitment to academic excellence and student development." />
        <meta key="og:url" property="og:url" content="https://estg-tss.vercel.app/about" />
        <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="About | ESTG-TSS" />
        <meta key="twitter:description" name="twitter:description" content="Discover the story, mission, and values of ESTG-TSS, a leading educational institution." />
        <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
      </Helmet>
      <Navbar />

      {/* Page Header */}
      <div className="md:pt-10 pt-20 text-center bg-estg-gray-light dark:bg-black">
        <div className="py-12 text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">About Our School</h1>
            <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
              Learn about our history, mission, values, and the dedicated team that makes ESTG a leading educational institution.
            </p>
          </AnimatedSection>

        </div>
      </div>

      {/* About Content */}
      <div className="bg-white dark:bg-black pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fade-in" className="text-center">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <img
                  src={Future2}
                  alt="leaders"
                  className="w-full h-auto lg:h-[500px] object-cover rounded-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 text-left">
                <h2 className="text-black dark:text-white text-2xl font-bold mt-10">Shaping Tomorrow’s Engineers</h2>
                <p className="mt-4 text-sm sm:text-base dark:text-white">
                  At ESTG, we are committed to creating a vibrant and welcoming environment where every student can thrive. Our mission is to deliver a top-notch education that fosters academic excellence while encouraging creativity, critical thinking, and personal development.
                </p>

                <h2 className="text-black dark:text-white text-2xl font-bold mt-6">Mission and Motto</h2>
                <p className="mt-2 text-sm sm:text-base dark:text-white">
                  To provide a comprehensive and inclusive education that fosters academic excellence, critical thinking, and personal growth.
                </p>

                <h2 className="text-black dark:text-white text-2xl font-bold mt-6">Vision of Core Values</h2>
                <p className="mt-2 text-sm sm:text-base dark:text-white">
                  Conscience, Science and Work to enrich the capability of our success.
                </p>

                <p className="mt-2 text-sm sm:text-base dark:text-white">
                  We strive to instill a deep sense of responsibility, integrity, and innovation in all our activities.
                </p>

                <p className="mt-2 text-sm sm:text-base dark:text-white">
                  Our vision is to empower individuals with knowledge and practical skills to create meaningful impact in their communities.
                </p>
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
