<script setup>
defineProps({ type: { type: String, default: 'halal' } })
const styles = {
  halal: 'bg-accent-secondary', nouveau: 'bg-badge-nouveau',
  'fin-proche': 'bg-badge-fin', finance: 'bg-success', shariah: 'bg-accent text-sidebar',
}
</script>

<template>
  <span :class="['px-3 py-1 rounded-full text-xs font-semibold text-white', styles[type] || styles.halal]"><slot /></span>
</template>