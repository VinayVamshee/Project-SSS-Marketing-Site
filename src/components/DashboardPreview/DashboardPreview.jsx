import React from 'react';
import { 
  Users, BookOpen, Calendar, IndianRupee, GraduationCap, 
  Home, FileText, Settings, ShieldAlert, TrendingUp, BarChart2 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import './DashboardPreview.css';

const chartData = [
  { name: 'Unit 1', value: 72 },
  { name: 'Unit 2', value: 78 },
  { name: 'Half Yearly', value: 81 },
  { name: 'Annual', value: 86 }
];

export default function DashboardPreview() {
  const sidebarItems = [
    { label: 'Overview', icon: Home, active: true },
    { label: 'Register Student', icon: ShieldAlert },
    { label: 'Students', icon: Users },
    { label: 'Classes', icon: BookOpen },
    { label: 'Results', icon: GraduationCap },
    { label: 'Assessment Analytics', icon: BarChart2 },
    { label: 'Payments', icon: IndianRupee },
    { label: 'QuestionPaper', icon: FileText },
    { label: 'QuestionPaper V2', icon: FileText },
    { label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Overall Grade', val: 'B2', icon: GraduationCap, sub: 'Average Standing' },
    { label: 'Current Class Rank', val: '#13', icon: Users, sub: 'Out of 28 Students' },
    { label: 'Attendance Rate', val: '91.7%', icon: Calendar, sub: 'Term Cumulative' },
    { label: 'Exams Growth', val: '+4.4%', icon: TrendingUp, sub: 'vs Previous Quarter' }
  ];

  return (
    <div className="db-preview-container">
      {/* Sidebar */}
      <div className="db-sidebar">
        <div className="db-sidebar-logo">
          <span>SSS</span>
        </div>
        <div className="db-sidebar-menu">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className={`db-sidebar-item ${item.active ? 'active' : ''}`}>
              <item.icon size={14} style={{ color: item.active ? 'var(--accent)' : 'var(--text-muted)' }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel */}
      <div className="db-main">
        {/* Header */}
        <div className="db-header">
          <div className="db-greeting">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3>Academic Business Intelligence Center</h3>
              <div className="db-live-indicator">
                <span className="db-live-dot" />
                <span>Live Preview</span>
              </div>
            </div>
            <p>Decision support reporting, risk analysis, and student standings ledger</p>
          </div>
          <div className="db-date-badge">
            Academic Year: 2025-26
          </div>
        </div>

        {/* Stats Grid */}
        <div className="db-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="db-stat-card">
              <div className="db-stat-header">
                <span>{stat.label}</span>
                <stat.icon size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="db-stat-val" style={{ color: stat.label.includes('Rank') || stat.label.includes('Grade') ? 'var(--text)' : 'var(--accent)' }}>
                {stat.val}
              </div>
              <div className="db-stat-trend" style={{ color: 'var(--text-muted)' }}>
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="db-content-grid">
          {/* Chart card */}
          <div className="db-chart-card">
            <div className="db-card-title">Exam-wise Performance Trends</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity card */}
          <div className="db-activity-card">
            <div className="db-card-title">Class Roster Standing</div>
            <div className="db-activity-list">
              {[
                { name: 'Vikrant Kaithwas', score: '65.8%', status: 'Passed' },
                { name: 'Aarav Sharma', score: '92.4%', status: 'Passed' },
                { name: 'Ananya Patel', score: '84.6%', status: 'Passed' }
              ].map((student, idx) => (
                <div key={idx} className="db-activity-item" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 600 }}>{student.name}</span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span>{student.score}</span>
                    <span style={{ color: '#10B981', fontWeight: 600 }}>{student.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
