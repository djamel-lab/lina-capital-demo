<script setup>
import { useInvestStore } from '../../stores/invest'
const invest = useInvestStore()
</script>

<template>
  <footer class="border-t border-card-border min-h-[70px] flex flex-col items-center justify-center gap-2 mt-auto px-10 py-4 shrink-0 bg-white">
    <div class="flex gap-10">
      <span class="flex items-center gap-2 text-sm text-secondary">🔒 Sécurisé</span>
      <span class="flex items-center gap-2 text-sm text-secondary">📜 AMF en cours</span>
      <span class="flex items-center gap-2 text-sm text-secondary">💰 0% frais entrée</span>
      <span class="flex items-center gap-2 text-sm text-secondary">⭐ 4.8/5</span>
    </div>
    <div class="flex gap-6">
      <span class="text-xs text-tertiary underline cursor-pointer hover:text-success" @click="invest.openRegModal('mentions')">Mentions légales</span>
      <span class="text-xs text-tertiary underline cursor-pointer hover:text-success" @click="invest.openRegModal('reclamation')">Réclamations</span>
      <span class="text-xs text-tertiary underline cursor-pointer hover:text-success" @click="invest.openRegModal('conflits')">Conflits d'intérêts</span>
      <span class="text-xs text-tertiary underline cursor-pointer hover:text-success" @click="invest.openRegModal('selection')">Politique sélection</span>
    </div>
  </footer>
</template>