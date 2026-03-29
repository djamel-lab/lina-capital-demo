<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { icon: '📊', label: 'Tableau de bord', to: '/app/dashboard' },
  { icon: '🏦', label: 'Financement participatif', to: '/app/projects' },
  { icon: '📄', label: 'Mes documents', to: '/app/documents' },
  { icon: '☪️', label: 'CTO Actions Halal', to: null },
  { icon: '💰', label: 'Investir', to: null },
  { icon: '🕌', label: 'Ma Zakat', to: null },
  { icon: '🏠', label: 'Patrimoine', to: null },
]

function isActive(item) {
  if (!item.to) return false
  if (item.to === '/app/projects') {
    return ['/app/projects', '/app/portfolio', '/app/orders'].some(p => route.path.startsWith(p)) || route.path.includes('/project/')
  }
  return route.path.startsWith(item.to)
}
</script>

<template>
  <aside class="w-[280px] min-h-screen bg-sidebar flex flex-col fixed left-0 top-0 bottom-0 z-10">
    <div class="p-7 pb-8">
      <svg viewBox="0 0 113 38" fill="none" class="w-28 h-9.5">
        <text x="0" y="28" fill="#fff" font-family="Inter" font-weight="800" font-size="26">LINA</text>
        <text x="72" y="28" fill="#2dd4bf" font-family="Inter" font-weight="800" font-size="8">●</text>
      </svg>
    </div>
    <nav class="flex-1 flex flex-col gap-0.5 px-3">
      <a v-for="item in navItems" :key="item.label" href="#"
        :class="['flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 no-underline h-[50px] border-l-3',
          isActive(item) ? 'bg-white/15 border-l-accent-secondary text-white' : 'text-gray-300 border-l-transparent hover:bg-white/8 hover:text-white']"
        @click.prevent="item.to && router.push(item.to)">
        <span class="w-6 h-6 shrink-0" :class="isActive(item) ? 'opacity-100' : 'opacity-70'">{{ item.icon }}</span>
        {{ item.label }}
      </a>
    </nav>
    <div class="m-4 p-4 bg-gradient-to-br from-accent-secondary to-accent-hover rounded-xl text-white text-sm font-semibold text-center cursor-pointer">
      Besoin d'aide ?
      <span class="block text-xs font-normal opacity-85 mt-1">Prenez rendez-vous</span>
    </div>
  </aside>
</template>