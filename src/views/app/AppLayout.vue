<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '../../components/layout/AppSidebar.vue'
import AppHeader from '../../components/layout/AppHeader.vue'
import AppFooter from '../../components/layout/AppFooter.vue'
import NavTabs from '../../components/layout/NavTabs.vue'

const route = useRoute()
const pageInfo = computed(() => {
  const map = {
    dashboard: { title: 'Tableau de bord', subtitle: 'Vue d\'ensemble' },
    projects: { title: 'Financement Participatif', subtitle: 'Projets conformes Shariah' },
    'project-detail': { title: 'Financement Participatif', subtitle: 'Détail et souscription' },
    portfolio: { title: 'Financement Participatif', subtitle: 'Suivi participations' },
    orders: { title: 'Financement Participatif', subtitle: 'Achat / Vente' },
    documents: { title: 'Mes documents', subtitle: 'Coffre-fort numérique' },
  }
  return map[route.name] || { title: 'Lina Capital', subtitle: '' }
})
const showNavTabs = computed(() => ['projects', 'project-detail', 'portfolio', 'orders'].includes(route.name))
</script>

<template>
  <div class="flex min-h-screen font-[var(--font-app)]">
    <AppSidebar />
    <div class="ml-[280px] flex-1 min-h-screen flex flex-col">
      <AppHeader :title="pageInfo.title" :subtitle="pageInfo.subtitle" />
      <NavTabs v-if="showNavTabs" />
      <router-view />
      <AppFooter />
    </div>
  </div>
</template>