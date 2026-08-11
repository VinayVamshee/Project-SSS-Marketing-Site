import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckSquare, Square, User, Award, BookOpen, CreditCard, Users, BarChart2 } from 'lucide-react';
import './FeatureExplorer.css';

const SLIDES = [
  {
    id: 'question-paper',
    icon: <BookOpen size={16} />,
    label: '01 / 06 · QuestionPaper',
    headline: 'Build better question papers.',
    desc: 'Create, organize and generate structured examinations without juggling spreadsheets and documents.'
  },
  {
    id: 'analytics',
    icon: <BarChart2 size={16} />,
    label: '02 / 06 · Student Analytics',
    headline: 'Turn student data into insight.',
    desc: 'Track average score distributions, view attendance matrices, and identify students requiring attention.'
  },
  {
    id: 'finance',
    icon: <CreditCard size={16} />,
    label: '03 / 06 · Finance',
    headline: 'Keep school finances under control.',
    desc: 'Track online tuition balance collections, pending fees, and verify statement receipts.'
  },
  {
    id: 'student-mgmt',
    icon: <Users size={16} />,
    label: '04 / 06 · Student Management',
    headline: 'Every student. One complete profile.',
    desc: 'Log and search personal files, syllabus coverage tracker, and parent contact information.'
  },
  {
    id: 'academics',
    icon: <BookOpen size={16} />,
    label: '05 / 06 · Academics',
    headline: 'Organize academics effortlessly.',
    desc: 'Configure academic years, classes, subject groups, and syllabus tracking lists.'
  },
  {
    id: 'exams',
    icon: <Award size={16} />,
    label: '06 / 06 · Examinations',
    headline: 'From examination setup to results.',
    desc: 'Configure term dates, record student marks, and compile printable cards.'
  }
];

export default function FeatureExplorer() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  // Slide 1 State (Question Paper selection)
  const [selectedQuestions, setSelectedQuestions] = useState({
    q1: true,
    q2: false,
    q3: false
  });
  
  // Slide 2 State (Student selection)
  const [selectedStudent, setSelectedStudent] = useState('Rahul');
  
  // Slide 3 State (Finance toggle)
  const [feeRate, setFeeRate] = useState(92);
  
  // Slide 4 State (Student details toggle)
  const [profileTab, setProfileTab] = useState('Academic');
  
  // Slide 5 State (Academic class selection)
  const [activeClass, setActiveClass] = useState('KG-1');

  // Slide 6 State (Exams Grade toggle)
  const [examResultTerm, setExamResultTerm] = useState('Term 1');

  // Swipe gesture support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
      setHasSwiped(true);
    } else if (isRightSwipe) {
      handlePrev();
      setHasSwiped(true);
    }
  };

  const handlePrev = () => {
    setActiveStep(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    setHasSwiped(true);
  };

  const handleNext = () => {
    setActiveStep(prev => (prev + 1) % SLIDES.length);
    setHasSwiped(true);
  };

  const getMarksSum = () => {
    let sum = 0;
    if (selectedQuestions.q1) sum += 2;
    if (selectedQuestions.q2) sum += 2;
    if (selectedQuestions.q3) sum += 4;
    return sum;
  };

  return (
    <div className="fe-wrapper">
      {/* Interaction Hint */}
      {!hasSwiped && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fe-swipe-hint"
        >
          ↔ Swipe dashboard left/right to explore modules
        </motion.div>
      )}

      <div className="fe-controls-row">
        <div className="fe-meta-label">
          {SLIDES[activeStep].icon}
          <span>{SLIDES[activeStep].label}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary fe-arrow-btn" onClick={handlePrev} aria-label="Previous Feature">
            <ChevronLeft size={16} />
          </button>
          <button className="btn btn-secondary fe-arrow-btn" onClick={handleNext} aria-label="Next Feature">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Swipeable app simulator frame */}
      <div 
        className="fe-canvas-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, scale: 0.98, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -10 }}
            transition={{ duration: 0.2 }}
            className="fe-canvas"
          >
            {/* SLIDE 01: Question Paper */}
            {activeStep === 0 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <span className="fe-sim-title">Mathematics Exam Creator</span>
                  <span className="fe-sim-badge">Class X</span>
                </div>
                <div className="fe-sim-body">
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: 10 }}>Tap questions to add/remove from builder:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div 
                      className={`fe-sim-item ${selectedQuestions.q1 ? 'selected' : ''}`}
                      onClick={() => setSelectedQuestions({...selectedQuestions, q1: !selectedQuestions.q1})}
                    >
                      {selectedQuestions.q1 ? <CheckSquare size={14} style={{ color: 'var(--accent)' }} /> : <Square size={14} />}
                      <span className="fe-sim-text">Q1. Solve 3x + 5 = 20 [2 Marks]</span>
                    </div>
                    <div 
                      className={`fe-sim-item ${selectedQuestions.q2 ? 'selected' : ''}`}
                      onClick={() => setSelectedQuestions({...selectedQuestions, q2: !selectedQuestions.q2})}
                    >
                      {selectedQuestions.q2 ? <CheckSquare size={14} style={{ color: 'var(--accent)' }} /> : <Square size={14} />}
                      <span className="fe-sim-text">Q2. Define Commutative Property [2 Marks]</span>
                    </div>
                    <div 
                      className={`fe-sim-item ${selectedQuestions.q3 ? 'selected' : ''}`}
                      onClick={() => setSelectedQuestions({...selectedQuestions, q3: !selectedQuestions.q3})}
                    >
                      {selectedQuestions.q3 ? <CheckSquare size={14} style={{ color: 'var(--accent)' }} /> : <Square size={14} />}
                      <span className="fe-sim-text">Q3. Solve Pythagoras Theorem Proof [4 Marks]</span>
                    </div>
                  </div>
                  <div className="fe-sim-footer-summary">
                    <span>Total Paper Marks:</span>
                    <strong style={{ color: 'var(--accent)', fontSize: '13px' }}>{getMarksSum()} / 40 Marks</strong>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 02: Analytics */}
            {activeStep === 1 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <span className="fe-sim-title">Student Performance Hub</span>
                  <div className="fe-sim-selector">
                    {['Rahul', 'Vikrant'].map(s => (
                      <button 
                        key={s} 
                        className={`fe-sim-tab ${selectedStudent === s ? 'active' : ''}`}
                        onClick={() => setSelectedStudent(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fe-sim-body">
                  <div className="fe-sim-metric-row">
                    <div>
                      <div className="fe-sim-metric-label">Average Performance</div>
                      <div className="fe-sim-metric-value">{selectedStudent === 'Rahul' ? '82.4%' : '65.8%'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="fe-sim-metric-label">Attendance</div>
                      <div className="fe-sim-metric-value" style={{ color: '#10B981' }}>{selectedStudent === 'Rahul' ? '94%' : '88%'}</div>
                    </div>
                  </div>

                  <div className="fe-sim-chart-wrap" style={{ marginTop: 12 }}>
                    <span className="fe-sim-metric-label">Term Grade Progression Chart:</span>
                    <div className="fe-sim-bar-chart">
                      <div className="fe-sim-bar-item">
                        <div className="fe-sim-bar" style={{ height: selectedStudent === 'Rahul' ? '85%' : '60%', backgroundColor: 'var(--sss-blue)' }} />
                        <span className="fe-sim-bar-label">T1</span>
                      </div>
                      <div className="fe-sim-bar-item">
                        <div className="fe-sim-bar" style={{ height: selectedStudent === 'Rahul' ? '78%' : '65%', backgroundColor: 'var(--sss-blue)' }} />
                        <span className="fe-sim-bar-label">T2</span>
                      </div>
                      <div className="fe-sim-bar-item">
                        <div className="fe-sim-bar" style={{ height: selectedStudent === 'Rahul' ? '82.4%' : '65.8%', backgroundColor: 'var(--accent)' }} />
                        <span className="fe-sim-bar-label">Final</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 03: Finance */}
            {activeStep === 2 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <span className="fe-sim-title">Fee Collection Ledger</span>
                  <span className="fe-sim-badge" style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}>Live Ledger</span>
                </div>
                <div className="fe-sim-body">
                  <div className="fe-sim-card-dark">
                    <span className="fe-sim-metric-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Tuition target</span>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>₹8.42L</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: 8, color: 'rgba(255,255,255,0.8)' }}>
                      <span>Collected: ₹{(8.42 * (feeRate / 100)).toFixed(2)}L</span>
                      <span>Pending: ₹{(8.42 * (1 - feeRate / 100)).toFixed(2)}L</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span className="fe-sim-metric-label">Collection Rate:</span>
                      <strong style={{ color: 'var(--accent)' }}>{feeRate}%</strong>
                    </div>
                    <div className="fe-sim-progress-track" onClick={() => {
                      if (feeRate === 92) {
                        setFeeRate(96);
                      } else {
                        setFeeRate(92);
                      }
                    }}>
                      <motion.div 
                        animate={{ width: `${feeRate}%` }} 
                        transition={{ ease: 'easeOut' }}
                        className="fe-sim-progress-fill" 
                      />
                    </div>
                    <p style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
                      (Tap progress bar to simulate ledger statement update)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 04: Student Management */}
            {activeStep === 3 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={18} style={{ color: 'var(--accent)' }} />
                    <span className="fe-sim-title">Rahul Sharma</span>
                  </div>
                  <span className="fe-sim-badge">Class X-A</span>
                </div>
                <div className="fe-sim-body">
                  <div className="fe-sim-tabs-row">
                    {['Academic', 'Parents'].map(t => (
                      <button 
                        key={t}
                        className={`fe-sim-tab-btn ${profileTab === t ? 'active' : ''}`}
                        onClick={() => setProfileTab(t)}
                      >
                        {t} Details
                      </button>
                    ))}
                  </div>

                  <div className="fe-sim-profile-box" style={{ minHeight: 64 }}>
                    {profileTab === 'Academic' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Attendance:</span>
                          <span style={{ fontWeight: 600 }}>94.2%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Academic standing:</span>
                          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>A Grade</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Syllabus Covered:</span>
                          <span style={{ fontWeight: 600 }}>88% Completed</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Father:</span>
                          <span style={{ fontWeight: 600 }}>Sanjay Sharma</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Contact No:</span>
                          <span style={{ fontWeight: 600 }}>+91 99887-XXXXX</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="fe-sim-metric-label">Home Address:</span>
                          <span style={{ fontWeight: 600, fontSize: '10px' }}>Lane 2, Sector 15, Delhi</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 05: Academics */}
            {activeStep === 4 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <span className="fe-sim-title">Syllabus Matrix Tree</span>
                  <div className="fe-sim-selector">
                    {['KG-1', 'Class-6'].map(cls => (
                      <button 
                        key={cls}
                        className={`fe-sim-tab ${activeClass === cls ? 'active' : ''}`}
                        onClick={() => setActiveClass(cls)}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fe-sim-body">
                  <span className="fe-sim-metric-label">Active Modules Configured:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {activeClass === 'KG-1' ? (
                      <>
                        <div className="fe-sim-ac-tag">🎨 English Literacy (Pre-Primary A)</div>
                        <div className="fe-sim-ac-tag">🧩 Cognitive Skills (Logical Math)</div>
                        <div className="fe-sim-ac-tag">🌱 Fine Motor Development</div>
                      </>
                    ) : (
                      <>
                        <div className="fe-sim-ac-tag">📐 Mathematics Foundation (Linear Algebra)</div>
                        <div className="fe-sim-ac-tag">🧪 General Science (Chemical Bonds)</div>
                        <div className="fe-sim-ac-tag">🌍 Historical Geography (Maps & Scales)</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 06: Exams */}
            {activeStep === 5 && (
              <div className="fe-sim-app">
                <div className="fe-sim-header">
                  <span className="fe-sim-title">Report Card Compiler</span>
                  <div className="fe-sim-selector">
                    {['Term 1', 'Term 2'].map(term => (
                      <button 
                        key={term} 
                        className={`fe-sim-tab ${examResultTerm === term ? 'active' : ''}`}
                        onClick={() => setExamResultTerm(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fe-sim-body">
                  <span className="fe-sim-metric-label">Subject Grade card:</span>
                  <div className="fe-sim-exams-grid" style={{ marginTop: 8 }}>
                    <div className="fe-sim-exam-card">
                      <span className="fe-sim-exam-sub">Math</span>
                      <strong className="fe-sim-exam-grade" style={{ color: 'var(--accent)' }}>
                        {examResultTerm === 'Term 1' ? 'A1' : 'A1'}
                      </strong>
                    </div>
                    <div className="fe-sim-exam-card">
                      <span className="fe-sim-exam-sub">Science</span>
                      <strong className="fe-sim-exam-grade">
                        {examResultTerm === 'Term 1' ? 'A2' : 'A1'}
                      </strong>
                    </div>
                    <div className="fe-sim-exam-card">
                      <span className="fe-sim-exam-sub">English</span>
                      <strong className="fe-sim-exam-grade">
                        {examResultTerm === 'Term 1' ? 'B1' : 'A2'}
                      </strong>
                    </div>
                    <div className="fe-sim-exam-card">
                      <span className="fe-sim-exam-sub">EVS</span>
                      <strong className="fe-sim-exam-grade" style={{ color: 'var(--accent)' }}>
                        {examResultTerm === 'Term 1' ? 'A1' : 'A1'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ textAlign: 'center', paddingHorizontal: 4 }}>
        <h4 className="fe-headline">{SLIDES[activeStep].headline}</h4>
        <p className="fe-desc" style={{ marginTop: 8 }}>{SLIDES[activeStep].desc}</p>
      </div>

      <div className="fe-dots-bar">
        {SLIDES.map((_, idx) => (
          <div 
            key={idx}
            className={`fe-dot-node ${activeStep === idx ? 'active' : ''}`}
            onClick={() => setActiveStep(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
