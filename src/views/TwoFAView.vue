<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../components/ui/BaseButton.vue'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-page-bg flex items-center justify-center font-[var(--font-app)]">
    <div class="bg-white rounded-2xl p-12 max-w-[420px] w-full text-center border border-card-border">
      <div class="text-5xl mb-4">🔐</div>
      <h2 class="text-xl font-bold text-heading mb-2">Vérification en deux étapes</h2>
      <p class="text-sm text-secondary mb-8 leading-relaxed">Code envoyé à <strong>lea.d****@email.com</strong></p>
      <div class="flex gap-3 justify-center mb-6">
        <input v-for="(d, i) in ['4','7','2','9','1','6']" :key="i" :value="d" readonly class="w-13 h-15 text-center text-2xl font-bold border-2 border-card-border rounded-xl font-[var(--font-app)] outline-none text-primary focus:border-accent" />
      </div>
      <BaseButton variant="primary" block @click="router.push('/app/dashboard')">Vérifier →</BaseButton>
      <p class="mt-4 text-xs text-tertiary">Non reçu ? <a href="#" class="text-accent no-underline font-semibold">Renvoyer</a></p>
    </div>
  </div>
</template>