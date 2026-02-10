import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Target, Sparkles } from 'lucide-react';
import { aboutUs, heroImages, testimonials } from '../data/mock';

const About = () => {
  const observerRef = useRef(null);

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

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 section-contain">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImages.about} 
            alt="About Us" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              About <span className="gradient-text">VISABI</span>
            </h1>
            <p className="text-xl text-slate-200 animate-fade-in-up delay-200">
              Leading digital transformation through innovation since 2017
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 lg:py-32 relative section-contain">
        <div className="absolute inset-0 bg-slate-950"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 lg:p-12 fade-in-up-init">
              <p className="text-xl text-slate-200 leading-relaxed">
                {aboutUs.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative section-contain">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="glass-effect rounded-3xl p-8 lg:p-12 hover-lift fade-in-up-init">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                {aboutUs.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="glass-effect rounded-3xl p-8 lg:p-12 hover-lift fade-in-up-init delay-200">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                {aboutUs.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Us</span>
            </h2>
            <p className="text-xl text-slate-300">What sets us apart from the competition</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {aboutUs.whyUs.map((item, index) => (
              <div 
                key={index}
                className="glass-effect rounded-3xl p-8 lg:p-12 hover-lift hover-glow fade-in-up-init"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-secondary rounded-xl flex items-center justify-center">
                      {index === 0 && <Award className="w-7 h-7 text-white" />}
                      {index === 1 && <Target className="w-7 h-7 text-white" />}
                      {index === 2 && <Users className="w-7 h-7 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-slate-200 text-lg leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-slate-300">Hear from our satisfied partners</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="glass-effect rounded-3xl p-8 hover-lift fade-in-up-init"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-cyan-400 text-sm">{testimonial.position}</p>
                  <p className="text-slate-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect-dark rounded-3xl p-12 lg:p-20 text-center space-y-8 max-w-4xl mx-auto fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Let's Build Something <span className="gradient-text">Amazing Together</span>
            </h2>
            <p className="text-xl text-slate-200">
              Partner with us to transform your business with cutting-edge ERP solutions
            </p>
            <Link 
              to="/contact?open=form"
              className="btn-primary px-10 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center space-x-2 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
