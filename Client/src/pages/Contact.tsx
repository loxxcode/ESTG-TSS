import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import AnimatedSection from '../components/ui/AnimatedSection';
import ContactForm from '../components/home/Contact';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
       {/* 🔍 SEO + Social Media Meta Tags */}
            <Helmet>
        <title>Contact | ESTG-TSS</title>
        <meta key="description" name="description" content="Contact ESTG-TSS for inquiries, support, or feedback. Reach out to our team and we will be happy to assist you with your questions or concerns." />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="Contact | ESTG-TSS" />
        <meta key="og:description" property="og:description" content="Get in touch with ESTG-TSS for any questions, support, or information about our school and programs." />
        <meta key="og:url" property="og:url" content="https://estg-tss.vercel.app/contact" />
        <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="Contact | ESTG-TSS" />
        <meta key="twitter:description" name="twitter:description" content="Contact ESTG-TSS for support, questions, or feedback. Our team is ready to help you." />
        <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
      </Helmet>
      <Navbar />
      
      
      {/* Contact Form Component */}
      {/* <div className="py-16 md:py-20"> */}
        <div className="container px-4">
          <ContactForm />
        </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default ContactPage;

