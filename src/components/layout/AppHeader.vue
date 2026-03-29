<script setup>
import { useAuthStore } from '../../stores/auth'
defineProps({ title: { type: String, default: 'Tableau de bord' }, subtitle: { type: String, default: '' } })
const auth = useAuthStore()
</script>

<template>
  <header class="h-[110px] bg-white border-b border-card-border flex items-center justify-between px-10 shrink-0">
    <div>
      <h1 class="text-2xl font-bold text-heading">{{ title }}</h1>
      <p v-if="subtitle" class="text-sm text-secondary mt-1">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2 px-5 py-2.5 border border-card-border rounded-lg bg-white text-sm font-medium text-primary cursor-pointer font-[var(--font-app)]">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h12M4 8h8M6 13h4"/></svg>
        Filtres
      </button>
      <div class="flex items-center gap-2.5">
        <span class="text-sm font-semibold text-primary">{{ auth.user.name }}</span>
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-secondary to-accent-hover flex items-center justify-center text-white text-sm font-bold">{{ auth.user.initials }}</div>
      </div>
    </div>
  </header>
</template>