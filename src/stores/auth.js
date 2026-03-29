import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: { email: 'lea.dupont@email.com', name: 'Lea Dupont', initials: 'LD' },
    isAuthenticated: false,
    is2FAVerified: false,
  }),
  actions: {
    login() { this.isAuthenticated = true },
    verify2FA() { this.is2FAVerified = true },
    logout() { this.isAuthenticated = false; this.is2FAVerified = false },
  },
})