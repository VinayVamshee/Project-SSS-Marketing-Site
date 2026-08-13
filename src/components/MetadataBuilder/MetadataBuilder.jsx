import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ListPlus, ShieldCheck, Database, FileSpreadsheet, Group } from 'lucide-react';
import './MetadataBuilder.css';

export default function MetadataBuilder() {
  const [activeFields, setActiveFields] = useState([
    { id: 'name', label: 'Student Name', type: 'text', placeholder: 'Enter student full name' },
    { id: 'dob', label: 'Date of Birth', type: 'date', placeholder: '' }
  ]);

  const libraryFields = [
    { id: 'route', label: 'Bus Route No', type: 'text', placeholder: 'Route code (e.g. ROUTE-12)' },
    { id: 'house', label: 'Student House', type: 'text', placeholder: 'e.g. Vidyasagar / Tagore' },
    { id: 'aadhar', label: 'Aadhar Card ID', type: 'text', placeholder: '12-digit number' },
    { id: 'blood', label: 'Blood Group', type: 'text', placeholder: 'e.g. O+, AB-' }
  ];

  const addField = (field) => {
    if (activeFields.some(f => f.id === field.id)) return;
    setActiveFields(prev => [...prev, field]);
  };

  const removeField = (id) => {
    if (id === 'name' || id === 'dob') return;
    setActiveFields(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="mb-builder-wrapper">
      {/* Col 1: School categories sidebar */}
      <div className="mb-column" style={{ borderRight: '1px solid var(--border)', paddingRight: '20px' }}>
        <div className="mb-col-title">School Operations</div>
        <div className="mb-dev-menu">
          <div className="mb-dev-item active"><Database size={14} /> Student Profile</div>
          <div className="mb-dev-item"><ListPlus size={14} /> Guardian Details</div>
          <div className="mb-dev-item"><FileSpreadsheet size={14} /> Academic Record</div>
          <div className="mb-dev-item"><ShieldCheck size={14} /> Fee Ledger Details</div>
          <div className="mb-dev-item"><Group size={14} /> Staff Operations</div>
        </div>
      </div>

      {/* Col 2: Field list library & canvas */}
      <div className="mb-column">
        <div className="mb-col-title">Custom Fields Available</div>
        <div className="mb-library-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {libraryFields.map((field) => {
            const isAdded = activeFields.some(f => f.id === field.id);
            return (
              <button
                key={field.id}
                className="mb-library-item"
                onClick={() => addField(field)}
                disabled={isAdded}
                style={{ opacity: isAdded ? 0.4 : 1, cursor: isAdded ? 'default' : 'pointer' }}
              >
                <span>{field.label}</span>
                <Plus size={12} />
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '12px' }}>
          <div className="mb-col-title" style={{ borderBottom: 'none', paddingBottom: '0' }}>Active Fields</div>
          <div className="mb-canvas">
            <AnimatePresence>
              {activeFields.map((field) => (
                <motion.div
                  key={field.id}
                  className="mb-canvas-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <span>{field.label}</span>
                  {field.id !== 'name' && field.id !== 'dob' && (
                    <button className="mb-remove-btn" onClick={() => removeField(field.id)}>
                      <Trash2 size={13} />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Col 3: Live Form preview */}
      <div className="mb-column">
        <div className="mb-col-title">Admissions Form Preview</div>
        <div className="mb-form-preview">
          <div className="mb-form-header">Customized School Form</div>
          {activeFields.map((field) => (
            <div key={field.id} className="mb-form-field">
              <span className="mb-field-label">{field.label}</span>
              <input type={field.type} className="mb-field-input" placeholder={field.placeholder} disabled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
