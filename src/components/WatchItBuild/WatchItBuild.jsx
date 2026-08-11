import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './WatchItBuild.css';

export default function WatchItBuild() {
  const [buildStep, setBuildStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildStep((prev) => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wib-container">
      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Cinematic Compilation Engine Demo
      </div>

      <div className="wib-paper">
        {/* Step 5 Watermark Badge */}
        {buildStep === 5 && (
          <div className="wib-badge">Print-Ready PDF</div>
        )}

        {/* Step 1: School Header details */}
        {buildStep >= 1 ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 10, marginBottom: 16 }}
          >
            <div style={{ fontSize: '15px', fontWeight: 700 }}>VAMSHEE TECHNO SCHOOL</div>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>FIRST TERM EXAMINATIONS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: 8, fontWeight: 700 }}>
              <span>Grade: Class-6</span>
              <span>Subject: Mathematics</span>
              <span>Max Marks: {buildStep === 2 ? 5 : buildStep === 3 ? 10 : buildStep >= 4 ? 20 : 0}</span>
            </div>
          </motion.div>
        ) : (
          <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '12px', border: '1px dashed #ccc', borderRadius: 4, marginBottom: 16 }}>
            Waiting for Header Configuration...
          </div>
        )}

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {buildStep >= 2 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '24px 1fr 50px', fontSize: '12px' }}
            >
              <span>Q1.</span>
              <span>Solve the algebraic expression: 3x + 5 = 20. Find x.</span>
              <span style={{ textAlign: 'right', fontWeight: 700 }}>[5 Marks]</span>
            </motion.div>
          )}

          {buildStep >= 3 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '24px 1fr 50px', fontSize: '12px' }}
            >
              <span>Q2.</span>
              <span>Define commutative property of multiplication with variables.</span>
              <span style={{ textAlign: 'right', fontWeight: 700 }}>[5 Marks]</span>
            </motion.div>
          )}

          {buildStep >= 4 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '24px 1fr 50px', fontSize: '12px' }}
            >
              <span>Q3.</span>
              <span>Plot the graph of the function y = 2x - 3 and find intercepts.</span>
              <span style={{ textAlign: 'right', fontWeight: 700 }}>[10 Marks]</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="wib-marks-counter">
        Total marks tally: {buildStep === 2 ? '5 / 20' : buildStep === 3 ? '10 / 20' : buildStep >= 4 ? '20 / 20' : '0 / 20'}
      </div>
    </div>
  );
}
