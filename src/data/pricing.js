export const PRICING_PLANS = {
  Basic: {
    target: 'Small schools',
    limits: 'Up to 300 students',
    monthly: 1499,
    quarterly: 3999,
    annual: 11999,
    features: [
      'Student Management',
      'Student Registration',
      'Student Profiles',
      'Classes & Sections',
      'Academic Years Mapping',
      'Basic Results Logging',
      'Basic Reports Summary',
      'Basic Performance Dashboard',
      'Basic Fee Ledger Records',
      'Standard School Branding',
      'User Level Access Rules',
      'CSV Data Export Tools'
    ]
  },
  Silver: {
    target: 'Growing schools',
    limits: 'Up to 1,000 students',
    monthly: 2999,
    quarterly: 7999,
    annual: 24999,
    isPopular: true,
    features: [
      'Everything in Basic +',
      'Student 360° Profile',
      'Academic Syllabus Configurator',
      'Curriculum Subjects & Streams',
      'Syllabus Chapters Mapping',
      'Question Bank Repository',
      'Question Paper Engine V2',
      'Exam Paper Templates Registry',
      'Question Paper Instant Preview',
      'Print-ready PDF Generation',
      'Examination Timetables & Schedules',
      'Results Ledger & Processing',
      'Assessment Analytics Dashboard',
      'Student Target Standing charts',
      'Subject Performance comparison',
      'Class Performance metrics',
      'Exam-wise Performance trends',
      'Centralized Fee Structures',
      'Ledger Payments Records',
      'Immediate Receipt Generation',
      'Advanced Custom Reports',
      'Priority Email Support'
    ]
  },
  Gold: {
    target: 'Established / advanced institutions',
    limits: 'Up to 2,500 students',
    monthly: 4999,
    quarterly: 13499,
    annual: 44999,
    features: [
      'Everything in Silver +',
      'Advanced BI Assessment Suite',
      'Metadata-driven Forms Registry',
      'Register Custom Fields & Attributes',
      'Form Schema Templates Preview',
      'Entity Model Configurations',
      'Excel Bulk Import Engines',
      'Advanced Reporting Suite',
      'Custom Multi-tenant resolver rules',
      'Multi-School/Campus Trust settings',
      'White-label Custom Branding',
      'Initial Database Migration help',
      'Dedicated Onboarding account manager',
      'Priority Phone & Screen Support'
    ]
  }
};
