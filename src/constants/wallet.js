export const WALLET_INFO = {
  iban: 'FR76 1234 5678 9012 3456 7890 123',
  bic: 'LINCFRPP',
  beneficiary: 'Lina Capital — Compte ségrégué LEA DUPONT',
  reference: 'LINA-WLT-00482',
  available: 3245.50,
  sequestered: 510.00,
}

export const WALLET_KPIS = [
  { icon: '💰', label: 'Solde disponible', value: '3 245,50 €', accent: true, sub: 'Investissable ou retirable' },
  { icon: '🔒', label: 'Solde séquestré', value: '510,00 €', sub: 'Souscription MedCare AI' },
  { icon: '📊', label: 'Solde total', value: '3 755,50 €', sub: 'Disponible + séquestré' },
  { icon: '🏦', label: 'RIB enregistrés', value: '1', sub: 'Max 3 autorisés' },
]

export const WALLET_HISTORY = [
  { date: '28/03/2026', type: 'Souscription', typeClass: 'subscription', project: 'MedCare AI', amount: '-510,00 €', amountClass: 'debit', balance: '3 245,50 €', status: 'Séquestré', statusClass: 'pending', ref: 'TXN-20260328-001' },
  { date: '25/03/2026', type: 'Crédit CB', typeClass: 'credit', project: '—', amount: '+2 000,00 €', amountClass: 'credit', balance: '3 755,50 €', status: 'Effectué', statusClass: 'done', ref: 'TXN-20260325-001' },
  { date: '20/03/2026', type: 'Crédit virement', typeClass: 'credit', project: '—', amount: '+1 500,00 €', amountClass: 'credit', balance: '1 755,50 €', status: 'Effectué', statusClass: 'done', ref: 'TXN-20260320-001' },
  { date: '15/03/2026', type: 'Retrait', typeClass: 'withdrawal', project: '—', amount: '-500,00 €', amountClass: 'debit', balance: '255,50 €', status: 'Effectué', statusClass: 'done', ref: 'TXN-20260315-001' },
  { date: '10/03/2026', type: 'Déblocage', typeClass: 'release', project: 'GreenFarm Bio', amount: '+755,50 €', amountClass: 'credit', balance: '755,50 €', status: 'Effectué', statusClass: 'done', ref: 'TXN-20260310-001' },
  { date: '01/03/2026', type: 'Crédit virement', typeClass: 'credit', project: '—', amount: '+500,00 €', amountClass: 'credit', balance: '0,00 €', status: 'Effectué', statusClass: 'done', ref: 'TXN-20260301-001' },
]

export const SAVED_RIBS = [
  { id: 1, label: 'Compte principal', bank: 'BNP Paribas', iban: 'FR76 •••• •••• •••• 4821', isDefault: true },
]

export const QUICK_AMOUNTS_CREDIT = [100, 250, 500, 1000, 2500, 5000]
export const QUICK_AMOUNTS_WITHDRAW = [100, 250, 500, 1000]