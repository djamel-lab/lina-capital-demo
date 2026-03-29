import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/2fa', name: '2fa', component: () => import('../views/TwoFAView.vue') },
  {
    path: '/onboarding',
    component: () => import('../views/onboarding/OnboardingLayout.vue'),
    children: [
      { path: '', redirect: '/onboarding/1' },
      { path: '1', name: 'onb-account', component: () => import('../views/onboarding/StepAccount.vue') },
      { path: '2', name: 'onb-profile', component: () => import('../views/onboarding/StepProfile.vue') },
      { path: '3', name: 'onb-kyc', component: () => import('../views/onboarding/StepKYC.vue') },
      { path: '4', name: 'onb-adequacy', component: () => import('../views/onboarding/StepAdequacy.vue') },
      { path: '5', name: 'onb-category', component: () => import('../views/onboarding/StepCategory.vue') },
      { path: '6', name: 'onb-signature', component: () => import('../views/onboarding/StepSignature.vue') },
    ],
  },
  {
    path: '/app',
    component: () => import('../views/app/AppLayout.vue'),
    children: [
      { path: '', redirect: '/app/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('../views/app/DashboardView.vue') },
      { path: 'projects', name: 'projects', component: () => import('../views/app/ProjectsView.vue') },
      { path: 'project/:id', name: 'project-detail', component: () => import('../views/app/ProjectDetailView.vue') },
      { path: 'portfolio', name: 'portfolio', component: () => import('../views/app/PortfolioView.vue') },
      { path: 'orders', name: 'orders', component: () => import('../views/app/OrderBookView.vue') },
      { path: 'documents', name: 'documents', component: () => import('../views/app/DocumentsView.vue') },
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})