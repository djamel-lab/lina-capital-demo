<script setup>
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '../../stores/onboarding'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
const onb = useOnboardingStore()
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-amber-100">🔐</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Vérification d'identité</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">KYC/LCB-FT (Art. L561-5 à L561-10).</p>
    <div class="mb-5">
      <label class="block text-xs font-semibold text-primary mb-2">Pièce d'identité</label>
      <div :class="['border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all', onb.kycUploaded.id ? 'border-accent bg-emerald-50' : 'border-card-border bg-white hover:border-accent hover:bg-emerald-50']" @click="onb.uploadKYC('id')">
        <div class="text-3xl mb-2">{{ onb.kycUploaded.id ? '✅' : '📎' }}</div>
        <div class="text-sm text-secondary">
          <template v-if="onb.kycUploaded.id"><strong class="text-accent">CNI_Dupont.pdf</strong> — OK</template>
          <template v-else><strong class="text-accent">Téléverser</strong> — JPG, PNG, PDF — 10 Mo</template>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <label class="block text-xs font-semibold text-primary mb-2">Justificatif domicile (&lt; 3 mois)</label>
      <div :class="['border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all', onb.kycUploaded.domicile ? 'border-accent bg-emerald-50' : 'border-card-border bg-white hover:border-accent hover:bg-emerald-50']" @click="onb.uploadKYC('domicile')">
        <div class="text-3xl mb-2">{{ onb.kycUploaded.domicile ? '✅' : '📎' }}</div>
        <div class="text-sm text-secondary">
          <template v-if="onb.kycUploaded.domicile"><strong class="text-accent">EDF_2026.pdf</strong> — OK</template>
          <template v-else><strong class="text-accent">Téléverser</strong> — Facture, avis d'imposition</template>
        </div>
      </div>
    </div>
    <div class="bg-warning-bg rounded-lg p-5 flex items-start gap-3 mb-6">
      <span class="text-lg shrink-0 mt-0.5">🔒</span>
      <p class="text-xs text-primary leading-relaxed">Chiffrement AES-256. Vérifications : authenticité, PPE, sanctions UE/ONU/OFAC, gel des avoirs. Délai : 48h.</p>
    </div>
    <div class="flex gap-3 mt-8">
      <BaseButton variant="secondary" @click="router.push('/onboarding/2')">← Retour</BaseButton>
      <BaseButton variant="primary" block @click="router.push('/onboarding/4')">Envoyer →</BaseButton>
    </div>
  </div>
</template>