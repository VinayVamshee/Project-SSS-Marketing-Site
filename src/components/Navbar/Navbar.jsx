import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Users, BookOpen, FileText, BarChart2, IndianRupee, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const dropdownItems = [
    { label: 'Student Management', desc: 'Centralized profiles and details slide-over', icon: <Users size={14} />, id: 'student-management' },
    { label: 'Academics', desc: 'Visual syllabus, chapters configuration', icon: <BookOpen size={14} />, id: 'academics' },
    { label: 'Attendance', desc: 'Daily roster logs & calendar sync', icon: <Users size={14} />, id: 'attendance' },
    { label: 'Central Calendar', desc: 'Working days, holidays & exam slots', icon: <BookOpen size={14} />, id: 'calendar' },
    { label: 'Question Papers', desc: 'Multi-stage question paper builder', icon: <FileText size={14} />, id: 'question-papers' },
    { label: 'Analytics', desc: 'Subject averages and performance trends', icon: <BarChart2 size={14} />, id: 'analytics' },
    { label: 'Finance', desc: 'Fee collections & dues ledger', icon: <IndianRupee size={14} />, id: 'finance' },
    { label: 'Reports', desc: 'Structured PDF/Excel data export', icon: <FileText size={14} />, id: 'reports' },
    { label: 'Customization', desc: 'Adapt forms to your school workflow', icon: <Settings size={14} />, id: 'configuration' }
  ];

  return (
    <>
      <nav className={`navbar-wrapper ${scrolled || mobileMenuOpen ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="/" className="navbar-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span>SSS</span>
          </a>

          <ul className="navbar-links">
            {/* Product Dropdown Trigger */}
            <li 
              className="navbar-dropdown-wrapper"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <span className="navbar-link dropdown-trigger" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                Product <ChevronDown size={12} />
              </span>
              {productDropdownOpen && (
                <div className="navbar-mega-dropdown">
                  <div className="navbar-dropdown-grid">
                    {dropdownItems.map((item) => (
                      <div 
                        key={item.label}
                        className="navbar-dropdown-card"
                        onClick={() => scrollToSection(item.id)}
                      >
                        <div className="dropdown-card-icon">{item.icon}</div>
                        <div>
                          <div className="dropdown-card-title">{item.label}</div>
                          <div className="dropdown-card-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li><a href="#features" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('why'); }}>Features</a></li>
            <li><a href="#solutions" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('roles'); }}>Solutions</a></li>
            <li><a href="#pricing" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a></li>
            <li><a href="#faq" className="navbar-link" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>Resources</a></li>
          </ul>

          <div className="navbar-actions">
            <ThemeToggle />
            <button className="btn btn-primary" onClick={() => scrollToSection('cta')}>
              Request Demo <ArrowRight size={16} />
            </button>
            <button
              className="navbar-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mobile-menu-overlay open"
          >
            <ul className="mobile-menu-links">
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('student-management')}>Home</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('workflow')}>Platform</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('why')}>Features</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('question-papers')}>QuestionPaper</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('analytics')}>Analytics</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('pricing')}>Pricing</span></li>
              <li><span className="mobile-menu-link" onClick={() => scrollToSection('roles')}>Use Cases</span></li>
            </ul>

            <div className="mobile-menu-divider" />

            <div className="mobile-menu-actions">
              <button className="btn btn-secondary" style={{ width: '100%', marginBottom: 12, padding: 14 }} onClick={() => scrollToSection('student-management')}>
                Take Product Tour
              </button>
              <button className="btn btn-primary" style={{ width: '100%', padding: 14 }} onClick={() => scrollToSection('cta')}>
                Contact / Request Demo <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
