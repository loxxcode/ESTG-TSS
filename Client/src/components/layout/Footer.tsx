
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-display font-bold tracking-tight text-estg-blue">
                ESTG<span className="text-foreground">.</span>
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Escola Superior de Tecnologia e Gestão - providing quality education and innovation since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-estg-blue transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Whatsapp</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-estg-blue transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-estg-blue transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-estg-blue transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-foreground mb-4">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/programs" className="text-muted-foreground hover:text-estg-blue transition-colors">Software Development</Link></li>
              <li><Link to="/programs" className="text-muted-foreground hover:text-estg-blue transition-colors">Electrical Technology</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-estg-blue transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-estg-blue transition-colors">Campus Life</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-estg-blue transition-colors">Academic Calendar</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-estg-blue shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  1234 Rubavu, Gisenyi, 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-estg-blue" />
                <a href="tel:+123456789" className="text-muted-foreground hover:text-estg-blue transition-colors">
                  +250 796260747
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-estg-blue" />
                <a href="mailto:info@estg.edu" className="text-muted-foreground hover:text-estg-blue transition-colors">
                  info@estg.edu
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} ESTG. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-estg-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-estg-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-estg-blue transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
