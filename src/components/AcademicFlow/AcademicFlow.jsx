import React, { useState } from 'react';
import { Calendar, Users, BookOpen, Layers } from 'lucide-react';
import './AcademicFlow.css';

export default function AcademicFlow() {
  const [selectedClass, setSelectedClass] = useState('KG-1');
  const [selectedSubject, setSelectedSubject] = useState('English');
  const [selectedChapter, setSelectedChapter] = useState('Chapter 01');

  const classes = ['KG-1', 'Class-6'];
  const subjects = selectedClass === 'KG-1' ? ['English', 'Cognitive'] : ['Mathematics', 'Science'];
  const chapters = {
    English: ['Chapter 01: Alphabets', 'Chapter 02: Phonetics', 'Chapter 03: Words'],
    Cognitive: ['Chapter 01: Shapes', 'Chapter 02: Colors', 'Chapter 03: Logic'],
    Mathematics: ['Chapter 01: Numbers', 'Chapter 02: Addition', 'Chapter 03: Fractions'],
    Science: ['Chapter 01: Plants', 'Chapter 02: Animals', 'Chapter 03: Space']
  };

  return (
    <div className="af-tree-container">
      <div className="af-tree-wrapper">
        {/* Level 1: Academic Year */}
        <div className="af-tree-level">
          <div className="af-tree-node active-orange">
            <Calendar size={14} />
            <span>2025–26 Academic Year</span>
          </div>
        </div>

        <div className="af-tree-line active" />

        {/* Level 2: Classes */}
        <div className="af-tree-level">
          {classes.map((cls) => (
            <div 
              key={cls}
              className={`af-tree-node ${selectedClass === cls ? 'active-blue' : ''}`}
              onClick={() => { setSelectedClass(cls); setSelectedSubject(cls === 'KG-1' ? 'English' : 'Mathematics'); }}
            >
              <Users size={14} />
              <span>{cls}</span>
            </div>
          ))}
        </div>

        <div className="af-tree-line active" />

        {/* Level 3: Subjects */}
        <div className="af-tree-level">
          {subjects.map((sub) => (
            <div 
              key={sub}
              className={`af-tree-node ${selectedSubject === sub ? 'active-orange' : ''}`}
              onClick={() => { setSelectedSubject(sub); setSelectedChapter(chapters[sub][0]); }}
            >
              <BookOpen size={14} />
              <span>{sub}</span>
            </div>
          ))}
        </div>

        <div className="af-tree-line active" />

        {/* Level 4: Chapters */}
        <div className="af-tree-level">
          {chapters[selectedSubject].map((chap) => {
            const chapId = chap.split(':')[0];
            return (
              <div 
                key={chap}
                className={`af-tree-node ${selectedChapter === chap ? 'active-blue' : ''}`}
                onClick={() => setSelectedChapter(chap)}
              >
                <Layers size={14} />
                <span>{chapId}</span>
              </div>
            );
          })}
        </div>

        {/* Chapter Details Panel */}
        <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="af-node-details">
            <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Chapter Details</div>
            <div>Subject: {selectedSubject} | Class: {selectedClass}</div>
            <div style={{ color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>{selectedChapter}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
