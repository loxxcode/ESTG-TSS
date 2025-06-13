
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
              <title>Admin Panel | ESTG-TSS</title>
              <meta name="description" content="Manage updates, events, and content creators from the admin panel of ESTG-TSS." />
      
              {/* Open Graph Meta Tags */}
              <meta property="og:title" content="Admin Panel | ESTG-TSS" />
              <meta property="og:description" content="Control content and users from the admin panel of ESTG-TSS." />
              <meta property="og:url" content="https://estg-tss.vercel.app/admin" />
              <meta property="og:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
      
              {/* Twitter Card Meta Tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Admin Panel | ESTG-TSS" />
              <meta name="twitter:description" content="Control content and users from the admin panel of ESTG-TSS." />
              <meta name="twitter:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
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

