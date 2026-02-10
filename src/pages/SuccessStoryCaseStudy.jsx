import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Quote, CheckCircle, ExternalLink } from 'lucide-react';
import { successStoryCaseStudies, successStorySlugs } from '../data/successStoryCaseStudies';

const SuccessStoryCaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const caseStudy = slug ? successStoryCaseStudies[slug] : null;

  useEffect(() => {
    if (slug && !caseStudy) navigate('/success-stories', { replace: true });
  }, [slug, caseStudy, navigate]);

  if (!caseStudy) return null;

  const { intro, quotes, quoteAuthor, quoteRole, companyDescription, services, challenge, solution, benefit, quickFacts, images } = caseStudy;

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={images.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
          <Link to="/success-stories" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Success Stories
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-slate-200 mt-2">{caseStudy.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Intro */}
          <p className="text-xl text-slate-200 leading-relaxed">{intro}</p>

          {/* Quotes */}
          <div className="space-y-8">
            {quotes.map((q, i) => (
              <blockquote key={i} className="glass-effect rounded-2xl p-6 sm:p-8 border-l-4 border-cyan-500">
                <Quote className="w-10 h-10 text-cyan-500/50 mb-3" />
                <p className="text-slate-200 text-lg leading-relaxed italic">"{q.text}"</p>
              </blockquote>
            ))}
            <p className="text-white font-semibold">{quoteAuthor}</p>
            <p className="text-cyan-400 text-sm">{quoteRole}</p>
          </div>

          {/* Company + optional image */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">About the company</h2>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line">{companyDescription}</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-56 lg:h-64 flex-shrink-0">
              <img src={images.section1} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Services (if present) */}
          {services && services.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">The services offered</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* The Challenge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">{challenge.title}</h2>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line">{challenge.content}</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-56 lg:h-64 flex-shrink-0">
              <img src={images.section2} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* The Solution */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{solution.title}</h2>
            <p className="text-slate-200 leading-relaxed whitespace-pre-line">{solution.content}</p>
          </div>

          {/* The Benefit */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{benefit.title}</h2>
            <p className="text-slate-200 mb-6">{benefit.intro}</p>
            <ul className="space-y-3">
              {benefit.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Facts */}
          <div className="glass-effect rounded-3xl p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Facts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">Customer</p>
                <p className="text-white font-medium">{quickFacts.customer}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">Industry</p>
                <p className="text-white font-medium">{quickFacts.industry}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">No. of Branches</p>
                <p className="text-white font-medium">{quickFacts.branches}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">No. of Employees</p>
                <p className="text-white font-medium">{quickFacts.employees}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">Location</p>
                <p className="text-white font-medium">{quickFacts.location}</p>
              </div>
              {quickFacts.website && (
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">Website</p>
                  <a href={quickFacts.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                    {quickFacts.website.replace(/^https?:\/\//, '')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
              <div className="sm:col-span-2">
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-1">Solution Implemented</p>
                <p className="text-white font-medium">{quickFacts.solution}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">Modules Implemented</p>
                <div className="flex flex-wrap gap-2">
                  {quickFacts.modules.map((m, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/success-stories" className="btn-glass px-8 py-4 rounded-xl text-white font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> All Success Stories
          </Link>
          <Link to="/contact?open=form" className="btn-primary px-8 py-4 rounded-xl text-white font-semibold inline-flex items-center gap-2 ml-4">
            Request a Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryCaseStudy;

export { successStorySlugs };
