
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import AnimatedSection from '../components/ui/AnimatedSection';
import ContactForm from '../components/home/Contact';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
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

