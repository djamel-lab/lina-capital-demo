export const BUY_ORDERS = [
  { name: 'MedCare AI', icon: '🏥', iconClass: 'medical', price: '14,80 €', qty: 25 },
  { name: 'GreenFarm Bio', icon: '🌱', iconClass: 'plant', price: '24,50 €', qty: 40 },
  { name: 'SolarHome', icon: '☀️', iconClass: 'plant', price: '25,00 €', qty: 15 },
]

export const SELL_ORDERS = [
  { name: 'MedCare AI', icon: '🏥', iconClass: 'medical', price: '15,20 €', qty: 30 },
  { name: 'GreenFarm Bio', icon: '🌱', iconClass: 'plant', price: '25,00 €', qty: 20 },
  { name: 'SolarHome', icon: '☀️', iconClass: 'plant', price: '26,50 €', qty: 10 },
]

export const ORDER_HISTORY = [
  { name: 'MedCare AI', ref: '#ORD-0156', type: 'Vente', typeClass: 'sell', price: '15,50 €', qty: '20', status: 'En cours', statusClass: 'active', date: '—', cancellable: true },
  { name: 'GreenFarm', ref: '#ORD-0142', type: 'Achat', typeClass: 'buy', price: '24,00 €', qty: '10', status: 'Attente', statusClass: 'pending', date: '—', cancellable: true },
  { name: 'SolarHome', ref: '#ORD-0098', type: 'Achat', typeClass: 'buy', price: '22,00 €', qty: '25', status: 'Exécuté', statusClass: 'executed', date: '15 jan.', cancellable: false },
]

export const ORDER_KPIS = [
  { icon: '✅', label: 'Actifs', value: '156' },
  { icon: '💸', label: 'Volume 7j', value: '89 450 €', accent: true },
  { icon: '🏢', label: 'Entreprises', value: '24' },
  { icon: '⚡', label: 'Exécution', value: '< 48h' },
]