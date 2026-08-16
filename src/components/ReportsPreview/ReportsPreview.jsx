import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Download, FileText, CheckCircle2 } from 'lucide-react';
import './ReportsPreview.css';

export default function ReportsPreview({ isTourActive }) {
  const [reportType, setReportType] = useState('attendance');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [dateRange, setDateRange] = useState('July 1 – August 14, 2026');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!isTourActive) return;

    const reportTypes = ['attendance', 'student', 'academic', 'exam', 'fee'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % reportTypes.length;
      const nextReport = reportTypes[index];
      setReportType(nextReport);
      setNotification(`Generating ${reportTitles[nextReport]} preview...`);
      setTimeout(() => setNotification(null), 1000);
    }, 1300);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTourActive]);

  const triggerExport = (format) => {
    setNotification(`Exporting ${reportTitles[reportType]} as ${format}...`);
    setTimeout(() => setNotification(null), 3000);
  };

  const reportTitles = {
    attendance: 'Attendance Register Report',
    student: 'Student Master Roster',
    academic: 'Class Academic Progress Summary',
    exam: 'Term Examination Marksheet Digest',
    fee: 'Fee Collection & Dues Ledger'
  };

  const reportsData = {
    attendance: {
      headers: ['Student', 'Adm No.', 'Class', 'Present', 'Absent', 'Leave', 'Att. %', 'Status'],
      rows: [
        { c1: 'Aditya Sharma', c2: 'ADM-2024-101', c3: '8-A', c4: '38', c5: '2', c6: '0', c7: '95%', c8: 'Eligible', badge: 'pass' },
        { c1: 'Meera Patel', c2: 'ADM-2024-102', c3: '8-A', c4: '29', c5: '9', c6: '2', c7: '72.5%', c8: 'Shortage Warning', badge: 'warn' },
        { c1: 'Rohan Verma', c2: 'ADM-2024-103', c3: '8-A', c4: '36', c5: '4', c6: '0', c7: '90%', c8: 'Eligible', badge: 'pass' },
        { c1: 'Zara Khan', c2: 'ADM-2024-104', c3: '8-A', c4: '34', c5: '3', c6: '3', c7: '85%', c8: 'Eligible', badge: 'pass' },
        { c1: 'Vijay Iyer', c2: 'ADM-2024-105', c3: '8-A', c4: '39', c5: '1', c6: '0', c7: '97.5%', c8: 'Eligible', badge: 'pass' }
      ]
    },
    student: {
      headers: ['Student', 'Adm No.', 'Roll No.', 'Guardian Name', 'Phone', 'Category', 'Status'],
      rows: [
        { c1: 'Aditya Sharma', c2: 'ADM-2024-101', c3: '01', c4: 'Sanjeev Sharma', c5: '+91 98765 43210', c6: 'General', c7: 'Active', badge: 'pass' },
        { c1: 'Meera Patel', c2: 'ADM-2024-102', c3: '02', c4: 'Rajesh Patel', c5: '+91 98765 43211', c6: 'General', c7: 'Active', badge: 'pass' },
        { c1: 'Rohan Verma', c2: 'ADM-2024-103', c3: '03', c4: 'Vikram Verma', c5: '+91 98765 43212', c6: 'OBC', c7: 'Active', badge: 'pass' },
        { c1: 'Zara Khan', c2: 'ADM-2024-104', c3: '04', c4: 'Tariq Khan', c5: '+91 98765 43213', c6: 'General', c7: 'Active', badge: 'pass' }
      ]
    },
    academic: {
      headers: ['Subject', 'Teacher', 'Pass %', 'Class Avg', 'Highest', 'Lowest', 'Status'],
      rows: [
        { c1: 'Mathematics', c2: 'Dr. Ramesh Kumar', c3: '94%', c4: '78.4 / 100', c5: '98', c6: '42', c7: 'Completed', badge: 'pass' },
        { c1: 'Science', c2: 'Mrs. Sunita Rao', c3: '91%', c4: '74.2 / 100', c5: '95', c6: '38', c7: 'Completed', badge: 'pass' },
        { c1: 'English', c2: 'Ms. Anita Roy', c3: '98%', c4: '82.1 / 100', c5: '96', c6: '54', c7: 'Completed', badge: 'pass' },
        { c1: 'Social Science', c2: 'Mr. Alok Nath', c3: '88%', c4: '69.8 / 100', c5: '92', c6: '35', c7: 'Review Needed', badge: 'warn' }
      ]
    },
    exam: {
      headers: ['Exam Title', 'Class', 'Subject', 'Date', 'Total Students', 'Evaluated', 'Status'],
      rows: [
        { c1: 'Unit Test 1', c2: 'Class 8-A', c3: 'Mathematics', c4: '12 Aug 2026', c5: '40', c6: '40 / 40', c7: 'Published', badge: 'pass' },
        { c1: 'Unit Test 1', c2: 'Class 8-A', c3: 'Science', c4: '13 Aug 2026', c5: '40', c6: '40 / 40', c7: 'Published', badge: 'pass' },
        { c1: 'Mid-Term Exam', c2: 'Class 8-A', c3: 'All Subjects', c4: '25 Sep 2026', c5: '40', c6: '0 / 40', c7: 'Scheduled', badge: 'info' }
      ]
    },
    fee: {
      headers: ['Student', 'Adm No.', 'Total Fee', 'Paid Amount', 'Due Amount', 'Receipt No.', 'Payment Status'],
      rows: [
        { c1: 'Aditya Sharma', c2: 'ADM-2024-101', c3: '₹45,000', c4: '₹45,000', c5: '₹0', c6: 'REC-8841', c7: 'Cleared', badge: 'pass' },
        { c1: 'Meera Patel', c2: 'ADM-2024-102', c3: '₹45,000', c4: '₹22,500', c5: '₹22,500', c6: 'REC-8842', c7: 'Partial Due', badge: 'warn' },
        { c1: 'Rohan Verma', c2: 'ADM-2024-103', c3: '₹45,000', c4: '₹45,000', c5: '₹0', c6: 'REC-8843', c7: 'Cleared', badge: 'pass' }
      ]
    }
  };

  const activeReport = reportsData[reportType];

  return (
    <div className="rep-container">
      {/* Top Report Type Tabs */}
      <div className="rep-tabs">
        {[
          { key: 'attendance', label: 'Attendance Reports' },
          { key: 'student', label: 'Student Reports' },
          { key: 'academic', label: 'Academic Reports' },
          { key: 'exam', label: 'Examination Reports' },
          { key: 'fee', label: 'Fee Reports' }
        ].map(tab => (
          <button
            key={tab.key}
            className={`rep-tab-btn ${reportType === tab.key ? 'active' : ''}`}
            onClick={() => setReportType(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="rep-filter-bar">
        <div className="rep-filter-group">
          <label className="rep-label">Academic Year</label>
          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="rep-select">
            <option value="2026-2027">2026–2027</option>
            <option value="2025-2026">2025–2026</option>
          </select>
        </div>

        <div className="rep-filter-group">
          <label className="rep-label">Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="rep-select">
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
        </div>

        <div className="rep-filter-group">
          <label className="rep-label">Section</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="rep-select">
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        <div className="rep-filter-group">
          <label className="rep-label">Date Range</label>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rep-input"
          />
        </div>

        <div className="rep-actions-right">
          <button className="rep-btn primary" onClick={() => triggerExport('PDF')}>
            <Download size={13} /> Export PDF
          </button>
          <button className="rep-btn secondary" onClick={() => triggerExport('Excel')}>
            <FileSpreadsheet size={13} /> Export Excel
          </button>
        </div>
      </div>

      {/* Report Header Title Bar */}
      <div className="rep-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileText size={18} style={{ color: 'var(--accent)' }} />
          <div>
            <strong style={{ fontSize: '15px', color: 'var(--text)' }}>
              {reportTitles[reportType]}
            </strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
              Filtered: {selectedClass} — {selectedSection} · {dateRange}
            </span>
          </div>
        </div>

        {notification && (
          <div className="rep-toast">
            <CheckCircle2 size={13} style={{ color: '#10B981' }} />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Data Table Preview */}
      <div className="rep-table-wrapper">
        <table className="rep-table">
          <thead>
            <tr>
              {activeReport.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeReport.rows.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{row.c1}</td>
                <td>{row.c2}</td>
                <td>{row.c3}</td>
                <td>{row.c4}</td>
                <td>{row.c5}</td>
                <td>{row.c6}</td>
                <td style={{ fontWeight: 700 }}>{row.c7}</td>
                <td>
                  <span className={`rep-badge ${row.badge}`}>
                    {row.c8}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info Callout */}
      <div className="rep-footer-info">
        <span>● Multi-format export ready (PDF, Excel, Print)</span>
        <span>● Direct integration with Student 360 & Academic History</span>
      </div>
    </div>
  );
}
