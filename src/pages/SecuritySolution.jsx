import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle, ChevronDown } from 'lucide-react';
import Lottie from 'lottie-react';
import { securitySolution, heroImages } from '../data/mock';
import securityHRPayroll from '../components/animations/private-security/HR & Payroll Management.json';
import securityFinancial from '../components/animations/private-security/Financial Management.json';
import securityCustomer from '../components/animations/private-security/Customer Service.json';
import securityProcurement from '../components/animations/private-security/Procurement & Inventory.json';

const securityAnimationMap = {
  'HR & Payroll Management': securityHRPayroll,
  'Financial Management': securityFinancial,
  'Customer Service': securityCustomer,
  'Procurement & Inventory': securityProcurement,
};

const SecuritySolution = () => {
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImages.secondary} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              <span className="gradient-text">{securitySolution.title}</span>
            </h1>
            <p className="text-2xl text-slate-200 animate-fade-in-up delay-200">
              {securitySolution.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 lg:p-12 fade-in-up-init">
              <p className="text-xl text-gray-300 leading-relaxed">
                {securitySolution.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Industry <span className="gradient-text">Challenges</span>
            </h2>
            <p className="text-xl text-slate-300">Key challenges in Private Security & Allied Services</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-0">
            {securitySolution.challenges.map((challenge, index) => (
              <div key={index} className="fade-in-up-init" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="glass-effect rounded-2xl p-5 sm:p-6 hover-lift flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg">{challenge}</p>
                </div>
                {index < securitySolution.challenges.length - 1 && (
                  <div className="flowchart-connector flex-shrink-0" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How <span className="gradient-text">WEB ERP</span> Transforms Security Services
            </h2>
            <p className="text-xl text-slate-300">Tailored solutions for Private Security industry</p>
          </div>

          <div className="space-y-20">
            {securitySolution.solutions.map((solution, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center fade-in-up-init`}
              >
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-secondary rounded-2xl">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Business Benefits</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {solution.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span className="text-slate-200 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-secondary opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative rounded-3xl shadow-2xl w-full h-80 overflow-hidden flex items-center justify-center bg-slate-900/40 hover-lift">
                      <Lottie
                        animationData={securityAnimationMap[solution.title] || securityHRPayroll}
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect-dark rounded-3xl p-12 lg:p-20 text-center space-y-8 max-w-4xl mx-auto fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Modernize Your <span className="gradient-text">Security Services</span>
            </h2>
            <p className="text-xl text-slate-200">
              Streamline HR, payroll, and operations with our specialized ERP solution
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact?open=form"
                className="btn-primary px-10 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center space-x-2 group"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                to="/success-stories"
                className="btn-glass px-10 py-4 rounded-xl text-white font-semibold text-lg inline-block"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySolution;
