// Sample data for the demo dashboard. Edit this file to change what the dashboard shows.
// Dates are [year, month, day]. "cat" must match one of the category ids below.
window.DASHBOARD_DATA = {
  demoDate: [2026, 11, 15],
  categories: [
    { id: 'permits', label: 'Licenses & Permits' },
    { id: 'staff', label: 'Staff Certifications' },
    { id: 'insurance', label: 'Insurance & Vendors' },
    { id: 'inspections', label: 'Inspections & Tasks' }
  ],
  items: [
    { id: 'p1', cat: 'permits', name: 'Food Service Permit', detail: 'County Health Dept.', owner: 'Owner / GM', date: [2027, 3, 31] },
    { id: 'p2', cat: 'permits', name: 'Business License', detail: 'City Clerk', owner: 'Owner / GM', date: [2026, 12, 31] },
    { id: 'p3', cat: 'permits', name: 'Liquor License', detail: 'State Alcohol Board', owner: 'Owner / GM', date: [2026, 12, 8] },
    { id: 'p4', cat: 'permits', name: 'Fire Safety Permit', detail: 'Fire Marshal', owner: 'General Manager', date: [2027, 6, 30] },
    { id: 'p5', cat: 'permits', name: 'Outdoor Seating Permit', detail: 'City Planning Dept.', owner: 'Owner / GM', date: [2026, 11, 1] },

    { id: 's1', cat: 'staff', name: 'Jordan Smith', detail: 'Food Handler Card · Line Cook', owner: 'Kitchen Manager', date: [2026, 12, 10] },
    { id: 's2', cat: 'staff', name: 'Maria Lopez', detail: 'Food Manager Certification · Kitchen Manager', owner: 'Owner / GM', date: [2028, 2, 15] },
    { id: 's3', cat: 'staff', name: 'Devon Carter', detail: 'Alcohol Server Training · Bartender', owner: 'General Manager', date: [2026, 11, 9] },
    { id: 's4', cat: 'staff', name: 'Priya Shah', detail: 'Food Handler Card · Prep Cook', owner: 'Kitchen Manager', date: [2027, 1, 20] },
    { id: 's5', cat: 'staff', name: 'Tom Nguyen', detail: 'Food Handler Card · Server', owner: 'General Manager', date: [2026, 12, 28] },

    { id: 'i1', cat: 'insurance', name: 'General Liability', detail: 'Northwind Insurance · Policy renewal', owner: 'Owner / GM', date: [2027, 1, 5] },
    { id: 'i2', cat: 'insurance', name: "Workers' Compensation", detail: 'Northwind Insurance · Policy renewal', owner: 'Owner / GM', date: [2027, 8, 1] },
    { id: 'i3', cat: 'insurance', name: 'Liquor Liability', detail: 'Northwind Insurance · Policy renewal', owner: 'Owner / GM', date: [2026, 12, 1] },
    { id: 'i4', cat: 'insurance', name: 'Hood Cleaning Vendor Insurance', detail: 'Clean Sweep Hood Service · Certificate of insurance', owner: 'General Manager', date: [2026, 11, 20] },

    { id: 'n1', cat: 'inspections', name: 'Hood & Grease Trap Cleaning', detail: 'Every 90 days · last done Aug 20', owner: 'Kitchen Manager', date: [2026, 11, 18] },
    { id: 'n2', cat: 'inspections', name: 'Fire Extinguisher Inspection', detail: 'Every 12 months · last done Jun 1', owner: 'General Manager', date: [2027, 6, 1] },
    { id: 'n3', cat: 'inspections', name: 'Pest Control Service', detail: 'Monthly · last done Oct 28', owner: 'General Manager', date: [2026, 11, 27] },
    { id: 'n4', cat: 'inspections', name: 'Routine Health Inspection', detail: 'Annual · date set by county', owner: 'Owner / GM', date: [2027, 2, 10] }
  ]
};
