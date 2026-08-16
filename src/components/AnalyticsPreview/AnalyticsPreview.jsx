import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, Tooltip, Legend } from 'recharts';
import './AnalyticsPreview.css';

const subjectComparisonData = [
  { subject: 'English Lit.', score: 60.3, highest: 72 },
  { subject: 'Math Found.', score: 65.8, highest: 78 },
  { subject: 'Env. Studies', score: 64.0, highest: 76 },
  { subject: 'Art & Craft', score: 78.8, highest: 98 },
  { subject: 'Social Int.', score: 40.5, highest: 71 },
  { subject: 'Cognitive', score: 52.8, highest: 76 }
];

const progressTrendData = [
  { exam: 'Unit Test 1', score: 58 },
  { exam: 'Unit Test 2', score: 62 },
  { exam: 'Half Yearly', score: 65.8 },
  { exam: 'Annual', score: 70 }
];

export default function AnalyticsPreview({ isTourActive }) {
  const [activeTab, setActiveTab] = useState('executive');

  useEffect(() => {
    if (!isTourActive) return;

    const tabs = ['executive', 'student', 'subject'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % tabs.length;
      setActiveTab(tabs[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isTourActive]);

  const subjectsTable = [
    { name: 'English Literacy', avg: '60.3%', high: '72%', grade: 'B2' },
    { name: 'Mathematics Foundation', avg: '65.8%', high: '78%', grade: 'B2' },
    { name: 'Environmental Studies', avg: '64.0%', high: '76%', grade: 'B2' },
    { name: 'Art & Craft', avg: '78.8%', high: '98%', grade: 'B1' },
    { name: 'Social Interaction', avg: '40.5%', high: '71%', grade: 'C2' },
    { name: 'Cognitive Skill', avg: '52.8%', high: '76%', grade: 'C1' }
  ];

  return (
    <div className="analytics-preview-container">
      {/* BI Tabs */}
      <div className="ap-tabs">
        {['Executive Dashboard', 'Student Analytics', 'Subject Performance'].map(tab => (
          <button
            key={tab}
            className={`ap-tab-btn ${activeTab === tab.toLowerCase().split(' ')[0] ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'executive' && (
        <div className="ap-view-grid">
          {/* KPI list */}
          <div className="ap-kpis">
            <div className="ap-kpi">
              <span className="ap-kpi-label">Overall Grade</span>
              <span className="ap-kpi-val">B2</span>
              <span className="ap-kpi-sub">Average Standing</span>
            </div>
            <div className="ap-kpi">
              <span className="ap-kpi-label">Current Class Rank</span>
              <span className="ap-kpi-val">#13</span>
              <span className="ap-kpi-sub">Out of 28</span>
            </div>
            <div className="ap-kpi">
              <span className="ap-kpi-label">Attendance Rate</span>
              <span className="ap-kpi-val">91.7%</span>
              <span className="ap-kpi-sub">Term Cumulative</span>
            </div>
            <div className="ap-kpi">
              <span className="ap-kpi-label">Exams Growth</span>
              <span className="ap-kpi-val" style={{ color: '#10B981' }}>+4.4%</span>
              <span className="ap-kpi-sub">vs Last Term</span>
            </div>
          </div>

          {/* Exam Trends */}
          <div className="ap-chart-card">
            <div className="ap-card-title">Exam-wise Overall Percentage Trend</div>
            <div style={{ width: '100%', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressTrendData}>
                  <XAxis dataKey="exam" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px'
                    }} 
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'student' && (
        <div className="ap-view-grid">
          {/* Summary */}
          <div className="ap-student-card">
            <h4 style={{ fontWeight: 600 }}>Vikrant Kaithwas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '12px', marginTop: 10, color: 'var(--text-muted)' }}>
              <span>Admission No: ADM-2025-0042</span>
              <span>Roll Number: 14</span>
              <span>Class Cumulative: 65.8%</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Status: Passed</span>
            </div>
          </div>

          {/* Radar chart approximation using simple bar ratios */}
          <div className="ap-table-card">
            <div className="ap-card-title" style={{ marginBottom: 12 }}>Subject Scores Overview</div>
            <table className="ap-data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Student Score</th>
                  <th>Highest</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjectsTable.map((sub, idx) => (
                  <tr key={idx}>
                    <td>{sub.name}</td>
                    <td style={{ fontWeight: 600 }}>{sub.avg}</td>
                    <td>{sub.high}</td>
                    <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{sub.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'subject' && (
        <div className="ap-view-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="ap-chart-card">
            <div className="ap-card-title">Subject-wise Comparison: Student Score vs Class Highest</div>
            <div style={{ width: '100%', height: 220, marginTop: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectComparisonData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend verticalAlign="top" height={36} iconSize={12} />
                  <Bar name="Student Score" dataKey="score" fill="var(--sss-blue)" radius={[4, 4, 0, 0]} />
                  <Bar name="Class Highest" dataKey="highest" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
