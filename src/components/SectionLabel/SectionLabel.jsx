import React from 'react';
import './SectionLabel.css';

export default function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}
