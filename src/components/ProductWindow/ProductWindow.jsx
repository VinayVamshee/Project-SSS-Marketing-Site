import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrowserFrame from '../BrowserFrame/BrowserFrame';
import DashboardPreview from '../DashboardPreview/DashboardPreview';
import Student360Preview from '../Student360Preview/Student360Preview';
import QuestionPaperPreview from '../QuestionPaperPreview/QuestionPaperPreview';
import AnalyticsPreview from '../AnalyticsPreview/AnalyticsPreview';
import FinancePreview from '../FinancePreview/FinancePreview';
import AcademicFlow from '../AcademicFlow/AcademicFlow';
import './ProductWindow.css';

export default function ProductWindow() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { label: 'Overview', url: 'sss.operating-system/overview' },
    { label: 'Students', url: 'sss.operating-system/students/360-view' },
    { label: 'Question Papers', url: 'sss.operating-system/academics/question-paper-engine' },
    { label: 'Analytics', url: 'sss.operating-system/analytics/institutional-overview' },
    { label: 'Finance', url: 'sss.operating-system/finance/ledgers' },
    { label: 'Academic Setup', url: 'sss.operating-system/configuration/academic-structures' }
  ];

  const renderActivePreview = () => {
    switch (activeTab) {
      case 'Overview':
        return <DashboardPreview />;
      case 'Students':
        return <Student360Preview />;
      case 'Question Papers':
        return <QuestionPaperPreview />;
      case 'Analytics':
        return <AnalyticsPreview />;
      case 'Finance':
        return <FinancePreview />;
      case 'Academic Setup':
        return <AcademicFlow />;
      default:
        return <DashboardPreview />;
    }
  };

  const getActiveUrl = () => {
    const current = tabs.find(t => t.label === activeTab);
    return current ? current.url : 'sss.operating-system/dashboard';
  };

  return (
    <div className="pw-tour-container">
      {/* Selection Tabs */}
      <div className="pw-tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`pw-tab-btn ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Browser shell containing the selected preview */}
      <div className="pw-view-canvas">
        <BrowserFrame url={getActiveUrl()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {renderActivePreview()}
            </motion.div>
          </AnimatePresence>
        </BrowserFrame>
      </div>
    </div>
  );
}
