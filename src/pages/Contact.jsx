import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Monitor, Compass, Mail, MapPin, Send } from 'lucide-react';
import { contactInfo, companyInfo, heroImages } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const observerRef = useRef(null);
  const formSectionRef = useRef(null);
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    requestType: ''
  });

  // Open form and scroll to it when navigating with ?open=form (e.g. from CTA buttons)
  useEffect(() => {
    if (searchParams.get('open') === 'form') {
      setActiveForm('Request a Demo');
      setFormData((prev) => ({ ...prev, requestType: 'Request a Demo' }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeForm && searchParams.get('open') === 'form' && formSectionRef.current) {
      const t = setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [activeForm, searchParams]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up-init').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const iconMap = {
    'phone': Phone,
    'monitor': Monitor,
    'compass': Compass,
    'mail': Mail
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Coming soon",
      description: "This feature will be available shortly.",
    });
  };

  const openForm = (type) => {
    setActiveForm(type);
    setFormData({ ...formData, requestType: type });
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImages.about} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-2xl text-slate-200 animate-fade-in-up delay-200">
              Let's discuss how we can transform your business
            </p>
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactInfo.callToActions.map((cta, index) => (
              <div 
                key={cta.id}
                className="glass-effect rounded-3xl p-8 hover-lift hover-glow cursor-pointer fade-in-up-init group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openForm(cta.title)}
              >
                <div className="w-14 h-14 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(cta.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cta.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{cta.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form — scroll target when opening from ?open=form */}
      {activeForm && (
        <section id="contact-form" ref={formSectionRef} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="glass-effect-dark rounded-3xl p-8 lg:p-12 animate-scale-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{activeForm}</h2>
                  <p className="text-slate-300">Fill out the form below and we'll get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200 resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="btn-primary px-8 py-3 rounded-xl text-white font-semibold flex-1 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Submit Request</span>
                      <Send className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveForm(null)}
                      className="btn-glass px-8 py-3 rounded-xl text-white font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="glass-effect rounded-3xl p-8 hover-lift fade-in-up-init">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="glass-effect rounded-3xl p-8 hover-lift fade-in-up-init delay-100">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  {companyInfo.phone}
                </a>
              </div>

              <div className="glass-effect rounded-3xl p-8 hover-lift fade-in-up-init delay-200">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Location</h3>
                <p className="text-cyan-400">{companyInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect-dark rounded-3xl p-12 lg:p-20 text-center space-y-6 max-w-4xl mx-auto fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Let's Build Something <span className="gradient-text">Great Together</span>
            </h2>
            <p className="text-xl text-slate-200">
              Our team is ready to help you transform your business with innovative ERP solutions
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
