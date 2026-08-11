import React from 'react';
import './BrowserFrame.css';

export default function BrowserFrame({ children, url = 'sss.operating-system/dashboard' }) {
  return (
    <div className="browser-frame">
      <div className="browser-header">
        <div className="browser-dots">
          <div className="browser-dot red" />
          <div className="browser-dot yellow" />
          <div className="browser-dot green" />
        </div>
        <div className="browser-address-bar">{url}</div>
      </div>
      <div className="browser-content">
        {children}
      </div>
    </div>
  );
}
