import React, { useState } from 'react';
import { 
  Users, BookOpen, Clock, GraduationCap, 
  FileText, CheckSquare, IndianRupee, Settings 
} from 'lucide-react';
import './PlatformVisual.css';

export default function PlatformVisual() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const modules = [
    { id: 1, label: 'Student Lifecycle', icon: Users, class: 'node-1', x: 200, y: 100 },
    { id: 2, label: 'Academics Engine', icon: BookOpen, class: 'node-2', x: 500, y: 100 },
    { id: 3, label: 'Attendance Tracking', icon: Clock, class: 'node-3', x: 800, y: 100 },
    { id: 4, label: 'Question Paper Gen', icon: FileText, class: 'node-4', x: 200, y: 240 },
    { id: 5, label: 'Finance & Fees', icon: IndianRupee, class: 'node-5', x: 800, y: 240 },
    { id: 6, label: 'Examinations', icon: GraduationCap, class: 'node-6', x: 200, y: 380 },
    { id: 7, label: 'Results & Reports', icon: CheckSquare, class: 'node-7', x: 500, y: 380 },
    { id: 8, label: 'Global Configurations', icon: Settings, class: 'node-8', x: 800, y: 380 }
  ];

  return (
    <div className="platform-visual-wrapper">
      <div className="dots-bg" />
      
      {/* SVG Connecting Paths */}
      <svg className="svg-overlay" viewBox="0 0 1000 480" width="100%" height="100%">
        {modules.map((mod) => (
          <path
            key={mod.id}
            d={`M 500 240 L ${mod.x} ${mod.y}`}
            className={`connection-path ${hoveredNode === mod.id ? 'active' : ''}`}
            style={{
              stroke: hoveredNode === mod.id ? 'var(--accent)' : 'var(--border)'
            }}
          />
        ))}
      </svg>

      {/* Grid container to lay out components */}
      <div className="platform-grid">
        <div 
          className="platform-center-node"
          onMouseEnter={() => setHoveredNode('all')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          SSS Core
        </div>

        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`platform-card-node ${mod.class}`}
            onMouseEnter={() => setHoveredNode(mod.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <mod.icon 
              size={16} 
              style={{ 
                color: hoveredNode === mod.id || hoveredNode === 'all' ? 'var(--accent)' : 'var(--text-muted)' 
              }} 
            />
            <span>{mod.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
