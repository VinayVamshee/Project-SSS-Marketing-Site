import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';
import './FinancePreview.css';

export default function FinancePreview({ isTourActive }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  useEffect(() => {
    if (!isTourActive) return;

    const methodsList = ['UPI', 'Card', 'Cash'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % methodsList.length;
      setPaymentMethod(methodsList[index]);
    }, 1100);

    return () => clearInterval(interval);
  }, [isTourActive]);

  const methods = [
    { id: 'Cash', label: 'Cash', icon: Wallet },
    { id: 'Card', label: 'Card', icon: CreditCard },
    { id: 'UPI', label: 'UPI', icon: Smartphone }
  ];

  return (
    <div className="fp-finance-container">
      {/* Col 1: Fee Structure & Ledger */}
      <div className="fp-column">
        <div className="fp-card-header">Fee Ledger Statement</div>
        <div className="fp-ledger-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600 }}>Aarav Sharma</span>
            <span className="text-muted" style={{ fontSize: '12px' }}>Roll: 12 | Class: 10-A</span>
          </div>
          
          <div className="fp-ledger-summary">
            <div className="fp-summary-row">
              <span>Class 10 Tuition Fee</span>
              <span>₹36,000</span>
            </div>
            <div className="fp-summary-row">
              <span>Laboratory Fee</span>
              <span>₹4,000</span>
            </div>
            <div className="fp-summary-row">
              <span>Examination Fee</span>
              <span>₹2,000</span>
            </div>
            <div className="fp-summary-row" style={{ fontWeight: 600 }}>
              <span>Total Assessed Fee</span>
              <span>₹42,000</span>
            </div>
            <div className="fp-summary-row" style={{ color: '#10B981', fontWeight: 600 }}>
              <span>Total Fees Collected</span>
              <span>- ₹30,000</span>
            </div>
            <div className="fp-summary-row total">
              <span>Outstanding Balance</span>
              <span>₹12,000</span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
          Record Payment Gateway Method
        </div>
        <div className="fp-receipt-methods">
          {methods.map((m) => (
            <button
              key={m.id}
              className={`fp-method-badge ${paymentMethod === m.id ? 'active' : ''}`}
              onClick={() => setPaymentMethod(m.id)}
              style={{ cursor: 'pointer', background: 'transparent' }}
            >
              <m.icon size={14} />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Col 2: Receipt Sheets */}
      <div className="fp-column">
        <div className="fp-card-header">Generated Official Receipt</div>
        <div className="fp-receipt-sheet">
          <div className="fp-receipt-header">
            <div className="fp-receipt-title">SCHOOL SCHOLASTIC ERP</div>
            <div style={{ fontSize: '10px', marginTop: 4 }}>OFFICIAL PAYMENT RECEIPT</div>
          </div>
          <div className="fp-receipt-body">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Receipt No:</span>
              <span>#REC-2026-9804</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Date:</span>
              <span>09-Aug-2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Student:</span>
              <span>Aarav Sharma (10-A)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #111', paddingTop: 8, marginTop: 8 }}>
              <span>Amount Paid:</span>
              <span style={{ fontWeight: 700 }}>₹30,000.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Payment Type:</span>
              <span style={{ fontWeight: 700 }}>{paymentMethod.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status:</span>
              <span style={{ color: '#10B981', fontWeight: 700 }}>SUCCESS</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '9px', marginTop: 16, color: '#666' }}>
            Thank you for your payment. System generated ledger receipt copy.
          </div>
        </div>
      </div>
    </div>
  );
}
