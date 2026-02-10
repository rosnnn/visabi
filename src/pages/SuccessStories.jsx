import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';
import { successStories, heroImages } from '../data/mock';
import successEntellus from '../components/animations/success-stories/Entellus.json';
import successGlobal from '../components/animations/success-stories/Global.json';
import successVector from '../components/animations/success-stories/Vector.json';
import successTransform from '../components/animations/success-stories/Transform.json';

const successAnimationMap = {
  'Entellus': successEntellus,
  'Global': successGlobal,
  'Vector': successVector,
};
function getSuccessAnimation(story) {
  const firstWord = story.title.split(/\s+/)[0];
  return successAnimationMap[firstWord] || successEntellus;
}

const SuccessStories = () => {
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
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 section-contain">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImages.about} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-2xl text-slate-200 animate-fade-in-up delay-200">
              Real transformations. Real results. Real businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 lg:py-32 relative section-contain">
        <div className="absolute inset-0 bg-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {successStories.map((story, index) => (
              <div 
                key={story.id}
                className="glass-effect rounded-3xl overflow-hidden hover-lift group fade-in-up-init"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Animation */}
                <div className="relative h-64 overflow-hidden flex items-center justify-center bg-slate-900/50">
                  <Lottie
                    animationData={getSuccessAnimation(story)}
                    loop
                    autoplay
                    className="w-full h-full"
                    style={{ maxHeight: '256px' }}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-cyan-400 text-lg">{story.subtitle}</p>
                  </div>

                  <div className="glass-effect rounded-xl p-4">
                    <p className="text-white font-semibold mb-2">Client</p>
                    <p className="text-slate-200">{story.client}</p>
                  </div>

                  <div>
                    <p className="text-white font-semibold mb-3">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {story.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to={story.link}
                    className="btn-primary px-6 py-3 rounded-xl text-white font-medium inline-flex items-center space-x-2 group/btn"
                  >
                    <span>Read Full Story</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Large Card for Featured Story */}
          <div className="mt-12 max-w-7xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 lg:p-12 hover-lift fade-in-up-init delay-400">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-gradient-secondary rounded-full text-white text-sm font-semibold">
                    Featured Story
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">
                    Transform Your Business Like Our Clients Did
                  </h3>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Our ERP solutions have helped businesses across industries streamline operations, improve efficiency, and drive growth. From security services to global trading, we've been the partner of choice for digital transformation.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="glass-effect rounded-xl p-4 flex-1 min-w-[150px]">
                      <p className="text-3xl font-bold gradient-text">100%</p>
                      <p className="text-slate-300 text-sm mt-1">Client Satisfaction</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4 flex-1 min-w-[150px]">
                      <p className="text-3xl font-bold gradient-text">1 Year</p>
                      <p className="text-slate-300 text-sm mt-1">ROI Achievement</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-secondary opacity-20 rounded-3xl blur-xl"></div>
                  <div className="relative rounded-3xl shadow-2xl w-full h-80 overflow-hidden flex items-center justify-center bg-slate-900/50">
                    <Lottie
                      animationData={successTransform}
                      loop
                      autoplay
                      className="w-full h-full"
                      style={{ maxHeight: '320px' }}
                      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect-dark rounded-3xl p-12 lg:p-20 text-center space-y-8 max-w-4xl mx-auto fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Write Your <span className="gradient-text">Success Story</span>?
            </h2>
            <p className="text-xl text-slate-200">
              Join the growing list of businesses transforming with our ERP solutions
            </p>
            <Link 
              to="/contact?open=form"
              className="btn-primary px-10 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center space-x-2 group"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
