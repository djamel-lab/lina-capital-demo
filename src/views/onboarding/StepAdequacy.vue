<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseCheckbox from '../../components/ui/BaseCheckbox.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
const showAlert = ref(false)
function onBadAnswer() { showAlert.value = true }
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-violet-100">📋</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Test d'adéquation</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">Art. 21, RD 2022/2114. Validité 2 ans.</p>
    <div v-if="showAlert" class="bg-red-50 border-2 border-danger-alt rounded-xl p-5 mb-5">
      <h4 class="text-danger-alt text-sm font-bold mb-2">⚠️ Réponse incorrecte</h4>
      <p class="text-xs text-primary leading-relaxed">Votre capital n'est <strong>PAS garanti</strong>. Vous pouvez perdre la totalité. Corrigez ou confirmez que vous comprenez.</p>
    </div>
    <div class="bg-white border border-card-border rounded-xl p-5 mb-4">
      <div class="text-sm font-semibold text-primary mb-3">Expérience en instruments financiers ?</div>
      <div class="flex flex-col gap-2">
        <label v-for="opt in ['Jamais', '1-3 fois', '4-10 fois', 'Plus de 10 fois']" :key="opt" class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q1" :checked="opt === '4-10 fois'" class="accent-accent w-4.5 h-4.5" />
          <span class="text-sm text-primary">{{ opt }}</span>
        </label>
      </div>
    </div>
    <div class="bg-white border border-card-border rounded-xl p-5 mb-4">
      <div class="text-sm font-semibold text-primary mb-3">Risque de perte en capital ?</div>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q2" checked class="accent-accent w-4.5 h-4.5" />
          <span class="text-sm text-primary">Perte totale possible</span>
        </label>
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q2" class="accent-accent w-4.5 h-4.5" @change="onBadAnswer" />
          <span class="text-sm text-primary">Capital garanti</span>
        </label>
      </div>
    </div>
    <div class="bg-white border border-card-border rounded-xl p-5 mb-4">
      <div class="text-sm font-semibold text-primary mb-3">Liquidité des investissements ?</div>
      <div class="flex flex-col gap-2">
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q3" checked class="accent-accent w-4.5 h-4.5" />
          <span class="text-sm text-primary">Oui, je comprends qu'ils ne sont pas liquides</span>
        </label>
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q3" class="accent-accent w-4.5 h-4.5" />
          <span class="text-sm text-primary">Non</span>
        </label>
      </div>
    </div>
    <div class="bg-white border border-card-border rounded-xl p-5 mb-4">
      <div class="text-sm font-semibold text-primary mb-3">Patrimoine net (hors résidence) ?</div>
      <div class="flex flex-col gap-2">
        <label v-for="opt in ['< 10 000 €', '10 000 – 50 000 €', '50 000 – 150 000 €', '> 150 000 €']" :key="opt" class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer hover:bg-filter-bg">
          <input type="radio" name="q4" :checked="opt === '50 000 – 150 000 €'" class="accent-accent w-4.5 h-4.5" />
          <span class="text-sm text-primary">{{ opt }}</span>
        </label>
      </div>
    </div>
    <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-6">
      <div class="text-sm font-semibold text-primary">Simulation de perte (Art. 21.6)</div>
      <div class="text-4xl font-extrabold text-danger-alt my-3">15 000 €</div>
      <p class="text-sm text-secondary leading-relaxed">10% de votre patrimoine. Vous devez supporter cette perte totale.</p>
    </div>
    <BaseCheckbox :model-value="true"><strong>Je confirme</strong> supporter la perte totale des montants investis.</BaseCheckbox>
    <div class="flex gap-3 mt-8">
      <BaseButton variant="secondary" @click="router.push('/onboarding/3')">← Retour</BaseButton>
      <BaseButton variant="primary" block @click="router.push('/onboarding/5')">Valider →</BaseButton>
    </div>
  </div>
</template>