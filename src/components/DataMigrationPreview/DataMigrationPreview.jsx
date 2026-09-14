import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, FileSpreadsheet, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import './DataMigrationPreview.css';

export default function DataMigrationPreview({ isTourActive }) {
  const [activeStep, setActiveStep] = useState(1); // 1: Select Format, 2: Validate Data, 3: Migration Report
  const [validating, setValidating] = useState(false);

  const migrationStats = [
    { label: 'Historical Students', value: '1,450 Records', icon: Database },
    { label: 'Academic Years', value: '5 Years (2020-2025)', icon: FileSpreadsheet },
    { label: 'Class History', value: '100% Preserved', icon: CheckCircle2 },
    { label: 'Validation Errors', value: '0 Conflicts', icon: ShieldCheck }
  ];

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setActiveStep(3);
    }, 1200);
  };

  useEffect(() => {
    if (!isTourActive) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isTourActive]);

  return (
    <div className="dm-container">
      {/* Top Banner */}
      <div className="dm-header">
        <div>
          <div className="dm-tag">MOVING FROM AN OLD SOFTWARE SYSTEM?</div>
          <h3 className="dm-title">Bring your existing school history into SSS.</h3>
          <p className="dm-desc">
            You don't have to start from scratch. Easily import past academic years, student profile records, guardian data, and class history via Excel.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleValidate} disabled={validating}>
          {validating ? <RefreshCw size={14} className="spin-icon" /> : <UploadCloud size={14} />}
          {validating ? 'Validating Excel Import...' : 'Run Migration Preview'}
        </button>
      </div>

      {/* Migration Wizard Steps */}
      <div className="dm-steps-bar">
        <div className={`dm-step ${activeStep >= 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
          <span>1. Select Excel File</span>
        </div>
        <div className={`dm-step ${activeStep >= 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
          <span>2. Data Validation & Rules</span>
        </div>
        <div className={`dm-step ${activeStep >= 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>
          <span>3. Import Confirmation</span>
        </div>
      </div>

      {/* Main Content View */}
      {activeStep === 1 && (
        <div className="dm-dropzone">
          <UploadCloud size={36} style={{ color: 'var(--accent)', marginBottom: 12 }} />
          <strong style={{ fontSize: '14px', color: 'var(--text)' }}>Upload Existing School Master Spreadsheet (.xlsx / .csv)</strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 4 }}>
            Import student profiles, admission numbers, parent contacts, previous marks, and historical fees.
          </span>
        </div>
      )}

      {activeStep === 2 && (
        <div className="dm-validation-box">
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Pre-Import Validation Check</h4>
          <div className="dm-val-grid">
            <div className="dm-val-item pass">
              <CheckCircle2 size={16} />
              <div>
                <strong>Admission Number Uniqueness</strong>
                <span>All 1,450 student admission numbers verified</span>
              </div>
            </div>
            <div className="dm-val-item pass">
              <CheckCircle2 size={16} />
              <div>
                <strong>Class & Section Mapping</strong>
                <span>Historical class progressions matched to AY 2020–2025</span>
              </div>
            </div>
            <div className="dm-val-item pass">
              <CheckCircle2 size={16} />
              <div>
                <strong>Guardian Phone Formatting</strong>
                <span>Formatted 10-digit mobile phone numbers</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="dm-stats-grid">
          {migrationStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="dm-stat-card">
                <Icon size={20} style={{ color: 'var(--accent)', marginBottom: 8 }} />
                <div className="dm-stat-value">{stat.value}</div>
                <div className="dm-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
