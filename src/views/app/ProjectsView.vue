<script setup>
import { useRouter } from 'vue-router'
import { PROJECTS, getPercentFunded } from '../../constants/projects'
import BaseCard from '../../components/ui/BaseCard.vue'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import BaseProgress from '../../components/ui/BaseProgress.vue'
import { ref } from 'vue'

const router = useRouter()
const activeFilter = ref('Tous')
const filters = ['Tous', 'Tech', 'Santé', 'Food', 'Énergie']
const badgeLabels = { halal: '☪ Halal', nouveau: 'Nouveau', 'fin-proche': 'Fin proche', finance: 'Financé' }
</script>

<template>
  <div class="px-10 py-7 flex-1">
    <section class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-8 mb-7 relative overflow-hidden">
      <div class="absolute -bottom-8 -right-8 w-44 h-44 bg-white/5 rounded-3xl rotate-[15deg]" />
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold text-white">Projets</h2>
        <span class="inline-flex items-center gap-1.5 bg-accent text-sidebar text-xs font-semibold px-3.5 py-1.5 rounded-full">✓ Conforme Shariah</span>
      </div>
      <div class="grid grid-cols-4 gap-4 relative z-1">
        <div class="bg-white/10 backdrop-blur rounded-xl p-5"><div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">📋</div><div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">En cours</div><div class="text-[28px] font-bold text-white">12</div></div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-5"><div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">💰</div><div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">Levés ce mois</div><div class="text-[28px] font-bold text-accent">4,2 M€</div></div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-5"><div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">👥</div><div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">Investisseurs</div><div class="text-[28px] font-bold text-white">2 847</div></div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-5"><div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">📊</div><div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">Taux défaut</div><div class="text-lg font-bold text-white">N/A</div><div class="text-xs text-white/50 mt-1">Lancement</div></div>
      </div>
      <div class="bg-warning-bg rounded-xl px-5 py-4 flex items-center gap-3.5 mt-4 relative z-1">
        <div class="w-9 h-9 bg-amber-200 rounded-lg flex items-center justify-center text-lg shrink-0">💡</div>
        <p class="text-xs text-primary leading-relaxed"><strong>Halal</strong> — Risque de perte en capital. Performances passées ≠ futures.</p>
      </div>
    </section>
    <div class="flex items-center gap-3 mb-6">
      <div class="flex gap-2 bg-filter-bg p-1.5 rounded-lg">
        <span v-for="f in filters" :key="f" :class="['px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide cursor-pointer', activeFilter === f ? 'bg-white text-success shadow-sm' : 'text-secondary']" @click="activeFilter = f">{{ f }}</span>
      </div>
      <div class="flex-1 relative ml-4"><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary">🔍</span><input class="w-full pl-10 pr-4 py-2.5 border border-card-border rounded-lg text-sm text-primary bg-white font-[var(--font-app)] outline-none" placeholder="Rechercher" /></div>
    </div>
    <div class="grid grid-cols-2 gap-6 mb-7">
      <BaseCard v-for="p in PROJECTS" :key="p.id" hover @click="router.push(`/app/project/${p.id}`)">
        <div class="relative"><img :src="p.image" :alt="p.name" class="w-full h-44 object-cover block" /><div class="absolute top-3 left-3 flex gap-1.5"><BaseBadge v-for="b in p.badges" :key="b" :type="b">{{ badgeLabels[b] }}</BaseBadge></div></div>
        <div class="px-5 py-5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-secondary mb-1.5">{{ p.sector }}</div>
          <div class="text-xl font-bold text-primary mb-1.5">{{ p.name }}</div>
          <div class="text-sm text-secondary leading-relaxed mb-4">{{ p.description }}</div>
          <div class="text-sm font-semibold text-primary mb-2.5">{{ p.raised.toLocaleString('fr') }} € <span class="text-secondary font-normal">/ {{ p.target.toLocaleString('fr') }} €</span></div>
          <BaseProgress :value="getPercentFunded(p)" class="mb-4" />
          <div class="grid grid-cols-3 gap-3">
            <div class="text-center"><div class="text-lg font-bold text-primary">{{ getPercentFunded(p) }}%</div><div class="text-[11px] text-tertiary mt-0.5">Financé</div></div>
            <div class="text-center"><div class="text-lg font-bold text-primary">{{ p.investors }}</div><div class="text-[11px] text-tertiary mt-0.5">Invest.</div></div>
            <div class="text-center"><div class="text-lg font-bold text-primary">{{ p.daysLeft > 0 ? p.daysLeft + 'j' : '—' }}</div><div class="text-[11px] text-tertiary mt-0.5">{{ p.daysLeft > 0 ? 'Restants' : 'Clôturé' }}</div></div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>