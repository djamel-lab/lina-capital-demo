<script setup>
import { USER_DOCUMENTS } from '../../constants/documents'
</script>

<template>
  <div class="px-10 py-7 flex-1">
    <h3 class="text-xl font-bold text-primary mb-2">Mes documents</h3>
    <p class="text-sm text-secondary mb-6">Coffre-fort numérique — Conservation 5 ans min.</p>
    <div class="flex flex-col gap-3 mb-7">
      <div v-for="doc in USER_DOCUMENTS" :key="doc.name" class="flex items-center justify-between bg-white border border-card-border rounded-xl px-5 py-4">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 bg-filter-bg rounded-lg flex items-center justify-center text-lg">{{ doc.icon }}</div>
          <div>
            <div class="text-sm font-semibold text-primary">{{ doc.name }}</div>
            <div class="text-xs text-tertiary">{{ doc.meta }}</div>
          </div>
        </div>
        <span class="text-xs font-semibold text-success cursor-pointer no-underline">Télécharger →</span>
      </div>
    </div>
  </div>
</template>