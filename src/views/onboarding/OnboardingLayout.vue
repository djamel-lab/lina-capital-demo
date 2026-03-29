<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useOnboardingStore } from '../../stores/onboarding'
import { computed, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const onb = useOnboardingStore()

const currentStep = computed(() => {
  const match = route.path.match(/\/onboarding\/(\d+)/)
  return match ? parseInt(match[1]) : 1
})

watch(currentStep, (val) => { onb.goToStep(val) }, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-page-bg font-[var(--font-app)]">
    <div class="bg-white border-b border-card-border px-10 py-5 flex items-center justify-between">
      <div class="font-extrabold text-xl text-sidebar flex items-center gap-2">LINA<span class="w-2 h-2 bg-accent rounded-full"></span></div>
      <button class="text-sm text-secondary cursor-pointer bg-transparent border-none px-4 py-2 rounded-lg hover:bg-filter-bg font-[var(--font-app)]" @click="router.push('/login')">✕ Quitter</button>
    </div>
    <div class="bg-white px-10 pt-6 pb-7 border-b border-card-border">
      <div class="flex gap-2 mb-4">
        <div v-for="s in 6" :key="s" :class="['flex-1 h-1.5 rounded-full transition-all duration-400', s < currentStep ? 'bg-accent' : s === currentStep ? 'bg-accent animate-pulse' : 'bg-card-border']" />
      </div>
      <div class="flex justify-between">
        <span v-for="(label, i) in onb.stepLabels" :key="i"
          :class="['text-[11px] font-medium text-center flex-1 transition-all', i + 1 < currentStep ? 'text-success' : i + 1 === currentStep ? 'text-accent font-bold' : 'text-tertiary']">{{ label }}</span>
      </div>
    </div>
    <div class="max-w-[640px] mx-auto px-5 py-10"><router-view /></div>
  </div>
</template>