import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import './ProductShowcase.css';

// 1. MOCKUP PREVIEW COMPONENTS (CLEAN & OPTIMIZED FOR PREVIEW WINDOWS)

function MockStudentsRoster() {
  return (
    <div className="ps-mock-container">
      <div className="ps-mock-header">
        <span>Active Student Directory</span>
        <span className="ps-mock-badge">248 Enrolled</span>
      </div>
      <div className="ps-mock-list">
        {[
          { name: 'Aditya Sharma', id: 'SSS-1092', class: 'Class X-A', status: 'Active' },
          { name: 'Meera Patel', id: 'SSS-1104', class: 'Class IX-B', status: 'Active' },
          { name: 'Rohan Verma', id: 'SSS-1081', class: 'Class X-B', status: 'On Leave' }
        ].map((student, i) => (
          <div key={i} className="ps-mock-row">
            <div className="ps-mock-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="ps-mock-details">
              <strong>{student.name}</strong>
              <span>{student.id} · {student.class}</span>
            </div>
            <span className={`ps-mock-status ${student.status.toLowerCase().replace(' ', '-')}`}>{student.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockBIAnalytics() {
  return (
    <div className="ps-mock-container">
      <div className="ps-mock-header">
        <span>Institutional BI Performance</span>
        <span className="ps-mock-badge orange">Term 2</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <div className="ps-mock-stat-card">
          <span className="ps-mock-stat-label">Class Average</span>
          <strong className="ps-mock-stat-value">B2 (78.4%)</strong>
        </div>
        <div className="ps-mock-stat-card">
          <span className="ps-mock-stat-label">Students at Risk</span>
          <strong className="ps-mock-stat-value" style={{ color: '#EF4444' }}>4 / 248</strong>
        </div>
      </div>
      <div className="ps-mock-chart-container" style={{ marginTop: 16 }}>
        <span className="ps-mock-stat-label">Performance Trend</span>
        <div className="ps-mock-sparkline-bar">
          {[40, 55, 48, 70, 85, 90].map((h, i) => (
            <div key={i} className="ps-mock-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MockQuestionPapers() {
  return (
    <div className="ps-mock-container">
      <div className="ps-mock-header">
        <span>Question Paper compiler</span>
        <span className="ps-mock-badge">V2 Engine</span>
      </div>
      <div className="ps-mock-paper-sheet" style={{ marginTop: 12, padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}>
        <div style={{ borderBottom: '1px dashed var(--border)', paddingBottom: 6, textAlign: 'center', marginBottom: 10 }}>
          <strong style={{ fontSize: '11px', display: 'block' }}>MATHEMATICS MID-TERM</strong>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Class X · Time: 2 Hours · Max Marks: 80</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '10px' }}>
          <div><strong>Q1.</strong> Solve for x: 2x + 7 = 15 <span style={{ float: 'right', color: 'var(--accent-color)', fontWeight: 700 }}>(2 Marks)</span></div>
          <div><strong>Q2.</strong> State and prove the converse of Thales theorem. <span style={{ float: 'right', color: 'var(--accent-color)', fontWeight: 700 }}>(5 Marks)</span></div>
        </div>
      </div>
    </div>
  );
}

function MockStudentDetails() {
  return (
    <div className="ps-mock-container">
      <div className="ps-mock-header">
        <span>Student Profile 360°</span>
        <span className="ps-mock-badge blue">Enrolled</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
        <div className="ps-mock-avatar-large">AS</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: '14px' }}>Aditya Sharma</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Admission No: SSS-1092 · Class X-A</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
        <div className="ps-mock-mini-card">
          <span>Attendance</span>
          <strong>94.2%</strong>
        </div>
        <div className="ps-mock-mini-card">
          <span>GPA Score</span>
          <strong>8.42</strong>
        </div>
        <div className="ps-mock-mini-card">
          <span>Balance</span>
          <strong style={{ color: '#EF4444' }}>₹2,500</strong>
        </div>
      </div>
    </div>
  );
}

function MockConfiguration() {
  return (
    <div className="ps-mock-container">
      <div className="ps-mock-header">
        <span>Developer Entity Registry</span>
        <span className="ps-mock-badge">Custom Fields</span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="ps-mock-input-group">
          <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)' }}>FIELD LABEL</label>
          <div style={{ padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: '11px', color: 'var(--text-muted)' }}>Bus Route Number</div>
        </div>
        <div className="ps-mock-input-group">
          <label style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)' }}>FIELD SCHEMA VALUE</label>
          <div style={{ padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, fontSize: '10px', fontFamily: 'monospace', color: 'var(--accent-color)' }}>{"{ type: 'number', required: true }"}</div>
        </div>
      </div>
    </div>
  );
}

const SHOWCASE_ITEMS = [
  {
    id: 'students',
    label: 'Student Directory',
    title: 'Admissions & Student Roster',
    desc: 'Register and search student details, manage class rosters, sections, and student information quickly.',
    render: () => <MockStudentsRoster />
  },
  {
    id: 'analytics',
    label: 'Academic Analytics',
    title: 'Academic Performance Insights',
    desc: 'Track overall class marks, monitor average progress curves, compare subject performance, and identify students requiring extra attention.',
    render: () => <MockBIAnalytics />
  },
  {
    id: 'question-papers',
    label: 'Question Papers',
    title: 'Question Paper Builder',
    desc: 'Compile balanced, syllabus-aligned examination papers using pre-defined school layouts in minutes.',
    render: () => <MockQuestionPapers />
  },
  {
    id: 'student-details',
    label: 'Student Details',
    title: 'Student 360° Profile',
    desc: 'A complete, connected record displaying parent contact information, daily attendance metrics, exam results, and fee ledgers on a single screen.',
    render: () => <MockStudentDetails />
  },
  {
    id: 'configuration',
    label: 'Flexible Forms',
    title: 'Custom School Forms & Fields',
    desc: 'Customize student profiles and admission forms by adding the specific details your school tracks (like bus routes or house teams) without code changes.',
    render: () => <MockConfiguration />
  }
];

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState('students');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeIndex = SHOWCASE_ITEMS.findIndex(item => item.id === activeId);
  const activeItem = SHOWCASE_ITEMS[activeIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (activeIndex - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length;
    setActiveId(SHOWCASE_ITEMS[prevIndex].id);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (activeIndex + 1) % SHOWCASE_ITEMS.length;
    setActiveId(SHOWCASE_ITEMS[nextIndex].id);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') {
        const prevIndex = (activeIndex - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length;
        setActiveId(SHOWCASE_ITEMS[prevIndex].id);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (activeIndex + 1) % SHOWCASE_ITEMS.length;
        setActiveId(SHOWCASE_ITEMS[nextIndex].id);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeIndex]);

  return (
    <div className="ps-showcase-container">
      {/* Left Selector Menu */}
      <div className="ps-nav-list">
        {SHOWCASE_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`ps-nav-btn ${activeId === item.id ? 'active' : ''}`}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Visual Display Panel */}
      <div className="ps-visual-panel" onClick={() => setLightboxOpen(true)}>
        <div className="ps-visual-canvas">
          <div className="ps-canvas-overlay">
            <Maximize2 size={16} />
            <span>Click to Expand Details</span>
          </div>
          {activeItem.render()}
        </div>
        <h4 className="ps-visual-title">{activeItem.title}</h4>
        <p className="ps-visual-desc">{activeItem.desc}</p>
      </div>

      {/* Lightbox Overlay Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={{ width: '90%', maxWidth: '800px' }}>
              <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
                <X size={20} />
              </button>

              <div style={{ padding: '24px 8px 8px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h4 style={{ fontWeight: 700, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-color)' }} />
                  {activeItem.title}
                </h4>
                
                {/* Visual Area with Controls */}
                <div style={{ position: 'relative', minHeight: 320, backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border)', padding: '24px 72px' }}>
                  <button 
                    onClick={handlePrev} 
                    style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer', color: 'var(--text)', zIndex: 40 }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div style={{ width: '100%', maxWidth: '520px' }}>
                    {activeItem.render()}
                  </div>

                  <button 
                    onClick={handleNext} 
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer', color: 'var(--text)', zIndex: 40 }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {activeItem.desc}
                </p>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Use Left / Right arrow keys or click overlay controls to navigate screenshots showcase.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
