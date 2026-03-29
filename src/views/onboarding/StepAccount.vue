<script setup>
import { useRouter } from 'vue-router'
import BaseInput from '../../components/ui/BaseInput.vue'
import BaseSelect from '../../components/ui/BaseSelect.vue'
import BaseCheckbox from '../../components/ui/BaseCheckbox.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
const router = useRouter()
</script>

<template>
  <div>
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-emerald-100">📧</div>
    <h2 class="text-2xl font-bold text-heading mb-2">Créez votre compte</h2>
    <p class="text-[15px] text-secondary mb-8 leading-relaxed">Espace investisseur sécurisé Lina Capital.</p>
    <BaseInput label="Email" type="email" model-value="lea.dupont@email.com" />
    <div class="grid grid-cols-2 gap-4">
      <BaseInput label="Mot de passe" type="password" model-value="••••••••••••" />
      <BaseInput label="Confirmer" type="password" model-value="••••••••••••" />
    </div>
    <BaseSelect label="Type de compte" model-value="Personne physique" :options="['Personne physique', 'Personne morale']" />
    <div class="mt-6">
      <BaseCheckbox :model-value="true"><strong>CGU</strong> — J'accepte les Conditions Générales d'Utilisation</BaseCheckbox>
      <BaseCheckbox :model-value="true"><strong>Confidentialité</strong> — J'accepte la Politique de confidentialité</BaseCheckbox>
      <BaseCheckbox :model-value="true"><strong>Risques</strong> — Je reconnais le risque de perte totale du capital, sans garantie ni couverture par un fonds de garantie.</BaseCheckbox>
    </div>
    <div class="flex gap-3 mt-8"><BaseButton variant="primary" block @click="router.push('/onboarding/2')">Créer mon compte →</BaseButton></div>
  </div>
</template>