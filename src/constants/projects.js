export const PROJECTS = [
  {
    id: 'medcare-ai', name: 'MedCare AI', sector: 'HEALTHCARE', sectorLabel: 'HealthTech',
    description: 'IA diagnostic médical assisté.',
    fullDescription: 'MedCare AI développe une solution d\'intelligence artificielle pour le diagnostic médical assisté. En partenariat avec 15 hôpitaux en France, l\'algorithme analyse l\'imagerie médicale pour détecter précocement les pathologies. Objectif : expansion européenne avec certifications CE et FDA.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=300&fit=crop',
    imageLarge: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    raised: 487000, target: 600000, investors: 234, daysLeft: 18,
    badges: ['halal', 'nouveau'], pricePerShare: 12.50, minimum: 100,
    location: 'Paris, France', founded: '2021',
    kpis: [
      { value: '2,4 M€', label: 'CA 2024' },
      { value: '+180%', label: 'Croissance' },
      { value: '15', label: 'Hôpitaux' },
    ],
    scoring: [
      { label: 'Solidité financière', score: 4 },
      { label: 'Potentiel marché', score: 5 },
      { label: 'Équipe', score: 4 },
      { label: 'Utilisation fonds', score: 4 },
      { label: 'Conformité', score: 5 },
    ],
    risks: [
      'Perte totale du capital', 'Obtention CE/FDA non garantie',
      'Concurrence IA médicale', 'Titres non liquides',
      'Dépendance partenariats hospitaliers',
    ],
    funds: [
      { label: 'R&D', pct: 40, desc: 'Algorithmes de diagnostic' },
      { label: 'Commercial', pct: 35, desc: 'Recrutement et partenariats' },
      { label: 'Conformité', pct: 15, desc: 'Certifications CE et FDA' },
      { label: 'Marketing', pct: 10, desc: 'Notoriété et acquisition' },
    ],
    team: [
      { initials: 'YA', name: 'Dr. Y. Amrani', role: 'CEO' },
      { initials: 'SB', name: 'S. Benali', role: 'CTO' },
      { initials: 'KD', name: 'K. Dupont', role: 'CFO' },
    ],
    documents: [
      { name: 'FICI (KIIS) — Obligatoire Art. 23', size: 'PDF • 6 pages', isFICI: true },
      { name: 'Business Plan 2024-2027', size: 'PDF • 2.4 MB' },
      { name: 'Prévisionnel financier', size: 'PDF • 1.8 MB' },
      { name: 'Certificat Shariah', size: 'PDF • 420 Ko' },
    ],
  },
  {
    id: 'greenfarm-bio', name: 'GreenFarm Bio', sector: 'AGRITECH', sectorLabel: 'AgriTech',
    description: 'Agriculture bio IoT.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=300&fit=crop',
    raised: 342500, target: 350000, investors: 189, daysLeft: 3,
    badges: ['halal', 'fin-proche'], pricePerShare: 25.00, minimum: 100,
  },
  {
    id: 'learnup', name: 'LearnUp Academy', sector: 'EDTECH', sectorLabel: 'EdTech',
    description: 'Formation pro continue.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop',
    raised: 250000, target: 250000, investors: 234, daysLeft: 0,
    badges: ['halal', 'finance'], pricePerShare: 20.00, minimum: 100,
  },
  {
    id: 'halalbox', name: 'HalalBox', sector: 'FOODTECH', sectorLabel: 'FoodTech',
    description: 'Box halal premium.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop',
    raised: 89000, target: 300000, investors: 67, daysLeft: 42,
    badges: ['halal', 'nouveau'], pricePerShare: 15.00, minimum: 100,
  },
]

export function getProject(id) { return PROJECTS.find(p => p.id === id) }
export function getPercentFunded(p) { return Math.round((p.raised / p.target) * 100) }