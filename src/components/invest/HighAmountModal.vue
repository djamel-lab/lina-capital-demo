<script setup>
import { ref } from 'vue'
defineEmits(['close', 'confirm'])
const confirmed = ref(false)
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-[500px] w-[90%] p-8">
      <h3 class="text-lg font-bold text-danger-alt mb-3 flex items-center gap-2">⚠️ Alerte — Montant significatif (Art. 21.7)</h3>
      <p class="text-sm text-secondary leading-relaxed mb-4">Le montant dépasse <strong>1 000 €</strong> ou représente plus de <strong>5% de votre patrimoine net</strong>.</p>
      <p class="text-sm text-secondary leading-relaxed mb-4">Vous risquez de perdre la totalité de cette somme.</p>
      <label class="flex items-start gap-3 p-3.5 bg-white border border-card-border rounded-lg mb-4 cursor-pointer">
        <input v-model="confirmed" type="checkbox" class="w-5 h-5 mt-0.5 accent-accent shrink-0" />
        <span class="text-xs text-primary leading-relaxed"><strong>Je confirme</strong> comprendre le risque et que cet investissement est compatible avec ma situation financière.</span>
      </label>
      <div class="flex gap-3 mt-5">
        <button class="flex-1 py-3.5 rounded-lg text-sm font-semibold cursor-pointer border-none bg-filter-bg text-primary font-[var(--font-app)]" @click="$emit('close')">Annuler</button>
        <button class="flex-1 py-3.5 rounded-lg text-sm font-semibold cursor-pointer border-none bg-accent text-sidebar font-[var(--font-app)]" @click="$emit('confirm')">Confirmer</button>
      </div>
    </div>
  </div>
</template>