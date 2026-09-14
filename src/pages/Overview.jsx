import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, BookOpen, Clock, CreditCard, CheckCircle2, 
  ArrowRight, Calendar, FileText, ChevronRight, 
  Phone, Mail, Building, Sparkles, Check, ChevronDown, 
  RefreshCw, Send, CheckSquare, Database, Award, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar/Navbar';
import './Overview.css';

// Centerpiece preview tabs data (covering all key features)
const GLANCE_TABS = [
  { id: 'students', label: '1. Students 360', exploreId: 'student-management' },
  { id: 'academics', label: '2. Academics & Syllabus', exploreId: 'academics' },
  { id: 'attendance', label: '3. Daily Attendance', exploreId: 'attendance' },
  { id: 'question-papers', label: '4. Question Papers', exploreId: 'question-papers' },
  { id: 'timetable', label: '5. Timetable Generator', exploreId: 'timetable' },
  { id: 'fees', label: '6. Fees & Receipts', exploreId: 'finance' },
  { id: 'analytics', label: '7. Academic Analytics', exploreId: 'analytics' },
  { id: 'calendar', label: '8. Calendar & Birthdays', exploreId: 'calendar' },
  { id: 'reports', label: '9. Reports Center', exploreId: 'reports' },
  { id: 'migration', label: '10. Data Migration', exploreId: 'data-migration' }
];

export default function Overview({ activeMode = 'overview', onSelectMode }) {
  // Centerpiece Live Tab state
  const [activeGlanceTab, setActiveGlanceTab] = useState('students');
  const [isHoveredGlance, setIsHoveredGlance] = useState(false);

  // Micro-demo interactive states inside the centerpiece
  const [attendanceToggled, setAttendanceToggled] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('UPI');
  const [selectedEventDate, setSelectedEventDate] = useState(21);
  const [studentChipTab, setStudentChipTab] = useState('dossier');

  // Expanded card state for the platform modules grid (allows multiple or single)
  const [openCardId, setOpenCardId] = useState('students');

  // Personas state
  const [activePersona, setActivePersona] = useState('principal');

  // Contact Form & Tabs refs
  const formRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleExploreRedirect = (exploreId) => {
    if (onSelectMode) {
      onSelectMode('explore', exploreId);
    }
  };

  // Auto-cycle centerpiece tabs when not actively hovered (snappy 2.2s speed)
  useEffect(() => {
    if (isHoveredGlance) return;
    const tabIds = GLANCE_TABS.map(t => t.id);
    const timer = setInterval(() => {
      setActiveGlanceTab(prev => {
        const nextIdx = (tabIds.indexOf(prev) + 1) % tabIds.length;
        return tabIds[nextIdx];
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [isHoveredGlance]);

  // Keep active tab visible in horizontal scroll strip without affecting page/window vertical scroll
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (container) {
      const activeBtn = container.querySelector('.ov-glance-tab-btn.active');
      if (activeBtn) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const offsetLeft = btnRect.left - containerRect.left + container.scrollLeft;
        const targetScrollLeft = offsetLeft - (container.clientWidth / 2) + (btnRect.width / 2);

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [activeGlanceTab]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const serviceId = 'service_poxj9kb';
    const templateId = 'template_jvwl9vb';
    const publicKey = 'MMiGPMm9m6ZYRwisE';

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((res) => {
        console.log('EmailJS Success:', res.text);
        setFormSubmitting(false);
        setFormSuccess(true);
        if (formRef.current) formRef.current.reset();
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setFormSubmitting(false);
        setFormError('Failed to send message. Please call or email us directly.');
      });
  };

  // Clean, complete modules with dropdowns covering every single feature
  const platformModules = [
    {
      id: 'students',
      exploreId: 'student-management',
      icon: Users,
      title: 'Student Management',
      badge: 'Complete 360° Dossier',
      featuresCount: '8 Capabilities',
      features: [
        'Student admissions & fast online registration',
        'Complete 360° student profiles & photographs',
        'Parent & guardian contact details & emergency notes',
        'Class & section allocations with admission & roll numbers',
        'Academic history & previous school records',
        'Printable school-branded student ID cards',
        'Transfer certificates (TC) & character certificates',
        'Student co-curricular activities & sports awards'
      ]
    },
    {
      id: 'academics',
      exploreId: 'academics',
      icon: BookOpen,
      title: 'Academic Management & Syllabus',
      badge: 'Visual Progress Tracking',
      featuresCount: '6 Capabilities',
      features: [
        'Academic years, terms, classes & sections setup',
        'Class-subject allocation & class teacher assignments',
        'Chapter-wise syllabus tracking & completion percentages',
        'Teacher coverage & curriculum monitoring',
        'Annual student progression & class promotions',
        'Class-wise academic structure & term locks'
      ]
    },
    {
      id: 'attendance',
      exploreId: 'attendance',
      icon: Clock,
      title: 'Daily Attendance Register',
      badge: 'Whole Class in 2 Seconds',
      featuresCount: '5 Capabilities',
      features: [
        'Fast daily student attendance register',
        'Present, Absent, Late, Half-Day & Leave statuses',
        '1-click "Mark All Present" shortcut',
        'Automated low-attendance alerts (<75%) with SMS sync',
        'Monthly registers & student attendance history'
      ]
    },
    {
      id: 'question-papers',
      exploreId: 'question-papers',
      icon: FileText,
      title: 'Question Paper Engine & Bank',
      badge: 'Print-Ready A4 Canvas',
      featuresCount: '6 Capabilities',
      features: [
        'Central question bank organized by subject & chapter',
        'Filter by difficulty levels & mark weightages',
        '4-step question paper builder wizard',
        'Custom school logo, headers & exam instructions',
        'Space for student answers & custom section layouts',
        'Print-ready A4 PDF question paper generation'
      ]
    },
    {
      id: 'examinations',
      exploreId: 'analytics',
      icon: Award,
      title: 'Examinations & Results',
      badge: 'Automated Report Cards',
      featuresCount: '6 Capabilities',
      features: [
        'Periodic unit tests, mid-terms & annual exams',
        'Subject marks entry & grading criteria',
        'Automated report cards & grade calculation',
        'Pass / Fail rules & automated class rankings',
        'Marksheet digests & multi-term score history',
        'Academic performance summaries'
      ]
    },
    {
      id: 'timetable',
      exploreId: 'timetable',
      icon: Layers,
      title: 'Timetable & Smart Generator',
      badge: 'Zero Conflict Clashes',
      featuresCount: '6 Capabilities',
      features: [
        'Class-wise & section-wise timetable schedules',
        'Teacher period allocation & workload balancing',
        'Period timings, recess & break locks',
        'Automated conflict & teacher clash detection',
        '1-click smart timetable generator',
        'Printable master & teacher timetables'
      ]
    },
    {
      id: 'finance',
      exploreId: 'finance',
      icon: CreditCard,
      title: 'Fee Management & Accounts',
      badge: 'Instant Receipts Counter',
      featuresCount: '7 Capabilities',
      features: [
        'Class-wise fee structures (Tuition, Exam, Lab, Bus)',
        'Student fee ledgers with complete transaction history',
        'Sibling & merit concessions, discounts & scholarships',
        'Multi-mode collection counter: Cash, Card, UPI & Cheque',
        'Instant printable official fee receipts with unique IDs',
        'Real-time pending dues & defaulter tracking',
        'Payment history & audit-ready financial records'
      ]
    },
    {
      id: 'calendar',
      exploreId: 'calendar',
      icon: Calendar,
      title: 'Calendar, Events & Birthdays',
      badge: 'Master School Timeline',
      featuresCount: '6 Capabilities',
      features: [
        'Central master academic calendar',
        'Working days counter & schedule locks',
        'Weekly offs, national holidays & school breaks',
        'Examination dates & sports event schedules',
        'Student & staff birthday reminders & daily notices',
        'Digital circulars & school-wide announcements'
      ]
    },
    {
      id: 'reports',
      exploreId: 'reports',
      icon: FileText,
      title: 'Reports & Academic Analytics',
      badge: 'Excel & PDF Export',
      featuresCount: '7 Capabilities',
      features: [
        'School-wide performance overviews & score trends',
        'Class-wise & subject-wise average comparisons',
        'Early risk alerts for students needing academic attention',
        'Daily, monthly & term student attendance registers',
        'Fee collection summaries & pending balance ledgers',
        'Examination marksheet digests & pass % statistics',
        '1-click export to Excel (.xlsx) and printable PDF'
      ]
    },
    {
      id: 'data-migration',
      exploreId: 'data-migration',
      icon: Database,
      title: 'Data Migration & Setup',
      badge: '5–10 Yrs History Preserved',
      featuresCount: '6 Capabilities',
      features: [
        'Moving from old school software or Excel spreadsheets',
        'Import existing student records & past academic years',
        'Preserve 5 to 10 years of school history & class progressions',
        'Automated pre-import data validation checks',
        'Migration preview & error verification reports',
        'Custom school forms & adaptable field templates'
      ]
    }
  ];

  const personas = {
    principal: {
      role: 'Principal',
      quote: 'See the whole school without waiting for manual reports.',
      tag: 'Executive Visibility',
      points: [
        'Instant view of daily attendance across all classes from your desk',
        'Real-time syllabus completion progress per teacher and subject',
        'Early identification of at-risk students before examinations',
        'Audit-ready academic, exam, and compliance reports on demand'
      ]
    },
    admin: {
      role: 'Administrator',
      quote: 'Get everyday office work done 5x faster with zero data duplication.',
      tag: 'Smooth Administration',
      points: [
        'Instant student lookup by name, roll number, or admission ID',
        'Fast fee collection counter with instant printable receipts',
        'Batch student ID card generation and transfer certificates (TC)',
        'Single connected database: update student records once, updated everywhere'
      ]
    },
    teacher: {
      role: 'Teacher',
      quote: 'Spend less time on paperwork, more time teaching.',
      tag: 'Effortless Daily Routine',
      points: [
        'Mark entire class attendance in under 10 seconds',
        'Simple marks entry for unit tests, mid-terms, and annual exams',
        'Clear chapter-by-chapter syllabus checklist to track progress',
        'Direct access to student profiles and parent contact numbers'
      ]
    },
    management: {
      role: 'Management / Trustee',
      quote: 'Make decisions with accurate, real-time numbers.',
      tag: 'Financial & Campus Control',
      points: [
        'Live fee collection totals, pending dues, and revenue tracking',
        'Multi-year enrollment trends and class capacity monitoring',
        'Staff workload balance and teacher period allocation control',
        'Safe multi-tier data security preserving your school’s institutional history'
      ]
    }
  };

  const lifecycleSteps = [
    { num: '01', title: 'Admission', desc: 'Fast student registration, document upload & automated admission numbers.' },
    { num: '02', title: 'Student Records', desc: 'Complete 360° profile with parent contacts, health info & printable ID cards.' },
    { num: '03', title: 'Classes & Attendance', desc: 'Daily attendance logs, syllabus tracking, working days & conflict-free timetable.' },
    { num: '04', title: 'Exams & Results', desc: 'Question bank, paper builder wizard, marks evaluation & automated report cards.' },
    { num: '05', title: 'Reports & Insights', desc: 'Class averages, subject comparisons, attendance registers & fee collection summaries.' },
    { num: '06', title: 'Graduation', desc: 'Transfer certificates (TC), conduct certificates & permanent historical archive.' }
  ];

  return (
    <div className="overview-page">
      <Navbar activeMode={activeMode} onSelectMode={onSelectMode} />

      {/* 1. HERO SECTION */}
      <section className="ov-hero">
        <div className="ov-hero-container">
          <div className="ov-badge">
            <Sparkles size={13} style={{ color: 'var(--accent-color)' }} />
            <span>SSS — COMPLETE SCHOOL MANAGEMENT SUITE</span>
          </div>

          <h1 className="ov-title">
            Everything your school needs.<br />
            <span className="ov-title-highlight">In one place.</span>
          </h1>

          <p className="ov-subtitle">
            Manage students, academics, attendance, fees, communication and everyday school operations from one simple, connected system.
          </p>

          <div className="ov-hero-actions">
            <button 
              className="btn btn-primary ov-btn-lg" 
              onClick={() => {
                const ctaEl = document.getElementById('cta');
                if (ctaEl) ctaEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request School Demo <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-secondary ov-btn-lg" 
              onClick={() => handleExploreRedirect('student-management')}
            >
              Explore All Features in Depth →
            </button>
          </div>

          {/* Value Highlights */}
          <div className="ov-value-strip">
            <div className="ov-value-item">
              <Check size={14} /> <span>Built for Indian Schools (CBSE / ICSE / State)</span>
            </div>
            <div className="ov-value-item">
              <Check size={14} /> <span>Zero Technical Setup Required</span>
            </div>
            <div className="ov-value-item">
              <Check size={14} /> <span>100% Connected Operations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCHOOL AT A GLANCE — LIVING PREVIEW CENTERPIECE */}
      <section id="glance" className="container ov-glance-section">
        <div className="ov-section-header">
          <span className="ov-section-tag">LIVING SCHOOL PREVIEW</span>
          <h2 className="ov-section-title">Your school running at a glance.</h2>
          <p className="ov-section-desc">
            See everyday school operations happening in real time. Click any tab below to test the live micro-previews.
          </p>
        </div>

        <div 
          className="ov-glance-card"
          onMouseEnter={() => setIsHoveredGlance(true)}
          onMouseLeave={() => setIsHoveredGlance(false)}
        >
          {/* Top Bar */}
          <div className="ov-glance-top">
            <div className="ov-glance-school-info">
              <div className="ov-school-avatar">
                <Building size={20} />
              </div>
              <div>
                <div className="ov-school-greeting">Good morning, Admin 👋</div>
                <div className="ov-school-name">Dummy Public Academy</div>
              </div>
            </div>
            <div className="ov-glance-status-pill">
              <span className="ov-pulse-dot" />
              <span>Term 1 Active • Working Day #84</span>
            </div>
          </div>

          {/* Metric KPI Strip */}
          <div className="ov-glance-kpis">
            <div className="ov-kpi-item">
              <div className="ov-kpi-val">1,248</div>
              <div className="ov-kpi-lbl">Students Enrolled</div>
            </div>
            <div className="ov-kpi-item">
              <div className="ov-kpi-val">100%</div>
              <div className="ov-kpi-lbl">Connected System</div>
            </div>
            <div className="ov-kpi-item">
              <div className="ov-kpi-val">42</div>
              <div className="ov-kpi-lbl">Classes & Sections</div>
            </div>
            <div className="ov-kpi-item highlight">
              <div className="ov-kpi-val">{attendanceToggled ? '97.5%' : '94.2%'}</div>
              <div className="ov-kpi-lbl">Today's Attendance</div>
            </div>
            <div className="ov-kpi-item highlight">
              <div className="ov-kpi-val">{selectedPaymentMode === 'Card' ? '₹18.5L' : '₹18.4L'}</div>
              <div className="ov-kpi-lbl">Fees Collected</div>
            </div>
            <div className="ov-kpi-item">
              <div className="ov-kpi-val">12</div>
              <div className="ov-kpi-lbl">Upcoming Events</div>
            </div>
          </div>

          {/* Centerpiece Tabs (Covering All Key Features) */}
          <div className="ov-glance-preview-box">
            <div className="ov-glance-tabs" ref={tabsContainerRef}>
              {GLANCE_TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`ov-glance-tab-btn ${activeGlanceTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveGlanceTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="ov-glance-preview-content">
              <AnimatePresence mode="wait">
                {activeGlanceTab === 'students' && (
                  <motion.div 
                    key="students"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <div className="ov-student-avatar-chip">AS</div>
                      <div className="ov-preview-info">
                        <strong>Aarav Sharma • Class 8-A (Roll #01)</strong>
                        <span>Admission No: ADM-2024-101 • Father: Rajesh Sharma (+91 98765 43210)</span>
                      </div>
                      <div className="ov-preview-subtabs">
                        <button 
                          className={`ov-subtab-pill ${studentChipTab === 'dossier' ? 'active' : ''}`}
                          onClick={() => setStudentChipTab('dossier')}
                        >
                          360° Profile
                        </button>
                        <button 
                          className={`ov-subtab-pill ${studentChipTab === 'academics' ? 'active' : ''}`}
                          onClick={() => setStudentChipTab('academics')}
                        >
                          96% Attendance
                        </button>
                        <button 
                          className={`ov-subtab-pill ${studentChipTab === 'fees' ? 'active' : ''}`}
                          onClick={() => setStudentChipTab('fees')}
                        >
                          Fees Cleared
                        </button>
                        <button 
                          className={`ov-subtab-pill ${studentChipTab === 'idcard' ? 'active' : ''}`}
                          onClick={() => setStudentChipTab('idcard')}
                        >
                          ID Card Issued
                        </button>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('student-management')}
                      >
                        Explore Student 360 in Depth →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'academics' && (
                  <motion.div 
                    key="academics"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <BookOpen size={22} style={{ color: 'var(--accent-color)' }} />
                      <div className="ov-preview-info">
                        <strong>Class 8-A Mathematics • Syllabus Progress</strong>
                        <span>Chapter 04: Linear Equations (18 of 22 topics taught) • Teacher: Mr. V. Sharma</span>
                      </div>
                      <div className="ov-preview-progress-block">
                        <div className="ov-progress-bar-bg">
                          <div className="ov-progress-bar-fill" style={{ width: '82%' }} />
                        </div>
                        <span className="ov-progress-text">82% Completed</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('academics')}
                      >
                        Explore Syllabus in Depth →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'attendance' && (
                  <motion.div 
                    key="attendance"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <Clock size={22} style={{ color: '#10B981' }} />
                      <div className="ov-preview-info">
                        <strong>Class 8-A Daily Attendance Register</strong>
                        <span>{attendanceToggled ? 'All 40 Students Marked Present • 0 Absent' : 'Today: 38 Present • 2 Absent (SMS Alerts Dispatched)'}</span>
                      </div>
                      <button 
                        className={`btn ${attendanceToggled ? 'btn-secondary' : 'btn-primary'} ov-micro-btn`}
                        onClick={() => setAttendanceToggled(prev => !prev)}
                      >
                        <CheckSquare size={13} /> {attendanceToggled ? 'Reset Roster' : 'Mark Entire Class Present'}
                      </button>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('attendance')}
                      >
                        Explore Attendance in Depth →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'question-papers' && (
                  <motion.div 
                    key="question-papers"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <FileText size={22} style={{ color: 'var(--accent-color)' }} />
                      <div className="ov-preview-info">
                        <strong>Mid-Term Question Paper Blueprint • Class 10 Science</strong>
                        <span>Total: 80 Marks • 24 Questions Selected from Question Bank • Section A, B, C Formatted</span>
                      </div>
                      <div className="ov-preview-badges">
                        <span className="ov-pill-success">A4 Print Layout</span>
                        <span className="ov-pill-info">Answer Space Included</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('question-papers')}
                      >
                        Explore Question Paper Builder →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'timetable' && (
                  <motion.div 
                    key="timetable"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <Layers size={22} style={{ color: '#3B82F6' }} />
                      <div className="ov-preview-info">
                        <strong>Class 8-A Weekly Timetable & Clash Detector</strong>
                        <span>Period 1: Math • Period 2: English • Period 3: Science • Recess Lock Active</span>
                      </div>
                      <div className="ov-preview-badges">
                        <span className="ov-pill-success">0 Teacher Clashes</span>
                        <span className="ov-pill-info">32 Periods Allocated</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('timetable')}
                      >
                        Explore Timetable Generator →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'fees' && (
                  <motion.div 
                    key="fees"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <CreditCard size={22} style={{ color: '#3B82F6' }} />
                      <div className="ov-preview-info">
                        <strong>Recent Fee Collection • Voucher #REC-4821</strong>
                        <span>Meera Patel (Class 8-A) • ₹12,500 Term 1 Tuition Fee • Paid via {selectedPaymentMode}</span>
                      </div>
                      <div className="ov-payment-mode-pills">
                        {['UPI', 'Card', 'Cash'].map(m => (
                          <button 
                            key={m} 
                            className={`ov-mode-pill ${selectedPaymentMode === m ? 'active' : ''}`}
                            onClick={() => setSelectedPaymentMode(m)}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('finance')}
                      >
                        Explore Fee Ledgers →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'analytics' && (
                  <motion.div 
                    key="analytics"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <Award size={22} style={{ color: '#10B981' }} />
                      <div className="ov-preview-info">
                        <strong>Academic Score Trends & Risk Early Warnings</strong>
                        <span>Class 8-A Average: 78.4% • Highest: 98% (Math) • 2 At-Risk Students Flagged for Support</span>
                      </div>
                      <div className="ov-preview-badges">
                        <span className="ov-pill-success">Pass Rate: 94.8%</span>
                        <span className="ov-pill-alert">2 Early Warnings</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('analytics')}
                      >
                        Explore Academic Analytics →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'calendar' && (
                  <motion.div 
                    key="calendar"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <Calendar size={22} style={{ color: '#F59E0B' }} />
                      <div className="ov-preview-info">
                        <strong>
                          {selectedEventDate === 15 && 'Aug 15: Independence Day (National Holiday)'}
                          {selectedEventDate === 21 && 'Aug 21: Unit Test 1 Examination Slot (Classes 6-10)'}
                          {selectedEventDate === 26 && 'Aug 26: Annual Inter-School Sports Meet (Central Grounds)'}
                        </strong>
                        <span>Master Academic Calendar • Automated Working Day Sync</span>
                      </div>
                      <div className="ov-event-date-pills">
                        {[
                          { d: 15, label: 'Aug 15' },
                          { d: 21, label: 'Aug 21' },
                          { d: 26, label: 'Aug 26' }
                        ].map(ev => (
                          <button
                            key={ev.d}
                            className={`ov-mode-pill ${selectedEventDate === ev.d ? 'active' : ''}`}
                            onClick={() => setSelectedEventDate(ev.d)}
                          >
                            {ev.label}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('calendar')}
                      >
                        Explore School Calendar →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'reports' && (
                  <motion.div 
                    key="reports"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <FileText size={22} style={{ color: '#3B82F6' }} />
                      <div className="ov-preview-info">
                        <strong>Multi-Module Reports Digest</strong>
                        <span>Term 1 Attendance Registers, Exam Marksheets & Fee Collection Summaries</span>
                      </div>
                      <div className="ov-preview-badges">
                        <span className="ov-pill-info">Excel (.xlsx) Export</span>
                        <span className="ov-pill-neutral">Printable Official PDF</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('reports')}
                      >
                        Explore Reports Center →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeGlanceTab === 'migration' && (
                  <motion.div 
                    key="migration"
                    initial={{ opacity: 0, y: 6 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -6 }}
                    className="ov-micro-preview"
                  >
                    <div className="ov-preview-row">
                      <Database size={22} style={{ color: '#10B981' }} />
                      <div className="ov-preview-info">
                        <strong>Historical Data Migration Pre-Check</strong>
                        <span>1,450 Student Profiles Validated • 5 Years Academic History Matched • 0 Conflicts</span>
                      </div>
                      <div className="ov-preview-badges">
                        <span className="ov-pill-success">Excel Upload Verified</span>
                        <span className="ov-pill-neutral">Ready to Import</span>
                      </div>
                      <button 
                        className="ov-action-link-btn"
                        onClick={() => handleExploreRedirect('data-migration')}
                      >
                        Explore Data Migration →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CAPABILITIES — CLEAN UI WITH INTERACTIVE DROPDOWNS */}
      <section id="core-areas" className="container ov-areas-section">
        <div className="ov-section-header">
          <span className="ov-section-tag">COMPLETE PLATFORM MODULES</span>
          <h2 className="ov-section-title">Everything your school does, organized.</h2>
          <p className="ov-section-desc">
            Select any module dropdown below to see the full feature checklist. Click "Explore in Depth" to view the live playable workspace.
          </p>
        </div>

        <div className="ov-modules-clean-grid">
          {platformModules.map((module) => {
            const Icon = module.icon;
            const isOpen = openCardId === module.id;

            return (
              <div 
                key={module.id} 
                className={`ov-module-clean-card ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenCardId(isOpen ? null : module.id)}
              >
                <div className="ov-module-card-header">
                  <div className="ov-module-icon-box">
                    <Icon size={20} />
                  </div>
                  <div className="ov-module-title-box">
                    <h3 className="ov-module-name">{module.title}</h3>
                    <div className="ov-module-subtext-row">
                      <span className="ov-module-badge">{module.badge}</span>
                      <span className="ov-module-count">{module.featuresCount}</span>
                    </div>
                  </div>
                  <div className="ov-dropdown-indicator">
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }} 
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="ov-module-dropdown-body"
                    >
                      <div className="ov-module-divider" />
                      <ul className="ov-feature-checklist">
                        {module.features.map((feat, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={13} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="ov-module-action-footer">
                        <button 
                          className="btn btn-primary ov-btn-explore-direct"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExploreRedirect(module.exploreId);
                          }}
                        >
                          Explore {module.title} in Depth →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isOpen && (
                  <div className="ov-module-preview-hint">
                    <span>Click to view all features & tools ▾</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FROM ADMISSION TO GRADUATION (STUDENT LIFECYCLE) */}
      <section id="lifecycle" className="container ov-lifecycle-section">
        <div className="ov-section-header">
          <span className="ov-section-tag">CONNECTED LIFECYCLE</span>
          <h2 className="ov-section-title">From Admission to Graduation.</h2>
          <p className="ov-section-desc">
            SSS isn't an isolated tool. It is the continuous operational backbone supporting the student’s complete journey.
          </p>
        </div>

        <div className="ov-lifecycle-steps">
          {lifecycleSteps.map((step, idx) => (
            <div key={step.num} className="ov-step-card">
              <div className="ov-step-num">{step.num}</div>
              <h4 className="ov-step-title">{step.title}</h4>
              <p className="ov-step-desc">{step.desc}</p>
              {idx < lifecycleSteps.length - 1 && (
                <div className="ov-step-arrow">
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. BUILT FOR EVERYONE WHO RUNS THE SCHOOL (PERSONAS) */}
      <section id="personas" className="container ov-personas-section">
        <div className="ov-section-header">
          <span className="ov-section-tag">BUILT FOR YOUR TEAM</span>
          <h2 className="ov-section-title">Built for everyone who runs the school.</h2>
          <p className="ov-section-desc">
            Different roles need different tools. SSS gives each team member exactly what they need to get their everyday work done faster.
          </p>
        </div>

        <div className="ov-persona-switcher">
          {Object.keys(personas).map((key) => (
            <button
              key={key}
              className={`ov-persona-btn ${activePersona === key ? 'active' : ''}`}
              onClick={() => setActivePersona(key)}
            >
              {personas[key].role}
            </button>
          ))}
        </div>

        <div className="ov-persona-display-card">
          <div className="ov-persona-header">
            <div>
              <span className="ov-persona-tag">{personas[activePersona].tag}</span>
              <h3 className="ov-persona-role">{personas[activePersona].role}</h3>
            </div>
            <div className="ov-persona-quote">
              “{personas[activePersona].quote}”
            </div>
          </div>

          <div className="ov-persona-points-grid">
            {personas[activePersona].points.map((point, idx) => (
              <div key={idx} className="ov-persona-point">
                <CheckCircle2 size={16} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRING YOUR DATA CALLOUT */}
      <section className="container ov-migration-banner">
        <div className="ov-migration-box">
          <div className="ov-migration-content">
            <span className="ov-migration-tag">SMOOTH ONBOARDING</span>
            <h3 className="ov-migration-title">Moving from your old system? Bring your data with you.</h3>
            <p className="ov-migration-text">
              You don’t have to start from zero. Easily import past student records, previous academic years, historical class history, and parent records via Excel. 5 to 10 years of school history moves right into SSS with automated pre-import validation checks.
            </p>
          </div>
          <div className="ov-migration-actions-box">
            <div className="ov-migration-badge">
              <div className="ov-mig-num">100%</div>
              <div className="ov-mig-lbl">Historical Records Preserved</div>
            </div>
            <button 
              className="btn btn-secondary ov-btn-mig"
              onClick={() => handleExploreRedirect('data-migration')}
            >
              Explore Data Migration →
            </button>
          </div>
        </div>
      </section>

      {/* 7. BRIDGE TO EXPLORE MODE */}
      <section className="container ov-explore-bridge-section">
        <div className="ov-explore-bridge-card">
          <div className="ov-bridge-text">
            <h3 className="ov-bridge-title">Want to test every feature in action?</h3>
            <p className="ov-bridge-desc">
              Experience the full depth of SSS: test the Question Paper Builder, Student 360° drawer, Timetable generator, Attendance register, and Reports center in our full interactive workspace.
            </p>
          </div>
          <button 
            className="btn btn-primary ov-btn-lg"
            onClick={() => handleExploreRedirect('student-management')}
          >
            Explore SSS in Depth →
          </button>
        </div>
      </section>

      {/* 8. PRICING AT A GLANCE */}
      <section id="pricing" className="container ov-pricing-glance-section">
        <div className="ov-section-header">
          <span className="ov-section-tag">TRANSPARENT PRICING</span>
          <h2 className="ov-section-title">Simple plans. Honest pricing.</h2>
          <p className="ov-section-desc">
            No surprise add-ons. No hidden per-student charges. Choose the tier that matches your school size.
          </p>
        </div>

        <div className="ov-pricing-grid">
          {/* Plan 1 */}
          <div className="ov-price-card">
            <div className="ov-plan-name">School Essentials</div>
            <div className="ov-plan-target">Small schools (Up to 300 students)</div>
            <div className="ov-plan-price">₹11,999<span>/year</span></div>
            <div className="ov-plan-equiv">Equivalent to ₹1,000/month</div>
            <ul className="ov-plan-features">
              <li><Check size={14} /> Student Management & Profiles</li>
              <li><Check size={14} /> Classes, Sections & Academic Year</li>
              <li><Check size={14} /> Printable Student ID Cards</li>
              <li><Check size={14} /> Basic Performance Dashboard</li>
              <li><Check size={14} /> Excel / CSV Data Export</li>
            </ul>
            <button 
              className="btn btn-secondary ov-plan-btn"
              onClick={() => {
                const ctaEl = document.getElementById('cta');
                if (ctaEl) ctaEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Choose Essentials
            </button>
          </div>

          {/* Plan 2 (Popular) */}
          <div className="ov-price-card popular">
            <div className="ov-popular-pill">Most Popular</div>
            <div className="ov-plan-name">Complete Academic Management</div>
            <div className="ov-plan-target">Growing schools (Up to 1,000 students)</div>
            <div className="ov-plan-price">₹24,999<span>/year</span></div>
            <div className="ov-plan-equiv">Equivalent to ₹2,083/month</div>
            <ul className="ov-plan-features">
              <li><Check size={14} /> Everything in Essentials +</li>
              <li><Check size={14} /> Daily Attendance Register & Alerts</li>
              <li><Check size={14} /> Central School Calendar</li>
              <li><Check size={14} /> Question Bank & Paper Builder</li>
              <li><Check size={14} /> Automated Report Cards & Marks</li>
              <li><Check size={14} /> Fee Collection & Receipts Counter</li>
              <li><Check size={14} /> Priority Support</li>
            </ul>
            <button 
              className="btn btn-primary ov-plan-btn"
              onClick={() => {
                const ctaEl = document.getElementById('cta');
                if (ctaEl) ctaEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Choose Academic
            </button>
          </div>

          {/* Plan 3 */}
          <div className="ov-price-card">
            <div className="ov-plan-name">Complete School Management</div>
            <div className="ov-plan-target">Established schools (Up to 2,500 students)</div>
            <div className="ov-plan-price">₹34,999<span>/year</span></div>
            <div className="ov-plan-equiv">Equivalent to ₹2,917/month</div>
            <ul className="ov-plan-features">
              <li><Check size={14} /> Everything in Academic +</li>
              <li><Check size={14} /> Advanced Academic Analytics & BI</li>
              <li><Check size={14} /> At-Risk Student Early Alerts</li>
              <li><Check size={14} /> Custom School Forms & Templates</li>
              <li><Check size={14} /> Bulk Historical Excel Import</li>
              <li><Check size={14} /> Dedicated Account Manager</li>
            </ul>
            <button 
              className="btn btn-secondary ov-plan-btn"
              onClick={() => {
                const ctaEl = document.getElementById('cta');
                if (ctaEl) ctaEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Choose Complete School
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button 
            className="ov-action-link-btn" 
            style={{ fontSize: '13px' }}
            onClick={() => handleExploreRedirect('pricing')}
          >
            Compare All Features Side-by-Side in Explore →
          </button>
        </div>
      </section>

      {/* 9. BOOK A DEMO / CONTACT FORM */}
      <section id="cta" className="container ov-cta-section">
        <div className="ov-cta-wrapper">
          <div className="ov-cta-info">
            <span className="ov-cta-tag">GET STARTED WITH SSS</span>
            <h2 className="ov-cta-title">See SSS configured for your school.</h2>
            <p className="ov-cta-desc">
              Schedule a personalized 20-minute walkthrough. We’ll show you how SSS connects your students, attendance, exams, fees, and report cards in one simple system.
            </p>

            <div className="ov-direct-contacts">
              <div className="ov-contact-row">
                <Mail size={16} style={{ color: 'var(--accent-color)' }} />
                <span>vinayvamshee2183@gmail.com</span>
              </div>
              <div className="ov-contact-row">
                <Phone size={16} style={{ color: 'var(--accent-color)' }} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <div className="ov-cta-form-card">
            {formSuccess ? (
              <div className="ov-form-success">
                <CheckCircle2 size={36} style={{ color: '#10B981', marginBottom: 12 }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Demo Request Received!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 6 }}>
                  Thank you! Our school operations specialist will reach out to you within 24 hours.
                </p>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: 16 }}
                  onClick={() => setFormSuccess(false)}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleFormSubmit} className="ov-demo-form">
                <div className="ov-form-group">
                  <label>School Name *</label>
                  <input type="text" name="school_name" required placeholder="e.g. St. Xavier's High School" />
                </div>

                <div className="ov-form-row">
                  <div className="ov-form-group">
                    <label>Contact Person *</label>
                    <input type="text" name="contact_person" required placeholder="Principal / Admin Name" />
                  </div>
                  <div className="ov-form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="Mobile Number" />
                  </div>
                </div>

                <div className="ov-form-row">
                  <div className="ov-form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" required placeholder="school@example.com" />
                  </div>
                  <div className="ov-form-group">
                    <label>Approx. Students</label>
                    <select name="students_count" defaultValue="300-1000">
                      <option value="under-300">Under 300 Students</option>
                      <option value="300-1000">300 – 1,000 Students</option>
                      <option value="1000-2500">1,000 – 2,500 Students</option>
                      <option value="2500+">2,500+ Students</option>
                    </select>
                  </div>
                </div>

                <div className="ov-form-group">
                  <label>Message (Optional)</label>
                  <textarea name="message" rows={2} placeholder="Any specific requirements or current software challenges..." />
                </div>

                {formError && (
                  <div className="ov-form-error">{formError}</div>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={formSubmitting}>
                  {formSubmitting ? <RefreshCw size={16} className="spin-icon" /> : <Send size={16} />}
                  {formSubmitting ? 'Submitting Request...' : 'Schedule School Walkthrough'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ov-footer">
        <div className="container ov-footer-container">
          <div className="ov-footer-brand">
            <strong>SSS — School Scholastic System</strong>
            <p>Unified School Operations Suite for K-12 Institutions.</p>
          </div>
          <div className="ov-footer-links">
            <span onClick={() => { if (onSelectMode) onSelectMode('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Overview</span>
            <span onClick={() => handleExploreRedirect('student-management')}>Explore Platform</span>
            <a href="#pricing">Pricing</a>
            <a href="#cta">Contact</a>
          </div>
          <div className="ov-footer-copy">
            © {new Date().getFullYear()} SSS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
