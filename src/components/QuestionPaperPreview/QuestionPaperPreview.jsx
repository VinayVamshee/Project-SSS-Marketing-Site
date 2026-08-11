import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileText, Download, ToggleLeft, ToggleRight, ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';
import { MOCK_QUESTIONS } from '../../data/questions';
import './QuestionPaperPreview.css';

export default function QuestionPaperPreview() {
  const [selectedClass, setSelectedClass] = useState('Class-6');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedChapter, setSelectedChapter] = useState('Algebra');
  
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(['Q_00042', 'Q_00043']);
  const [addAnswerLines, setAddAnswerLines] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentStep, setCurrentStep] = useState(1); // 1: Questions, 2: Structure, 3: Template, 4: Preview
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileBank, setShowMobileBank] = useState(false);

  const [schoolName, setSchoolName] = useState('Vamshee Techno School');
  const [examTitle, setExamTitle] = useState('First Term Examinations');
  const [duration, setDuration] = useState('2 Hours');
  const [instructions, setInstructions] = useState('Answer all questions in the sections provided.');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleQuestionSelection = (id) => {
    setSelectedQuestionIds(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const toggleLines = (id) => {
    setAddAnswerLines(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = MOCK_QUESTIONS.filter(q => {
    const matchesChapter = q.chapter === selectedChapter || selectedChapter === 'All';
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const selectedQuestions = MOCK_QUESTIONS.filter(q => selectedQuestionIds.includes(q.id));
  const totalMarks = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);

  const steps = [
    { num: 1, label: 'Questions' },
    { num: 2, label: 'Structure' },
    { num: 3, label: 'Template' },
    { num: 4, label: 'Preview' }
  ];

  return (
    <div className="qp-builder-container">
      {/* Step Indicators Header */}
      <div className="qp-steps-indicator-bar">
        {steps.map(s => (
          <div 
            key={s.num} 
            className={`qp-step-indicator-node ${currentStep === s.num ? 'active-orange' : ''}`}
            onClick={() => { if (s.num < currentStep || selectedQuestionIds.length > 0) setCurrentStep(s.num); }}
          >
            <span>0{s.num}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {isMobile && currentStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
            onClick={() => setShowMobileBank(true)}
          >
            <Plus size={16} /> Add Questions ({selectedQuestionIds.length} Selected)
          </button>

          {/* Mobile bottom sheet modal */}
          <AnimatePresence>
            {showMobileBank && (
              <motion.div 
                className="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileBank(false)}
                style={{ zIndex: 400 }}
              >
                <motion.div 
                  className="mobile-bottom-sheet"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mobile-sheet-header">
                    <h4>Question Bank</h4>
                    <button className="lightbox-close" onClick={() => setShowMobileBank(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input 
                      type="text" 
                      placeholder="Search question database..." 
                      className="qp-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="qp-bank-list" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                      {filteredQuestions.map((q) => {
                        const isSelected = selectedQuestionIds.includes(q.id);
                        return (
                          <div 
                            key={q.id}
                            className={`qp-bank-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleQuestionSelection(q.id)}
                          >
                            <div className="qp-item-meta">
                              <span>{q.id}</span>
                              <span>{q.marks} Marks</span>
                            </div>
                            <div style={{ fontSize: '13px', marginTop: 4 }}>{q.text}</div>
                          </div>
                        );
                      })}
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowMobileBank(false)}>
                      Save Selections
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            className="btn btn-primary" 
            disabled={selectedQuestionIds.length === 0}
            onClick={() => setCurrentStep(2)}
            style={{ width: '100%' }}
          >
            Next Step <ArrowRight size={14} />
          </button>
        </div>
      )}

      {(!isMobile || currentStep > 1) && (
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              className="qp-column qp-config-panel"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ gridColumn: '1 / -1', width: '100%', borderRight: 'none', paddingRight: 0 }}
            >
              <div className="qp-step-title">
                <Settings size={16} />
                <span>Select Curriculum & Questions</span>
              </div>

              <div className="qp-setup-row">
                <select className="qp-select-box" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  <option value="Class-6">Class-6</option>
                </select>
                <select className="qp-select-box" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                </select>
                <select className="qp-select-box" value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}>
                  <option value="Algebra">Algebra</option>
                  <option value="Geometry">Geometry</option>
                  <option value="Number System">Number System</option>
                  <option value="All">All Chapters</option>
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Search question database..." 
                className="qp-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="qp-bank-list" style={{ maxHeight: '220px' }}>
                {filteredQuestions.map((q) => {
                  const isSelected = selectedQuestionIds.includes(q.id);
                  return (
                    <div 
                      key={q.id}
                      className={`qp-bank-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleQuestionSelection(q.id)}
                    >
                      <div className="qp-item-meta">
                        <span className="qp-id-badge">{q.id}</span>
                        <span>{q.type} | {q.marks} Marks</span>
                      </div>
                      <div className="qp-item-text">{q.text}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Selected: {selectedQuestionIds.length} Questions</span>
                <button 
                  className="btn btn-primary" 
                  disabled={selectedQuestionIds.length === 0}
                  onClick={() => setCurrentStep(2)}
                >
                  Next Step <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              className="qp-column"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ gridColumn: '1 / -1', width: '100%' }}
            >
              <div className="qp-step-title">
                <Settings size={16} />
                <span>Configure Paper Structure</span>
              </div>

              <div className="qp-bank-list" style={{ maxHeight: '260px' }}>
                {selectedQuestions.map((q) => (
                  <div key={q.id} className="qp-bank-item" style={{ cursor: 'default' }}>
                    <div className="qp-item-meta">
                      <span className="qp-id-badge">{q.id}</span>
                      <span>{q.marks} Marks</span>
                    </div>
                    <div className="qp-item-text">{q.text}</div>
                    <div className="qp-lines-toggle" onClick={() => toggleLines(q.id)}>
                      <span>Add Answer Lines</span>
                      {addAnswerLines[q.id] ? (
                        <ToggleRight size={18} style={{ color: 'var(--accent)' }} />
                      ) : (
                        <ToggleLeft size={18} style={{ color: 'var(--text-muted)' }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCurrentStep(3)}>
                  Next Step <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              className="qp-column"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ gridColumn: '1 / -1', width: '100%' }}
            >
              <div className="qp-step-title">
                <Settings size={16} />
                <span>Configure Heading Template</span>
              </div>

              <div className="qp-form-group">
                <label className="qp-form-label">School Name</label>
                <input type="text" className="qp-form-input" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              </div>

              <div className="qp-form-group">
                <label className="qp-form-label">Exam Title</label>
                <input type="text" className="qp-form-input" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} />
              </div>

              <div className="qp-form-group">
                <label className="qp-form-label">Duration</label>
                <input type="text" className="qp-form-input" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>

              <div className="qp-form-group">
                <label className="qp-form-label">Instructions</label>
                <textarea className="qp-form-input" rows={2} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCurrentStep(4)}>
                  Preview Paper <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div 
              key="step4"
              className="qp-column"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ gridColumn: '1 / -1', width: '100%' }}
            >
              <div className="qp-step-title">
                <FileText size={16} />
                <span>A4 Live Preview</span>
              </div>

              <div className="qp-document-canvas">
                <div className="qp-doc-header">
                  <div className="qp-doc-title">{schoolName.toUpperCase()}</div>
                  <div className="qp-doc-subtitle">{examTitle.toUpperCase()}</div>
                  <div className="qp-doc-meta">
                    <span>Grade: {selectedClass}</span>
                    <span>Subject: {selectedSubject}</span>
                    <span>Duration: {duration}</span>
                    <span>Max Marks: {totalMarks}</span>
                  </div>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 600, borderBottom: '1px solid #111', paddingBottom: 6, marginBottom: 12 }}>
                  Instructions: {instructions}
                </div>

                <div className="qp-doc-questions-list">
                  {selectedQuestions.map((q, idx) => (
                    <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div className="qp-doc-q-item">
                        <span>Q{idx + 1}.</span>
                        <span>{q.text}</span>
                        <span className="qp-doc-q-marks">[{q.marks}]</span>
                      </div>
                      {addAnswerLines[q.id] && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 24, margin: '6px 0' }}>
                          <div style={{ borderBottom: '1px dotted #888', height: 12 }} />
                          <div style={{ borderBottom: '1px dotted #888', height: 12 }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ marginLeft: 'auto' }}
                  onClick={() => alert('PDF generation is simulated. The template compilation engine generates printing bundles.')}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
