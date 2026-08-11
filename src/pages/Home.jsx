import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, BookOpen, FileText, Award, CheckSquare, IndianRupee, 
  TrendingUp, Settings, ChevronDown, ShieldCheck, ArrowRight
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Components & Simulations
import Navbar from '../components/Navbar/Navbar';
import SectionLabel from '../components/SectionLabel/SectionLabel';
import ProductWindow from '../components/ProductWindow/ProductWindow';
import ProblemVisual from '../components/ProblemVisual/ProblemVisual';
import Student360Preview from '../components/Student360Preview/Student360Preview';
import MetadataBuilder from '../components/MetadataBuilder/MetadataBuilder';
import QuestionPaperPreview from '../components/QuestionPaperPreview/QuestionPaperPreview';
import AcademicFlow from '../components/AcademicFlow/AcademicFlow';
import AnalyticsPreview from '../components/AnalyticsPreview/AnalyticsPreview';
import FinancePreview from '../components/FinancePreview/FinancePreview';
import ProductShowcase from '../components/ProductShowcase/ProductShowcase';
import StickyProductStory from '../components/StickyProductStory/StickyProductStory';
import WatchItBuild from '../components/WatchItBuild/WatchItBuild';
import FeatureAccordion from '../components/FeatureAccordion/FeatureAccordion';
import FeatureExplorer from '../components/FeatureExplorer/FeatureExplorer';
import MobileHeroPreview from '../components/MobileHeroPreview/MobileHeroPreview';
import { 
  MobileQuestionPaperShowcase, 
  MobileAnalyticsShowcase, 
  MobileFinanceShowcase, 
  MobileStudentManagementShowcase, 
  MobileAcademicsShowcase, 
  MobileExaminationsShowcase 
} from '../components/MobileShowcases/MobileShowcases';

// Mock Data
import { PRICING_PLANS } from '../data/pricing';
import { FAQ_ITEMS } from '../data/faq';

import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const tourStepsData = [
  { id: 'student-management', label: 'Student Management', desc: 'Click student cards to inspect complete 360° academic records, parent info, and ledger files.' },
  { id: 'academics', label: 'Academic Syllabus config', desc: 'Create classes, link subjects, and map chapter nodes in a visual syllabus hierarchy tree.' },
  { id: 'question-papers', label: 'Question Paper Engine V2', desc: 'Filter class questions, toggle answer lines, and customize A4 printable exam templates.' },
  { id: 'analytics', label: 'BI Analytics', desc: 'Analyze overall performance grade averages and track metrics like risk indicators.' },
  { id: 'finance', label: 'Fee Management', desc: 'Verify fee breakdown ledger statements and transactions directly from the student profile.' },
  { id: 'configuration', label: 'Custom registries', desc: 'Add new field metadata to forms instantly.' }
];

const laptopScreens = ['Dashboard', 'Students', 'QuestionPaper', 'Analytics', 'Finance', 'Academics'];

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const renderLaptopScreen = (screen) => {
    return (
      <motion.div
        key={screen}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          height: '100%',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#070F1C',
          color: 'white',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '6px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)' }}>SSS · WORKSPACE</span>
          <span style={{ fontSize: '9px', color: '#94A3B8', backgroundColor: '#1E293B', padding: '1px 6px', borderRadius: '4px' }}>{screen}</span>
        </div>
        
        {screen === 'Dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>School Operations Overview</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '6px', borderRadius: '4px' }}>
                <div style={{ fontSize: '8px', color: '#94A3B8' }}>STUDENTS</div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>1,248</div>
              </div>
              <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '6px', borderRadius: '4px' }}>
                <div style={{ fontSize: '8px', color: '#94A3B8' }}>ATTENDANCE</div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>94%</div>
              </div>
              <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '6px', borderRadius: '4px' }}>
                <div style={{ fontSize: '8px', color: '#94A3B8' }}>COLLECTED</div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>92%</div>
              </div>
            </div>
          </div>
        )}

        {screen === 'Students' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Student Registry Explorer</div>
            <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800 }}>RS</div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700 }}>Rahul Sharma</div>
                <div style={{ fontSize: '8px', color: '#94A3B8' }}>Class X-A · Roll No 24</div>
              </div>
            </div>
          </div>
        )}

        {screen === 'QuestionPaper' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Question Paper Engine V2</div>
            <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '6px', borderRadius: '4px', fontSize: '9px' }}>
              <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: 2, marginBottom: 2 }}>Q1. Solve 3x + 5 = 20 [2m]</div>
              <div>Q2. Define Commutative Property [2m]</div>
            </div>
          </div>
        )}

        {screen === 'Analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Grade Performance Insights</div>
            <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '8px', color: '#94A3B8', marginBottom: 2 }}>AVERAGE PERFORMANCE</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent)' }}>82.4% <span style={{ fontSize: '9px', color: '#10B981' }}>↑ 6.2%</span></div>
            </div>
          </div>
        )}

        {screen === 'Finance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Fee Collections Statement</div>
            <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '8px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#94A3B8', marginBottom: 2 }}>
                <span>COLLECTION RATE</span>
                <span>92%</span>
              </div>
              <div style={{ width: '100%', height: 4, backgroundColor: '#1E293B', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
              </div>
            </div>
          </div>
        )}

        {screen === 'Academics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>Academic Curriculum Config</div>
            <div style={{ backgroundColor: '#0D1728', border: '1px solid #1E293B', padding: '6px', borderRadius: '4px', fontSize: '9px' }}>
              <div>Class X &rarr; Mathematics &rarr; Algebra</div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const [pricingCycle, setPricingCycle] = useState('annual'); // 'monthly' | 'quarterly' | 'annual'
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Guided Tour State
  const [tourStep, setTourStep] = useState(0); // 0 = off, 1-6 = steps
  const [spotlightRect, setSpotlightRect] = useState(null);

  // Laptop morphing screen state
  const [laptopScreen, setLaptopScreen] = useState('Dashboard');

  // Use Cases horizontal segmented selector state
  const [activeUseCase, setActiveUseCase] = useState('Principal');

  // Demo Form State
  const [demoForm, setDemoForm] = useState({
    schoolName: '',
    contactPerson: '',
    phone: '',
    email: '',
    studentsCount: 'Up to 300',
    currentSoftware: '',
    interestedPlan: 'Silver',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Guided Spotlight positioning
  useEffect(() => {
    if (tourStep === 0) {
      setSpotlightRect(null);
      return;
    }
    const currentStepData = tourStepsData[tourStep - 1];
    const element = document.getElementById(currentStepData.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      const timer = setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setSpotlightRect({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX - 8,
          width: rect.width + 16,
          height: rect.height + 16
        });
      }, 600);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourStep]);

  // Laptop screen cycle timer
  useEffect(() => {
    const interval = setInterval(() => {
      setLaptopScreen((prev) => {
        const idx = laptopScreens.indexOf(prev);
        return laptopScreens[(idx + 1) % laptopScreens.length];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse Move Parallax for the Hero Dashboard
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 8;
      const yPercent = (clientY / innerHeight - 0.5) * 8;

      gsap.to('.hero-parallax-target', {
        x: xPercent,
        y: yPercent,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(prev => (prev === index ? null : index));
  };

  const getPriceText = (planKey) => {
    const plan = PRICING_PLANS[planKey];
    if (pricingCycle === 'monthly') return `₹${plan.monthly}/mo`;
    if (pricingCycle === 'quarterly') return `₹${plan.quarterly}/quarter`;
    return `₹${plan.annual}/year`;
  };

  const getPriceSub = (planKey) => {
    const plan = PRICING_PLANS[planKey];
    if (pricingCycle === 'annual') {
      const monthlyEquivalent = Math.round(plan.annual / 12);
      return `Equivalent to ₹${monthlyEquivalent}/month`;
    }
    return '';
  };

  return (
    <div ref={containerRef} className="home-page">
      <div className="grid-bg" />
      <Navbar />

      {/* Page Progress Indicator */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Floating Guided Tour Trigger */}
      <button className="floating-tour-trigger" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTourStep(1);
      }}>
        <div className="floating-tour-dot" />
        <span>Try SSS</span>
      </button>

      {/* Guided Tour Backdrop Cutout Spotlight */}
      {tourStep > 0 && spotlightRect && (
        <>
          <div className="tour-backdrop" />
          <div 
            className="tour-spotlight-box"
            style={{
              top: spotlightRect.top,
              left: spotlightRect.left,
              width: spotlightRect.width,
              height: spotlightRect.height
            }}
          />
          <div 
            className="tour-tooltip-box"
            style={{
              top: spotlightRect.top + spotlightRect.height + 16,
              left: Math.max(16, Math.min(window.innerWidth - 300, spotlightRect.left + (spotlightRect.width / 2) - 140))
            }}
          >
            <div className="tour-tooltip-indicator">
              <div className="floating-tour-dot" />
              <span>Step {tourStep} of 6: {tourStepsData[tourStep - 1].label}</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.4, color: 'var(--text)' }}>
              {tourStepsData[tourStep - 1].desc}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => setTourStep(0)}>
                Skip
              </button>
              <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => setTourStep(prev => prev === 6 ? 0 : prev + 1)}>
                {tourStep === 6 ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 1. HERO SECTION (SPLIT LAYOUT) */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-glow" />
        <div className="hero-inner" style={{ margin: 0 }}>
          <SectionLabel>SSS · SCHOOL SCHOLASTIC SYSTEM</SectionLabel>
          <h1 className="hero-title">
            Run your school around one <span className="hero-title-highlight">connected system</span>.
          </h1>
          <p className="body-text" style={{ margin: '0 0 16px 0' }}>
            Student management, academics, assessments, examinations, results and finance — brought together in one configurable school platform.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>THIS ISN'T A SCREENSHOT. Explore the live interactive SSS preview below.</span>
          </div>
          <div className="hero-cta-group">
            <button className="btn btn-primary" onClick={() => {
              const target = document.getElementById(window.innerWidth < 1024 ? 'mobile-explorer-section' : 'student-management');
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              Explore SSS →
            </button>
            <button className="btn btn-secondary" onClick={() => {
              if (window.innerWidth < 1024) {
                const target = document.getElementById('laptop-redirect');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                setTourStep(1);
              }
            }}>
              See How It Works
            </button>
          </div>
          <div className="hide-on-mobile" style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>Student Management</span>
            <span>•</span>
            <span>Academics</span>
            <span>•</span>
            <span>Assessments</span>
            <span>•</span>
            <span>Examinations</span>
            <span>•</span>
            <span>Finance</span>
          </div>
        </div>

        {/* 3. INTERACTIVE PRODUCT PREVIEW */}
        <div className="hero-product-preview-wrapper hero-parallax-target hide-on-mobile" style={{ marginTop: 0 }}>
          <ProductWindow />
        </div>

        {/* MOBILE GLIMPSE */}
        <div className="show-on-mobile-only" style={{ width: '100%' }}>
          <MobileHeroPreview />
        </div>
      </section>

      {/* 4. PRODUCT CAPABILITY STRIP */}
      <div className="capability-strip">
        <div className="container">
          <div className="capability-list">
            <div className="capability-item"><Users size={14} /> Student Management</div>
            <div className="capability-item"><BookOpen size={14} /> Academics</div>
            <div className="capability-item"><FileText size={14} /> Question Papers</div>
            <div className="capability-item"><TrendingUp size={14} /> Assessments</div>
            <div className="capability-item"><Award size={14} /> Results</div>
            <div className="capability-item"><IndianRupee size={14} /> Finance</div>
            <div className="capability-item"><Settings size={14} /> Configuration</div>
          </div>
        </div>
      </div>

      {/* 5. PROBLEM / FRAGMENTED WORKFLOW */}
      <section id="problem" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>01 / THE PROBLEM</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>School operations shouldn't live in disconnected systems.</h2>
          <p className="body-text">
            Student records in one place. Marks in another. Question papers somewhere else. Spreadsheets for everything in between.
          </p>
        </div>
        <ProblemVisual />
      </section>

      {/* 6. CONNECTED SCHOOL WORKFLOW */}
      <section id="workflow" className="container" style={{ paddingBottom: 20 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>02 / THE ECOSYSTEM</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>One school. Many workflows. One system.</h2>
          <p className="body-text">
            SSS unites all separate campus processes into a single unified academic pipeline.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
          {[
            'Admissions & Enrolments', 'Student Profile mapping', 'Academic Syllabus definition', 
            'Class Schedules', 'Subject Registries', 'Chapters & Chapters Tracker', 
            'Assessment parameters', 'Question Paper builders', 'Examination schedules', 
            'Marks grading', 'Report Card compiling', 'Finance & Fee ledgers'
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div 
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                {item}
              </div>
              {idx < 11 && (
                <div className="workflow-connector-line active" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Sticky product story section */}
      <section className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <StickyProductStory />
      </section>

      {/* Mobile Feature Explorer section */}
      <section id="mobile-explorer-section" className="container show-on-mobile-only">
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>EXPLORE SSS</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>See what your school can do with one platform.</h2>
        </div>
        <FeatureExplorer />
      </section>

      {/* 7 & 8. STUDENT MANAGEMENT & STUDENT 360 */}
      <section id="student-management" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>03 / STUDENT MANAGEMENT</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Every student. One complete record.</h2>
          <p className="body-text">
            Keep student identity, academic information and school records connected from admission onward. Click on a student below to open the details slide-over panel.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Search or click student card to open profile details</span>
          </div>
        </div>
        
        <div className="hide-on-mobile">
          <Student360Preview />
          
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <h3 className="section-title" style={{ fontSize: '24px' }}>From admission to achievement.</h3>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Give administrators a connected view of each student's journey instead of searching through separate records.
            </p>
          </div>
          
          {/* Orbital visualization */}
          <div className="s360-container">
            <div className="s360-center">
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Student</span>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>Profile</span>
            </div>
            <div className="s360-orbit-node" style={{ top: '10%', left: '15%' }}>Academic History</div>
            <div className="s360-orbit-node" style={{ top: '15%', right: '10%' }}>Assessments</div>
            <div className="s360-orbit-node" style={{ bottom: '15%', left: '10%' }}>Attendance Logs</div>
            <div className="s360-orbit-node" style={{ bottom: '10%', right: '15%' }}>Fee Balance</div>
            <div className="s360-orbit-node" style={{ top: '45%', right: '5%' }}>Report Documents</div>
            <div className="s360-orbit-node" style={{ top: '48%', left: '2%' }}>Class Assignments</div>
          </div>
        </div>

        <div className="show-on-mobile-only">
          <MobileStudentManagementShowcase />
        </div>
      </section>

      {/* 9. ACADEMIC STRUCTURE */}
      <section id="academics" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>04 / ACADEMICS</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Build your academic structure once.</h2>
          <p className="body-text">
            Configure Academic Years, Classes, Subjects, and Chapters directly. Ensure syllabus coverage matches testing.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Click class or subject nodes to adjust chapters mapping</span>
          </div>
        </div>
        <div className="hide-on-mobile">
          <AcademicFlow />
        </div>
        <div className="show-on-mobile-only">
          <MobileAcademicsShowcase />
        </div>
      </section>

      {/* 10 & 11. QUESTION PAPER ENGINE */}
      <section id="question-papers" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>05 / QUESTION PAPERS</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>From question bank to finished paper.</h2>
          <p className="body-text">
            Build structured examination papers from your question bank, filter exactly what you need, arrange questions and preview the final paper before downloading.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Pick questions and watch paper compile live in the template canvas</span>
          </div>
        </div>
        <div className="hide-on-mobile">
          <QuestionPaperPreview />
        </div>
        <div className="show-on-mobile-only">
          <MobileQuestionPaperShowcase />
        </div>
      </section>

      {/* Watch it build section */}
      <section className="container hide-on-mobile">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>FROM QUESTION BANK TO PRINT-READY PAPER</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Watch it compile.</h2>
        </div>
        <WatchItBuild />
      </section>

      {/* 13. ASSESSMENT INTELLIGENCE */}
      <section id="analytics" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>06 / ASSESSMENT INTELLIGENCE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Marks are data. SSS turns them into insight.</h2>
          <p className="body-text">
            Go beyond marksheets. Understand how students perform across subjects, assessments and academic periods.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Switch dashboard tabs and hover over points to inspect performance BI metrics</span>
          </div>
        </div>
        <div className="hide-on-mobile">
          <AnalyticsPreview />

          {/* Syllabus / Chapter coverage visual */}
          <div style={{ maxWidth: '800px', margin: '60px auto 0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { subject: 'English Literacy', coverage: '85%', completed: 85 },
              { subject: 'Mathematics Foundation', coverage: '90%', completed: 90 },
              { subject: 'Environmental Studies', coverage: '75%', completed: 75 },
              { subject: 'Art & Craft', coverage: '95%', completed: 95 }
            ].map((sub, i) => (
              <div key={i} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                  <span>{sub.subject}</span>
                  <span>{sub.coverage} Syllabus Coverage</span>
                </div>
                <div className="syllabus-bar-container">
                  <div className="syllabus-bar-fill" style={{ width: `${sub.completed}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="show-on-mobile-only">
          <MobileAnalyticsShowcase />
        </div>
      </section>

      {/* 18. RESULTS WORKFLOW */}
      <section id="results" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>07 / RESULTS PIPELINE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Turn examination data into meaningful results.</h2>
          <p className="body-text">
            Automate calculations from initial mark entries to final report card sheet prints.
          </p>
        </div>
        <div className="hide-on-mobile" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', margin: '40px 0' }}>
          {['Assessment Prep', 'Marks Capture', 'Subject Performance', 'Overall Result', 'Grade distribution', 'Class Ranking', 'Report Card compiling'].map((step, idx) => (
            <div key={idx} style={{ padding: '12px 20px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: 600 }}>
              {step}
            </div>
          ))}
        </div>
        <div className="show-on-mobile-only">
          <MobileExaminationsShowcase />
        </div>
      </section>

      {/* 19. FINANCE */}
      <section id="finance" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>08 / FINANCE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Keep student and financial information connected.</h2>
          <p className="body-text">
            Verify payment ledger statements and balance sheets in the same dashboard as admissions.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Click student selector to filter payment statement accounts</span>
          </div>
        </div>
        <div className="hide-on-mobile">
          <FinancePreview />
        </div>
        <div className="show-on-mobile-only">
          <MobileFinanceShowcase />
        </div>
      </section>

      {/* Laptop redirect mockup experience */}
      <section id="laptop-redirect" className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: 80 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>THIS IS JUST A GLIMPSE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Want to explore the full SSS workspace?</h2>
          <p className="body-text" style={{ marginBottom: 32 }}>
            The complete SSS experience is optimized for larger screens to support complex administrative workloads.
          </p>
        </div>

        {/* Morphing laptop visual mock */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '720px', margin: '0 auto', border: '12px solid #1E293B', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ height: '360px', backgroundColor: '#070F1C', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {renderLaptopScreen(laptopScreen)}
            </AnimatePresence>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>BEST EXPERIENCED ON A LAPTOP</span>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0 16px 0' }}>Explore the complete SSS workspace.</h4>
          <button className="btn btn-primary" onClick={() => {
            if (window.innerWidth < 1024) {
              const target = document.getElementById('cta');
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              setTourStep(1);
            }
          }}>
            Take the Product Tour <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 20. CONFIGURATION / METADATA */}
      <section id="configuration" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>09 / CUSTOMIZATION</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Your school is different. SSS adapts.</h2>
          <p className="body-text">
            Configure the custom fields and schema templates your school needs without code modifications.
          </p>
          <div className="hide-on-mobile" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div className="floating-tour-dot" />
            <span>● PLAYABLE DEMO — Input custom field label and check form schema output update</span>
          </div>
        </div>
        <div className="hide-on-mobile">
          <MetadataBuilder />
        </div>
      </section>

      {/* 21. ROLES */}
      <section id="roles" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>10 / GOVERNANCE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Everyone gets the tools they need.</h2>
          <p className="body-text">
            Assign custom workspace configurations to teachers, admins, and accountants.
          </p>
        </div>
        
        {/* Solutions role segmented selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {['Principal', 'Teacher', 'Exam Coordinator', 'Accounts', 'Admin'].map(role => (
            <button 
              key={role}
              className={`btn btn-secondary ${activeUseCase === role ? 'active' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
              onClick={() => setActiveUseCase(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24 }}>
          {activeUseCase === 'Principal' && (
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--accent)' }}>PRINCIPAL SOLUTIONS</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                Turn academic marks and attendance ratios into decisions. Inspect BI reports and track student risk indicators across sections.
              </p>
            </div>
          )}
          {activeUseCase === 'Teacher' && (
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--accent)' }}>TEACHER WORKFLOWS</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                Manage class syllabus completions, enter mark sheets, and configure question banks faster from your mobile devices.
              </p>
            </div>
          )}
          {activeUseCase === 'Exam Coordinator' && (
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--accent)' }}>EXAMINATION BLUEPRINTS</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                Create structured examination question papers visually using reusable templates and custom blueprint metrics.
              </p>
            </div>
          )}
          {activeUseCase === 'Accounts' && (
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--accent)' }}>FEE BALANCES & LEDGERS</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                Track fee collections, payment ledger statement details, and outstanding balances from one dashboard.
              </p>
            </div>
          )}
          {activeUseCase === 'Admin' && (
            <div>
              <h4 style={{ fontWeight: 700, color: 'var(--accent)' }}>OPERATIONAL GOVERNANCE</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                Configure custom fields, map user roles, and customize templates around your school's unique specifications.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 22. WHY SSS */}
      <section id="why" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>11 / PHILOSOPHY</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Not just another school ERP.</h2>
          <p className="body-text">
            Modern software built around the challenges educational trusts and schools encounter daily.
          </p>
        </div>
        <div className="why-cards-grid" style={{ marginTop: 40 }}>
          <div className="use-case-card">
            <span className="pillar-num" style={{ fontSize: '20px', fontWeight: 800 }}>CONNECTED</span>
            <p className="use-case-desc" style={{ marginTop: '8px' }}>
              Bring student, academic, assessment and financial workflows together in a single connected platform.
            </p>
          </div>
          <div className="use-case-card">
            <span className="pillar-num" style={{ fontSize: '20px', fontWeight: 800 }}>CONFIGURABLE</span>
            <p className="use-case-desc" style={{ marginTop: '8px' }}>
              Adapt the system around your school's unique fields and admissions structures.
            </p>
          </div>
          <div className="use-case-card">
            <span className="pillar-num" style={{ fontSize: '20px', fontWeight: 800 }}>ASSESSMENT-FIRST</span>
            <p className="use-case-desc" style={{ marginTop: '8px' }}>
              Understand student performance and class average trends beyond a simple marksheet.
            </p>
          </div>
          <div className="use-case-card">
            <span className="pillar-num" style={{ fontSize: '20px', fontWeight: 800 }}>TRANSPARENT</span>
            <p className="use-case-desc" style={{ marginTop: '8px' }}>
              Clear features index plans, predictable pricing setups, and dedicated onboarding support.
            </p>
          </div>
        </div>
      </section>

      {/* 23. PRODUCT SHOWCASE */}
      <section id="showcase" className="container hide-on-mobile">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>12 / INTERFACE</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>See the software.</h2>
          <p className="body-text">
            Explore actual SSS interface designs. Click vertical tabs to view high-fidelity mock reconstructions.
          </p>
        </div>
        <ProductShowcase />
      </section>

      {/* 13. FEATURES FAMILY ACCORDION LIST */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>COMPLETE CAPABILITIES INDEX</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Explore the system features.</h2>
        </div>
        <FeatureAccordion />
      </section>

      {/* 24. PRICING */}
      <section id="pricing" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>13 / PLANS</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Simple plans. Clear pricing. No surprises.</h2>
          <p className="body-text">
            Choose the level of SSS that fits your institution. Upgrade as your school grows.
          </p>
        </div>

        {/* Pricing toggle */}
        <div className="pricing-tabs">
          {['monthly', 'quarterly', 'annual'].map((cycle) => (
            <button
              key={cycle}
              className={`pricing-tab-btn ${pricingCycle === cycle ? 'active' : ''}`}
              onClick={() => setPricingCycle(cycle)}
            >
              {cycle.toUpperCase()} {cycle === 'annual' && '(Save ~15%)'}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards-grid">
          {Object.keys(PRICING_PLANS).map((planKey) => {
            const plan = PRICING_PLANS[planKey];
            return (
              <div key={planKey} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <div className="pricing-popular-badge">Most Popular</div>}
                
                <div className="pricing-card-header">
                  <div className="pricing-plan-title">{planKey}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{plan.target}</div>
                  <div className="pricing-price-box">
                    <span className="pricing-plan-price">{getPriceText(planKey)}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>
                    {getPriceSub(planKey)}
                  </div>
                  <div style={{ fontSize: '12px', marginTop: 10, fontWeight: 600 }}>{plan.limits}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '12px' }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <CheckSquare size={14} style={{ color: 'var(--accent)' }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={() => {
                  document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
                }}>
                  Choose {planKey}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 25. PLAN COMPARISON */}
      <section id="comparison" className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>14 / COMPARISON</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Compare plan capabilities</h2>
          <p className="body-text">
            See a detailed module breakdown matrix.
          </p>
        </div>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Module / Capability</th>
                <th>Basic</th>
                <th>Silver</th>
                <th>Gold</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Student Profiles Management', b: '✓', s: '✓', g: '✓' },
                { name: 'Syllabus Chapter Config', b: '—', s: '✓', g: '✓' },
                { name: 'Question Bank Registry', b: '—', s: '✓', g: '✓' },
                { name: 'Question Paper Engine V2', b: '—', s: '✓', g: '✓' },
                { name: 'Assessment Analytics Reports', b: '—', s: '✓', g: '✓' },
                { name: 'Fee Ledger Tracking', b: '✓', s: '✓', g: '✓' },
                { name: 'Metadata Custom Fields', b: '—', s: '—', g: '✓' },
                { name: 'Multi-Tenant Setup rules', b: '—', s: '—', g: '✓' }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td>{row.b}</td>
                  <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{row.s}</td>
                  <td>{row.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 26. ADD-ONS */}
      <section id="add-ons" className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: 80 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>15 / OPTIONAL CAPACITIES</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Need more capacity?</h2>
          <p className="body-text">
            Tailor the setup specific to campus size.
          </p>
        </div>
        <div className="addons-grid" style={{ marginTop: 40 }}>
          {[
            { title: 'Additional 1,000 Students', price: '₹7,500/year' },
            { title: 'Full Legacy Data Migration', price: 'From ₹5,000' },
            { title: 'Custom Operational Reports', price: 'From ₹2,500' }
          ].map((addon, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{addon.title}</h4>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)', marginTop: 8 }}>{addon.price}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32, fontSize: '12px', color: 'var(--text-muted)' }}>
          *Prices shown are indicative software subscription prices. Taxes, third-party messaging charges, payment gateway charges and custom development/integration services may be billed separately.
        </div>
      </section>

      {/* 27. FAQ */}
      <section id="faq" className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: 80 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>16 / INFORMATION</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Frequently Asked Questions</h2>
          <p className="body-text">
            Get instant answers regarding SSS features.
          </p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="faq-item">
                <div className="faq-question-bar" onClick={() => toggleFaq(idx)}>
                  <span>{item.question}</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--transition-fast)'
                    }} 
                  />
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-answer">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 28. FINAL CTA & DEMO FORM */}
      <section id="cta" className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: 80, paddingBottom: 100 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>17 / DEMO</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Ready to bring your school onto SSS?</h2>
          <p className="body-text">
            Move beyond disconnected registers, spreadsheets and isolated tools. Request a custom demo.
          </p>
        </div>

        <div className="demo-form-card">
          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <ShieldCheck size={48} style={{ color: '#10B981', marginBottom: 16 }} />
              <h4 style={{ fontWeight: 600, fontSize: '18px' }}>Request Recorded</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: 8 }}>
                Thanks! Your request has been recorded for this demo. Our academic systems engineering team will review details shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="demo-form-grid">
                <div className="qp-form-group">
                  <label className="qp-form-label">School Name</label>
                  <input 
                    type="text" 
                    required 
                    className="qp-form-input" 
                    value={demoForm.schoolName}
                    onChange={(e) => setDemoForm({...demoForm, schoolName: e.target.value})}
                  />
                </div>
                <div className="qp-form-group">
                  <label className="qp-form-label">Contact Person</label>
                  <input 
                    type="text" 
                    required 
                    className="qp-form-input" 
                    value={demoForm.contactPerson}
                    onChange={(e) => setDemoForm({...demoForm, contactPerson: e.target.value})}
                  />
                </div>
              </div>

              <div className="demo-form-grid">
                <div className="qp-form-group">
                  <label className="qp-form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="qp-form-input" 
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({...demoForm, phone: e.target.value})}
                  />
                </div>
                <div className="qp-form-group">
                  <label className="qp-form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="qp-form-input" 
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="demo-form-grid">
                <div className="qp-form-group">
                  <label className="qp-form-label">Number of Students</label>
                  <select 
                    className="qp-select-box"
                    value={demoForm.studentsCount}
                    onChange={(e) => setDemoForm({...demoForm, studentsCount: e.target.value})}
                  >
                    <option>Up to 300</option>
                    <option>300 to 1,000</option>
                    <option>1,000 to 2,500</option>
                    <option>More than 2,500</option>
                  </select>
                </div>
                <div className="qp-form-group">
                  <label className="qp-form-label">Interested Plan</label>
                  <select 
                    className="qp-select-box"
                    value={demoForm.interestedPlan}
                    onChange={(e) => setDemoForm({...demoForm, interestedPlan: e.target.value})}
                  >
                    <option>Basic</option>
                    <option>Silver</option>
                    <option>Gold</option>
                  </select>
                </div>
              </div>

              <div className="qp-form-group">
                <label className="qp-form-label">Message / Requirements</label>
                <textarea 
                  className="qp-form-input" 
                  rows={3} 
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({...demoForm, message: e.target.value})}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14 }}>
                Request Demo
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 29. FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                SSS
              </span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginTop: 8 }}>
                Run your school around one connected system. Configurable, multi-tenant academic operations suite.
              </p>
            </div>
            
            <div className="footer-links-group">
              <div className="footer-links-col">
                <span className="footer-col-title">Platform</span>
                <a href="#platform" className="footer-link">Ecosystem</a>
                <a href="#configuration" className="footer-link">Customizations</a>
                <a href="#roles" className="footer-link">Governance</a>
              </div>
              <div className="footer-links-col">
                <span className="footer-col-title">Modules</span>
                <a href="#question-papers" className="footer-link">Exam Builder</a>
                <a href="#analytics" className="footer-link">Analytics</a>
                <a href="#finance" className="footer-link">Ledger Sheets</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 12 }}>
              <span>&copy; {new Date().getFullYear()} SSS — School Scholastic System. All rights reserved.</span>
              <span>Built around your school.</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', width: '100%', paddingTop: 16, textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Developed with passion by <a href="https://vinayvamsheeresume.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900, textDecoration: 'none', transition: 'all var(--transition-fast)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)', display: 'inline-block' }} onMouseOver={(e) => { e.target.style.borderColor = 'var(--accent-color)'; }} onMouseOut={(e) => { e.target.style.borderColor = 'var(--border)'; }}>Vinay Vamshee</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
