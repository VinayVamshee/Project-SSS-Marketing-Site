import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FeatureAccordion.css';

const FEATURE_FAMILIES = [
  {
    family: 'STUDENT MANAGEMENT',
    items: ['Student Registration', 'Student Profiles', 'Admissions', 'Academic Enrollment', 'Student Search', 'Bulk Import', 'Student Documents']
  },
  {
    family: 'ACADEMICS',
    items: ['Classes', 'Sections', 'Subjects', 'Chapters', 'Academic Years', 'Syllabus']
  },
  {
    family: 'ASSESSMENTS',
    items: ['Assessment Management', 'Marks', 'Grades', 'Performance Tracking', 'Student Comparison', 'Subject Analytics', 'Class Analytics']
  },
  {
    family: 'QUESTION PAPERS',
    items: ['Question Bank', 'Question Types', 'Marks', 'Chapters', 'Templates', 'Live Preview', 'PDF Generation', 'Reusable Questions']
  },
  {
    family: 'RESULTS',
    items: ['Report Cards', 'Grade Calculation', 'Rankings', 'Subject Results', 'Exam Trends']
  },
  {
    family: 'FINANCE',
    items: ['Fee Structures', 'Payments', 'Outstanding Fees', 'Payment History']
  },
  {
    family: 'ADMINISTRATION',
    items: ['Users', 'Roles', 'School Configuration', 'Entities', 'Fields', 'Templates', 'Multi-school support']
  }
];

export default function FeatureAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fa-container">
      {FEATURE_FAMILIES.map((fam, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={fam.family} className="fa-card">
            <div className="fa-header" onClick={() => toggleAccordion(idx)}>
              <span className="fa-title">{fam.family}</span>
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
                  <div className="fa-content">
                    {fam.items.map((item) => (
                      <div key={item} className="fa-item">
                        <span className="fa-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
