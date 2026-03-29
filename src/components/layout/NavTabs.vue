<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tabs = [
  { icon: '📋', title: 'Projets', sub: 'Levées', to: '/app/projects' },
  { icon: '🏢', title: 'Fiche', sub: 'Détail projet', to: '/app/project/medcare-ai' },
  { icon: '💼', title: 'Portefeuille', sub: 'Participations', to: '/app/portfolio' },
  { icon: '📊', title: 'Ordres', sub: 'Achat/Vente', to: '/app/orders' },
]
function isActive(tab) {
  if (tab.to.includes('/project/')) return route.path.includes('/project/')
  return route.path === tab.to
}
</script>

<template>
  <div class="flex gap-3 px-10 py-5 bg-white">
    <div v-for="tab in tabs" :key="tab.to"
      :class="['flex items-center gap-3 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200 flex-1', isActive(tab) ? 'bg-accent' : 'bg-input-bg']"
      @click="router.push(tab.to)">
      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', isActive(tab) ? 'bg-white/25' : 'bg-card-border']">{{ tab.icon }}</div>
      <div>
        <div :class="['text-sm font-bold', isActive(tab) ? 'text-white' : 'text-primary']">{{ tab.title }}</div>
        <div :class="['text-[11px] mt-0.5', isActive(tab) ? 'text-white/80' : 'text-secondary']">{{ tab.sub }}</div>
      </div>
    </div>
  </div>
</template>