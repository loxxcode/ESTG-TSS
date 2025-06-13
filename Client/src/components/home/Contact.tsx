import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Button } from '../ui/button';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contactInfo = [
  {
    icon: <MapPin size={20} className="text-estg-blue" />,
    title: 'Our Location',
    details: 'Kigali-Rwanda'
  },
  {
    icon: <Phone size={20} className="text-estg-blue" />,
    title: 'Phone Number',
    details: '+1 (234) 567-890'
  },
  {
    icon: <Mail size={20} className="text-estg-blue" />,
    title: 'Email Address',
    details: 'info@estg.edu'
  },
  {
    icon: <Clock size={20} className="text-estg-blue" />,
    title: 'Office Hours',
    details: 'Monday-Friday: 8:00 AM - 5:00 PM'
  }
];

const Contact = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "2970fb62-6888-4a71-a921-0aa3234a856a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      toast.success("Message sent successfully!", { position: 'bottom-right' });
      (event.target as HTMLFormElement).reset();
    } else {
      console.error("Error", res);
      toast.error("Failed to send the message. Please try again.", { position: 'bottom-right' });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-background">
      <div className="container text-center justify-center px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold mb-2 text-black dark:text-white">Contact Us</h2>
          <p className="text-black max-w-xl mx-auto mb-12 dark:text-white">
            Have questions or need more information? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="fade-in" className="lg:col-span-3">
              <div className="bg-white dark:bg-card rounded-2xl shadow-soft p-8">
                <h3 className="text-2xl font-display font-semibold mb-6 dark:text-white">Send us a message</h3>
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-md border border-input px-4 py-2.5 focus:border-estg-blue focus:ring-1 focus:ring-estg-blue outline-none transition-colors bg-white dark:bg-muted dark:text-white"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-md border border-input px-4 py-2.5 focus:border-estg-blue focus:ring-1 focus:ring-estg-blue outline-none transition-colors bg-white dark:bg-muted dark:text-white"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full rounded-md border border-input px-4 py-2.5 focus:border-estg-blue focus:ring-1 focus:ring-estg-blue outline-none transition-colors bg-white dark:bg-muted dark:text-white"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-md border border-input px-4 py-2.5 focus:border-estg-blue focus:ring-1 focus:ring-estg-blue outline-none transition-colors resize-none bg-white dark:bg-muted dark:text-white"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send Message
                      <Send size={18} />
                    </Button>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animation="slide-up" className="lg:col-span-2">
              <div className="bg-estg-gray-light dark:bg-secondary rounded-2xl p-8">
                <h3 className="text-2xl font-display font-semibold mb-6 dark:text-white">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-4">{item.icon}</div>
                      <div>
                        <h4 className="font-medium mb-1 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-300">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-3 dark:text-white">Connect With Us</h4>
                  <div className="flex space-x-3">
                    {/* Social icons (same as before) */}
                    {/* ... */}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="mt-16 overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <iframe
            title="ESTG School Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2220.2117315996143!2d29.246419468542733!3d-1.6876176548823552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0593e27e02b9%3A0x54cbd0c1c7a140b8!2sEcole%20Secondaire%20Technique%20de%20Gisenyi%20-%20ESTG!5e0!3m2!1sen!2srw!4v1749798842735!5m2!1sen!2srw"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            style={{ filter: "invert(0%)", transition: "filter 0.3s ease" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
