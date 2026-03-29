import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    currentStep: 1,
    totalSteps: 6,
    stepLabels: ['Compte', 'Profil', 'Identité', 'Adéquation', 'Catégorie', 'Signature'],
    profile: {
      email: 'lea.dupont@email.com', civility: 'Mme', firstName: 'Lea', lastName: 'Dupont',
      birthDate: '15/03/1988', nationality: 'Française', address: '24 rue de la Paix, 75002 Paris',
      phone: '+33 6 12 34 56 78', situation: 'Salariée', accountType: 'Personne physique',
    },
    simulatedLoss: 15000,
    category: 'Investisseur non averti',
    testResult: 'Adéquat',
    testAlertShown: false,
    kycUploaded: { id: false, domicile: false },
    consents: { cgu: true, privacy: true, risks: true },
    documentsSignedAll: true,
  }),
  getters: {
    isStepCompleted: (state) => (step) => step < state.currentStep,
    isCurrentStep: (state) => (step) => step === state.currentStep,
  },
  actions: {
    nextStep() { if (this.currentStep < this.totalSteps) this.currentStep++ },
    prevStep() { if (this.currentStep > 1) this.currentStep-- },
    goToStep(step) { if (step >= 1 && step <= this.totalSteps) this.currentStep = step },
    uploadKYC(type) { this.kycUploaded[type] = true },
    triggerTestAlert() { this.testAlertShown = true },
  },
})