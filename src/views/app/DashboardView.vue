<script setup>
import { PORTFOLIO_KPIS, ALLOCATION, PLATFORM_STATS } from '../../constants/portfolio'
</script>

<template>
  <div class="px-10 py-7 flex-1">
    <section class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-8 mb-7 relative overflow-hidden">
      <div class="absolute -bottom-8 -right-8 w-44 h-44 bg-white/5 rounded-3xl rotate-[15deg]" />
      <h2 class="text-lg font-bold text-white mb-5">Vue d'ensemble</h2>
      <div class="grid grid-cols-4 gap-4 relative z-1">
        <div v-for="kpi in PORTFOLIO_KPIS" :key="kpi.label" class="bg-white/10 backdrop-blur rounded-xl p-5">
          <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">{{ kpi.icon }}</div>
          <div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">{{ kpi.label }}</div>
          <div :class="['text-[28px] font-bold', kpi.accent ? 'text-accent' : 'text-white']">{{ kpi.value }}</div>
          <div :class="['text-xs mt-1 font-medium', kpi.subType === 'accent' ? 'text-accent-secondary' : 'text-white/50']">{{ kpi.sub }}</div>
        </div>
      </div>
    </section>
    <div class="grid grid-cols-[2fr_1fr] gap-6 mb-7">
      <div class="bg-white border border-card-border rounded-2xl p-6">
        <h3 class="text-base font-bold text-primary mb-4">Répartition sectorielle</h3>
        <div class="h-6 rounded-lg overflow-hidden flex mb-5">
          <div v-for="a in ALLOCATION" :key="a.label" :style="{ width: a.pct + '%', background: a.color }" class="h-full" />
        </div>
        <div v-for="a in ALLOCATION" :key="a.label" class="flex items-center gap-3 mb-3">
          <div class="w-3 h-3 rounded shrink-0" :style="{ background: a.color }" />
          <span class="flex-1 text-xs text-secondary">{{ a.label }}</span>
          <span class="text-sm font-semibold text-primary">{{ a.pct }}%</span>
        </div>
      </div>
      <div class="bg-white border border-card-border rounded-2xl p-6">
        <h3 class="text-base font-bold text-primary mb-4">Indicateurs plateforme</h3>
        <div v-for="s in PLATFORM_STATS" :key="s.label" class="flex items-center gap-3 mb-3">
          <span class="flex-1 text-xs text-secondary">{{ s.label }}</span>
          <span class="text-sm font-semibold text-primary">{{ s.value }}</span>
        </div>
        <p class="text-[11px] text-tertiary mt-3 leading-relaxed">Performances passées ≠ futures. Rendements bruts.</p>
      </div>
    </div>
    <div class="bg-warning-bg rounded-xl px-5 py-4 flex items-center gap-3.5 mb-6">
      <div class="w-9 h-9 bg-amber-200 rounded-lg flex items-center justify-center text-lg shrink-0">💡</div>
      <p class="text-xs text-primary leading-relaxed"><strong>Rappel :</strong> risque de perte totale. Pas de fonds de garantie. Chaque investissement equity validé individuellement — pas d'investissement automatique.</p>
    </div>
  </div>
</template>