import React, { useState } from 'react';
import { Users, Calendar, AlertTriangle, Search, CheckCircle2, XCircle, FileText } from 'lucide-react';
import './AttendancePreview.css';

export default function AttendancePreview() {
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedDate, setSelectedDate] = useState('2026-08-14');
  const [searchQuery, setSearchQuery] = useState('');

  const [students, setStudents] = useState([
    { id: 1, rollNo: '01', admNo: 'ADM-2024-101', name: 'Aditya Sharma', status: 'Present' },
    { id: 2, rollNo: '02', admNo: 'ADM-2024-102', name: 'Meera Patel', status: 'Absent' },
    { id: 3, rollNo: '03', admNo: 'ADM-2024-103', name: 'Rohan Verma', status: 'Present' },
    { id: 4, rollNo: '04', admNo: 'ADM-2024-104', name: 'Zara Khan', status: 'Late' },
    { id: 5, rollNo: '05', admNo: 'ADM-2024-105', name: 'Vijay Iyer', status: 'Present' },
    { id: 6, rollNo: '06', admNo: 'ADM-2024-106', name: 'Ananya Reddy', status: 'Present' },
    { id: 7, rollNo: '07', admNo: 'ADM-2024-107', name: 'Kabir Das', status: 'Leave' },
  ]);

  const statuses = ['Present', 'Absent', 'Late', 'Half Day', 'Leave'];

  const setStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAll = (newStatus) => {
    setStudents(prev => prev.map(s => ({ ...s, status: newStatus })));
  };

  const getTally = (status) => students.filter(s => s.status === status).length;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.includes(searchQuery)
  );

  const totalCount = students.length;
  const presentCount = getTally('Present');
  const absentCount = getTally('Absent');
  const lateCount = getTally('Late');
  const leaveCount = getTally('Leave');
  const halfDayCount = getTally('Half Day');

  const attendancePercentage = Math.round(
    ((presentCount + lateCount * 0.8 + halfDayCount * 0.5) / totalCount) * 100
  );

  return (
    <div className="att-container">
      {/* Top Controls Bar */}
      <div className="att-toolbar">
        <div className="att-select-group">
          <label className="att-select-label">Year</label>
          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="att-select">
            <option value="2026-2027">2026–2027</option>
            <option value="2025-2026">2025–2026</option>
          </select>
        </div>

        <div className="att-select-group">
          <label className="att-select-label">Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="att-select">
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
        </div>

        <div className="att-select-group">
          <label className="att-select-label">Section</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="att-select">
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        <div className="att-select-group">
          <label className="att-select-label">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="att-date-input"
          />
        </div>

        <div className="att-status-badge">
          <Calendar size={13} style={{ color: 'var(--accent)' }} />
          <span>Working Day #142</span>
        </div>
      </div>

      {/* Attendance Register Header */}
      <div className="att-register-header">
        <div className="att-header-left">
          <Users size={18} style={{ color: 'var(--accent)' }} />
          <div>
            <strong style={{ fontSize: '15px', color: 'var(--text)' }}>
              {selectedClass} — {selectedSection} Roster
            </strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
              Daily Attendance Log · {selectedDate}
            </span>
          </div>
        </div>

        <div className="att-actions">
          <div className="att-search-box">
            <Search size={14} className="att-search-icon" />
            <input
              type="text"
              placeholder="Search name or Roll No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="att-search-input"
            />
          </div>

          <button className="att-btn-outline" onClick={() => markAll('Present')}>
            <CheckCircle2 size={13} style={{ color: '#10B981' }} /> Mark All Present
          </button>
          <button className="att-btn-outline" onClick={() => markAll('Absent')}>
            <XCircle size={13} style={{ color: '#EF4444' }} /> Mark All Absent
          </button>
        </div>
      </div>

      {/* Student Register Table */}
      <div className="att-table-wrapper">
        <table className="att-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Roll</th>
              <th style={{ width: '130px' }}>Adm No.</th>
              <th>Student Name</th>
              <th style={{ textAlign: 'right' }}>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="att-roll-cell">{student.rollNo}</td>
                <td className="att-adm-cell">{student.admNo}</td>
                <td>
                  <div className="att-student-name-box">
                    <span className="att-student-avatar">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span className="att-student-name">{student.name}</span>
                  </div>
                </td>
                <td>
                  <div className="att-status-buttons">
                    {statuses.map((s) => {
                      const isActive = student.status === s;
                      const statusClass = s.toLowerCase().replace(' ', '-');
                      return (
                        <button
                          key={s}
                          className={`att-status-btn ${statusClass} ${isActive ? 'active' : ''}`}
                          onClick={() => setStatus(student.id, s)}
                          title={`Set status to ${s}`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No matching student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Metrics & Alert Grid */}
      <div className="att-summary-grid">
        <div className="att-metric-card">
          <span className="att-metric-label">Class Attendance</span>
          <strong className="att-metric-value">{attendancePercentage}%</strong>
          <span className="att-metric-sub">{presentCount} of {totalCount} Students Present</span>
        </div>

        <div className="att-metric-card">
          <span className="att-metric-label">Status Summary</span>
          <div className="att-tally-pills">
            <span className="tally-pill p">{presentCount} Present</span>
            <span className="tally-pill a">{absentCount} Absent</span>
            <span className="tally-pill l">{lateCount} Late</span>
            <span className="tally-pill lv">{leaveCount} Leave</span>
          </div>
        </div>

        <div className="att-metric-card alert">
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <AlertTriangle size={14} style={{ color: '#EF4444' }} />
            <span className="att-metric-label" style={{ color: '#EF4444' }}>Low Attendance Alert</span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: 4, display: 'block' }}>
            Meera Patel (74% YTD)
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Requires 75% minimum threshold for term exam eligibility.
          </span>
        </div>

        <div className="att-metric-card info">
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            <span className="att-metric-label" style={{ color: 'var(--accent)' }}>Calendar Sync</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
            Attendance connected to school calendar. Working days, holidays, and non-working dates are automatically considered.
          </span>
        </div>
      </div>
    </div>
  );
}
