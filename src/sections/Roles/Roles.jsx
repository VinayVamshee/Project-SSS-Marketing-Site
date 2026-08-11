import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, UserCheck, ChevronDown, GraduationCap, IndianRupee, Layers } from 'lucide-react';
import './Roles.css';

const PERSONAS = [
  {
    title: 'School Administrators',
    icon: <Shield size={18} />,
    desc: 'See the whole school operations from one unified place. Manage permissions, user accounts, and configurations.',
    caps: ['Operational Auditing', 'Global Configurations', 'Staff Registries', 'Academic Calendar']
  },
  {
    title: 'Principals',
    icon: <GraduationCap size={18} />,
    desc: 'Turn academic marks and attendance ratios into decisions. Inspect BI reports and track student risk ledgers.',
    caps: ['Assessment Insights', 'Growth Trend analysis', 'Class comparison metrics', 'Grade standings']
  },
  {
    title: 'Teachers',
    icon: <BookOpen size={18} />,
    desc: 'Manage class syllabus completions, log marksheets, and configure questions banks faster from your dashboard.',
    caps: ['Question Banks', 'Curriculum timelines', 'Result Submissions', 'Daily Attendance']
  },
  {
    title: 'Exam Coordinators',
    icon: <Layers size={18} />,
    desc: 'Create structured examination question papers visually using reusable templates and chapter banks.',
    caps: ['Blueprint allocations', 'Template customization', 'PDF exam generation', 'Answer line toggles']
  },
  {
    title: 'Accounts Teams',
    icon: <IndianRupee size={18} />,
    desc: 'Track offline/online fee collections, payment ledger statement breakdowns, and outstanding dues.',
    caps: ['Offline fee collection', 'Ledger balances', 'Receipt exports', 'UPI collections']
  },
  {
    title: 'School Groups',
    icon: <UserCheck size={18} />,
    desc: 'Standardize academic and administrative processes across multiple campuses or trusts.',
    caps: ['Multi-school analytics', 'Trust governance', 'Centralized syllabus', 'Global controls']
  }
];

export default function Roles() {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isMobile) {
    return (
      <div className="roles-accordion-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
        {PERSONAS.map((p, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div 
                style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => toggleAccordion(idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>
                  <span style={{ color: 'var(--accent)' }}>{p.icon}</span>
                  <span>{p.title}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform var(--transition-fast)'
                  }} 
                />
              </div>
              {isOpen && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: '1px dashed var(--border)', backgroundColor: 'var(--surface-hover)', fontSize: '12px' }}>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', marginTop: 12 }}>{p.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginTop: 12 }}>
                    {p.caps.map((cap, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--text)' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="roles-container">
      {PERSONAS.map((p, idx) => (
        <div key={idx} className="role-card">
          <div className="role-icon-box">
            {p.icon}
          </div>
          <div>
            <h4 className="role-title">{p.title}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
              {p.desc}
            </p>
          </div>
          <div className="role-capabilities">
            {p.caps.map((cap, cIdx) => (
              <div key={cIdx} className="role-cap-item">
                <div className="role-cap-dot" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
