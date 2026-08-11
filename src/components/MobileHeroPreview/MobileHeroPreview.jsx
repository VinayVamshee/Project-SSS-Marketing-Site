import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './MobileHeroPreview.css';

export default function MobileHeroPreview() {
  const [students, setStudents] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Count up animations
    const duration = 1500;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStudents(Math.floor((1248 / steps) * step));
      setAttendance(Math.floor((94 / steps) * step));
      setPerformance(Math.floor((82 / steps) * step));

      if (step >= steps) {
        clearInterval(timer);
        setStudents(1248);
        setAttendance(94);
        setPerformance(82);
        // Show simulated notification after completion
        setTimeout(() => setShowNotification(true), 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mhp-container">
      <div className="mhp-header">
        <div className="mhp-brand">
          <span>SSS</span>
        </div>
        <div className="mhp-status-dot" />
      </div>

      <div className="mhp-content">
        <div className="mhp-sub-header">
          <div>
            <div className="mhp-title">Dashboard</div>
            <div className="mhp-subtitle">Good Morning, Admin</div>
          </div>
        </div>

        <div className="mhp-grid">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mhp-card"
          >
            <span className="mhp-card-label">Students</span>
            <span className="mhp-card-value">{students.toLocaleString()}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mhp-card"
          >
            <span className="mhp-card-label">Attendance</span>
            <span className="mhp-card-value">{attendance}%</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mhp-card full-width"
        >
          <div className="mhp-card-header-row">
            <span className="mhp-card-label">Performance</span>
            <span className="mhp-card-value" style={{ color: 'var(--accent)' }}>{performance}%</span>
          </div>
          
          <div className="mhp-chart-container">
            <div className="mhp-chart-bar-bg">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${performance}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                className="mhp-chart-bar-fill"
              />
            </div>
            
            <div className="mhp-chart-sparkline">
              <svg viewBox="0 0 100 30" className="mhp-sparkline-svg">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6 }}
                  d="M0,25 Q15,10 30,20 T60,5 T90,15 L100,10"
                  fill="none"
                  stroke="var(--sss-blue)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Animated Simulated Alert Notification */}
        <div style={{ minHeight: 48, position: 'relative', marginTop: 12 }}>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mhp-notification"
            >
              <div className="mhp-notif-dot" />
              <span>Syllabus configuration matches term goals! ✓</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
