import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, TrendingUp, Award, BarChart2, IndianRupee } from 'lucide-react';
import './StickyProductStory.css';

const STORY_STEPS = [
  {
    num: '01',
    id: 'student',
    title: 'Student Roster mapping',
    desc: 'Admissions details map directly into the main database files.'
  },
  {
    num: '02',
    id: 'academics',
    title: 'Syllabus chapters config',
    desc: 'Verify syllabus completions alongside academic term calendars.'
  },
  {
    num: '03',
    id: 'assessments',
    title: 'Assessment structures',
    desc: 'Define custom grading scales and mark constraints per subject.'
  },
  {
    num: '04',
    id: 'results',
    title: 'Results calculation',
    desc: 'Compile final score cards, calculations, and student rank sequences.'
  },
  {
    num: '05',
    id: 'analytics',
    title: 'Insight dashboards',
    desc: 'Track individual performance trends against overall class average lines.'
  },
  {
    num: '06',
    id: 'finance',
    title: 'Financial accounts ledger',
    desc: 'Verify tuition balances and history records directly from the student card.'
  }
];

export default function StickyProductStory() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="sps-story-container">
      {/* Left List of Step descriptors */}
      <div className="sps-left-col">
        <h3 className="section-title" style={{ fontSize: '26px', lineHeight: '1.1' }}>
          FROM ADMISSION<br />TO ACADEMIC INSIGHT.
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {STORY_STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = activeStep === stepNum;
            return (
              <div
                key={step.id}
                className={`sps-step-node ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStep(stepNum)}
              >
                <div className="sps-step-num">{step.num} / {step.id.toUpperCase()}</div>
                <div className="sps-step-title">{step.title}</div>
                {isActive && (
                  <p className="sps-step-desc">{step.desc}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right sticky visual evolving display */}
      <div className="sps-right-col">
        <div className="sps-preview-canvas">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)', paddingBottom: 10, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              SSS Workspace — Simulated System
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <User size={32} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Vikrant Kaithwas</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Admission No: ADM-2025-0042</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div><strong>Class:</strong> KG-1 (Section A)</div>
                  <div><strong>Status:</strong> Active Admission</div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BookOpen size={32} style={{ color: 'var(--sss-blue)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Syllabus Configuration</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class: KG-1 | English Literacy</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '12px' }}>
                  <div><strong>Chapter 1:</strong> Alphabets & Pronunciations</div>
                  <div style={{ width: '100%', height: 6, backgroundColor: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--accent)' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TrendingUp size={32} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Assessment Parameters</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Scale: Marks Allocation ledger</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div><strong>Unit Test 1:</strong> 20 Max Marks</div>
                  <div><strong>Half Yearly Exam:</strong> 80 Max Marks</div>
                </div>
              </motion.div>
            )}

            {activeStep === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Award size={32} style={{ color: 'var(--sss-blue)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Results Ledger</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class standing ranking</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10, fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>Percentage:</strong> 65.8%</div>
                  <div><strong>Class Rank:</strong> #13</div>
                </div>
              </motion.div>
            )}

            {activeStep === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BarChart2 size={32} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Analytics overview</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Growth metrics index</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10, fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Growth rate:</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>+4.4%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 6 && (
              <motion.div 
                key="step6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <IndianRupee size={32} style={{ color: 'var(--sss-blue)' }} />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Tuition Accounts Statement</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ledger transactions</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 10, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div><strong>Total fee:</strong> ₹42,000</div>
                  <div><strong>Paid:</strong> ₹30,000</div>
                  <div style={{ color: 'var(--accent)' }}><strong>Balance:</strong> ₹12,000</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
