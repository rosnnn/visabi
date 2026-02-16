import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { contactInfo, heroImages } from '../data/mock';
import { useToast } from '../hooks/use-toast';

// Contact form API. Override with REACT_APP_CONTACT_API_URL in .env (e.g. http://localhost:5000 for local backend).
const CONTACT_API_BASE = 'http://13.51.171.30:5000';
const CONTACT_API_URL = process.env.REACT_APP_CONTACT_API_URL || CONTACT_API_BASE;
const CONTACT_ENDPOINT = `${CONTACT_API_URL.replace(/\/$/, '')}/api/contact`;
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LfijWwsAAAAAHJORCQt9YY-qQMZruy5L1xiWsgg';

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const observerRef = useRef(null);
  const formSectionRef = useRef(null);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetIdRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    requestType: contactInfo.callToActions[1]?.title || 'Request a Demo',
  });

  // Prevent reCAPTCHA or network "Timeout" from surfacing as uncaught (avoids overlay)
  useEffect(() => {
    const onRejection = (e) => {
      if (e?.reason?.message === 'Timeout' || e?.reason?.name === 'Timeout') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('unhandledrejection', onRejection);
    return () => window.removeEventListener('unhandledrejection', onRejection);
  }, []);

  // When opening with ?open=form, scroll to form and set request type to Request a Demo
  useEffect(() => {
    if (searchParams.get('open') === 'form' && formSectionRef.current) {
      setFormData((prev) => ({ ...prev, requestType: 'Request a Demo' }));
      const t = setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Load reCAPTCHA v2 checkbox (standard api.js with render=explicit) — Enterprise/v3 scripts don't have .render()
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    const RECAPTCHA_SCRIPT_URL = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit';
    const renderWidget = () => {
      try {
        if (!recaptchaRef.current) return;
        if (recaptchaWidgetIdRef.current != null) return;
        if (typeof window.grecaptcha === 'undefined' || typeof window.grecaptcha.render !== 'function') return;
        recaptchaRef.current.innerHTML = '';
        recaptchaWidgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
          callback: (token) => { try { setRecaptchaToken(token); } catch (_) {} },
        });
      } catch (err) {
        console.warn('reCAPTCHA render failed', err);
      }
    };
    // Remove any existing recaptcha script so we load the correct v2 explicit one (avoids Enterprise/v3 which have no .render)
    document.querySelectorAll('script[src*="google.com/recaptcha"]').forEach((s) => s.remove());
    window.__recaptchaOnLoad = () => {
      try {
        renderWidget();
      } catch (e) {
        console.warn('reCAPTCHA onload failed', e);
      }
      delete window.__recaptchaOnLoad;
    };
    const script = document.createElement('script');
    script.src = RECAPTCHA_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete window.__recaptchaOnLoad;
      console.warn('reCAPTCHA script failed to load');
    };
    document.head.appendChild(script);
    const t = setTimeout(renderWidget, 800);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast({
        title: 'Complete the captcha',
        description: 'Please verify you\'re not a robot above before submitting.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company || '',
          message: formData.message,
          requestType: formData.requestType || 'Request a Demo',
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({
          title: 'Could not send',
          description: data.message || data.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
        return;
      }
      setSubmitting(false);
      toast({
        title: 'Message sent',
        description: "We'll get back to you shortly.",
      });
      setFormData((prev) => ({ ...prev, name: '', email: '', phone: '', company: '', message: '' }));
      if (recaptchaWidgetIdRef.current != null && window.grecaptcha?.reset) {
        try {
          window.grecaptcha.reset(recaptchaWidgetIdRef.current);
        } catch (_) {}
      }
      setRecaptchaToken('');
    } catch (err) {
      if (err?.name === 'AbortError') {
        toast({
          title: 'Request timed out',
          description: 'Please check your connection and try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: err?.message || 'Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
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

      {/* Contact form only */}
      <section id="contact-form" ref={formSectionRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="glass-effect-dark rounded-3xl p-8 lg:p-12 animate-scale-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Get in touch</h2>
                <p className="text-slate-300">Fill out the form below and we'll get back to you shortly</p>
              </div>

              <form onSubmit={(e) => { handleSubmit(e).catch(() => {}); }} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">I would like to *</label>
                  <select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    className="contact-select w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    {contactInfo.callToActions.map((cta) => (
                      <option key={cta.id} value={cta.title}>{cta.title}</option>
                    ))}
                  </select>
                </div>
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
                        placeholder="+91 98716 62445"
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

                  <div className="rounded-xl border border-cyan-500/30 bg-slate-800/50 p-4">
                    <p className="text-white font-medium mb-3 text-sm">Security check</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <div ref={recaptchaRef} className="inline-block [&_iframe]:rounded-lg" />
                      <p className="text-slate-400 text-xs">Complete the captcha to unlock the Submit button.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting || !recaptchaToken}
                      className="btn-primary px-8 py-3 rounded-xl text-white font-semibold flex-1 inline-flex items-center justify-center space-x-2 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      <span>{submitting ? 'Sending…' : 'Submit'}</span>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      {/* CTA section */}
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
