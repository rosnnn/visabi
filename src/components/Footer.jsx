import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { companyInfo, navigationMenu } from '../data/mock';
import { useToast } from '../hooks/use-toast';
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  // Quick Links: Home, About Us, Solutions, Success Stories, Contact
  const quickLinks = navigationMenu.map((item) => ({
    ...item,
    path: item.path === '/solutions' ? '/solutions/trading' : item.path,
  }));

  const showComingSoon = () => {
    toast({ title: 'Coming soon', description: 'This feature will be available shortly.' });
  };

  return (
    <footer className="footer-bg relative overflow-hidden">
      {/* Background pattern — subtle */}
      <div className="absolute inset-0 pattern-dots opacity-15"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group inline-block"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={logo}
                  alt="VISABI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Leading digital transformation through innovative ERP solutions. Empowering businesses since {companyInfo.established}.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={showComingSoon}
                className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center text-gray-400 hover:text-cyan-400 hover-glow transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={showComingSoon}
                className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center text-gray-400 hover:text-cyan-400 hover-glow transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={showComingSoon}
                className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center text-gray-400 hover:text-cyan-400 hover-glow transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links — Home, About Us, Solutions, Success Stories, Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions — only Trading & Distribution, Private Security Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/solutions/trading"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Trading & Distribution
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions/security"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Private Security Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{companyInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-1 text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
