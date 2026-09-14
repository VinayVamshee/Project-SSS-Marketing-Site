import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FeatureAccordion.css';

const FEATURE_FAMILIES = [
  {
    family: '1. STUDENT MANAGEMENT',
    items: ['Student Admission & Registration', 'Complete Student Profiles', 'Parent & Guardian Information', 'Class & Section Allocation', 'Admission Numbers & Roll Numbers', 'Student Photographs & Documents', 'Academic History & Transfers', 'Printable ID Cards & Certificates']
  },
  {
    family: '2. ACADEMIC MANAGEMENT',
    items: ['Academic Year Setup', 'Classes & Sections Config', 'Subject Management & Allocation', 'Class Teacher Assignments', 'Academic Term Locks', 'Student Enrollment & Promotion', 'Syllabus Management', 'Chapter Completion Progress']
  },
  {
    family: '3. SYLLABUS & CURRICULUM TRACKING',
    items: ['Class & Subject Syllabus', 'Chapter-wise Tracking', 'Syllabus Completion %', 'Subject Progress Indicators', 'Teacher & Class Progress', 'Academic Monitoring Dashboard']
  },
  {
    family: '4. ATTENDANCE MANAGEMENT',
    items: ['Daily Student Attendance', 'Class & Section Roster', 'Present / Absent / Late / Leave', 'Mark Entire Class at Once', 'Monthly Attendance History', 'Attendance % & Low Attendance Alerts']
  },
  {
    family: '5. EXAMINATION & RESULTS',
    items: ['Unit Tests & Mid-Term Exams', 'Annual Board Examinations', 'Subject Marks Entry', 'Grades & Pass/Fail Calculations', 'Student Marksheets & Report Cards', 'Class Ranking & Result Summaries']
  },
  {
    family: '6. QUESTION PAPER & QUESTION BANK',
    items: ['Central Question Bank', 'Class & Subject Questions', 'Difficulty Levels & Mark Weightages', 'Section-wise Paper Builder', 'School Logo & Exam Instructions', 'Print-ready A4 PDF Generation']
  },
  {
    family: '7. ACADEMIC ANALYTICS',
    items: ['School Performance Overview', 'Class & Subject Averages', 'Grade Distribution & Pass %', 'Exam-to-Exam Comparison', 'At-Risk Early Warnings', 'Most Improved Students']
  },
  {
    family: '8. FEE MANAGEMENT',
    items: ['Fee Structure Assignment', 'Tuition, Exam & Lab Fees', 'Fee Concessions & Discounts', 'Student Fee Ledgers', 'Cash, UPI & Card Counter', 'Printable Instant Receipts', 'Dues & Pending Fee Tracking']
  },
  {
    family: '9. SCHOOL CALENDAR & EVENTS',
    items: ['Academic Master Calendar', 'Working Days Counter', 'Weekly Offs & National Holidays', 'Examination Dates', 'Sports Meets & School Events', 'Event Detail Inspection']
  },
  {
    family: '10. TIMETABLE & SMART GENERATOR',
    items: ['Class-wise & Teacher Timetables', 'Period Timings & Recess Locks', 'Automated Clash-Free Generator', 'Subject Frequency Rules', 'Teacher Availability Locks', 'Printable Schedules']
  },
  {
    family: '11. BIRTHDAYS & SCHOOL OCCASIONS',
    items: ["Today's & Upcoming Birthdays", 'Student Birthday Records', 'Festival & Holiday Notices', 'School Celebration Alerts']
  },
  {
    family: '12. STUDENT ACTIVITIES & ACHIEVEMENTS',
    items: ['Sports Participation Records', 'Student Awards & Trophies', 'Inter-House Competitions', 'Co-Curricular Accomplishments']
  },
  {
    family: '13. STUDENT DOCUMENTS & CERTIFICATES',
    items: ['School-Branded Student ID Cards', 'Transfer Certificates (TC)', 'Character & Conduct Certificates', 'Instant PDF Print & Download']
  },
  {
    family: '14. REPORTS CENTER',
    items: ['Student Roster & History Reports', 'Daily & Monthly Attendance Reports', 'Academic & Exam Marksheet Digests', 'Fee Collection & Dues Ledgers', 'Export to Excel (.xlsx) & PDF']
  },
  {
    family: '15. STAFF & USER ACCESS MANAGEMENT',
    items: ['Principal & Administrator Accounts', 'Teacher Workspace Access', 'Exam Staff & Accounts Access', 'Role-Based Permission Management', 'Controlled Student Data Privacy']
  },
  {
    family: '16. BRING YOUR EXISTING SCHOOL DATA',
    items: ['Import Existing Student Records', 'Import Past Academic Years', 'Preserve 5–10 Year School History', 'Excel File Data Validation', 'Migration Preview & Summary Reports']
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
