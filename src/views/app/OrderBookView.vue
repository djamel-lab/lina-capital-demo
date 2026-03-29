<script setup>
import { BUY_ORDERS, SELL_ORDERS, ORDER_HISTORY, ORDER_KPIS } from '../../constants/orders'
</script>

<template>
  <div class="px-10 py-7 flex-1">
    <section class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-8 mb-7 relative overflow-hidden">
      <div class="absolute -bottom-8 -right-8 w-44 h-44 bg-white/5 rounded-3xl rotate-[15deg]" />
      <h2 class="text-lg font-bold text-white mb-5">Ordres</h2>
      <div class="grid grid-cols-4 gap-4 relative z-1">
        <div v-for="kpi in ORDER_KPIS" :key="kpi.label" class="bg-white/10 backdrop-blur rounded-xl p-5">
          <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-lg">{{ kpi.icon }}</div>
          <div class="text-[11px] uppercase tracking-wide text-white/70 mb-1.5">{{ kpi.label }}</div>
          <div :class="['text-[28px] font-bold', kpi.accent ? 'text-accent' : 'text-white']">{{ kpi.value }}</div>
        </div>
      </div>
    </section>
    <div class="bg-sky-50 border border-sky-300 rounded-lg px-4.5 py-3.5 text-xs text-sky-700 leading-relaxed mb-6">
      ℹ️ <strong>Tableau d'affichage :</strong> espace de publication d'intérêt achat/vente. <strong>Ne constitue pas</strong> un MTF. Pas d'exécution automatique.
    </div>
    <h3 class="text-xl font-bold text-primary mb-5">Carnet</h3>
    <div class="grid grid-cols-2 gap-5 mb-8">
      <div class="bg-white border border-card-border rounded-2xl overflow-hidden">
        <div class="px-5 py-4 bg-emerald-100 text-emerald-800 text-lg font-bold">Achat</div>
        <table class="w-full border-collapse">
          <thead><tr><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Entreprise</th><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Prix</th><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Qte</th><th class="text-right px-5 py-3 border-b border-card-border"></th></tr></thead>
          <tbody>
            <tr v-for="o in BUY_ORDERS" :key="o.name" class="border-b border-gray-50 last:border-0">
              <td class="px-5 py-3.5 text-sm"><div class="flex items-center gap-2.5"><div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-sm', o.iconClass === 'medical' ? 'bg-cyan-100' : 'bg-emerald-100']">{{ o.icon }}</div><span class="font-semibold">{{ o.name }}</span></div></td>
              <td class="px-5 py-3.5 text-sm font-semibold">{{ o.price }}</td>
              <td class="px-5 py-3.5 text-sm">{{ o.qty }}</td>
              <td class="px-5 py-3.5 text-right"><button class="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-red-100 text-danger border-none cursor-pointer font-[var(--font-app)]">Vendre</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-white border border-card-border rounded-2xl overflow-hidden">
        <div class="px-5 py-4 bg-red-100 text-red-800 text-lg font-bold">Vente</div>
        <table class="w-full border-collapse">
          <thead><tr><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Entreprise</th><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Prix</th><th class="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Qte</th><th class="text-right px-5 py-3 border-b border-card-border"></th></tr></thead>
          <tbody>
            <tr v-for="o in SELL_ORDERS" :key="o.name" class="border-b border-gray-50 last:border-0">
              <td class="px-5 py-3.5 text-sm"><div class="flex items-center gap-2.5"><div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-sm', o.iconClass === 'medical' ? 'bg-cyan-100' : 'bg-emerald-100']">{{ o.icon }}</div><span class="font-semibold">{{ o.name }}</span></div></td>
              <td class="px-5 py-3.5 text-sm font-semibold">{{ o.price }}</td>
              <td class="px-5 py-3.5 text-sm">{{ o.qty }}</td>
              <td class="px-5 py-3.5 text-right"><button class="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-emerald-100 text-teal-700 border-none cursor-pointer font-[var(--font-app)]">Acheter</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 class="text-xl font-bold text-primary mb-5">Historique</h3>
    <div class="bg-white border border-card-border rounded-2xl overflow-hidden mb-7">
      <div class="px-5 py-4 bg-gradient-to-r from-emerald-50 to-page-bg border-b border-card-border"><h3 class="text-sm font-bold text-primary">Ordres</h3></div>
      <table class="w-full border-collapse">
        <thead><tr>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Entreprise</th>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Type</th>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Prix</th>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Qté</th>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Statut</th>
          <th class="text-left px-4.5 py-3 text-[11px] font-bold uppercase tracking-wide text-tertiary border-b border-card-border">Date</th>
          <th class="px-4.5 py-3 border-b border-card-border"></th>
        </tr></thead>
        <tbody>
          <tr v-for="o in ORDER_HISTORY" :key="o.ref" class="border-b border-gray-50 last:border-0">
            <td class="px-4.5 py-3.5 text-sm"><span class="font-semibold">{{ o.name }}</span><span class="block text-xs text-tertiary mt-0.5">{{ o.ref }}</span></td>
            <td class="px-4.5 py-3.5 text-sm"><span :class="['font-semibold', o.typeClass === 'sell' ? 'text-danger' : 'text-teal-700']">{{ o.type }}</span></td>
            <td class="px-4.5 py-3.5 text-sm font-semibold">{{ o.price }}</td>
            <td class="px-4.5 py-3.5 text-sm">{{ o.qty }}</td>
            <td class="px-4.5 py-3.5 text-sm">
              <span :class="['inline-flex px-3 py-1 rounded-full text-xs font-semibold', o.statusClass === 'active' ? 'bg-emerald-100 text-success' : o.statusClass === 'pending' ? 'bg-amber-100 text-amber-500' : 'bg-purple-100 text-purple-700']">{{ o.status }}</span>
            </td>
            <td class="px-4.5 py-3.5 text-sm text-tertiary">{{ o.date }}</td>
            <td class="px-4.5 py-3.5 text-right">
              <button v-if="o.cancellable" class="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-red-100 text-danger border-none cursor-pointer font-[var(--font-app)]">Annuler</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>