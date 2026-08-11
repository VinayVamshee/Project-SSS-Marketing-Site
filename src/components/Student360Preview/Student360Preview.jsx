import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, BookOpen, Calendar, Award, IndianRupee, ArrowRight } from 'lucide-react';
import { MOCK_STUDENTS } from '../../data/students';
import './Student360Preview.css';

export default function Student360Preview() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'parent', label: 'Parent Info', icon: User },
    { id: 'academics', label: 'Academic Standing', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'results', label: 'Exam Results', icon: Award },
    { id: 'fees', label: 'Fees & Ledgers', icon: IndianRupee }
  ];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Student Cards Roster Grid */}
      <div className="student-grid-roster">
        {MOCK_STUDENTS.map((student) => (
          <div 
            key={student.id} 
            className="student-roster-card"
            onClick={() => { setSelectedStudent(student); setActiveTab('personal'); }}
          >
            <div className="student-roster-avatar">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="student-roster-name">{student.name}</h4>
            <div className="student-roster-meta">
              <span>Adm No: {student.admissionNo}</span>
              <span>Class: {student.class}-{student.section}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span className="student-roster-status">{student.status}</span>
              <button className="student-roster-action">
                View Details <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over details panel */}
      <AnimatePresence>
        {selectedStudent && (
          <>
            {/* Backdrop Blur */}
            <motion.div 
              className="student-panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
            />

            {/* Right Slide-over panel */}
            <motion.div 
              className="student-panel-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="student-panel-header">
                <h3>Student Details</h3>
                <button className="student-panel-close" onClick={() => setSelectedStudent(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="student-panel-body">
                {/* Header Summary Profile */}
                <div className="student-panel-profile-summary">
                  <div className="student-panel-avatar">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="student-panel-name">{selectedStudent.name}</h4>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                      <span className="student-panel-badge">Adm: {selectedStudent.admissionNo}</span>
                      <span className="student-panel-badge">Roll: {selectedStudent.rollNo}</span>
                      <span className="student-panel-badge">{selectedStudent.class}-{selectedStudent.section}</span>
                    </div>
                  </div>
                </div>

                {/* Sub Tab Headers */}
                <div className="student-panel-tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`student-panel-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content displays */}
                <div className="student-panel-tab-content">
                  {activeTab === 'personal' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Gender</span>
                        <span className="val">{selectedStudent.gender}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Date of Birth</span>
                        <span className="val">{selectedStudent.dob}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Blood Group</span>
                        <span className="val">{selectedStudent.bloodGroup}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Religion</span>
                        <span className="val">{selectedStudent.religion}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Mother Tongue</span>
                        <span className="val">{selectedStudent.motherTongue}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'parent' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Parent / Guardian Name</span>
                        <span className="val">{selectedStudent.parentName}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Contact Phone</span>
                        <span className="val">{selectedStudent.phone}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Contact Email</span>
                        <span className="val">{selectedStudent.email}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Residential Address</span>
                        <span className="val">{selectedStudent.address}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'academics' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Academic Year</span>
                        <span className="val">{selectedStudent.academicYear}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Current Status</span>
                        <span className="val" style={{ color: '#10B981', fontWeight: 600 }}>{selectedStudent.status}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Cumulative Term Score</span>
                        <span className="val">{selectedStudent.score}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Current Class Rank</span>
                        <span className="val">{selectedStudent.rank}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'attendance' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Attendance rate</span>
                        <span className="val" style={{ color: 'var(--accent)', fontWeight: 700 }}>{selectedStudent.attendance}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Total Term Days</span>
                        <span className="val">120 Days</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Grade Summary Standing</span>
                        <span className="val" style={{ color: 'var(--accent)', fontWeight: 700 }}>{selectedStudent.resultStatus}</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Mathematics Foundation</span>
                        <span className="val">65.8% (B2)</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">English Literacy</span>
                        <span className="val">60.3% (B2)</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Environmental Studies</span>
                        <span className="val">64% (B2)</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'fees' && (
                    <div className="student-panel-details-grid">
                      <div className="student-panel-row">
                        <span className="label">Assessed Tuition Fee</span>
                        <span className="val">₹42,000.00</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Amount Settled</span>
                        <span className="val" style={{ color: '#10B981', fontWeight: 600 }}>₹30,000.00</span>
                      </div>
                      <div className="student-panel-row">
                        <span className="label">Remaining Balance</span>
                        <span className="val" style={{ color: '#EF4444', fontWeight: 700 }}>₹12,000.00</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
