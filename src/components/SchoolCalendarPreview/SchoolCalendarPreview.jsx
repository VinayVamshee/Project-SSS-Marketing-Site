import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './SchoolCalendarPreview.css';

export default function SchoolCalendarPreview({ isTourActive }) {
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [selectedDate, setSelectedDate] = useState(15);
  const selectedMonth = 'August 2026';

  useEffect(() => {
    if (!isTourActive) return;

    const dates = [15, 21, 26, 31, 8];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % dates.length;
      setSelectedDate(dates[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isTourActive]);

  // Month dates mock data for August 2026
  // Categories: working (default), holiday, exam, event, vacation
  const calendarEvents = {
    1: { type: 'working', label: 'Working Day', desc: 'Regular academic classes' },
    2: { type: 'holiday', label: 'Sunday', desc: 'Weekly Off' },
    8: { type: 'holiday', label: 'Second Saturday', desc: 'School Off' },
    9: { type: 'holiday', label: 'Sunday', desc: 'Weekly Off' },
    15: { type: 'holiday', label: 'Independence Day', desc: 'National Holiday — Flag hoisting at 8:00 AM' },
    16: { type: 'holiday', label: 'Sunday', desc: 'Weekly Off' },
    19: { type: 'holiday', label: 'Raksha Bandhan', desc: 'Gazetted Holiday' },
    21: { type: 'exam', label: 'Unit Test 1 — Mathematics', desc: 'Assessment Slot 1 (09:30 AM - 11:30 AM)' },
    22: { type: 'exam', label: 'Unit Test 1 — Science', desc: 'Assessment Slot 1 (09:30 AM - 11:30 AM)' },
    23: { type: 'holiday', label: 'Sunday', desc: 'Weekly Off' },
    26: { type: 'event', label: 'Annual Sports Meet', desc: 'Inter-house Athletic Competition' },
    27: { type: 'event', label: 'Annual Science Fair', desc: 'Exhibition & Project Showcase' },
    30: { type: 'holiday', label: 'Sunday', desc: 'Weekly Off' },
    31: { type: 'vacation', label: 'Term End Break', desc: 'Mid-term recess' }
  };

  const getDayInfo = (day) => {
    return calendarEvents[day] || { type: 'working', label: 'Working Day', desc: 'Standard instruction & attendance day' };
  };

  const activeEvent = getDayInfo(selectedDate);

  // Days matrix for August 2026 (Starts on Saturday, day 1 = Sat)
  const daysInAugust = Array.from({ length: 31 }, (_, i) => i + 1);
  const paddingDays = [null, null, null, null, null]; // Sat is column 6

  return (
    <div className="cal-container">
      {/* Top Header & Selector Bar */}
      <div className="cal-toolbar">
        <div className="cal-toolbar-left">
          <CalendarIcon size={18} style={{ color: 'var(--accent)' }} />
          <div>
            <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Central Academic Calendar</strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
              One master calendar governing working days, attendance & exams
            </span>
          </div>
        </div>

        <div className="cal-toolbar-right">
          <div className="cal-select-group">
            <span className="cal-select-label">Academic Year</span>
            <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="cal-select">
              <option value="2026-2027">AY 2026–2027</option>
              <option value="2025-2026">AY 2025–2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="cal-legend">
        <div className="legend-item"><span className="dot working"></span> Working Day</div>
        <div className="legend-item"><span className="dot holiday"></span> Holiday</div>
        <div className="legend-item"><span className="dot exam"></span> Examination</div>
        <div className="legend-item"><span className="dot event"></span> School Event</div>
        <div className="legend-item"><span className="dot vacation"></span> Vacation</div>
      </div>

      {/* Main Workspace Grid: Calendar on Left, Panel on Right */}
      <div className="cal-workspace">
        <div className="cal-grid-card">
          <div className="cal-month-nav">
            <button className="cal-nav-btn"><ChevronLeft size={16} /></button>
            <span className="cal-month-title">{selectedMonth}</span>
            <button className="cal-nav-btn"><ChevronRight size={16} /></button>
          </div>

          <div className="cal-calendar-grid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="cal-day-header">{day}</div>
            ))}

            {paddingDays.map((_, i) => (
              <div key={`pad-${i}`} className="cal-day-cell empty"></div>
            ))}

            {daysInAugust.map(day => {
              const info = getDayInfo(day);
              const isSelected = day === selectedDate;
              return (
                <div
                  key={day}
                  className={`cal-day-cell ${info.type} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="cal-day-num">{day}</span>
                  <span className={`cal-cell-badge ${info.type}`}></span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details Panel */}
        <div className="cal-details-panel">
          <div className="cal-details-header">
            <span className="cal-date-tag">{selectedDate} August 2026</span>
            <span className={`cal-type-pill ${activeEvent.type}`}>
              {activeEvent.type.toUpperCase()}
            </span>
          </div>

          <div className="cal-details-body">
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: '8px 0 4px 0' }}>
              {activeEvent.label}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {activeEvent.desc}
            </p>

            <div className="cal-meta-box">
              <div className="cal-meta-row">
                <span className="meta-label">Attendance Impact:</span>
                <span className="meta-val">
                  {activeEvent.type === 'holiday' || activeEvent.type === 'vacation'
                    ? 'Non-working (Excluded from calculations)'
                    : 'Working Day #142 (Attendance Mandated)'}
                </span>
              </div>
              <div className="cal-meta-row">
                <span className="meta-label">Schedule Status:</span>
                <span className="meta-val">
                  {activeEvent.type === 'exam'
                    ? 'Exam Hall Seating Enabled'
                    : 'Regular Class Timetable'}
                </span>
              </div>
            </div>
          </div>

          {/* Module Integration Visual Callout */}
          <div className="cal-integration-box">
            <div className="integration-step">
              <span className="step-title">Calendar</span>
              <ArrowRight size={12} className="step-icon" />
              <span className="step-title">Attendance</span>
              <span className="step-desc">Auto-calculates working days & valid absences</span>
            </div>
            <div className="integration-step">
              <span className="step-title">Calendar</span>
              <ArrowRight size={12} className="step-icon" />
              <span className="step-title">Examinations</span>
              <span className="step-desc">Locks exam schedules & hall ticket dates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="cal-summary-bar">
        <div className="cal-summary-title">
          <span>Academic Year {academicYear} Summary</span>
        </div>
        <div className="cal-summary-stats">
          <div className="stat-pill"><strong style={{ color: '#10B981' }}>214</strong> Working Days</div>
          <div className="stat-pill"><strong style={{ color: '#EF4444' }}>24</strong> Holidays</div>
          <div className="stat-pill"><strong style={{ color: '#F59E0B' }}>18</strong> Exam Days</div>
          <div className="stat-pill"><strong style={{ color: '#3B82F6' }}>32</strong> Events</div>
        </div>
      </div>
    </div>
  );
}
