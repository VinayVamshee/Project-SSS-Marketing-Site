import React, { useState } from 'react';
import { Users, Calendar, AlertTriangle } from 'lucide-react';
import './AttendancePreview.css';

export default function AttendancePreview() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aditya Sharma', status: 'Present' },
    { id: 2, name: 'Meera Patel', status: 'Absent' },
    { id: 3, name: 'Rohan Verma', status: 'Present' },
    { id: 4, name: 'Zara Khan', status: 'Late' },
    { id: 5, name: 'Vijay Iyer', status: 'Present' }
  ]);

  const statuses = ['Present', 'Absent', 'Late', 'Half Day', 'Leave'];

  const setStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const getTally = (status) => students.filter(s => s.status === status).length;

  return (
    <div className="att-container">
      {/* Attendance Register Header */}
      <div className="att-register-header">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Users size={18} style={{ color: 'var(--accent-color)' }} />
          <div>
            <strong style={{ fontSize: '14px', display: 'block' }}>Class 8 — Section A</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Daily Attendance Log</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
          <Calendar size={14} />
          <span>Working Day #142 (Active Calendar)</span>
        </div>
      </div>

      {/* Student Register Table */}
      <div className="att-register-body">
        {students.map((student) => (
          <div key={student.id} className="att-student-row">
            <div className="att-student-info">
              <span className="att-student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</span>
              <span className="att-student-name">{student.name}</span>
            </div>
            <div className="att-status-buttons">
              {statuses.map((s) => {
                const isActive = student.status === s;
                return (
                  <button
                    key={s}
                    className={`att-status-btn ${s.toLowerCase().replace(' ', '-')} ${isActive ? 'active' : ''}`}
                    onClick={() => setStatus(student.id, s)}
                  >
                    {s[0]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Metrics & History Tally widgets */}
      <div className="att-summary-grid">
        <div className="att-metric-card">
          <span className="att-metric-label">Today's Attendance</span>
          <strong className="att-metric-value">{Math.round((getTally('Present') + getTally('Late') + getTally('Half Day') * 0.5) / students.length * 100)}%</strong>
        </div>
        <div className="att-metric-card">
          <span className="att-metric-label">Tally</span>
          <div style={{ display: 'flex', gap: 8, fontSize: '11px', marginTop: 4 }}>
            <span style={{ color: '#10B981', fontWeight: 700 }}>{getTally('Present')} P</span>
            <span style={{ color: '#EF4444', fontWeight: 700 }}>{getTally('Absent')} A</span>
            <span style={{ color: '#F59E0B', fontWeight: 700 }}>{getTally('Late')} L</span>
          </div>
        </div>
        <div className="att-metric-card alert">
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <AlertTriangle size={12} style={{ color: '#EF4444' }} />
            <span className="att-metric-label" style={{ color: '#EF4444' }}>Low Attendance Alert</span>
          </div>
          <span style={{ fontSize: '11px', display: 'block', marginTop: 4 }}>Meera Patel (74% Year-to-date)</span>
        </div>
      </div>
    </div>
  );
}
