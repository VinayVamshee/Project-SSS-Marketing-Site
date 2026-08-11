import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Database, CreditCard, Activity, Calendar } from 'lucide-react';
import './ProblemVisual.css';

export default function ProblemVisual() {
  const [converged, setConverged] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      setConverged(true);
    } else {
      setConverged(false);
    }
  }, [inView]);

  const nodes = [
    { title: 'Student Records', sub: 'Excel Spreadsheets', icon: Database, x: -240, y: -120 },
    { title: 'Fee Management', sub: 'Accounting Software', icon: CreditCard, x: 240, y: -120 },
    { title: 'Attendance', sub: 'Manual Registers', icon: Calendar, x: -220, y: 120 },
    { title: 'Question Papers', sub: 'Word Documents', icon: FileText, x: 220, y: 120 },
    { title: 'Report Cards', sub: 'Separate Offline Systems', icon: Activity, x: 0, y: -160 }
  ];

  return (
    <div ref={ref} className="problem-visual-container">
      {/* Center SSS Node */}
      <motion.div 
        className={`problem-node-center ${converged ? 'converged' : ''}`}
        animate={{ 
          scale: converged ? [1, 1.05, 1] : 0.9,
        }}
        transition={{ duration: 1.5, repeat: converged ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}
      >
        SSS
        <span>Intelligent Core</span>
      </motion.div>

      {/* Outer Fragmented Nodes */}
      {nodes.map((node, idx) => {
        const targetX = converged ? node.x * 0.25 : node.x;
        const targetY = converged ? node.y * 0.25 : node.y;

        return (
          <React.Fragment key={idx}>
            {/* SVG Connecting Line */}
            {converged && (
              <svg 
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}
              >
                <motion.line
                  x1={400 + targetX}
                  y1={200 + targetY}
                  x2={400}
                  y2={200}
                  className="problem-line"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.2 }}
                />
              </svg>
            )}

            <motion.div
              className="problem-node"
              initial={{ x: node.x, y: node.y }}
              animate={{ 
                x: targetX, 
                y: targetY,
                borderColor: converged ? 'var(--accent)' : 'var(--border)',
                opacity: converged ? 0.95 : 0.8,
                scale: converged ? 0.95 : 1
              }}
              transition={{ type: 'spring', stiffness: 20, damping: 12 }}
            >
              <node.icon size={18} className="text-muted" style={{ color: converged ? 'var(--accent)' : '' }} />
              <div className="problem-node-title">{node.title}</div>
              <div className="problem-node-sub">{node.sub}</div>
            </motion.div>
          </React.Fragment>
        );
      })}

      {/* Switch Controls */}
      <div style={{ position: 'absolute', bottom: 16, display: 'flex', gap: 12, zIndex: 30 }}>
        <button 
          className={`btn btn-secondary`} 
          style={{ padding: '6px 12px', fontSize: '12px', opacity: converged ? 0.6 : 1 }}
          onClick={() => setConverged(false)}
        >
          Fragmented Tools
        </button>
        <button 
          className={`btn btn-primary`}
          style={{ padding: '6px 12px', fontSize: '12px', opacity: converged ? 1 : 0.6 }}
          onClick={() => setConverged(true)}
        >
          Connected in SSS
        </button>
      </div>
    </div>
  );
}
