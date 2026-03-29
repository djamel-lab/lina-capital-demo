<script setup>
import { PORTFOLIO_KPIS, PARTICIPATIONS } from '../../constants/portfolio'
import BaseCard from '../../components/ui/BaseCard.vue'
</script>

<template>
  <div class="px-10 py-7 flex-1">
    <section class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-8 mb-7 relative overflow-hidden">
      <div class="absolute -bottom-8 -right-8 w-44 h-44 bg-white/5 rounded-3xl rotate-[15deg]" />
      <h2 class="text-lg font-bold text-white mb-5">Portefeuille</h2>
      <div class="grid grid-cols-4 gap-4 relative z-1">
        <div v-for="kpi in PORTFOLIO_KPIS" :key="kpi.label" class="bg-white/10 backdrop-blur rounded-xl p-5">
          <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">{{ kpi.icon }}</div>
          <div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">{{ kpi.label }}</div>
          <div :class="['text-[28px] font-bold', kpi.accent ? 'text-accent' : 'text-white']">{{ kpi.value }}</div>
          <div :class="['text-xs mt-1 font-medium', kpi.subType === 'accent' ? 'text-accent-secondary' : 'text-white/50']">{{ kpi.sub }}</div>
        </div>
      </div>
    </section>
    <h3 class="text-xl font-bold text-primary mb-5">Participations</h3>
    <div class="grid grid-cols-2 gap-6 mb-7">
      <BaseCard v-for="p in PARTICIPATIONS" :key="p.name" hover>
        <div class="relative">
          <img :src="p.image" :alt="p.name" class="w-full h-40 object-cover block" />
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-accent-secondary">☪ Halal</span>
        </div>
        <div class="px-5 py-5">
          <div class="flex justify-between items-start mb-1"><span class="text-xl font-bold text-primary">{{ p.name }}</span><span class="text-lg font-bold text-primary">{{ p.value }}</span></div>
          <div class="flex justify-between items-center mb-4"><span class="text-sm text-secondary">{{ p.sector }}</span><span :class="['text-sm font-medium', p.perfType === 'positive' ? 'text-success' : 'text-danger-alt']">{{ p.perf }}</span></div>
          <div class="h-px bg-card-border mb-4" />
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="text-center"><div class="text-xs text-tertiary mb-1">Actions</div><div class="text-xl font-bold text-primary">{{ p.actions }}</div></div>
            <div class="text-center"><div class="text-xs text-tertiary mb-1">PRU</div><div class="text-xl font-bold text-primary">{{ p.pru }}</div></div>
            <div class="text-center"><div class="text-xs text-tertiary mb-1">Actuel</div><div class="text-xl font-bold text-primary">{{ p.current }}</div></div>
          </div>
          <div class="h-px bg-card-border mb-4" />
          <div class="flex gap-3">
            <button class="flex-1 py-2.5 bg-accent text-sidebar text-sm font-bold rounded-md cursor-pointer border-none font-[var(--font-app)]">Vendre</button>
            <button class="flex-1 py-2.5 bg-card-border text-sidebar text-sm font-medium rounded-md cursor-pointer border-none font-[var(--font-app)]">Actualités</button>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>