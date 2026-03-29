<script setup>
defineEmits(['accept'])
</script>

<template>
  <div class="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-[560px] w-[90%] p-10 text-center shadow-2xl">
      <div class="text-5xl mb-4">⚠️</div>
      <h2 class="text-xl font-bold text-danger-alt mb-4 font-[var(--font-app)]">Avertissement — Risques d'investissement</h2>
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-xs text-primary leading-relaxed mb-5 text-left">
        <strong class="text-danger-alt">Investir dans un projet de financement participatif comporte des risques, y compris le risque de perte totale ou partielle du capital investi.</strong><br /><br />
        Les investissements ne sont couverts par aucun fonds de garantie des dépôts (Directive 2014/49/UE) ni système d'indemnisation des investisseurs (Directive 97/9/CE).<br /><br />
        Les performances passées ne préjugent pas des performances futures. Aucun rendement n'est garanti.
      </div>
      <p class="text-sm text-secondary mb-5">En poursuivant, vous reconnaissez avoir pris connaissance de ces risques.</p>
      <button class="px-10 py-4 bg-sidebar text-white rounded-lg text-base font-semibold cursor-pointer border-none font-[var(--font-app)]" @click="$emit('accept')">
        J'ai compris — Continuer
      </button>
    </div>
  </div>
</template>