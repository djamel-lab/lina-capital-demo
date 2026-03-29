<script setup>
defineProps({ value: { type: Number, default: 0 }, height: { type: String, default: 'h-2.5' } })
</script>

<template>
  <div :class="['bg-card-border rounded-full overflow-hidden', height]">
    <div class="h-full bg-accent rounded-full transition-all duration-500" :style="{ width: value + '%' }" />
  </div>
</template>