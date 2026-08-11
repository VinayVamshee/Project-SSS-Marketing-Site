import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BarChart2, IndianRupee, BookOpen, Award, Users, Plus } from 'lucide-react';
import './MobileShowcases.css';

// 1. QUESTION PAPER SHOWCASE
export function MobileQuestionPaperShowcase() {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const qList = [
      { id: 1, text: 'Q1. Solve expression 3x + 5 = 20', marks: '2 Marks' },
      { id: 2, text: 'Q2. Define Commutative Property', marks: '2 Marks' },
      { id: 3, text: 'Q3. Prove Pythagoras Theorem', marks: '4 Marks' }
    ];
    
    setQuestions([]);
    const timers = qList.map((q, idx) => {
      return setTimeout(() => {
        setQuestions(prev => [...prev, q]);
      }, (idx + 1) * 800);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge"><FileText size={12} /> QUESTIONPAPER</span>
      </div>
      <h3 className="ms-title">From question bank to finished paper.</h3>
      
      <div className="ms-paper-frame">
        <div className="ms-paper-header">
          <h4>Mathematics Examination</h4>
          <p>Class X · Section A · Time: 2h</p>
        </div>
        
        <div className="ms-questions-list">
          <AnimatePresence>
            {questions.map((q) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="ms-question-item"
              >
                <span>{q.text}</span>
                <span className="ms-q-marks">{q.marks}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="ms-paper-footer">
          <span>Total Marks: 40</span>
          <span style={{ color: '#10B981', fontWeight: 700 }}>Generated ✓</span>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>
        Build a Paper <Plus size={16} />
      </button>
    </div>
  );
}

// 2. STUDENT ANALYTICS SHOWCASE
export function MobileAnalyticsShowcase() {
  const [perfVal, setPerfVal] = useState(0);
  const [attendVal, setAttendVal] = useState(0);
  
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      setPerfVal(Math.min(82.4, (82.4 / steps) * step));
      setAttendVal(Math.min(94, (94 / steps) * step));
      
      if (step >= steps) {
        clearInterval(timer);
        setPerfVal(82.4);
        setAttendVal(94);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge blue"><BarChart2 size={12} /> STUDENT ANALYTICS</span>
      </div>
      <h3 className="ms-title">Turn student data into insight.</h3>

      <div className="ms-analytics-board">
        <div className="ms-ab-row">
          <div>
            <div className="ms-ab-label">Average Performance</div>
            <div className="ms-ab-value">{perfVal.toFixed(1)}% <span className="trend-up">↑ 6.2%</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ms-ab-label">Attention Needed</div>
            <div className="ms-ab-value" style={{ color: 'var(--accent)' }}>12 Students</div>
          </div>
        </div>

        <div className="ms-ab-progress-row">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
            <span>Overall Attendance Rate</span>
            <span>{attendVal.toFixed(0)}%</span>
          </div>
          <div className="ms-ab-track">
            <motion.div 
              animate={{ width: `${attendVal}%` }} 
              transition={{ ease: 'easeOut' }}
              className="ms-ab-fill" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. FINANCE SHOWCASE
export function MobileFinanceShowcase() {
  const [rateVal, setRateVal] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setRateVal(92), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge orange"><IndianRupee size={12} /> FINANCE</span>
      </div>
      <h3 className="ms-title">Keep school finances under control.</h3>

      <div className="ms-finance-board">
        <div className="ms-fb-grid">
          <div className="ms-fb-cell">
            <div className="ms-ab-label">School Fee Target</div>
            <div className="ms-fb-value">₹8.42L</div>
          </div>
          <div className="ms-fb-cell">
            <div className="ms-ab-label">Collected</div>
            <div className="ms-fb-value" style={{ color: '#10B981' }}>₹7.74L</div>
          </div>
        </div>

        <div className="ms-fb-collection">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
            <span>Collection Rate</span>
            <span>{rateVal}%</span>
          </div>
          <div className="ms-ab-track">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${rateVal}%` }} 
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="ms-ab-fill orange" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. STUDENT MANAGEMENT SHOWCASE
export function MobileStudentManagementShowcase() {
  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge"><Users size={12} /> STUDENT REGISTRY</span>
      </div>
      <h3 className="ms-title">Every student. One complete profile.</h3>

      <div className="ms-student-profile">
        <div className="ms-sp-header">
          <div className="ms-sp-avatar"><Users size={20} /></div>
          <div>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Rahul Sharma</h4>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Class X-A · Roll No 24</span>
          </div>
        </div>
        <div className="ms-sp-details">
          <div className="ms-sp-row">
            <span>Attendance Status:</span>
            <strong style={{ color: '#10B981' }}>94% Active</strong>
          </div>
          <div className="ms-sp-row">
            <span>Academic Performance:</span>
            <strong>87% (A Grade)</strong>
          </div>
          <div className="ms-sp-row">
            <span>Father's Name:</span>
            <span>Sanjay Sharma</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. ACADEMICS SHOWCASE
export function MobileAcademicsShowcase() {
  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge blue"><BookOpen size={12} /> ACADEMICS</span>
      </div>
      <h3 className="ms-title">Organize academics effortlessly.</h3>

      <div className="ms-academics-box">
        <div className="ms-ac-level">
          <strong>Academic Year: 2026-27</strong>
        </div>
        <div className="ms-ac-classes">
          <div className="ms-ac-class-chip">KG-1 (Primary)</div>
          <div className="ms-ac-class-chip active">Class X-A</div>
          <div className="ms-ac-class-chip">Class XII-B</div>
        </div>
        <div className="ms-ac-subjects">
          <div className="ms-ac-sub-item">📐 Mathematics Foundation</div>
          <div className="ms-ac-sub-item">🧪 Chemistry Lab V2</div>
          <div className="ms-ac-sub-item">🎨 Art & Design</div>
        </div>
      </div>
    </div>
  );
}

// 6. EXAMINATIONS SHOWCASE
export function MobileExaminationsShowcase() {
  return (
    <div className="ms-card">
      <div className="ms-badge-row">
        <span className="ms-badge orange"><Award size={12} /> EXAMINATIONS</span>
      </div>
      <h3 className="ms-title">From examination setup to results.</h3>

      <div className="ms-exams-box">
        <div className="ms-ex-term">
          <strong>Active Exam: Half Yearly Examination</strong>
        </div>
        <div className="ms-ex-marks">
          <div className="ms-ex-row">
            <span>Grade Criteria:</span>
            <span>CBSE CCE Standards</span>
          </div>
          <div className="ms-ex-row">
            <span>Auto compilation:</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>Enabled ✓</span>
          </div>
        </div>
        <div className="ms-ex-card">
          <div style={{ fontWeight: 700, fontSize: '11px', marginBottom: 4 }}>Report Card Compiled</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Class rank: 3rd / 40 Students</div>
        </div>
      </div>
    </div>
  );
}
