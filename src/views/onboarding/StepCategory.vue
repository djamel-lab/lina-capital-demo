<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-emerald-100">🏆</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Catégorisation</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">Art. 2(1)(j-k), Annexe II.</p>
    <div class="bg-gradient-to-br from-[#123259] to-sidebar rounded-2xl p-8 text-center text-white mb-6">
      <div class="text-5xl mb-4">✅</div>
      <h3 class="text-xl font-bold mb-2">Test réussi</h3>
      <span class="inline-block bg-accent text-sidebar px-5 py-1.5 rounded-full text-sm font-bold mb-4">Investisseur non averti</span>
      <p class="text-sm text-white/65 leading-relaxed">Avertissements renforcés + alertes > 1 000 € ou > 5% patrimoine.</p>
    </div>
    <div class="bg-warning-bg rounded-lg p-5 flex items-start gap-3 mb-6">
      <span class="text-lg shrink-0 mt-0.5">ℹ️</span>
      <p class="text-xs text-primary leading-relaxed"><strong>Délai de réflexion (Art. 22) :</strong> 4 jours calendaires pour se rétracter après chaque investissement.</p>
    </div>
    <div class="flex gap-3 mt-8">
      <BaseButton variant="secondary" @click="router.push('/onboarding/4')">← Retour</BaseButton>
      <BaseButton variant="primary" block @click="router.push('/onboarding/6')">Continuer →</BaseButton>
    </div>
  </div>
</template>