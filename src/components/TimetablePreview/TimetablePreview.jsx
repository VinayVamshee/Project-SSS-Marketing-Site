import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, RefreshCw, UserCheck, Layers } from 'lucide-react';
import './TimetablePreview.css';

export default function TimetablePreview({ isTourActive }) {
  const [activeView, setActiveView] = useState('class'); // 'class', 'teacher', 'generator'
  const [generating, setGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState(false);

  const timetableData = {
    'Class 8-A': [
      { period: 'Period 1 (08:30 - 09:15)', mon: 'Mathematics (Mr. Sharma)', tue: 'English Lit. (Ms. Kapoor)', wed: 'Science (Dr. Verma)', thu: 'Mathematics (Mr. Sharma)', fri: 'Social Studies (Mr. Rao)' },
      { period: 'Period 2 (09:15 - 10:00)', mon: 'English Lit. (Ms. Kapoor)', tue: 'Mathematics (Mr. Sharma)', wed: 'Social Studies (Mr. Rao)', thu: 'Science (Dr. Verma)', fri: 'Mathematics (Mr. Sharma)' },
      { period: 'Period 3 (10:00 - 10:45)', mon: 'Science (Dr. Verma)', tue: 'Social Studies (Mr. Rao)', wed: 'Mathematics (Mr. Sharma)', thu: 'English Lit. (Ms. Kapoor)', fri: 'Computer Lab (Ms. Anita)' },
      { period: 'RECESS (10:45 - 11:15)', mon: '— Morning Break —', tue: '— Morning Break —', wed: '— Morning Break —', thu: '— Morning Break —', fri: '— Morning Break —' },
      { period: 'Period 4 (11:15 - 12:00)', mon: 'Computer Lab (Ms. Anita)', tue: 'Science Lab (Dr. Verma)', wed: 'English Lit. (Ms. Kapoor)', thu: 'Art & Craft (Ms. Priya)', fri: 'Science (Dr. Verma)' },
      { period: 'Period 5 (12:00 - 12:45)', mon: 'Physical Ed. (Coach Singh)', tue: 'Hindi (Ms. Sunita)', wed: 'Hindi (Ms. Sunita)', thu: 'Physical Ed. (Coach Singh)', fri: 'Library (Mr. Gupta)' }
    ]
  };

  const handleGenerate = () => {
    setGenerating(true);
    setGenSuccess(false);
    setTimeout(() => {
      setGenerating(false);
      setGenSuccess(true);
      setTimeout(() => setGenSuccess(false), 3500);
    }, 1200);
  };

  useEffect(() => {
    if (!isTourActive) return;
    const interval = setInterval(() => {
      setActiveView(prev => (prev === 'class' ? 'generator' : prev === 'generator' ? 'teacher' : 'class'));
    }, 1800);
    return () => clearInterval(interval);
  }, [isTourActive]);

  return (
    <div className="tt-container">
      {/* Top Toolbar */}
      <div className="tt-toolbar">
        <div className="tt-toolbar-left">
          <Clock size={18} style={{ color: 'var(--accent)' }} />
          <div>
            <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Timetable Management & Smart Generator</strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
              Zero-clash schedule generation for classes, teachers, laboratories, and period slots.
            </span>
          </div>
        </div>

        <div className="tt-toolbar-right">
          <div className="tt-view-switch">
            <button 
              className={`tt-view-btn ${activeView === 'class' ? 'active' : ''}`}
              onClick={() => setActiveView('class')}
            >
              Class Schedule
            </button>
            <button 
              className={`tt-view-btn ${activeView === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveView('teacher')}
            >
              Teacher Schedule
            </button>
            <button 
              className={`tt-view-btn ${activeView === 'generator' ? 'active' : ''}`}
              onClick={() => setActiveView('generator')}
            >
              Smart Generator
            </button>
          </div>

          <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }} onClick={handleGenerate} disabled={generating}>
            {generating ? <RefreshCw size={14} className="spin-icon" /> : <Layers size={14} />}
            {generating ? 'Generating Schedule...' : 'Auto-Generate Schedule'}
          </button>
        </div>
      </div>

      {genSuccess && (
        <div className="tt-toast">
          <CheckCircle2 size={16} />
          <span>Timetable Generated Successfully! 0 Teacher Clashes • 32 Weekly Periods Allocated • 100% Subject Coverage</span>
        </div>
      )}

      {/* Main Workspace */}
      {activeView === 'generator' ? (
        <div className="tt-generator-card">
          <div className="tt-gen-header">
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>Smart Timetable Rules & Clash Detector</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 4 }}>
                Automated period frequency, teacher availability, subject distribution, and lab constraints.
              </p>
            </div>
            <span className="tt-badge-success">
              <CheckCircle2 size={13} /> 0 Conflicts Detected
            </span>
          </div>

          <div className="tt-rules-grid">
            <div className="tt-rule-box">
              <UserCheck size={16} style={{ color: 'var(--accent)' }} />
              <div>
                <strong>Teacher Availability</strong>
                <span>Prevents double-booking teachers in overlapping classes</span>
              </div>
            </div>
            <div className="tt-rule-box">
              <Clock size={16} style={{ color: 'var(--accent)' }} />
              <div>
                <strong>Period Frequency</strong>
                <span>Enforces 6 Math, 5 Science & 4 English periods weekly</span>
              </div>
            </div>
            <div className="tt-rule-box">
              <Layers size={16} style={{ color: 'var(--accent)' }} />
              <div>
                <strong>Lab & Room Slots</strong>
                <span>Maps Computer Lab & Science Lab room availability</span>
              </div>
            </div>
            <div className="tt-rule-box">
              <Calendar size={16} style={{ color: 'var(--accent)' }} />
              <div>
                <strong>Recess & Activity Lock</strong>
                <span>Standardizes morning break and physical education slots</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tt-table-wrapper">
          <table className="tt-table">
            <thead>
              <tr>
                <th>Timing Slot</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {timetableData['Class 8-A'].map((row, idx) => (
                <tr key={idx} className={row.period.includes('RECESS') ? 'tt-recess-row' : ''}>
                  <td style={{ fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.period}</td>
                  <td>{row.mon}</td>
                  <td>{row.tue}</td>
                  <td>{row.wed}</td>
                  <td>{row.thu}</td>
                  <td>{row.fri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
