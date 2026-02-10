import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Layers, Zap, Shield, Sliders, TrendingUp, 
  Settings, Rocket, Activity, ShieldCheck, Users, CheckCircle, Cpu,
  ShoppingCart, Package, Database, DollarSign
} from 'lucide-react';
import Lottie from 'lottie-react';
import { companyInfo, heroImages, features, benefits, erpComponents, testimonials, clients } from '../data/mock';

// Import animation JSON files
import comprehensiveAnim from '../components/animations/work-from-section/Comprehensive.json';
import quickToImplementAnim from '../components/animations/work-from-section/QuicktoImplement.json';
import secureAnim from '../components/animations/work-from-section/Secure.json';
import flexibleAnim from '../components/animations/work-from-section/Flexible.json';
import scalableAnim from '../components/animations/work-from-section/Scalable.json';
import customizableAnim from '../components/animations/work-from-section/Customizable.json';
import efficientAnim from '../components/animations/work-from-section/Efficient.json';
// Why ERP section animations (by benefit suitability)
import whyErpBusinessTeam from '../components/animations/why-erp-section/Business team.json';
import whyErpRevenue from '../components/animations/why-erp-section/Revenue.json';
import whyErpCircleVenn from '../components/animations/why-erp-section/Circle Venn.json';
import whyErpOnlineBusiness from '../components/animations/why-erp-section/Online Business.json';
import whyErpDataAnalysis from '../components/animations/why-erp-section/Isometric data analysis.json';
import whyErpManRobot from '../components/animations/why-erp-section/Man and robot with computers sitting together in workplace.json';

const HERO_PHRASES = [
  'Seize the digitalization opportunity with WEB ERP.',
  'One powerful solution. Work from anywhere, anytime.',
  'Transform your business with integrated ERP.',
  'Grow smarter with WEB ERP.',
];

const Home = () => {
  const observerRef = useRef(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const heroPhrase = HERO_PHRASES[heroPhraseIndex];

  // Preload all animations
  useEffect(() => {
    // This ensures all animation data is loaded
    const preloadAnimations = [
      comprehensiveAnim,
      quickToImplementAnim,
      secureAnim,
      flexibleAnim,
      scalableAnim,
      customizableAnim,
      efficientAnim
    ];
    // Force browser to parse JSON
    preloadAnimations.forEach(anim => JSON.stringify(anim));
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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

  // Auto-advance slideshow with smooth transitions
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
        setIsTransitioning(false);
      }, 150); // Short delay for fade effect
    }, 4500); // Change slide every 4.5 seconds for better viewing time

    return () => clearInterval(interval);
  }, [isPaused]);

  // Hero rotating phrases: change sentence on interval with smooth transition; fixed space so layout never shifts
  useEffect(() => {
    const t = setInterval(() => {
      setHeroPhraseIndex((i) => (i + 1) % HERO_PHRASES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const iconMap = {
    'layers': Layers,
    'zap': Zap,
    'shield': Shield,
    'sliders': Sliders,
    'trending-up': TrendingUp,
    'trendingup': TrendingUp,
    'settings': Settings,
    'rocket': Rocket,
    'activity': Activity,
    'shield-check': ShieldCheck,
    'shieldcheck': ShieldCheck,
    'users': Users,
    'check-circle': CheckCircle,
    'checkcircle': CheckCircle,
    'cpu': Cpu,
    // ERP Component icons
    'shopping-cart': ShoppingCart,
    'shoppingcart': ShoppingCart,
    'package': Package,
    'database': Database,
    'dollar-sign': DollarSign,
    'dollarsign': DollarSign,
    // Additional common variations
    'trending': TrendingUp,
    'gear': Settings,
    'cog': Settings,
    'people': Users,
    'team': Users,
    'chart': Activity,
    'analytics': Activity,
    'security': Shield,
    'processor': Cpu,
    'chip': Cpu
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || iconMap[iconName?.toLowerCase()] || Layers; // Fallback to Layers if not found
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Layers className="w-6 h-6" />;
  };

  // Animation map - matches feature titles exactly to ensure correct animations display
  const animationMap = {
    'Comprehensive': comprehensiveAnim,
    'Quick to Implement': quickToImplementAnim,
    'Secure': secureAnim,
    'Flexible': flexibleAnim,
    'Scalable': scalableAnim,
    'Customizable': customizableAnim,
    'Future-Proof': efficientAnim,
    'Future Proof': efficientAnim, // Support both hyphenated and spaced versions
  };

  // Why ERP section: benefit id -> animation (by suitability)
  const benefitAnimationMap = {
    1: whyErpBusinessTeam,   // Improve Productivity -> team
    2: whyErpRevenue,        // Increase Profitability -> revenue
    3: whyErpCircleVenn,     // Enhance Resilience -> integration/overlap
    4: whyErpOnlineBusiness, // Enhance Business Relationship -> online business
    5: whyErpDataAnalysis,   // Achieve Regulatory Compliance -> data analysis
    6: whyErpManRobot,       // Emerging Technologies -> man & robot / AI
  };

  const handlePrevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleNextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
  };

  const currentFeature = features[currentFeatureIndex];

  return (
    <div className="page-hero-bg relative min-h-screen">
      {/* Hero Section — same bg as full page; only hero image + overlay here */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float delay-200"></div>

        {/* Hero image with overlay — matches page bg at bottom */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImages.main} 
            alt="Hero" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.85) 50%, rgb(15,23,42) 78%, rgb(15,23,42) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 
              className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-snug animate-fade-in-up px-1 flex items-center justify-center text-center overflow-visible flex-shrink-0"
            >
              <span 
                key={heroPhraseIndex}
                className="gradient-text hero-phrase"
                style={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #7ac4ff 50%, #0d9475 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}
              >
                {heroPhrase}
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 animate-fade-in-up delay-200 max-w-2xl mx-auto">
              {companyInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-300 w-full max-w-md sm:max-w-none sm:w-auto mx-auto">
              <Link 
                to="/contact?open=form"
                className="btn-primary px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center space-x-2 group min-w-0"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                to="/about"
                className="btn-glass px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-block text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All sections after hero: one wrapper with smooth darker gradient, no divider line */}
      <div className="sections-after-hero">
      {/* Features Slideshow Section */}
      <section className="py-20 lg:py-32 relative section-contain">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16 fade-in-up-init">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Work from <span className="gradient-text">Anywhere, Anytime</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-300">One powerful solution that is</p>
          </div>

          {/* Single Large Slideshow Box */}
          <div className="max-w-5xl mx-auto">
            <div 
              className="glass-effect rounded-3xl p-8 sm:p-12 lg:p-16 hover-glow relative overflow-hidden"
              style={{ backgroundColor: 'transparent' }}
            >
              {/* Removed background gradient effect for transparency */}
              
              {/* Content Container */}
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Animation Side */}
                  <div className="flex-1 flex items-center justify-center min-h-[200px] sm:min-h-[260px]">
                    <div className="relative w-full max-w-[220px] h-[220px] sm:max-w-[260px] sm:h-[260px] lg:max-w-[280px] lg:h-[280px]">
                      <div className="absolute inset-0 bg-gradient-secondary opacity-20 rounded-full blur-3xl"></div>
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <Lottie 
                          key={currentFeatureIndex}
                          animationData={animationMap[currentFeature.title] || comprehensiveAnim}
                          loop={true}
                          autoplay={true}
                          className="w-full h-full transition-opacity duration-300"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                          rendererSettings={{
                            preserveAspectRatio: 'xMidYMid meet'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 text-center lg:text-left space-y-4 lg:space-y-6">
                    {/* Removed "Feature x of x" tag */}
                    
                    <h3 
                      key={`title-${currentFeatureIndex}`}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white break-words animate-fade-in"
                    >
                      {currentFeature.title}
                    </h3>
                    
                    <p 
                      key={`desc-${currentFeatureIndex}`}
                      className="text-lg sm:text-xl text-slate-300 leading-relaxed animate-fade-in"
                      style={{ animationDelay: '100ms' }}
                    >
                      {currentFeature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section — no section bg */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16 fade-in-up-init">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Why <span className="gradient-text">WEB ERP</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-300">Transform your business with powerful features</p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 items-center fade-in-up-init`}
              >
                <div className="flex-1 w-full min-w-0 space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-secondary rounded-2xl">
                    {getIcon(benefit.icon)}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-3">
                    {benefit.points.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-sm sm:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full min-w-0 flex justify-center">
                  <div className="relative group w-full max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-secondary opacity-15 rounded-2xl sm:rounded-3xl blur-xl group-hover:opacity-25 transition-opacity duration-300"></div>
                    <div className="why-erp-animation-box relative rounded-2xl sm:rounded-3xl w-full aspect-[4/3] min-h-[200px] sm:min-h-[240px] md:min-h-[280px] overflow-hidden flex items-center justify-center hover-lift">
                      <Lottie
                        animationData={benefitAnimationMap[benefit.id] || whyErpBusinessTeam}
                        loop={true}
                        autoplay={true}
                        className="why-erp-lottie w-full h-full object-contain"
                        style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%' }}
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

      {/* ERP Components — no section bg */}
      <section className="py-20 lg:py-32 relative section-contain">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 fade-in-up-init">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              <span className="gradient-text">WEB ERP</span> Components
            </h2>
            <p className="text-base sm:text-xl text-slate-300 px-1">Comprehensive modules for complete business management</p>
          </div>

          {/* Diagram: hexagon — wires to 98% of way to each card (card on top so wire appears to touch); responsive */}
          <div className="relative w-full max-w-4xl mx-auto mt-8 sm:mt-12 lg:mt-16 fade-in-up-init min-h-0 flex items-center justify-center md:min-h-[min(520px,72vh)] md:max-h-[85vh] max-w-[min(100%,42rem)]">
            {/* Wires + circle + hub: hidden on small screens so only stacked list shows */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              <svg
                className="absolute inset-0 w-full h-full text-cyan-500/60 pointer-events-none"
                viewBox="0 0 800 800"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs />
                {/* Wire endpoints = 98% from hub to card center so wire reaches under card and appears to touch on all screens */}
                {(() => {
                  const hub = { x: 400, y: 400 };
                  const nodes = [[400, 112], [677, 208], [677, 592], [400, 688], [123, 592], [123, 208]];
                  const t = 0.98;
                  return nodes.map(([nx, ny], i) => {
                    const ex = hub.x + (nx - hub.x) * t;
                    const ey = hub.y + (ny - hub.y) * t;
                    return (
                      <line
                        key={i}
                        x1={hub.x} y1={hub.y} x2={ex} y2={ey}
                        stroke="rgb(6, 182, 212)"
                        strokeOpacity="0.75"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="18 18"
                        className="animate-wire-flow"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    );
                  });
                })()}
                {/* Central hub ring */}
                <circle cx="400" cy="400" r="48" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="2" />
                <circle cx="400" cy="400" r="40" fill="rgba(6, 182, 212, 0.08)" />
              </svg>
              {/* Central hub label */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none">
                <span className="gradient-text font-bold text-sm sm:text-lg whitespace-nowrap">WEB ERP</span>
                <span className="text-slate-400 text-[10px] sm:text-xs mt-0.5">Core</span>
              </div>
            </div>

            {/* 6 component nodes — icon + title; card sits on top of wire so wire appears to touch */}
            {erpComponents.map((component, index) => {
              const positions = [
                { left: '50%', top: '14%' },   // 0 Sales
                { left: '84.6%', top: '26%' }, // 1 Procurement
                { left: '84.6%', top: '74%' }, // 2 Inventory
                { left: '50%', top: '86%' },   // 3 Finance
                { left: '15.4%', top: '74%' }, // 4 Production
                { left: '15.4%', top: '26%' }, // 5 HR
              ];
              const pos = positions[index];
              return (
                <div
                  key={component.id}
                  className="absolute z-10 w-[140px] sm:w-[170px] lg:w-[200px] -translate-x-1/2 -translate-y-1/2 hidden md:block"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <div className="erp-node-card glass-effect rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-700/50 hover:border-cyan-500/40 cursor-default flex flex-col items-center text-center bg-slate-900/90 backdrop-blur">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-secondary rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 flex-shrink-0">
                      {getIcon(component.icon)}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight [word-spacing:0.02em]">{component.title}</h3>
                  </div>
                </div>
              );
            })}

            {/* Phones/small: stacked list with connectors */}
            <div className="md:hidden w-full space-y-3 px-1">
              {erpComponents.map((component, index) => (
                <div
                  key={component.id}
                  className="erp-node-card glass-effect rounded-2xl p-4 border border-slate-700/50 hover:border-cyan-500/40 relative flex flex-col items-center text-center"
                >
                  {index < erpComponents.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-3 bg-gradient-to-b from-cyan-500/60 to-transparent" style={{ transform: 'translate(-50%, -2px)' }} />
                  )}
                  <div className="w-9 h-9 bg-gradient-secondary rounded-lg flex items-center justify-center mb-2">
                    {getIcon(component.icon)}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{component.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — no section bg */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-slate-300">Real stories from satisfied customers</p>
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
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572 .955-4.756 4.635 1.123 6.545z" />
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

      {/* CTA Section — no section bg; card has its own glass style */}
      <section className="py-20 lg:py-32 relative overflow-hidden section-contain">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect-dark rounded-3xl p-12 lg:p-20 text-center space-y-8 max-w-4xl mx-auto fade-in-up-init">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your <span className="gradient-text">Business</span>?
            </h2>
            <p className="text-xl text-slate-200 leading-relaxed">
              Join hundreds of businesses already leveraging WEB ERP to streamline operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
              <Link 
                to="/contact?open=form"
                className="btn-primary px-6 py-3.5 sm:px-10 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center space-x-2 group"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                to="/success-stories"
                className="btn-glass px-6 py-3.5 sm:px-10 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-block text-center"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;