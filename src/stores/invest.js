import { defineStore } from 'pinia'

export const useInvestStore = defineStore('invest', {
  state: () => ({
    amount: 500,
    pricePerShare: 12.50,
    feeRate: 0.02,
    showHighAmountAlert: false,
    activeRegModal: null,
    ficiAccepted: true,
    riskAccepted: true,
  }),
  getters: {
    shares: (state) => Math.floor(state.amount / state.pricePerShare),
    fees: (state) => state.amount * state.feeRate,
    total: (state) => state.amount + state.amount * state.feeRate,
    isHighAmount: (state) => state.amount > 1000,
  },
  actions: {
    setAmount(val) { this.amount = val },
    invest() {
      if (this.isHighAmount) {
        this.showHighAmountAlert = true
      } else {
        alert('✅ Investissement confirmé !\nEmail récapitulatif envoyé.\nDélai de réflexion : 4 jours.')
      }
    },
    openRegModal(type) { this.activeRegModal = type },
  },
})