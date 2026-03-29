<script setup>
import { useInvestStore } from '../../stores/invest'
import { useInvestCalc } from '../../composables/useInvestCalc'
import BaseProgress from '../ui/BaseProgress.vue'

const store = useInvestStore()
const { shares, fees, total, isHighAmount, formatEur } = useInvestCalc()
const quickAmounts = [100, 250, 500, 1000]
function onAmountInput(e) { store.setAmount(parseFloat(e.target.value) || 0) }
</script>

<template>
  <div class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-7 text-white">
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
        <div class="text-[11px] uppercase tracking-wide text-white/60 mb-1">Prix action</div>
        <div class="text-2xl font-bold">12,50 €</div>
      </div>
      <div class="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
        <div class="text-[11px] uppercase tracking-wide text-white/60 mb-1">Minimum</div>
        <div class="text-2xl font-bold">100 €</div>
      </div>
    </div>
    <div class="mb-5">
      <div class="flex justify-between mb-2.5">
        <span class="text-lg font-bold">487 000 €</span>
        <span class="text-sm text-white/60">/ 600 000 €</span>
      </div>
      <BaseProgress :value="81" />
      <div class="grid grid-cols-3 gap-2 mt-3.5">
        <div class="text-center"><div class="text-lg font-bold">81%</div><div class="text-[10px] text-white/50 uppercase">Financé</div></div>
        <div class="text-center"><div class="text-lg font-bold">234</div><div class="text-[10px] text-white/50 uppercase">Invest.</div></div>
        <div class="text-center"><div class="text-lg font-bold">18j</div><div class="text-[10px] text-white/50 uppercase">Restants</div></div>
      </div>
    </div>
    <div class="bg-white rounded-xl p-6 text-primary mb-4">
      <div class="text-base font-bold mb-4">Mon investissement</div>
      <div class="flex rounded-lg overflow-hidden mb-3.5 border border-card-border">
        <input type="number" :value="store.amount" class="flex-1 px-4 py-3.5 border-none text-xl font-bold bg-input-bg font-[var(--font-app)] text-primary outline-none" @input="onAmountInput" />
        <div class="px-5 py-3.5 bg-sidebar text-white text-sm font-semibold flex items-center">EUR</div>
      </div>
      <div class="grid grid-cols-4 gap-2 mb-4">
        <button v-for="amt in quickAmounts" :key="amt"
          :class="['py-2 border rounded text-xs font-semibold cursor-pointer text-center font-[var(--font-app)] bg-white', store.amount === amt ? 'border-accent text-accent' : 'border-tertiary text-primary']"
          @click="store.setAmount(amt)">{{ amt.toLocaleString('fr') }} €</button>
      </div>
      <div v-if="isHighAmount" class="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-danger-alt leading-relaxed mb-3">
        ⚠️ <strong>Montant significatif (Art. 21.7)</strong> — Dépasse 1 000 € ou 5% patrimoine.
      </div>
      <div class="flex justify-between py-2 text-sm"><span class="text-secondary">Prix/action</span><span class="font-semibold">12,50 €</span></div>
      <div class="flex justify-between py-2 text-sm"><span class="text-secondary">Actions</span><span class="font-semibold">{{ shares }}</span></div>
      <div class="flex justify-between py-2 text-sm"><span class="text-secondary">Frais (2%)</span><span class="font-semibold">{{ formatEur(fees) }}</span></div>
      <div class="h-px bg-card-border my-2" />
      <div class="flex justify-between py-2 text-base font-bold"><span>TOTAL</span><span>{{ formatEur(total) }}</span></div>
      <div class="mt-3.5">
        <label class="flex items-start gap-2.5 text-xs text-secondary leading-relaxed cursor-pointer p-2.5 bg-filter-bg rounded-lg mb-2">
          <input type="checkbox" checked class="accent-accent mt-0.5 shrink-0" /> J'ai lu la <strong>FICI</strong> de ce projet.
        </label>
        <label class="flex items-start gap-2.5 text-xs text-secondary leading-relaxed cursor-pointer p-2.5 bg-filter-bg rounded-lg mb-2">
          <input type="checkbox" checked class="accent-accent mt-0.5 shrink-0" /> Je reconnais le risque de perte totale.
        </label>
      </div>
      <div class="bg-sky-50 border border-sky-300 rounded-lg p-3 text-xs text-sky-700 leading-relaxed mb-3.5">
        <strong>Délai de réflexion (Art. 22) :</strong> 4 jours calendaires pour se rétracter, sans justification.
      </div>
      <button class="w-full py-4.5 bg-accent text-sidebar text-xl font-bold rounded-lg cursor-pointer border-none font-[var(--font-app)] hover:bg-accent-hover transition-colors" @click="store.invest()">
        Investir maintenant
      </button>
    </div>
    <div class="bg-warning-bg rounded-lg p-3.5 flex items-start gap-2.5">
      <span class="text-lg shrink-0 mt-0.5">💡</span>
      <p class="text-xs text-primary leading-relaxed"><strong>Avertissement</strong> — Risque de perte. Performances passées ≠ futures. Rendements bruts.</p>
    </div>
  </div>
</template>