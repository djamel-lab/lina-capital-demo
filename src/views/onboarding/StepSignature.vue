<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
const recap = [
  { label: 'Identité', value: 'Lea Dupont' },
  { label: 'Naissance', value: '15/03/1988' },
  { label: 'Email', value: 'lea.dupont@email.com' },
  { label: 'KYC', value: '✓ Vérifié', success: true },
  { label: 'Catégorie', value: 'Non averti' },
  { label: 'Test', value: '✓ Adéquat — 28/03/2028', success: true },
]
const docs = [
  { name: 'CGU Investisseur', size: 'PDF • 340 Ko' },
  { name: 'Convention d\'investissement', size: 'PDF • 520 Ko' },
  { name: 'Attestation de risques', size: 'PDF • 210 Ko' },
]
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-pink-100">✍️</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Validation et signature</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">Récapitulatif et signature des documents contractuels.</p>
    <div class="bg-white border border-card-border rounded-xl overflow-hidden mb-6">
      <div class="px-5 py-4 bg-filter-bg text-sm font-bold text-primary border-b border-card-border">Récapitulatif</div>
      <div v-for="item in recap" :key="item.label" class="flex justify-between px-5 py-3 border-b border-gray-50 last:border-0 text-sm">
        <span class="text-secondary">{{ item.label }}</span>
        <span :class="['font-semibold', item.success ? 'text-success' : 'text-primary']">{{ item.value }}</span>
      </div>
    </div>
    <div class="mb-6">
      <div class="text-sm font-bold mb-3">Documents (Xodo Sign)</div>
      <div v-for="doc in docs" :key="doc.name" class="flex items-center justify-between bg-white border border-card-border rounded-lg px-5 py-4 mb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-filter-bg rounded-lg flex items-center justify-center text-lg">📄</div>
          <div>
            <div class="text-sm font-semibold text-primary">{{ doc.name }}</div>
            <div class="text-xs text-tertiary">{{ doc.size }}</div>
          </div>
        </div>
        <span class="text-xs font-semibold px-3.5 py-1 rounded-full bg-emerald-100 text-success">✓ Signé</span>
      </div>
    </div>
    <div class="bg-warning-bg rounded-lg p-5 flex items-start gap-3 mb-6">
      <span class="text-lg shrink-0 mt-0.5">📜</span>
      <p class="text-xs text-primary leading-relaxed">Archivage 10 ans. Signature via Xodo Sign.</p>
    </div>
    <div class="flex gap-3 mt-8">
      <BaseButton variant="secondary" @click="router.push('/onboarding/5')">← Retour</BaseButton>
      <button class="flex-1 px-8 py-4 rounded-lg text-base font-semibold cursor-pointer border-none bg-gradient-to-r from-accent to-accent-hover text-sidebar font-[var(--font-app)]" @click="router.push('/app/dashboard')">
        🎉 Accéder à la plateforme
      </button>
    </div>
  </div>
</template>