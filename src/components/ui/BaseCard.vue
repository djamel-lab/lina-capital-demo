<script setup>
defineProps({ hover: { type: Boolean, default: false } })
</script>

<template>
  <div :class="['bg-card border border-card-border rounded-2xl overflow-hidden', hover ? 'transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg' : '']">
    <slot />
  </div>
</template>