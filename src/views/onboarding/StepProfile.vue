<script setup>
import { useRouter } from 'vue-router'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseSelect from '../../components/ui/BaseSelect.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-indigo-100">👤</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Profil investisseur</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">Informations pour identification et catégorisation (Art. 21).</p>
    <div class="grid grid-cols-2 gap-4">
      <BaseSelect label="Civilité" model-value="Mme" :options="['Mme', 'M.']" />
      <BaseInput label="Naissance" model-value="15/03/1988" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <BaseInput label="Nom" model-value="Dupont" />
      <BaseInput label="Prénom" model-value="Lea" />
    </div>
    <BaseSelect label="Nationalité" model-value="Française" :options="['Française']" />
    <BaseInput label="Adresse" model-value="24 rue de la Paix, 75002 Paris" />
    <div class="grid grid-cols-2 gap-4">
      <BaseInput label="Téléphone" model-value="+33 6 12 34 56 78" />
      <BaseSelect label="Situation" model-value="Salariée" :options="['Salariée', 'Indépendant', 'Chef d\'entreprise']" />
    </div>
    <div class="flex gap-3 mt-8">
      <BaseButton variant="secondary" @click="router.push('/onboarding/1')">← Retour</BaseButton>
      <BaseButton variant="primary" block @click="router.push('/onboarding/3')">Continuer →</BaseButton>
    </div>
  </div>
</template>